/* Public trip information only. Personal notes and progress stay on the device. */
const place = (id, name, ja, city, area, category, description, extra = {}) => ({ id, name, ja, city, area, category, description, ...extra });
window.TRIP = {
  title: '秋日日本', start: '2026-11-20', end: '2026-11-28', updated: '2026-10-08',
  places: [
    place('aoyama', '東急 STAY 青山 Premier', '東急ステイ青山プレミア', '東京', '外苑前・南青山', '住宿', '四晚的東京基地。外苑前站 1a 出口步行約 2 分鐘，表參道 A4 出口約 8 分鐘。', { address: '東京都港区南青山2-27-18', phone: '+81334970109', source: 'https://www.tokyustay.co.jp/hotel/AO/', stay: '11/20 → 11/24', nights: 4, checkin: '15:00 起', checkout: '11:00 前', checkSource: 'https://www.tokyustay.co.jp/hotel/guide/', image: 'tokyo', caption: 'TOKYO / AOYAMA', status: '已訂妥' }),
    place('sunnide', 'Sunnide Resort', 'サニーデ・リゾート', '河口湖', '河口湖北岸', '住宿', '把湖畔與富士山留給這一晚。先放行李，再慢慢散步；晚餐與早餐安排依訂房確認信。', { address: '山梨県南都留郡富士河口湖町大石2549-1', phone: '+81555766004', source: 'http://www.sunnide.com/', stay: '11/24 → 11/25', nights: 1, checkin: '預計 16:00', checkout: '以訂房確認信為準', image: 'fuji', caption: 'KAWAGUCHIKO / LAKESIDE', status: '已訂妥', note: '訂房頁提示：晚餐最晚 19:00 開始。入住時再確認用餐時段；早到可先詢問寄放行李。房型、餐點、房內浴池依實際訂單。' }),
    place('hyatt', 'Hyatt Regency Kyoto', 'ハイアット リージェンシー 京都', '京都', '東山・三十三間堂', '住宿', '京都連住三晚。京都車站到飯店建議搭計程車；寺院、東山散步都以這裡為基地。', { address: '京都府京都市東山区三十三間堂廻り644番地2', phone: '+81755411234', source: 'https://www.hyatt.com/hyatt-regency/en-US/kyoto-hyatt-regency-kyoto', stay: '11/25 → 11/28', nights: 3, checkin: '以訂房確認信為準', checkout: '11/28 早上前往機場', image: 'kyoto', caption: 'KYOTO / HIGASHIYAMA', status: '已訂妥' }),
    place('afuri', 'AFURI 南青山', 'AFURI 南青山', '東京', '表參道・南青山', '餐飲', '你們指定的第一晚晚餐。抵達、放好行李，再來吃一碗柚子拉麵。', { address: '東京都港区南青山5-6-4 ハイトリオ南青山 B1F', phone: '+81364273588', hours: '11:00–23:00；湯售完可能提早結束', map: 'https://maps.app.goo.gl/wuiXcKKTEz84diKQ7', source: 'https://www.afuri.com/findus/', note: '完全無現金店舖，準備可用的信用卡或電子支付。', featured: true }),
    place('love-table', 'Afternoon Tea LOVE & TABLE', 'アフタヌーンティー・ラブアンドテーブル 表参道', '東京', '表參道', '咖啡甜點', '你們想去的千層蛋糕店。放在表參道散步日，逛累了坐下吃甜點。', { address: '東京都渋谷区神宮前4-3-2', phone: '+81364471411', hours: '10:00–19:00', map: 'https://maps.app.goo.gl/H1fN3EnsS7Lu9S4q8', source: 'https://www.afternoon-tea.net/shop-list/omotesando-love_and_table/', note: '官方不接受座位預約。建議早些到；季節甜點依當日供應。', featured: true }),
    place('ginkgo', '明治神宮外苑銀杏並木', '明治神宮外苑 いちょう並木', '東京', '外苑前', '景點', '從飯店出發的秋日散步。早點到，拍照與走路都比較舒服。', { note: '葉色隨天氣變化；11/21–23 是週末與日本假日，仍可能有人潮。' }),
    place('human-tokyo', 'HUMAN MADE TOKYO', 'HUMAN MADE TOKYO', '東京', '原宿・神宮前', '購物', '原行程最想逛的品牌之一。與原宿、表參道、宮下公園排同一天。', { address: '東京都渋谷区神宮前6-25-10', hours: '平日 11:00–19:00；週末／假日 11:00–20:00', source: 'https://www.humanmade.jp/dealers.html' }),
    place('matcha-tokyo', 'THE MATCHA TOKYO 原宿', 'THE MATCHA TOKYO 原宿', '東京', '原宿', '咖啡甜點', '原清單的抹茶外帶停靠點。拿一杯再繼續散步。'),
    place('nanamica', 'nanamica TOKYO', 'nanamica TOKYO', '東京', '代官山', '購物', '機能服飾選物。nanamica TOKYO 在鶯谷町，與代官山安排同一段散步。', { address: '東京都渋谷区鶯谷町12-8', hours: '11:00–20:00', phone: '+81357283266', source: 'https://us.nanamica.com/pages/nanamica-tokyo' }),
    place('tiger', 'Onitsuka Tiger 表參道', 'オニツカタイガー 表参道', '東京', '表參道', '購物', '試穿鞋款、看 NIPPON MADE 系列；款式與庫存到店確認。'),
    place('fuglen-tokyo', 'Fuglen Tokyo', 'FUGLEN TOKYO', '東京', '代代木公園・富谷', '咖啡甜點', '復古北歐咖啡館。與代代木公園散步一起安排最順。', { address: '東京都渋谷区富ヶ谷1-16-11', source: 'https://fuglencoffee.jp/en/pages/shop-location' }),
    place('kith', 'KITH TOKYO / KITH TREATS', 'KITH TOKYO MIYASHITA PARK', '東京', '澀谷・宮下公園', '購物', '球鞋、服飾與霜淇淋。與 HUMAN MADE TOKYO、澀谷街區串在一起。'),
    place('hikiniku', '挽肉與米 澀谷', '挽肉と米 渋谷', '東京', '澀谷・道玄坂', '餐飲', '炭火漢堡排與白飯。原清單候選餐廳，尚未確認訂位。', { address: '東京都渋谷区道玄坂2-28-1 3F', hours: '11:00–15:00 / 17:00–21:00；週三休', source: 'https://hikinikutocome.com/en/visit/shibuya/', booking: 'https://hikinikutocome.com/en/visit/shibuya/', note: '僅接受線上預約。官網目前有提前優先票方案（¥1,000／席），不要沿用舊文件的搶票日期；以官網與預約頁當下規則為準。' }),
    place('yoroniku', '蕃 YORONIKU', '蕃 YORONIKU 恵比寿', '東京', '惠比壽', '餐飲', '原清單的和牛晚餐候選。店名「蕃 YORONIKU」是惠比壽店，需先確認訂位。', { phone: '+81334404629', hours: '17:00–24:00', source: 'https://yoroniku-ebisu.com/', booking: 'https://yoroniku-ebisu.com/', note: '與南青山的「よろにく」是不同店。導航與預約請核對分店名稱。' }),
    place('lumine', 'LUMINE EST / Gelato Pique', 'ルミネエスト新宿', '東京', '新宿', '購物', '秋冬服飾與睡衣購物。先逛最想買的品牌，再決定其他百貨。'),
    place('isetan', '伊勢丹 Men’s', '伊勢丹 新宿店 メンズ館', '東京', '新宿', '購物', 'AURALEE、KAPITAL 等品牌的選物候選；實際樓層與櫃位以百貨導覽為準。'),
    place('muji-shinjuku', 'MUJI 新宿', '無印良品 新宿', '東京', '新宿', '購物', '原清單的生活用品補貨點。大型戰利品先帶回飯店。'),
    place('standard', 'Standard Products 新宿', 'Standard Products 新宿', '東京', '新宿', '購物', '原清單的平價生活選物。先看地圖上的當前店址與營業狀態。'),
    place('ginza', 'GINZA SIX / THE ROW', 'GINZA SIX THE ROW', '東京', '銀座', '購物', '銀座的建築、百貨與精品散步；THE ROW 列在原清單。'),
    place('muji-ginza', 'MUJI 銀座', '無印良品 銀座', '東京', '銀座', '購物', '銀座購物日的生活用品停靠點，雨天也適合。'),
    place('azabudai', '麻布台之丘', '麻布台ヒルズ', '東京', '神谷町・麻布台', '景點', '傍晚散步、吃飯與看東京鐵塔。以公共開放區域為主。'),
    place('tower', '東京鐵塔 / 芝公園', '芝公園 東京タワー', '東京', '芝公園', '景點', '黃昏到點燈時段的合照地點。是否上展望台可當天決定。'),
    place('daikanyama', '代官山散步', '代官山 蔦屋書店', '東京', '代官山', '景點', '11/23 的慢步調路線。nanamica 與咖啡放在這一帶一起逛。'),
    place('lake', '河口湖北岸湖畔', '長崎公園 河口湖', '河口湖', '長崎公園', '景點', '住宿附近的湖景與富士山視角。能見度好就把時間留給湖邊。'),
    place('oishi', '大石公園', '大石公園 河口湖', '河口湖', '河口湖北岸', '景點', '湖面與富士山的經典畫面。與 Sunnide 同在北岸。'),
    place('maple', '河口湖紅葉迴廊', '河口湖もみじ回廊', '河口湖', '河口湖北岸', '景點', '2026 紅葉祭 11/7–11/29；日落後點燈至 21:00。', { source: 'https://fujisan.ne.jp/news/6065/', note: '祭典日期已公布；楓葉狀況與山景仍受當年天氣影響。晚餐後有體力再去看點燈。' }),
    place('hoho', 'HOHO HOJICHA 京都車站', 'HOHO HOJICHA 京都駅', '京都', '京都車站', '咖啡甜點', '到京都的第一杯焙茶，以及原清單想買的焙茶伴手禮。', { source: 'https://www.hohohojicha.com/' }),
    place('human-kyoto', 'HUMAN MADE 1928', 'HUMAN MADE 1928', '京都', '三條・御幸町', '購物', '老建築裡的品牌選物，與新風館和市中心散步安排同一段。', { address: '京都府京都市中京区弁慶石町56', hours: '11:00–19:00', source: 'https://www.humanmade.jp/dealers.html' }),
    place('ippodo', '一保堂茶舖 京都本店', '一保堂茶舗 京都本店', '京都', '寺町・二條', '購物', '原清單的抹茶與茶葉伴手禮。下午早一點去，留時間慢慢挑。', { source: 'https://www.ippodo-tea.co.jp/' }),
    place('shinpukan', '新風館', '新風館 京都', '京都', '烏丸御池', '購物', '1LDK Kyoto、BEAMS JAPAN、Pilgrim Surf+Supply 的選物候選集中區。', { source: 'https://shinpuhkan.jp/' }),
    place('tofukuji', '東福寺', '東福寺 通天橋', '京都', '東山南部', '景點', '原清單的紅葉重點。安排在上午；賞楓旺季平日也可能排隊。', { source: 'https://tofukuji.jp/' }),
    place('lorimer', 'Lorimer Kyoto', 'LORIMER KYOTO', '京都', '五條', '餐飲', '原清單的一汁三菜烤魚定食候選。先查當日營業與是否需預約。', { address: '京都府京都市下京区橋詰町143', phone: '+81757416479', source: 'https://www.lorimerkyoto.com/', note: '官網標示週二、週三休息。預約僅限指定套餐，請先看當前菜單與訂位說明。' }),
    place('kiyomizu', '清水寺', '清水寺', '京都', '東山', '景點', '古街與紅葉的一天。2026 秋季夜間特別拜觀為 11/21–11/30，21:00 最後入場、21:30 閉門。', { source: 'https://www.kiyomizudera.or.jp/en/visit/', note: '清水寺與嵐山分開兩天，減少穿和服跨城趕車。是否夜間再入場，依體力決定。' }),
    place('ninenzaka', '二年坂・三年坂', '二寧坂 三年坂 京都', '京都', '東山', '景點', '石板路、町家與小店。坡道多，穿好走的鞋。'),
    place('kimono', '清水寺周邊和服體驗', '清水寺 和服 レンタル', '京都', '東山', '體驗', '想穿和服就把清水寺周邊留成完整半天。梨花和服或岡本是原清單候選。', { note: '尚未選店與預約。確認換裝時間、最晚歸還及是否可隔日歸還，再排後續行程。' }),
    place('gion', '祇園・八坂神社', '八坂神社 祇園', '京都', '祇園', '景點', '從東山古街接到晚餐的一段散步。拍照時尊重私人巷道與禁止攝影標示。'),
    place('arashiyama', '嵐山竹林小徑', '嵐山 竹林の小径', '京都', '嵐山', '景點', '盡量上午先走竹林，再慢慢逛桂川兩岸。'),
    place('togetsukyo', '渡月橋 / % Arabica', '% ARABICA Kyoto Arashiyama 渡月橋', '京都', '嵐山', '咖啡甜點', '原清單的桂川咖啡時光。排隊太長就換附近咖啡店，把時間留給散步。'),
    place('jojakkoji', '常寂光寺', '常寂光寺', '京都', '嵐山', '景點', '嵐山的紅葉停靠點，與竹林在同一段散步路線。'),
    place('torokko', '嵯峨野觀光小火車', 'トロッコ嵯峨駅', '京都', '嵐山・保津川', '體驗', '沿保津川溪谷看秋景。官網預售於搭乘日一個月前，日本時間 00:00 開始。', { source: 'https://www.sagano-kanko.co.jp/en/faq/', booking: 'https://www.sagano-kanko.co.jp/', note: '暫排 11/27，班次與座位尚未訂。來回需分別買票；可搭去亀岡，再由 JR 馬堀站返回。現行車輛預計 2026 年結束營運後退役。', secondSource: 'https://www.sagano-kanko.co.jp/news/3756/' }),
    place('hirokawa', '嵐山 廣川鰻魚飯', 'うなぎ屋 廣川', '京都', '嵐山', '餐飲', '原清單的嵐山餐廳，採完全預約制。先訂到時段，再調整小火車。', { source: 'https://www.unagi-hirokawa.jp/orders/cn', booking: 'https://www.unagi-hirokawa.jp/orders/cn', phone: '+81758715226', note: '11/27 用餐：10/27 日本時間 10:00 開放。訂位需 ¥3,000／人的保證金，用餐時抵用；取消規則先讀清楚。' }),
    place('fuglen-kyoto', 'Fuglen Kyoto', 'FUGLEN KYOTO', '京都', '北區・紫竹', '咖啡甜點', '原清單咖啡館，實際在京都北區，並非新風館旁。需要另留交通時間。', { address: '京都府京都市北区紫竹東栗栖町38-3 A HOUSE 1階', hours: '07:00–18:00；L.O. 17:30', source: 'https://fuglencoffee.jp/en/pages/fuglen-kyoto', note: '列為備選，不放進市中心步行路線。' }),
    place('umeda', 'LUCUA / 大丸梅田', 'ルクア大阪 大丸梅田店', '大阪', '梅田', '購物', '原文件的大阪購物備選。從京都一日來回，住宿仍是京都。'),
    place('pique-cafe', 'Gelato Pique Cafe 梅田', 'gelato pique cafe 梅田', '大阪', '梅田', '咖啡甜點', '原清單的可麗餅候選，決定去大阪時再確認店址與營業狀態。'),
    place('dotonbori', '心齋橋・道頓堀', '道頓堀 心斎橋', '大阪', '難波', '景點', '串炸達摩、大起水產是原清單晚餐候選。當晚回京都，先查末班車。'),
    place('osaka-castle', '大阪城公園', '大阪城公園', '大阪', '大阪城', '景點', '原清單銀杏景點，若做大阪一日遊可和梅田二選一，避免一路趕景點。')
  ],
  flights: [
    { id: 'outbound', date: '2026-11-20', number: 'GK14', from: 'TPE', fromName: '台北・桃園', fromTerminal: '第一航廈 T1', departure: '12:50', to: 'NRT', toName: '東京・成田', toTerminal: '第三航廈 T3', arrival: '16:55', duration: '3 小時 05 分', startUTC: '20261120T045000Z', endUTC: '20261120T075500Z' },
    { id: 'return', date: '2026-11-28', number: 'GK55', from: 'KIX', fromName: '大阪・關西', fromTerminal: '第一航廈 T1', departure: '14:55', to: 'TPE', toName: '台北・桃園', toTerminal: '第一航廈 T1', arrival: '17:15', duration: '3 小時 20 分', startUTC: '20261128T055500Z', endUTC: '20261128T091500Z' }
  ],
  days: [
    { date: '2026-11-20', city: '東京', label: '抵達日', title: '落地東京，先吃一碗拉麵', subtitle: '今天只做三件事：抵達、入住、AFURI。', hotel: 'aoyama', color: 'tokyo', route: '成田 T3 → 東京車站 → 青山 → AFURI', tip: '16:55 抵達是日本時間。入境、領行李與進城需要時間；入住與晚餐時間先留彈性。', items: [
      { time: '12:50', title: 'GK14 桃園起飛', detail: '桃園第一航廈；時間為台灣當地時間。', type: 'flight', fixed: true },
      { time: '16:55', title: '抵達成田第三航廈', detail: '入境、領行李，再跟著指標走到空港第 2 ビル駅搭車。', type: 'flight', fixed: true },
      { time: '入境後', title: 'N’EX 進城，再搭計程車', detail: '建議 N’EX 到東京車站，轉計程車到飯店。不要先買銜接太緊的列車。', type: 'transit', transport: 'airport' },
      { time: '約 19:30', place: 'aoyama', detail: '預估入住時間，依入境與車次調整。先放行李、稍微整理。' },
      { time: '約 20:30', place: 'afuri', detail: '從飯店步行前往；若班機或入境延誤，先確認店家是否仍供餐。' }
    ] },
    { date: '2026-11-21', city: '東京', label: '原宿與表參道', title: '金黃銀杏，逛到甜點時間', subtitle: '把最想逛的街區放在同一條路線。', hotel: 'aoyama', color: 'tokyo', route: '外苑前 → 表參道 → 原宿 → 宮下公園', tip: 'LOVE & TABLE 不接受座位預約，先到先等。購物不必每間都逛完，從收藏清單挑最想去的。', items: [
      { time: '08:30', place: 'ginkgo', detail: '飯店附近先散步拍照；週末仍可能有人潮。' },
      { time: '10:00', place: 'love-table', detail: '你們指定的甜點店。早一點吃千層蛋糕，再開始逛街。' },
      { time: '11:30', place: 'tiger', detail: '表參道鞋款與服飾散步；午餐在附近彈性選。' },
      { time: '13:00', place: 'human-tokyo', detail: '順路走原宿、THE MATCHA TOKYO；買到喜歡的就慢慢逛。', nearby: ['matcha-tokyo'] },
      { time: '15:30', place: 'kith', detail: '宮下公園逛 KITH、吃 KITH TREATS，接著走走澀谷。' },
      { time: '晚餐候選', place: 'yoroniku', detail: '尚未確認訂位；若安排蕃 YORONIKU，需移動到惠比壽。', pending: true }
    ] },
    { date: '2026-11-22', city: '東京', label: '購物日', title: '新宿補貨，銀座慢慢逛', subtitle: '服飾、生活用品與精品的城市一日。', hotel: 'aoyama', color: 'tokyo', route: '青山 → 新宿 → 銀座 → 青山', tip: '新宿與銀座分兩段。若戰利品多，下午先回飯店放東西，再決定要不要續逛銀座。', items: [
      { time: '上午', place: 'lumine', detail: 'LUMINE EST、Gelato Pique：先找最想買的。' },
      { time: '中午', place: 'isetan', detail: '男裝選物與百貨午餐，無須趕固定餐廳。', nearby: ['muji-shinjuku', 'standard'] },
      { time: '下午', place: 'ginza', detail: 'GINZA SIX、THE ROW 與銀座街區散步。', nearby: ['muji-ginza'] },
      { time: '晚間', title: '回青山休息', detail: '整理戰利品、洗衣服。晚餐依當天體力在青山或銀座選。', type: 'rest' }
    ] },
    { date: '2026-11-23', city: '東京', label: '東京慢遊', title: '咖啡、代官山與鐵塔點燈', subtitle: '不趕路，留一點空白給喜歡的街角。', hotel: 'aoyama', color: 'tokyo', route: '代代木公園 → 代官山 → 麻布台 → 芝公園', tip: '日本勤勞感謝日，熱門地點可能擁擠。晚上整理河口湖一晚的小行李；大件行李可詢問飯店寄送京都的費用與到達日。', items: [
      { time: '09:00', place: 'fuglen-tokyo', detail: '喝杯咖啡，順便在代代木公園周邊散步。' },
      { time: '11:30', place: 'daikanyama', detail: '選物、書店與午餐。nanamica 放在這一區比較順。', nearby: ['nanamica'] },
      { time: '15:30', place: 'azabudai', detail: '趁天亮走走，找一個看鐵塔的視角。' },
      { time: '傍晚', place: 'tower', detail: '留到點燈時段。要不要上塔當天決定，晚餐就近安排。' },
      { time: '替換午餐', place: 'hikiniku', detail: '若訂到挽肉與米，可替換代官山時段；先按訂位時間重排。', pending: true, optional: true }
    ] },
    { date: '2026-11-24', city: '河口湖', label: '富士山與溫泉', title: '往湖畔去，把下午留給富士山', subtitle: '東京退房，今晚住 Sunnide。', hotel: 'sunnide', color: 'fuji', route: '青山 → 新宿 → 河口湖 → Sunnide', tip: '富士回遊 15 號目前時刻為 10:30–12:24，尚未訂票。10/24 日本時間 10:00 開賣；上車前確認搭的是前往河口湖的車廂。', items: [
      { time: '09:00', title: '青山退房，計程車到新宿', detail: '留交通與找月台的餘裕，建議至少提前 30 分鐘到站。', type: 'transit' },
      { time: '10:30 → 12:24', title: '富士回遊 15 號', detail: '新宿直達河口湖，建議班次，尚未訂妥。', type: 'transit', pending: true, transport: 'fuji', bookingId: 'fuji-ticket' },
      { time: '12:30', title: '河口湖午餐，計程車到飯店', detail: '車程先抓約 15–20 分鐘，實際依路況。早到詢問寄放行李。', type: 'transit' },
      { time: '下午', place: 'oishi', detail: '與附近湖畔二選一，不硬排跨湖景點。', nearby: ['lake'] },
      { time: '16:00', place: 'sunnide', detail: '預計入住、泡湯。向櫃台確認晚餐時段與隔天交通。' },
      { time: '晚餐', title: '飯店晚餐', detail: '依實際訂單餐食；訂房頁提示最晚 19:00 開始。', type: 'meal' },
      { time: '晚餐後・可選', place: 'maple', detail: '有體力再看點燈；也可以直接留在飯店休息。', optional: true }
    ] },
    { date: '2026-11-25', city: '京都', label: '移動與茶', title: '富士晨光，接上京都的午後', subtitle: '今晚起，京都 Hyatt 連住三晚。', hotel: 'hyatt', color: 'kyoto', route: 'Sunnide → 河口湖站 → 三島 → 京都 → Hyatt', tip: '建議 10:20 河口湖巴士 → 11:50 三島北口，轉新幹線至少留 60 分鐘。巴士、新幹線都尚未訂妥；延誤就縮短下午逛街。', items: [
      { time: '清晨', place: 'lake', detail: '先看天氣與能見度；早餐後收行李。不要為拍照錯過移動。' },
      { time: '09:30', title: '退房前往河口湖站', detail: '請櫃台幫忙叫車；預留車程與候車時間。', type: 'transit' },
      { time: '10:20 → 11:50', title: '三島・河口湖 Liner', detail: '建議巴士，河口湖站出發、三島站北口下車；先預約。', type: 'transit', pending: true, transport: 'kyoto', bookingId: 'mishima-bus' },
      { time: '約 13:00 後', title: '三島 → 京都 新幹線', detail: '尚未選定車次。部分 Hikari 可直達；其他班次需轉車，以訂票時的路線為準。', type: 'transit', pending: true, bookingId: 'shinkansen' },
      { time: '抵達京都', place: 'hoho', detail: '如果不想多走，可先搭計程車到飯店，把焙茶留到其他空檔。' },
      { time: '下午', place: 'hyatt', detail: '入住或寄放行李，讓腳休息一下。' },
      { time: '有餘裕再逛', place: 'ippodo', detail: '一保堂 → HUMAN MADE 1928 → 新風館；太晚抵達就縮成一間，或改飯店附近晚餐。', nearby: ['human-kyoto', 'shinpukan'], optional: true }
    ] },
    { date: '2026-11-26', city: '京都', label: '東山與古街', title: '紅葉、和服與清水寺的暮色', subtitle: '清水寺與嵐山分開，這一天好好走東山。', hotel: 'hyatt', color: 'kyoto', route: '東福寺 → 五條 → 清水寺 → 二三年坂 → 祇園', tip: '想穿和服就把下午留在東山，先確認租借店的歸還時間。夜間拜觀可換回便服後再去；不需要穿和服跨城趕車。', items: [
      { time: '上午', place: 'tofukuji', detail: '紅葉重點。避開拖行李與過度跨區的安排。' },
      { time: '午餐候選', place: 'lorimer', detail: '營業與訂位需確認；若不順路就在東山附近吃午餐。', pending: true },
      { time: '13:00・可選', place: 'kimono', detail: '尚未選店與預約。不租和服就直接開始古街散步。', pending: true, optional: true, bookingId: 'kimono-booking' },
      { time: '下午', place: 'kiyomizu', detail: '清水舞台與周邊古街，保留拍照與休息的時間。', nearby: ['ninenzaka'] },
      { time: '傍晚', place: 'gion', detail: '歸還和服後，祇園附近吃飯。' },
      { time: '晚間・可選', place: 'kiyomizu', detail: '2026 秋季特別夜間拜觀；想看點燈再回訪，不要把白天與夜間都當必去。', optional: true }
    ] },
    { date: '2026-11-27', city: '京都', label: '嵐山一日', title: '竹林、桂川與一列秋日小火車', subtitle: '最後一個完整白天，留給嵐山。', hotel: 'hyatt', color: 'kyoto', route: '京都車站 → JR 嵯峨嵐山 → 竹林 → 桂川 → 小火車', tip: '小火車與廣川時段都未訂妥，先取得票與訂位再微調路線。若想改大阪，可以切換備選；晚上仍回京都住。', alternate: true, items: [
      { time: '08:00', title: '前往嵐山', detail: '飯店搭計程車到京都車站，轉 JR 嵯峨野線至嵯峨嵐山；班次當天查。', type: 'transit' },
      { time: '09:00', place: 'arashiyama', detail: '先走竹林，還有體力再去常寂光寺。', nearby: ['jojakkoji'] },
      { time: '午餐候選', place: 'hirokawa', detail: '完全預約制，午餐或晚餐以實際訂到的時段為準。', pending: true, bookingId: 'hirokawa-booking' },
      { time: '下午', place: 'togetsukyo', detail: '桂川畔散步、喝咖啡。排隊太久就換一家。' },
      { time: '下午班次・待訂', place: 'torokko', detail: '先選有票的班次，再安排回程。去亀岡後可步行到 JR 馬堀站回京都。', pending: true, bookingId: 'torokko-ticket' },
      { time: '晚間', title: '回京都，整理行李', detail: '回 Hyatt 休息。護照、回程機票與隔天 HARUKA 資訊放在容易拿的位置。', type: 'rest' }
    ], alternateItems: [
      { time: '上午', title: '京都 → 大阪，一日來回', detail: '搭 JR 新快速到大阪站；保留回京都的時間。今晚住宿仍是 Hyatt Regency Kyoto。', type: 'transit' },
      { time: '上午至下午', place: 'umeda', detail: '梅田購物、補貨與午餐；大阪城公園可替換部分購物時間。', nearby: ['pique-cafe', 'osaka-castle'] },
      { time: '傍晚・可選', place: 'dotonbori', detail: '串炸或壽司候選，先查當日店家與回京都列車。', optional: true },
      { time: '晚間', title: '返回京都 Hyatt', detail: '不帶大行李、不換飯店。隔天從京都出發前往關西機場。', type: 'rest' }
    ] },
    { date: '2026-11-28', city: '回程', label: '回台灣', title: '從京都出發，帶秋天回家', subtitle: '今天的重點，是從容到達關西機場。', hotel: null, color: 'kyoto', route: 'Hyatt → 京都車站 → HARUKA → 關西 T1 → 桃園 T1', tip: 'GK55 是 14:55 從關西第一航廈起飛。建議約 11:30–12:00 到機場，不再排大阪市區觀光；列車尚未訂票。', items: [
      { time: '08:30–09:00', title: 'Hyatt 退房、搭計程車到京都站', detail: '早一點移動，遇到道路或鐵路延誤也比較有餘裕。', type: 'transit' },
      { time: '約 09:30–10:00', title: 'HARUKA → 關西機場', detail: '建議出發範圍，尚未指定班次；預留約 80–90 分鐘車程及站內步行時間。', type: 'transit', pending: true, transport: 'return', bookingId: 'haruka-ticket' },
      { time: '11:30–12:00', title: '到關西第一航廈', detail: '報到、托運、安檢、午餐。報到截止時間以 Jetstar 當日公告與機票為準。', type: 'flight' },
      { time: '14:55', title: 'GK55 關西起飛', detail: '關西第一航廈；時間為日本當地時間。', type: 'flight', fixed: true },
      { time: '17:15', title: '抵達桃園第一航廈', detail: '時間為台灣當地時間。九天八夜，旅程完成。', type: 'flight', fixed: true }
    ] }
  ],
  transport: [
    { id: 'airport', date: '11/20', title: '成田 → 青山', subtitle: '入境後再決定車次', icon: 'plane', summary: 'N’EX 到東京車站，再搭計程車到飯店。', steps: ['成田 T3 入境、領行李', '走往空港第 2 ビル駅（官方約 10 分鐘，另留找路餘裕）', 'N’EX → 東京車站', '計程車 → 東急 STAY 青山 Premier'], note: 'N’EX 至東京站約 1 小時上下，實際依班次。整段交通於入境後先抓 1.5–2 小時；東京車站到飯店的計程車依路況。也可搭到澀谷後轉銀座線至外苑前，行李多時優先考慮計程車。', link: 'https://www.jreast.co.jp/zh-CHT/multi/nex/', source: 'https://www.narita-airport.jp/ja/access/train/', destination: 'aoyama', origin: '成田空港 第3ターミナル' },
    { id: 'fuji', date: '11/24', title: '青山 → 河口湖', subtitle: '富士回遊 15 號・待訂', icon: 'train', summary: '10:30 新宿出發，12:24 到河口湖。', steps: ['飯店搭計程車 → 新宿站', '預留至少 30 分鐘找月台與車廂', '富士回遊 15 號 10:30 → 12:24', '河口湖站午餐後，計程車 → Sunnide'], note: '目前官方時刻與票價：¥4,200／成人單程（乘車券＋指定席特急券）。兩人合計 ¥8,400。10/24 日本時間 10:00 開賣。列車與「かいじ」併結，上車時核對往河口湖的車廂。未訂票；票價與班次以購票時為準。', link: 'https://www.eki-net.com/en/jreast-train-reservation/Top/Index', source: 'https://www.fujikyu-railway.jp/fujikaiyuu/', destination: 'sunnide', origin: '東急ステイ青山プレミア', bookingId: 'fuji-ticket' },
    { id: 'kyoto', date: '11/25', title: '河口湖 → 京都', subtitle: '巴士＋新幹線・待訂', icon: 'bus', summary: '經三島往西走，避開回東京的繞路。', steps: ['Sunnide 計程車 → 河口湖站', '建議巴士 10:20 → 三島站北口 11:50', '至少留 60 分鐘轉乘緩衝', '三島 → 京都新幹線 → 計程車到 Hyatt'], note: '巴士可能因路況延誤，不要接太緊的新幹線。部分 Hikari 直達京都，其他班次需轉車，購票時確認。普通車 D／E 席是富士山側，可選 E 靠窗；能否看見仍依天氣。大行李依尺寸核對新幹線特大行李規定。', link: 'https://smart-ex.jp/en/', source: 'https://www.fujikyucitybus.com/highwaybus/kawaguchiko.html', destination: 'hyatt', origin: '河口湖駅', bookingId: 'mishima-bus' },
    { id: 'return', date: '11/28', title: '京都 → 關西機場', subtitle: 'GK55 14:55 起飛', icon: 'plane', summary: '飯店 → 京都站 → HARUKA → 關西 T1。', steps: ['08:30–09:00 飯店退房', '計程車 → 京都站，留找月台時間', '建議約 09:30–10:00 搭 HARUKA', '約 11:30–12:00 抵達關西第一航廈'], note: 'HARUKA 車程先抓 80–90 分鐘，實際班次與月台以 JR 公告為準；尚未訂票。不要把機場日再排成大阪購物日。航班、報到與登機截止時間以 Jetstar 確認信及當日公告為準。', link: 'https://www.westjr.co.jp/global/tc/ticket/pass/one_way/haruka/', source: 'https://timetable.jr-odekake.net/', destinationQuery: '関西国際空港 第1ターミナル', origin: '京都駅', bookingId: 'haruka-ticket' }
  ],
  bookings: [
    { id: 'fuji-ticket', name: '富士回遊 15 號', when: '11/24 10:30 → 12:24', release: '2026-10-24T01:00:00Z', description: '兩位成人，新宿 → 河口湖。建議購買指定席；尚未訂妥。', url: 'https://www.eki-net.com/en/jreast-train-reservation/Top/Index', source: 'https://www.fujikyu-railway.jp/fujikaiyuu/' },
    { id: 'mishima-bus', name: '河口湖 → 三島巴士', when: '11/25 建議 10:20 → 11:50', description: '全程約 90 分鐘，先預約；新幹線銜接至少留 60 分鐘。', url: 'https://www.fujikyucitybus.com/highwaybus/kawaguchiko.html' },
    { id: 'shinkansen', name: '三島 → 京都 新幹線', when: '11/25 13:00 後的班次', description: '尚未選車次。以巴士銜接、實際停站與大行李需求選班次。', url: 'https://smart-ex.jp/en/' },
    { id: 'torokko-ticket', name: '嵯峨野小火車', when: '11/27 下午・班次待選', release: '2026-10-26T15:00:00Z', description: '10/27 日本時間 00:00 開賣。先確認廣川用餐時段，再選小火車。', url: 'https://www.sagano-kanko.co.jp/', source: 'https://www.sagano-kanko.co.jp/en/faq/' },
    { id: 'hirokawa-booking', name: '嵐山 廣川', when: '11/27 午餐／晚餐・待選', release: '2026-10-27T01:00:00Z', description: '10/27 日本時間 10:00 開放。需 ¥3,000／人的保證金，用餐抵用；先讀取消規則。', url: 'https://www.unagi-hirokawa.jp/orders/cn' },
    { id: 'kimono-booking', name: '清水寺周邊和服', when: '11/26 下午・可選', description: '先選店，再確認換裝、歸還與取消規則；尚未預約。', url: 'https://www.google.com/maps/search/?api=1&query=清水寺+和服+レンタル' },
    { id: 'yoroniku-booking', name: '蕃 YORONIKU 惠比壽', when: '東京晚餐候選', description: '原清單候選。不要沿用舊文件的開放日期；以店家官方預約頁的空位為準。', url: 'https://yoroniku-ebisu.com/' },
    { id: 'hikiniku-booking', name: '挽肉與米 澀谷', when: '東京午餐候選', description: '官網線上預約規則已變動，有付費提前優先票方案；直接查看當前空位。', url: 'https://hikinikutocome.com/en/visit/shibuya/' },
    { id: 'haruka-ticket', name: 'HARUKA 關西機場', when: '11/28 約 09:30–10:00 出發', description: '選能約 11:30–12:00 到機場的班次；尚未訂妥。', url: 'https://www.westjr.co.jp/global/tc/ticket/pass/one_way/haruka/' }
  ],
  packing: ['護照與去回程機票', '確認去回程托運與手提行李額度', '三間飯店確認信另存手機', '列車／巴士票券另存手機', '完成 Visit Japan Web 入境資料', '可用的信用卡、少量日圓', 'Suica／交通卡與手機網路', '保暖外套、分層衣物、好走的鞋', '折傘、行動電源與充電線', '個人常備用品與旅遊保險資料', '整理河口湖一晚的小行李', '確認 11/28 HARUKA 與航班狀態'],
  resources: [
    { name: 'Visit Japan Web', detail: '官方入境申報服務', url: 'https://www.vjw.digital.go.jp/' },
    { name: 'Jetstar 航班資訊', detail: '查航班與報到資訊', url: 'https://www.jetstar.com/tw/zh/home' },
    { name: '日本氣象廳', detail: '出門前查天氣', url: 'https://www.jma.go.jp/bosai/forecast/' },
    { name: '富士回遊官方時刻', detail: '列車時刻、票價與售票規則', url: 'https://www.fujikyu-railway.jp/fujikaiyuu/' },
    { name: '河口湖紅葉祭 2026', detail: '11/7–11/29；點燈至 21:00', url: 'https://fujisan.ne.jp/news/6065/' },
    { name: '清水寺 2026 活動', detail: '夜間拜觀與最新公告', url: 'https://www.kiyomizudera.or.jp/en/visit/' },
    { name: '嵯峨野小火車 FAQ', detail: '購票與乘車說明', url: 'https://www.sagano-kanko.co.jp/en/faq/' },
    { name: '三島・河口湖 Liner', detail: '巴士時刻與預約連結', url: 'https://www.fujikyucitybus.com/highwaybus/kawaguchiko.html' },
    { name: 'Smart EX', detail: '東海道新幹線預約', url: 'https://smart-ex.jp/en/' },
    { name: 'HARUKA 官方購票', detail: '京都與關西機場交通', url: 'https://www.westjr.co.jp/global/tc/ticket/pass/one_way/haruka/' }
  ]
};
