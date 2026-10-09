(() => {
  'use strict';
  const languageKey = 'autumn-japan-2026-language';
  const languageQuery = new URLSearchParams(location.search).get('lang');
  let language = 'zh';
  try { language = localStorage.getItem(languageKey) === 'en' ? 'en' : 'zh'; } catch {}
  if (['zh', 'en'].includes(languageQuery)) language = languageQuery;
  const uiCopy = window.TRIP_UI_EN;
  const uiPattern = new RegExp(Object.keys(uiCopy).sort((a,b) => b.length-a.length).map(key => key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g');
  const t = value => language === 'en' ? String(value).replace(uiPattern, match => uiCopy[match]) : String(value);
  // Only template source is translated. Interpolated addresses, URLs and personal notes stay intact.
  const html = (parts, ...values) => parts.map((part,i) => t(part) + (values[i] ?? '')).join('');
  const text = html;
  let trip = language === 'en' ? window.TRIP_EN : window.TRIP;
  let placeById = new Map(trip.places.map(p => [p.id, p]));
  const originalPlaces = new Map(window.TRIP.places.map(p => [p.id, p]));
  const main = document.getElementById('main');
  const dialog = document.getElementById('detail-dialog');
  const storageKey = 'autumn-japan-2026-v1';
  const emptyState = () => ({ favorites: [], visited: [], booked: [], packing: [], notes: {}, alternate: false });
  let state = emptyState();
  let storageAvailable = true;
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
    if (saved && typeof saved === 'object') state = sanitizeState(saved);
  } catch { storageAvailable = false; }
  let activeView = 'plan';
  let selectedDate = todayInJapan();
  if (!trip.days.some(d => d.date === selectedDate)) selectedDate = trip.start;
  let filters = { search: '', city: '全部城市', category: '全部類型', favorites: false };
  let toastTimer;
  let dialogContext;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const icon = name => html`<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const ext = (url, content, cls = 'text-button') => html`<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${t(content)}</a>`;
  const maps = p => p.map || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.address ? p.ja + ' ' + p.address : p.ja + ' ' + p.city)}`;
  const directions = (p, origin) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(p.address ? p.ja + ' ' + p.address : p.ja + ' ' + p.city)}&travelmode=${p.city === '河口湖' || p.category === '住宿' ? 'driving' : 'transit'}${origin ? '&origin=' + encodeURIComponent(origin) : ''}`;
  const dateLabel = date => `${Number(date.slice(5, 7))}/${Number(date.slice(8))}`;
  const weekday = date => (language === 'en' ? ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'] : ['日','一','二','三','四','五','六'])[new Date(date + 'T12:00:00+09:00').getUTCDay()];
  const dayLabel = day => language === 'en' ? `November ${Number(day.date.slice(8))}, ${t(day.city)}, ${day.label}` : `11 月 ${Number(day.date.slice(8))} 日，${t(day.city)}，${day.label}`;
  const checked = (kind, id) => state[kind].includes(id);
  const favoriteButton = p => html`<button class="icon-button ${checked('favorites', p.id) ? 'favorite' : ''}" data-action="favorite" data-id="${p.id}" aria-label="${t(checked('favorites', p.id) ? '取消收藏' : '收藏')} ${esc(p.name)}" aria-pressed="${checked('favorites', p.id)}">${icon('heart')}</button>`;
  const pageHeading = (eyebrow, title, description, action = '') => html`<div class="page-heading"><div><div class="eyebrow">${eyebrow}</div><h1>${t(title)}</h1><p>${t(description)}</p></div>${action}</div>`;
  function todayInJapan() {
    const parts = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()).map(p => [p.type, p.value]));
    return `${parts.year}-${parts.month}-${parts.day}`;
  }
  function sanitizeState(value) {
    const clean = emptyState();
    for (const key of ['favorites', 'visited', 'booked', 'packing']) {
      clean[key] = Array.isArray(value[key]) ? [...new Set(value[key].filter(x => typeof x === 'string').map(x => x.slice(0, 100)))].slice(0, 500) : [];
    }
    if (value.notes && typeof value.notes === 'object' && !Array.isArray(value.notes)) {
      for (const day of trip.days) if (typeof value.notes[day.date] === 'string') clean.notes[day.date] = value.notes[day.date].slice(0, 3000);
    }
    clean.alternate = value.alternate === true;
    return clean;
  }
  function save() {
    try { localStorage.setItem(storageKey, JSON.stringify(state)); }
    catch { storageAvailable = false; toast('這個瀏覽器無法儲存，建議匯出備份。'); }
  }
  function toggle(kind, id) {
    state[kind] = checked(kind, id) ? state[kind].filter(x => x !== id) : [...state[kind], id];
    save();
  }
  function toast(message) {
    clearTimeout(toastTimer);
    const el = document.getElementById('toast');
    el.textContent = t(message);
    el.classList.add('visible');
    toastTimer = setTimeout(() => el.classList.remove('visible'), 3200);
  }
  function navigate(view, date) {
    const hash = '#' + view + (date && ['plan', 'transit'].includes(view) ? '/' + date : '');
    if (location.hash === hash) render();
    else location.hash = hash;
  }
  function applyHash() {
    const [view, date] = location.hash.slice(1).split('/');
    activeView = ['plan', 'stays', 'transit', 'places', 'prepare'].includes(view) ? view : 'plan';
    if (date && trip.days.some(d => d.date === date)) selectedDate = date;
    render();
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (activeView === 'transit' && date && trip.transport.some(t => t.id === date)) requestAnimationFrame(() => document.getElementById('transport-' + date)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }
  function render() {
    updateLanguageUI();
    document.querySelectorAll('[data-nav]').forEach(a => {
      const active = a.dataset.nav === activeView;
      a.classList.toggle('active', active);
      if (active) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    const titles = { plan: '每日行程', stays: '住宿', transit: '航班與交通', places: '口袋清單', prepare: '出發準備' };
    document.title = `${t(titles[activeView])} · ${trip.title} 2026`;
    main.innerHTML = html`<div class="page">${({ plan: renderPlan, stays: renderStays, transit: renderTransit, places: renderPlaces, prepare: renderPrepare })[activeView]()}</div>`;
    if (activeView === 'plan') {
      document.getElementById('day-note').value = state.notes[selectedDate] || '';
      scrollSelectedDay();
    }
  }
  function updateLanguageUI() {
    document.documentElement.lang = language === 'en' ? 'en' : 'zh-Hant';
    document.documentElement.dataset.language = language;
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-label]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nLabel)); });
    document.querySelectorAll('[data-language]').forEach(button => {
      button.classList.toggle('active', button.dataset.language === language);
      button.setAttribute('aria-pressed', String(button.dataset.language === language));
    });
    document.querySelector('link[rel="manifest"]').href = language === 'en' ? 'manifest-en.webmanifest' : 'manifest.webmanifest';
  }
  function setLanguage(next) {
    if (!['zh','en'].includes(next) || next === language) return;
    const top = window.scrollY;
    language = next;
    try { localStorage.setItem(languageKey, language); } catch {}
    const url = new URL(location.href); url.searchParams.set('lang', language);
    history.replaceState(null, '', url);
    trip = language === 'en' ? window.TRIP_EN : window.TRIP;
    placeById = new Map(trip.places.map(p => [p.id, p]));
    render(); updateCacheStatus();
    if (dialog.open && dialogContext) {
      if (dialogContext.kind === 'place') showPlace(dialogContext.id);
      else if (dialogContext.kind === 'taxi') showTaxi(dialogContext.id);
      else showSources();
    }
    window.scrollTo({ top, behavior: 'instant' });
  }
  function scrollSelectedDay() {
    const strip = document.querySelector('.day-selector');
    const active = document.querySelector('.day-button.active');
    if (strip && active && strip.scrollWidth > strip.clientWidth) strip.scrollLeft = active.offsetLeft - strip.offsetLeft - strip.clientWidth / 2 + active.clientWidth / 2;
  }
  function renderHero() {
    return html`<section class="hero" aria-labelledby="hero-title"><div class="hero-copy"><div class="eyebrow">${icon('leaf')}20 — 28 NOVEMBER 2026</div><h1 id="hero-title">把秋天，<br>留在<em>日本。</em></h1><p class="hero-description">東京的街角、河口湖的晨光，和京都的楓紅。<br>九天八夜，一起慢慢走。</p><div class="hero-buttons"><button class="button" data-action="today">${icon('calendar')}看今天的行程 ${icon('arrow')}</button><a class="button secondary" href="#places">${icon('heart')}我們的口袋清單</a></div></div><div class="hero-art"><img src="assets/fuji.svg" alt="秋色樹木與河口湖環繞的富士山插畫" width="620" height="460" fetchpriority="high"><span class="hero-art-label">SLOW DAYS, GOOD MEMORIES.</span><div class="hero-stamp" aria-label="九天八夜"><span>OUR LITTLE</span><strong>9 DAYS</strong><span>ADVENTURE</span></div></div></section><div class="trip-strip"><div class="city-progress"><div class="city-stop"><span class="city-number">01</span><span>東京<small>11/20–24 · 4 晚</small></span></div><div class="route-dash" aria-hidden="true"></div><div class="city-stop"><span class="city-number">02</span><span>河口湖<small>11/24–25 · 1 晚</small></span></div><div class="route-dash" aria-hidden="true"></div><div class="city-stop"><span class="city-number">03</span><span>京都<small>11/25–28 · 3 晚</small></span></div></div><div class="strip-meta">2 位成人 · 3 間已訂住宿 · 8 個夜晚</div></div>`;
  }
  function renderPlan() {
    const day = trip.days.find(d => d.date === selectedDate);
    const dayIndex = trip.days.indexOf(day);
    const items = day.alternate && state.alternate ? day.alternateItems : day.items;
    const progress = items.filter((_, i) => checked('visited', visitKey(day, i))).length;
    const hotel = placeById.get(day.hotel);
    const calendar = html`<button class="text-button" data-action="calendar-day">${icon('download')}加入行事曆</button>`;
    return html`${renderHero()}<section id="day-content" aria-label="每日行程"><div class="section-heading"><div><h2>每天，都有一點期待</h2><p>固定航班已確認，其餘時間可以跟著心情走。</p></div><span class="section-counter">DAY ${String(dayIndex + 1).padStart(2, '0')} / 09</span></div><div class="day-selector-wrap"><div class="day-selector" role="group" aria-label="選擇行程日期">${trip.days.map((d, i) => html`<button class="day-button ${d.date === selectedDate ? 'active' : ''} ${d.date === todayInJapan() ? 'today' : ''}" data-action="day" data-date="${d.date}" aria-label="${dayLabel(d)}" aria-pressed="${d.date === selectedDate}"><span class="weekday">週${weekday(d.date)}</span><span class="day-num">${d.date.slice(8)}</span><span class="day-city">${t(d.city)}</span></button>`).join('')}</div></div><div class="itinerary-layout"><div><div class="day-heading"><span class="large-date">${day.date.slice(8)}</span><div><span class="pill">${t(day.city)} · ${state.alternate && day.alternate ? t("大阪備選") : day.label}</span><h2>${state.alternate && day.alternate ? t('大阪一日來回，晚上回京都') : day.title}</h2><p>${state.alternate && day.alternate ? t("白天到大阪走走，當晚回京都 Hyatt。") : day.subtitle}</p></div></div><div class="route-line">${icon('map')}<span>${state.alternate && day.alternate ? t('京都 → 梅田 → 道頓堀（可選）→ 京都 Hyatt') : day.route}</span></div>${day.alternate ? html`<div class="segmented" role="group" aria-label="11/27 行程方案"><button class="${!state.alternate ? 'active' : ''}" data-action="alternate" data-mode="kyoto" aria-pressed="${!state.alternate}">京都・嵐山</button><button class="${state.alternate ? 'active' : ''}" data-action="alternate" data-mode="osaka" aria-pressed="${state.alternate}">大阪・備選</button></div>` : ''}<div class="day-tools"><small>時間為建議安排 · ${progress}/${items.length} 已完成</small>${calendar}</div><ol class="timeline">${items.map((item, i) => renderTimelineItem(day, item, i)).join('')}</ol><div class="day-tools"><button class="text-button" data-action="previous-day" ${dayIndex === 0 ? 'disabled' : ''}>← 前一天</button><small>${dateLabel(day.date)}（${weekday(day.date)}）</small><button class="text-button" data-action="next-day" ${dayIndex === 8 ? 'disabled' : ''}>下一天 ${icon('arrow')}</button></div></div><aside class="sidebar"><div class="sidebar-card notice"><div class="eyebrow">${icon('sun')}TODAY’S LITTLE NOTE</div><h3>今天的小提醒</h3><p>${day.tip}</p></div>${hotel ? html`<div class="sidebar-card stay-mini"><div class="eyebrow">${icon('bed')}TONIGHT’S STAY</div><img src="assets/${hotel.image}.svg" alt="" width="280" height="100" loading="lazy"><h3>${hotel.name}</h3><p>${hotel.ja}<br>${hotel.stay}</p><button class="button compact" data-action="taxi" data-id="${hotel.id}">${icon('pin')}回飯店・日文地址卡</button>${ext(directions(hotel), icon('map') + '導航回飯店')}</div>` : html`<div class="sidebar-card stay-mini"><div class="eyebrow">${icon('plane')}HOMEWARD BOUND</div><h3>GK55 · 14:55</h3><p>關西第一航廈 → 桃園第一航廈<br>抵達台灣時間 17:15</p><a class="button compact" href="#transit">查看回程交通 ${icon('arrow')}</a></div>`}<div class="sidebar-card notes"><label class="note-label" for="day-note">${icon('note')}今天的備註<span id="note-save-status">僅保存在這台裝置</span></label><textarea id="day-note" class="note-input" maxlength="3000" placeholder="訂位時間、想吃的店，或今天的小發現……" aria-describedby="note-hint"></textarea><p id="note-hint" class="dialog-small">${storageAvailable ? t('離開頁面會保留。兩人的手機各自儲存，可在「準備」匯出、匯入備份。') : t('目前無法儲存，請在「準備」匯出備份後再離開。')}</p></div></aside></div></section>`;
  }
  function visitKey(day, index) { return day.date + (day.alternate && state.alternate ? ':osaka:' : ':') + index; }
  function renderTimelineItem(day, item, index) {
    const p = placeById.get(item.place);
    const key = visitKey(day, index);
    const isDone = checked('visited', key);
    const title = p ? p.name : item.title;
    const booked = item.bookingId && checked('booked', item.bookingId);
    const badge = item.fixed ? html`<span class="pill confirmed">已確認航班</span>` : item.optional ? html`<span class="pill quiet">可選</span>` : item.pending ? html`<span class="pill ${booked ? 'confirmed' : 'warm'}">${t(booked ? '已標記訂妥' : '待安排')}</span>` : p?.category === '住宿' ? html`<span class="pill confirmed">住宿已訂</span>` : '';
    return html`<li class="timeline-item ${isDone ? 'done' : ''}"><button class="timeline-check ${isDone ? 'done' : ''}" data-action="visited" data-id="${key}" aria-label="${t(isDone ? '取消完成' : '標記完成')} ${esc(title)}" aria-pressed="${isDone}">${icon('check')}</button><article class="timeline-card"><div class="item-topline"><span class="item-time">${icon('clock')}${item.time}</span><span>${badge}</span>${p ? favoriteButton(p) : ''}</div><h3 class="item-title">${p ? html`<button class="place-title-button" data-action="place" data-id="${p.id}">${p.name}</button>` : icon(item.type === 'flight' ? 'plane' : item.type === 'transit' ? 'train' : item.type === 'meal' ? 'cup' : 'leaf') + title}</h3><p class="item-description">${item.detail}</p>${p || item.transport ? html`<div class="item-actions">${p ? ext(maps(p), icon('pin') + '地圖') + ext(directions(p), icon('arrow') + '導航') + html`<button class="text-button" data-action="place" data-id="${p.id}">詳細資訊</button>` : html`<button class="text-button" data-action="transport" data-id="${item.transport}">${icon('train')}交通細節 ${icon('arrow')}</button>`}${item.bookingId ? html`<a class="text-button" href="#prepare">${icon('calendar')}預約清單</a>` : ''}</div>` : ''}${item.nearby ? html`<div class="nearby"><span>同區可逛</span>${item.nearby.map(id => { const near = placeById.get(id); return html`<button data-action="place" data-id="${id}">${near.name}</button>`; }).join('')}</div>` : ''}</article></li>`;
  }
  function renderStays() {
    const hotels = trip.places.filter(p => p.category === '住宿');
    return html`${pageHeading('OUR THREE LITTLE BASES', '今晚，住這裡。', '三間飯店已訂妥。按日文地址卡給司機看，或一鍵導航回飯店。')}<div class="stays-grid">${hotels.map(p => html`<article class="stay-card"><div class="stay-art"><img src="assets/${p.image}.svg" alt="${t(p.city)}風景插畫" width="380" height="180"><span class="pill confirmed">${icon('check')}已訂妥</span></div><div class="stay-body"><div class="eyebrow">${p.caption}</div><h2>${p.name}</h2><p class="stay-ja" lang="ja">${p.ja}</p><div class="stay-dates"><span>${p.stay}</span><span><strong>${p.nights}</strong> ${language === 'en' ? (p.nights === 1 ? 'night' : 'nights') : '晚'}</span></div><p class="stay-description">${p.description}</p><p class="stay-address" lang="ja">${icon('pin')}${p.address}</p><div class="stay-actions"><button class="button" data-action="taxi" data-id="${p.id}">${icon('copy')}日文地址卡</button>${ext(directions(p), icon('arrow') + '導航到飯店', 'button secondary')}</div><details class="stay-extra"><summary>入住、聯絡與小提醒</summary><p>入住：${p.checkin}<br>退房：${p.checkout}</p>${p.note ? html`<p>${p.note}</p>` : ''}<p>${ext('tel:' + p.phone, icon('phone') + p.phone.replace('+81', '+81 '))} ${ext(p.source, '飯店官網 ' + icon('external'))}</p><p>房型、餐食、取消與付款條件以各自的訂房確認信為準。</p></details></div></article>`).join('')}</div><div class="gentle-note">11/25–28 都住京都 Hyatt，沒有安排大阪過夜。大件行李若想從東京直接寄到京都，可向東京飯店詢問費用與配送時間，另帶河口湖一晚的小行李。</div><div class="install-box"><h3>${icon('note')}旅途中最實用的小習慣</h3><p>把訂房確認信與票券另外存到手機。這裡的地址卡可離線查看；打電話、Google Maps 導航及預約頁仍需要網路。</p></div>`;
  }
  function renderFlight(f) {
    return html`<article class="flight-card"><div class="flight-top"><span>${dateLabel(f.date)}（${weekday(f.date)}） · ${t(f.id === 'outbound' ? '去程' : '回程')}</span><strong>Jetstar Japan · ${f.number}</strong><span class="pill confirmed">已確認</span></div><div class="flight-route"><div class="flight-stop"><div class="airport-code">${f.from}</div><div class="flight-time">${f.departure}</div><small>${f.fromName}</small><small>${f.fromTerminal}</small></div><div class="flight-connector">${icon('plane')}<small>${f.duration}</small></div><div class="flight-stop"><div class="airport-code">${f.to}</div><div class="flight-time">${f.arrival}</div><small>${f.toName}</small><small>${f.toTerminal}</small></div></div></article>`;
  }
  function renderTransportCard(t) {
    const destination = t.destination ? placeById.get(t.destination) : { ja: t.destinationQuery, city: '', category: '住宿' };
    return html`<article class="transport-card" id="transport-${t.id}"><div class="transport-top"><div class="transport-symbol">${icon(t.icon)}</div><div><span class="eyebrow">${t.date} · ON THE WAY</span><h2>${t.title}</h2><p>${t.subtitle}</p></div></div><p>${t.summary}</p><ol class="transport-steps">${t.steps.map(s => html`<li>${s}</li>`).join('')}</ol><p class="transport-note">${t.note}</p><div class="transport-links">${ext(t.link, '官方資訊／購票 ' + icon('external'), 'button compact')}${ext(directions(destination, t.origin), icon('map') + '查看路線', 'button secondary compact')}${ext(t.source, '資料來源')}</div></article>`;
  }
  function renderTransit() {
    return html`${pageHeading('FROM TAKEOFF TO THE LAST TRAIN', '每一段路，都先想好。', '航班時間以你提供的確認圖為準，顯示出發與抵達地當地時間。列車／巴士是建議安排，尚未訂妥。', html`<button class="button secondary" data-action="calendar-flights">${icon('calendar')}下載航班行事曆</button>`)}<div class="flight-grid">${trip.flights.map(renderFlight).join('')}</div><div class="section-heading"><div><h2>四段重要的移動</h2><p>帶行李的日子，少一點轉乘，多一點餘裕。</p></div></div><div class="transport-grid">${trip.transport.map(renderTransportCard).join('')}</div><div class="gentle-note">所有交通時間皆需在購票與出發前再核對。地圖連結讓你自行查當下路線；地圖建議的車次不代表已經訂票。11/25 新幹線先依巴士抵達時間留緩衝，再選停靠三島的班次。</div>`;
  }
  function renderPlaces() {
    return html`${pageHeading('THE PLACES WE WANT TO FIND', '把喜歡的地方，放進口袋。', '你指定的兩間店，以及原文件的景點、餐廳與選物清單。收藏最想去的，再跟著當天體力調整。')}<div class="filter-bar"><label class="search-field">${icon('search')}<span class="sr-only">搜尋地點或區域</span><input id="place-search" type="search" placeholder="搜尋店名、區域或想吃的……" value="${esc(filters.search)}" autocomplete="off"></label><label class="sr-only" for="city-filter">城市</label><select class="filter-select" id="city-filter">${['全部城市','東京','河口湖','京都','大阪'].map(x => html`<option value="${x}"${x === filters.city ? ' selected' : ''}>${t(x)}</option>`).join('')}</select><label class="sr-only" for="category-filter">類型</label><select class="filter-select" id="category-filter">${['全部類型','景點','餐飲','咖啡甜點','購物','體驗','住宿'].map(x => html`<option value="${x}"${x === filters.category ? ' selected' : ''}>${t(x)}</option>`).join('')}</select><button class="filter-toggle ${filters.favorites ? 'active' : ''}" data-action="only-favorites" aria-pressed="${filters.favorites}">${icon('heart')}只看收藏</button></div><div class="list-summary"><span id="place-count" role="status"></span><span>♡ 收藏與備註保存在這台裝置</span></div><div class="places-grid" id="places-grid">${renderPlaceCards()}</div><div class="gentle-note">這是想去的地點清單，並非每一家都已訂位。原文件的搶票時間、分店與路線已重新整理；尚未核實營業時間的候選店，出發前用地圖與官網確認。Fuglen Kyoto 在京都北區，大阪列為備選。</div>`;
  }
  function filteredPlaces() {
    const q = filters.search.trim().normalize('NFKC').toLowerCase();
    return trip.places.filter(p => (!q || [p.name,p.ja,t(p.city),t(p.category),p.city,p.area,p.category,p.description,p.note,...Object.values(originalPlaces.get(p.id)).filter(x => typeof x === 'string')].join(' ').normalize('NFKC').toLowerCase().includes(q)) && (filters.city === '全部城市' || p.city === filters.city) && (filters.category === '全部類型' || p.category === filters.category) && (!filters.favorites || checked('favorites', p.id)));
  }
  function renderPlaceCards() {
    const places = filteredPlaces();
    setTimeout(() => {
      const count = document.getElementById('place-count');
      if (count) { const saved = state.favorites.filter(id => placeById.has(id)).length; count.textContent = language === 'en' ? `${places.length} ${places.length === 1 ? 'place' : 'places'} · ${saved} saved` : `${places.length} 個地點 · 已收藏 ${saved} 個`; }
    }, 0);
    if (!places.length) return html`<div class="empty-state">${icon(filters.favorites ? 'heart' : 'search')}<h2>${t(filters.favorites ? '還沒有符合條件的收藏' : '沒有找到這個地點')}</h2><p>換個關鍵字或城市，或按愛心加入想去的地方。</p><button class="button secondary compact" data-action="clear-filters">顯示全部地點</button></div>`;
    return places.map(p => html`<article class="place-card ${p.featured ? 'featured' : ''}"><div class="place-card-top"><span class="eyebrow">${t(p.city)} · ${p.area}</span>${favoriteButton(p)}</div>${p.featured ? t('<span class="pill warm" style="align-self:flex-start">你們指定的店</span>') : ''}<h2><button class="place-title-button" data-action="place" data-id="${p.id}">${p.name}</button></h2><p>${p.description}</p><div class="place-card-footer"><span>${t(p.category)}</span><span><button class="text-button" data-action="place" data-id="${p.id}">查看 ${icon('chevron')}</button> ${ext(maps(p), icon('pin') + '地圖')}</span></div></article>`).join('');
  }
  function updatePlaces() {
    document.getElementById('places-grid').innerHTML = renderPlaceCards();
    const favoriteFilter = document.querySelector('[data-action="only-favorites"]');
    favoriteFilter.classList.toggle('active', filters.favorites);
    favoriteFilter.setAttribute('aria-pressed', filters.favorites);
  }
  function releaseTime(date, timezone) {
    const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: timezone, month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date(date)).map(p => [p.type, p.value]));
    return `${parts.month}/${parts.day} ${parts.hour}:${parts.minute}`;
  }
  function releaseTimes(booking) {
    if (!booking.release) return '';
    return html`<div class="release-times">${[['日本','Asia/Tokyo'],['台灣','Asia/Taipei'],['洛杉磯','America/Los_Angeles']].map(([label, timezone]) => html`<div><span>${t(label)}開放時間</span><strong>${releaseTime(booking.release, timezone)}</strong></div>`).join('')}</div>`;
  }
  function renderPrepare() {
    const done = state.packing.filter(x => trip.packing[Number(x)]).length;
    return html`${pageHeading('A LITTLE PREPARATION, A BETTER TRIP', '出發之前，安心一點。', '住宿與航班已確認。把待訂交通、餐廳與行李清單一項項處理，出發後就可以放心玩。')}<div class="prepare-layout"><div><div class="section-heading"><div><h2>待安排與預約</h2><p>標記「已訂妥」只記錄你的進度，仍需自行在官網完成預約。</p></div></div><div class="booking-list">${trip.bookings.map(b => html`<article class="booking-card"><div class="booking-card-top"><div><h3>${b.name}</h3><span class="booking-when">${b.when}</span></div><button class="booking-check ${checked('booked', b.id) ? 'checked' : ''}" data-action="booked" data-id="${b.id}" aria-pressed="${checked('booked', b.id)}" aria-label="${esc(b.name)} ${t(checked('booked', b.id) ? '已標記訂妥，按一下取消' : '標記已訂妥')}">${icon(checked('booked', b.id) ? 'check' : 'calendar')}${t(checked('booked', b.id) ? '已訂妥' : '待安排')}</button></div><p>${b.description}</p>${releaseTimes(b)}<div class="booking-links">${ext(b.url, '前往官方預約／資訊 ' + icon('external'))}${b.release ? html`<button class="text-button" data-action="calendar-release" data-id="${b.id}">${icon('calendar')}下載開賣提醒</button>` : ''}${b.source ? ext(b.source, '售票規則') : ''}</div></article>`).join('')}</div><div class="utility-card"><h3>旅程與備註，帶著走</h3><p>可下載全部行程到行事曆，或匯出這台裝置的備註、收藏與勾選進度給另一支手機匯入。備份檔請自行保管；不會傳到網站。</p><div class="utility-actions"><button class="button compact" data-action="calendar-all">${icon('calendar')}下載完整行事曆</button><button class="button secondary compact" data-action="print">列印旅程</button><button class="button secondary compact" data-action="export">${icon('download')}匯出備份</button><button class="button secondary compact" data-action="import">匯入備份</button><input id="import-file" type="file" accept="application/json,.json" hidden aria-label="選擇旅程備份檔"></div></div></div><aside class="prepare-sidebar"><div class="packing-card"><h2>出發清單</h2><p id="packing-count">${done} / ${trip.packing.length} 已準備</p><div class="progress-track"><div class="progress-fill" id="packing-progress" style="width:${done / trip.packing.length * 100}%"></div></div><ul class="packing-list">${trip.packing.map((item, i) => html`<li><label class="${checked('packing', String(i)) ? 'checked' : ''}"><input type="checkbox" data-packing="${i}" ${checked('packing', String(i)) ? 'checked' : ''}><span>${item}</span></label></li>`).join('')}</ul></div><div class="install-box"><h3>把它放在 iPhone 主畫面</h3><p>Safari 開啟網站 → 分享 → <strong>加入主畫面</strong>。<br>先連網開啟一次，看到「已可離線查看」後，就能離線讀行程與地址卡。地圖、預約、電話仍需網路。</p><p id="cache-status" style="margin-top:9px">正在確認離線儲存……</p></div><div><div class="section-heading"><div><h2>常用連結</h2></div></div><div class="resource-list">${trip.resources.map(r => ext(r.url, html`<span><strong>${r.name}</strong><small>${r.detail}</small></span>${icon('external')}`, 'resource-link')).join('')}</div></div></aside></div>`;
  }
  function openDialog(html) {
    document.getElementById('dialog-content').innerHTML = html;
    if (!dialog.open) dialog.showModal();
  }
  const closeButton = () => html`<button class="icon-button" data-action="close-dialog" aria-label="關閉視窗">${icon('close')}</button>`;
  function showPlace(id) {
    dialogContext = { kind: 'place', id };
    const p = placeById.get(id);
    if (!p) return;
    openDialog(html`<div class="dialog-body"><div class="dialog-top"><span class="eyebrow">${t(p.city)} · ${p.area} · ${t(p.category)}</span>${closeButton()}</div><h2 id="dialog-title">${p.name}</h2><p class="dialog-ja" lang="ja">${p.ja}</p><p class="dialog-description">${p.description}</p>${p.address ? html`<div class="detail-row">${icon('pin')}<span lang="ja">${p.address}</span></div>` : ''}${p.hours ? html`<div class="detail-row">${icon('clock')}<span>${p.hours}<br><small>營業時間核對於 ${trip.updated}，出發前再確認。</small></span></div>` : ''}${p.phone ? html`<div class="detail-row">${icon('phone')}<a href="tel:${p.phone}">${p.phone}</a></div>` : ''}${p.note ? html`<div class="dialog-note">${p.note}</div>` : ''}<div class="dialog-actions">${ext(directions(p), icon('arrow') + '導航前往', 'button')}${ext(maps(p), icon('map') + 'Google Maps', 'button secondary')}${p.address ? html`<button class="button secondary" data-action="copy-address" data-id="${p.id}">${icon('copy')}複製地址</button>` : ''}${p.category === '住宿' ? html`<button class="button secondary" data-action="taxi" data-id="${p.id}">日文地址卡</button>` : ''}${favoriteButton(p)}</div>${p.booking ? html`<div class="dialog-actions">${ext(p.booking, icon('calendar') + '官方預約資訊', 'button secondary')}</div>` : ''}<div class="dialog-source">${p.source ? ext(p.source, '店家／官方資料 ' + icon('external'), '') : t('<span>原行程候選地點，出發前請確認分店與營業狀態。</span>')}${p.secondSource ? ext(p.secondSource, '2026 年營運公告', '') : ''}</div></div>`);
  }
  function showTaxi(id) {
    dialogContext = { kind: 'taxi', id };
    const p = placeById.get(id);
    if (!p?.address) return;
    openDialog(html`<div class="dialog-body"><div class="dialog-top"><span class="eyebrow">SHOW THIS TO THE DRIVER</span>${closeButton()}</div><h2 id="dialog-title">給司機看的地址卡</h2><p class="dialog-small">${p.name} · ${p.stay || ''}</p><div class="taxi-card" lang="ja"><p class="taxi-intro">こちらのホテルまでお願いします。</p><p class="taxi-name">${p.ja}</p><p class="taxi-address">${p.address}</p><p class="taxi-thanks">ありがとうございます。</p></div><div class="dialog-actions"><button class="button" data-action="copy-address" data-id="${id}">${icon('copy')}複製日文地址</button>${ext('tel:' + p.phone, icon('phone') + '打給飯店', 'button secondary')}${ext(directions(p), icon('arrow') + '開啟導航', 'button secondary')}</div><p class="dialog-small">這張地址卡可離線查看。電話與導航需要網路或可通話的門號。</p></div>`);
  }
  function showSources() {
    dialogContext = { kind: 'sources' };
    openDialog(html`<div class="dialog-body"><div class="dialog-top"><span class="eyebrow">ABOUT OUR TRIP</span>${closeButton()}</div><h2 id="dialog-title">資料與使用說明</h2><p class="dialog-description">這份旅程以你最新確認的航班、飯店與兩個地圖連結為準。原本的 Japan.pages 僅作為想去地點清單；住宿日期與回程已重新安排。</p><ul class="dialog-confirmed-list"><li>11/20–24：東急 STAY 青山 Premier · 4 晚</li><li>11/24–25：Sunnide Resort · 1 晚</li><li>11/25–28：Hyatt Regency Kyoto · 3 晚</li><li>GK14：11/20 桃園 12:50 → 成田 16:55</li><li>GK55：11/28 關西 14:55 → 桃園 17:15</li></ul><p class="dialog-small">航班時間顯示出發／抵達地當地時間。其他行程時間為建議安排，列車、餐廳與體驗尚未訂妥；請以自己的確認信為準。店家、時刻與活動資料核對於 ${trip.updated}，各卡片附官方來源。地圖與官方頁面可查最新變動。</p><p class="dialog-small">備註、收藏、完成進度只保存在目前瀏覽器，兩支手機不會自動同步。可在「準備」匯出與匯入備份。清除瀏覽器資料可能移除這些紀錄。離線模式保留本站內容，外部服務仍需網路。</p><div class="source-grid">${trip.resources.slice(3).map(r => ext(r.url, html`<span><strong>${r.name}</strong><small>${r.detail}</small></span>${icon('external')}`, 'resource-link')).join('')}</div></div>`);
  }
  async function copyAddress(id) {
    const p = placeById.get(id);
    const text = p.ja + '\n' + p.address;
    try { await navigator.clipboard.writeText(text); toast('日文地址已複製'); }
    catch {
      const input = document.createElement('textarea');
      input.value = text; input.style.position = 'fixed'; input.style.top = '-1000px';
      (dialog.open ? dialog : document.body).appendChild(input);
      input.select();
      const copied = document.execCommand('copy'); input.remove();
      toast(copied ? '日文地址已複製' : '請長按地址卡上的文字複製');
    }
  }
  function download(data, filename, type) {
    const blob = new Blob([data], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }
  const icsEscape = s => String(s).replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
  const utcStamp = date => new Date(date).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  function eventICS(event) {
    const lines = ['BEGIN:VEVENT', 'UID:' + event.id + '@japan-2026.kevinshen56714.github.io', 'DTSTAMP:20261008T000000Z', `DTSTART${event.allDay ? ';VALUE=DATE' : ''}:${event.start}`, `DTEND${event.allDay ? ';VALUE=DATE' : ''}:${event.end}`, 'SUMMARY:' + icsEscape(event.title), 'DESCRIPTION:' + icsEscape(event.description || ''), 'LOCATION:' + icsEscape(event.location || '')];
    if (event.alarm) lines.push('BEGIN:VALARM','TRIGGER:-PT10M','ACTION:DISPLAY','DESCRIPTION:' + icsEscape(event.title),'END:VALARM');
    lines.push('END:VEVENT');
    return lines;
  }
  function dayEvent(day) {
    const items = day.alternate && state.alternate ? day.alternateItems : day.items;
    const next = new Date(day.date + 'T00:00:00Z'); next.setUTCDate(next.getUTCDate() + 1);
    const hotel = placeById.get(day.hotel);
    const description = [day.subtitle, t('行程為建議安排，票券與訂位需自行確認。'), ...items.map(i => text`${i.time} ${placeById.get(i.place)?.name || i.title}：${i.detail}`), '', day.tip, hotel ? t('\n住宿：') + hotel.name + '\n' + hotel.address : '', t('\n網站：') + 'https://kevinshen56714.github.io/japan-2026/?lang=' + language + '#plan/' + day.date].join('\n');
    return { id: day.date + '-day', start: day.date.replaceAll('-', ''), end: next.toISOString().slice(0,10).replaceAll('-', ''), allDay: true, title: text`秋日日本｜${t(day.city)}・${state.alternate && day.alternate ? t('大阪一日來回') : day.label}`, description, location: hotel?.address || day.city };
  }
  function flightEvent(f) {
    return { id: f.id + '-' + f.date, start: f.startUTC, end: f.endUTC, title: `${f.number}｜${f.from} → ${f.to}`, description: text`已確認航班。出發地當地時間 ${f.departure}，抵達地當地時間 ${f.arrival}。\n${f.fromName} ${f.fromTerminal} → ${f.toName} ${f.toTerminal}\n報到截止、行李與航班異動以航空公司確認信為準。`, location: `${f.fromName} ${f.fromTerminal}` };
  }
  function releaseEvent(b) {
    return { id: b.id + '-release', start: utcStamp(b.release), end: utcStamp(new Date(new Date(b.release).getTime() + 15 * 60000)), title: t('訂票提醒｜') + b.name, description: b.description + '\n' + b.when + '\n' + b.url + t('\n提醒不代表已完成預約。'), alarm: true };
  }
  function calendar(mode, id) {
    let events;
    let name;
    if (mode === 'day') { events = [dayEvent(trip.days.find(d => d.date === selectedDate))]; name = selectedDate; }
    else if (mode === 'flights') { events = trip.flights.map(flightEvent); name = 'flights'; }
    else if (mode === 'release') { const b = trip.bookings.find(b => b.id === id); events = [releaseEvent(b)]; name = b.id; }
    else { events = [...trip.days.map(dayEvent), ...trip.flights.map(flightEvent), ...trip.bookings.filter(b => b.release).map(releaseEvent)]; name = 'complete'; }
    const raw = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Our Japan 2026//Travel Planner//' + (language === 'en' ? 'EN' : 'ZH-TW'),'CALSCALE:GREGORIAN','METHOD:PUBLISH','X-WR-CALNAME:' + trip.title + ' 2026', ...events.flatMap(eventICS), 'END:VCALENDAR'];
    // RFC 5545 folds UTF-8 by bytes, not characters, to keep Chinese calendar text valid.
    const folded = raw.flatMap(line => {
      const parts = []; let part = ''; let bytes = 0;
      for (const c of line) {
        const size = new TextEncoder().encode(c).length;
        if (bytes + size > 73) { parts.push(part); part = ' '; bytes = 1; }
        part += c; bytes += size;
      }
      parts.push(part); return parts;
    });
    download(folded.join('\r\n') + '\r\n', 'japan-2026-' + name + '.ics', 'text/calendar;charset=utf-8');
    toast('行事曆已下載；匯入後即可在手機查看');
  }
  function printTrip() {
    const container = document.createElement('section');
    container.className = 'hidden-print'; container.id = 'print-itinerary';
    container.innerHTML = html`<h1 class="print-heading">秋日日本 · 2026/11/20–28</h1><p>九天八夜 · 2 位成人 · 東京 4 晚 / 河口湖 1 晚 / 京都 3 晚</p>${trip.flights.map(f => html`<p>${f.number}：${dateLabel(f.date)} ${f.fromName} ${f.fromTerminal} ${f.departure} → ${f.toName} ${f.toTerminal} ${f.arrival}（各地當地時間）</p>`).join('')}${trip.days.map(day => { const items = day.alternate && state.alternate ? day.alternateItems : day.items; const hotel = placeById.get(day.hotel); return html`<article class="print-day"><h2>${dateLabel(day.date)}（${weekday(day.date)}）${t(day.city)} · ${state.alternate && day.alternate ? t('大阪一日來回') : day.label}</h2><p>${day.tip}</p><ol>${items.map(item => html`<li><strong>${item.time} ${placeById.get(item.place)?.name || item.title}</strong><br>${item.detail}</li>`).join('')}</ol>${hotel ? html`<p>住宿：${hotel.name}<br>${hotel.ja}<br>${hotel.address}<br>${hotel.phone}</p>` : ''}${state.notes[day.date] ? html`<p>備註：${esc(state.notes[day.date])}</p>` : ''}</article>`; }).join('')}<p>交通與餐廳為建議安排，票券／訂位以自己的確認信為準。網站：https://kevinshen56714.github.io/japan-2026/</p>`;
    const current = main.querySelector('.page');
    current.classList.add('screen-only');
    const style = document.createElement('style'); style.id = 'print-style'; style.textContent = '@media print{.screen-only{display:none!important}.hidden-print{display:block!important}}';
    document.head.appendChild(style); main.appendChild(container);
    const cleanup = () => { container.remove(); style.remove(); current.classList.remove('screen-only'); };
    window.addEventListener('afterprint', cleanup, { once: true });
    window.print();
  }
  async function importBackup(file) {
    if (!file) return;
    if (file.size > 200000) { toast('備份檔太大，請選擇本網站匯出的 JSON 檔'); return; }
    try {
      const value = JSON.parse(await file.text());
      if (value.trip !== 'japan-2026' || !value.state || typeof value.state !== 'object') throw new Error();
      const incoming = sanitizeState(value.state);
      for (const kind of ['favorites','visited','booked','packing']) state[kind] = [...new Set([...state[kind], ...incoming[kind]])];
      // Keep existing local notes. Imported notes are added below rather than overwritten.
      for (const [date, note] of Object.entries(incoming.notes)) {
        if (!note) continue;
        const existing = state.notes[date] || '';
        if (!existing) state.notes[date] = note;
        else if (!existing.includes(note)) state.notes[date] = (existing + t('\n\n— 匯入的備註 —\n') + note).slice(0, 3000);
      }
      if (incoming.alternate) state.alternate = true;
      save(); render(); toast('已合併備註、收藏與進度，原有紀錄保留');
    } catch { toast('無法讀取，請選擇本網站匯出的備份檔'); }
  }
  document.addEventListener('click', async event => {
    const button = event.target.closest('[data-action]');
    if (!button || button.disabled) return;
    const id = button.dataset.id;
    switch (button.dataset.action) {
      case 'language': setLanguage(button.dataset.language); break;
      case 'day':
        selectedDate = button.dataset.date;
        history.replaceState(null, '', '#plan/' + selectedDate); activeView = 'plan';
        render(); document.getElementById('day-content').scrollIntoView({ behavior: 'smooth', block: 'start' }); break;
      case 'today': {
        const today = todayInJapan();
        selectedDate = trip.days.some(d => d.date === today) ? today : trip.start;
        history.replaceState(null, '', '#plan/' + selectedDate); activeView = 'plan'; render();
        document.getElementById('day-content').scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (today < trip.start) toast('旅程還沒開始，先看看抵達日'); else if (today > trip.end) toast('旅程已結束，可以回看每天的行程'); break;
      }
      case 'previous-day': case 'next-day': {
        const index = trip.days.findIndex(d => d.date === selectedDate);
        selectedDate = trip.days[index + (button.dataset.action === 'next-day' ? 1 : -1)].date;
        history.replaceState(null, '', '#plan/' + selectedDate); render();
        document.getElementById('day-content').scrollIntoView({ behavior: 'smooth', block: 'start' }); break;
      }
      case 'favorite': {
        toggle('favorites', id);
        const isFavorite = checked('favorites', id);
        document.querySelectorAll(`[data-action="favorite"][data-id="${id}"]`).forEach(b => { b.classList.toggle('favorite', isFavorite); b.setAttribute('aria-pressed', isFavorite); b.setAttribute('aria-label', `${t(isFavorite ? '取消收藏' : '收藏')} ${placeById.get(id).name}`); });
        if (activeView === 'places') updatePlaces();
        toast(isFavorite ? '已放進口袋清單' : '已取消收藏'); break;
      }
      case 'visited': {
        toggle('visited', id);
        const done = checked('visited', id); button.classList.toggle('done', done); button.setAttribute('aria-pressed', done);
        button.setAttribute('aria-label', button.getAttribute('aria-label').replace(t(done ? '標記完成' : '取消完成'), t(done ? '取消完成' : '標記完成')));
        button.closest('.timeline-item').classList.toggle('done', done);
        const day = trip.days.find(d => d.date === selectedDate); const items = day.alternate && state.alternate ? day.alternateItems : day.items;
        const progress = items.filter((_, i) => checked('visited', visitKey(day, i))).length;
        document.querySelector('.day-tools small').textContent = text`時間為建議安排 · ${progress}/${items.length} 已完成`; break;
      }
      case 'booked': toggle('booked', id); render(); toast(checked('booked', id) ? '已記錄訂妥；請保留實際確認信' : '已改為待安排'); break;
      case 'alternate': state.alternate = button.dataset.mode === 'osaka'; save(); render(); break;
      case 'place': showPlace(id); break;
      case 'taxi': showTaxi(id); break;
      case 'copy-address': await copyAddress(id); break;
      case 'close-dialog': dialog.close(); break;
      case 'sources': showSources(); break;
      case 'transport': {
        navigate('transit', id); break;
      }
      case 'only-favorites': filters.favorites = !filters.favorites; updatePlaces(); break;
      case 'clear-filters': filters = { search: '', city: '全部城市', category: '全部類型', favorites: false }; render(); break;
      case 'calendar-day': calendar('day'); break;
      case 'calendar-flights': calendar('flights'); break;
      case 'calendar-all': calendar('all'); break;
      case 'calendar-release': calendar('release', id); break;
      case 'print': printTrip(); break;
      case 'export': download(JSON.stringify({ trip: 'japan-2026', version: 1, exportedAt: new Date().toISOString(), state }, null, 2), 'japan-2026-backup.json', 'application/json;charset=utf-8'); toast('備份已匯出，可在另一支手機匯入'); break;
      case 'import': document.getElementById('import-file').click(); break;
    }
  });
  document.addEventListener('input', event => {
    if (event.target.id === 'place-search') { filters.search = event.target.value; updatePlaces(); }
    if (event.target.id === 'day-note') {
      state.notes[selectedDate] = event.target.value; save();
      document.getElementById('note-save-status').textContent = t(storageAvailable ? '已自動儲存' : '請匯出備份');
    }
  });
  document.addEventListener('change', event => {
    if (event.target.id === 'city-filter') { filters.city = event.target.value; updatePlaces(); }
    if (event.target.id === 'category-filter') { filters.category = event.target.value; updatePlaces(); }
    if (event.target.dataset.packing !== undefined) {
      toggle('packing', event.target.dataset.packing);
      event.target.closest('label').classList.toggle('checked', event.target.checked);
      const done = state.packing.filter(x => trip.packing[Number(x)]).length;
      document.getElementById('packing-count').textContent = text`${done} / ${trip.packing.length} 已準備`;
      document.getElementById('packing-progress').style.width = done / trip.packing.length * 100 + '%';
    }
    if (event.target.id === 'import-file') importBackup(event.target.files[0]);
  });
  dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
  window.addEventListener('hashchange', applyHash);
  function updateClock() { document.getElementById('japan-clock').textContent = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(new Date()); }
  function updateConnection() { document.getElementById('offline-status').hidden = navigator.onLine; }
  window.addEventListener('offline', updateConnection); window.addEventListener('online', updateConnection);
  updateClock(); setInterval(updateClock, 60000); updateConnection(); applyHash();
  let offlineReady = false;
  function updateCacheStatus() {
    const el = document.getElementById('cache-status');
    if (el) el.textContent = t(offlineReady ? '✓ 已可離線查看行程與地址卡' : '離線儲存尚未完成，請先保持連網。');
  }
  const observer = new MutationObserver(updateCacheStatus);
  observer.observe(main, { childList: true });
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    navigator.serviceWorker.register('./sw.js', { scope: './' }).then(async registration => {
      await navigator.serviceWorker.ready;
      const worker = registration.active || navigator.serviceWorker.controller;
      worker?.postMessage({ type: 'CACHE_STATUS' });
      registration.addEventListener('updatefound', () => {
        const installing = registration.installing;
        installing?.addEventListener('statechange', () => { if (installing.state === 'activated') installing.postMessage({ type: 'CACHE_STATUS' }); });
      });
    }).catch(() => { updateCacheStatus(); });
    navigator.serviceWorker.addEventListener('message', event => { if (event.data?.type === 'CACHE_READY') { offlineReady = true; updateCacheStatus(); } });
  } else updateCacheStatus();
})();
