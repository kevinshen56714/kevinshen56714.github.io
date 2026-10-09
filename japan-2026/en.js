/* English copy; IDs, reservations, map destinations and Japanese address cards stay shared. */
(() => {
  const base = window.TRIP;
  const places = {
    aoyama: { name: 'Tokyu Stay Aoyama Premier', area: 'Gaienmae · Minami-Aoyama', description: 'Our Tokyo base for four nights. About a 2-minute walk from Gaienmae Station exit 1a, or 8 minutes from Omotesando Station exit A4.', checkin: 'From 15:00', checkout: 'By 11:00', status: 'Booked' },
    sunnide: { area: 'North shore of Lake Kawaguchi', description: 'A night by the lake with Mount Fuji in view. Drop off our bags, then take a slow walk. Dinner and breakfast arrangements depend on the booking confirmation.', checkin: 'Planned arrival: 16:00', checkout: 'Check the booking confirmation', status: 'Booked', note: 'The booking page says dinner must start by 19:00. Confirm the meal time at check-in. Ask about luggage storage if arriving early. Room type, meals and in-room bathing facilities depend on the actual reservation.' },
    hyatt: { area: 'Higashiyama · Sanjusangendo', description: 'Three nights in Kyoto. A taxi from Kyoto Station is the easiest option with luggage. Our base for temples and walks around Higashiyama.', checkin: 'Check the booking confirmation', checkout: 'Leave for the airport on the morning of Nov 28', status: 'Booked' },
    afuri: { name: 'AFURI Minami-Aoyama', area: 'Omotesando · Minami-Aoyama', description: 'Our chosen dinner for the first night. Check in, leave our bags, then head out for a bowl of yuzu ramen.', hours: '11:00–23:00; may close early if the soup sells out', note: 'This branch is cashless. Bring a working credit card or another accepted electronic payment method.' },
    'love-table': { area: 'Omotesando', description: 'The mille-crepe cake café on our wish list. A sweet break during our Omotesando shopping day.', note: 'The official site says seating cannot be reserved. Arrive early; seasonal desserts depend on availability.' },
    ginkgo: { name: 'Meiji Jingu Gaien Ginkgo Avenue', area: 'Gaienmae', description: 'An autumn walk near our hotel. Go early for a calmer stroll and photos.', note: 'Leaf colors depend on the weather. Nov 21–23 includes a weekend and a Japanese public holiday, so crowds are possible.' },
    'human-tokyo': { area: 'Harajuku · Jingumae', description: 'One of our shopping priorities. Pair it with Harajuku, Omotesando and Miyashita Park.', hours: 'Weekdays 11:00–19:00; weekends and holidays 11:00–20:00' },
    'matcha-tokyo': { name: 'THE MATCHA TOKYO Harajuku', area: 'Harajuku', description: 'A takeaway matcha stop from our wish list. Pick up a drink and keep exploring.' },
    nanamica: { area: 'Daikanyama', description: 'Functional clothing and thoughtful design. The TOKYO store is in Uguisudanicho, convenient to combine with a Daikanyama walk.' },
    tiger: { name: 'Onitsuka Tiger Omotesando', area: 'Omotesando', description: 'Try on shoes and browse the NIPPON MADE range. Check current styles and stock in store.' },
    'fuglen-tokyo': { area: 'Yoyogi Park · Tomigaya', description: 'A vintage Scandinavian café. Combine a coffee stop with a walk around Yoyogi Park.' },
    kith: { area: 'Shibuya · Miyashita Park', description: 'Sneakers, clothing and ice cream. A natural stop after HUMAN MADE TOKYO and a walk through Shibuya.' },
    hikiniku: { name: 'Hikiniku to Come Shibuya', area: 'Shibuya · Dogenzaka', description: 'Charcoal-grilled hamburger steaks and freshly cooked rice. A meal option; no reservation confirmed yet.', hours: '11:00–15:00 / 17:00–21:00; closed Wednesdays', note: 'Online reservations only. The current official site offers paid advance priority tickets (¥1,000 per seat). Check its current rules and availability instead of using the old itinerary’s ticket dates.' },
    yoroniku: { name: 'YORONIKU Ebisu', area: 'Ebisu', description: 'A wagyu dinner option. The restaurant called “蕃 YORONIKU” is the Ebisu branch; a reservation still needs to be confirmed.', note: 'This is a different branch from Yoroniku in Minami-Aoyama. Check the branch name when booking and navigating.' },
    lumine: { area: 'Shinjuku', description: 'Autumn clothing and sleepwear shopping. Start with our favorite brands, then decide how many other stores to visit.' },
    isetan: { name: 'Isetan Men’s', area: 'Shinjuku', description: 'A shopping option for brands such as AURALEE and KAPITAL. Check the department store directory for current counters and floors.' },
    'muji-shinjuku': { name: 'MUJI Shinjuku', area: 'Shinjuku', description: 'A stop for everyday goods. Drop off bulky purchases at the hotel before continuing.' },
    standard: { name: 'Standard Products Shinjuku', area: 'Shinjuku', description: 'Affordable home goods from our wish list. Check the current branch location and opening status on Maps.' },
    ginza: { area: 'Ginza', description: 'Architecture, department stores and luxury shopping in Ginza. THE ROW is on our wish list.' },
    'muji-ginza': { name: 'MUJI Ginza', area: 'Ginza', description: 'Everyday goods during our Ginza shopping day. Also a good rainy-day stop.' },
    azabudai: { name: 'Azabudai Hills', area: 'Kamiyacho · Azabudai', description: 'An evening walk, dinner options and views of Tokyo Tower. Focus on the publicly accessible areas.' },
    tower: { name: 'Tokyo Tower / Shiba Park', area: 'Shiba Park', description: 'Photos around sunset and after the lights come on. Decide on the day whether to visit the observation deck.' },
    daikanyama: { name: 'A Walk in Daikanyama', area: 'Daikanyama', description: 'Our relaxed route for Nov 23. Browse shops and bookstores, with nanamica and coffee nearby.' },
    lake: { name: 'Lake Kawaguchi North Shore', area: 'Nagasaki Park', description: 'Lake and Mount Fuji views near our accommodation. If visibility is good, spend extra time by the water.' },
    oishi: { name: 'Oishi Park', area: 'North shore of Lake Kawaguchi', description: 'A classic lake-and-Fuji view. Like Sunnide, the park is on the north shore.' },
    maple: { name: 'Kawaguchiko Maple Corridor', area: 'North shore of Lake Kawaguchi', description: 'The 2026 autumn foliage festival runs Nov 7–29. Illuminations continue from sunset until 21:00.', note: 'Festival dates have been announced, but foliage and mountain visibility depend on the weather. Visit after dinner if we still have energy.' },
    hoho: { name: 'HOHO HOJICHA Kyoto Station', area: 'Kyoto Station', description: 'Our first roasted-tea drink in Kyoto, plus hojicha souvenirs from the wish list.' },
    'human-kyoto': { area: 'Sanjo · Gokomachi', description: 'Brand shopping in a historic building. Pair it with Shinpuhkan and a downtown walk.' },
    ippodo: { name: 'Ippodo Tea Kyoto Main Store', area: 'Teramachi · Nijo', description: 'Matcha and tea souvenirs. Go early enough in the afternoon to browse without rushing.' },
    shinpukan: { name: 'Shinpuhkan', area: 'Karasuma Oike', description: 'A shopping cluster with 1LDK Kyoto, BEAMS JAPAN and Pilgrim Surf+Supply.' },
    tofukuji: { name: 'Tofukuji Temple', area: 'Southern Higashiyama', description: 'An autumn foliage highlight. Visit in the morning; peak-season queues are possible even on weekdays.' },
    lorimer: { area: 'Gojo', description: 'A grilled-fish set meal option. Check opening hours and reservation requirements before going.', note: 'The official site lists Tuesday and Wednesday closures. Reservations are only available for specified meals; check the current menu and booking information.' },
    kiyomizu: { name: 'Kiyomizu-dera Temple', area: 'Higashiyama', description: 'Historic streets and autumn leaves. The 2026 autumn evening opening runs Nov 21–30: last admission 21:00, closing 21:30.', note: 'Kiyomizu-dera and Arashiyama are on separate days to reduce cross-city travel in kimono. Decide whether to return in the evening based on our energy.' },
    ninenzaka: { name: 'Ninenzaka & Sannenzaka', area: 'Higashiyama', description: 'Stone streets, traditional houses and small shops. There are many slopes, so wear comfortable shoes.' },
    kimono: { name: 'Kimono Experience near Kiyomizu-dera', area: 'Higashiyama', description: 'If we want to wear kimono, keep the afternoon around Kiyomizu-dera. Rika Wafuku and Okamoto are options from the wish list.', note: 'No shop or reservation chosen yet. Confirm dressing time, the return deadline and any next-day return option before planning the evening.' },
    gion: { name: 'Gion & Yasaka Shrine', area: 'Gion', description: 'A walk from the historic Higashiyama streets toward dinner. Respect private lanes and no-photography signs.' },
    arashiyama: { name: 'Arashiyama Bamboo Grove', area: 'Arashiyama', description: 'Visit the bamboo grove in the morning, then explore both sides of the Katsura River at a slower pace.' },
    togetsukyo: { name: 'Togetsukyo Bridge / % Arabica', area: 'Arashiyama', description: 'Coffee by the Katsura River. If the queue is too long, try another nearby café and save time for walking.' },
    jojakkoji: { name: 'Jojakkoji Temple', area: 'Arashiyama', description: 'An autumn foliage stop close enough to combine with the bamboo grove walk.' },
    torokko: { name: 'Sagano Romantic Train', area: 'Arashiyama · Hozugawa', description: 'Autumn scenery along the Hozugawa gorge. Advance sales open one month before the ride, at 00:00 Japan time.', note: 'Tentatively planned for Nov 27; departure and seats are not booked. Round-trip tickets are sold separately. One option is to ride to Kameoka and return via JR Umahori Station. The current train fleet is expected to retire after the 2026 season.' },
    hirokawa: { name: 'Unagi Hirokawa', area: 'Arashiyama', description: 'An eel restaurant from our wish list, by reservation only. Confirm the meal time before finalizing the train plan.', note: 'For a Nov 27 meal, booking opens Oct 27 at 10:00 Japan time. A ¥3,000 deposit per person is credited toward the meal. Read the cancellation rules before booking.' },
    'fuglen-kyoto': { area: 'Kita Ward · Shichiku', description: 'This café is in northern Kyoto, rather than beside Shinpuhkan. Allow extra travel time.', hours: '07:00–18:00; last orders 17:30', note: 'An alternative stop, outside the downtown walking route.' },
    umeda: { name: 'LUCUA / Daimaru Umeda', area: 'Umeda', description: 'An optional Osaka shopping day. Travel from Kyoto and return to the same Kyoto hotel that evening.' },
    'pique-cafe': { name: 'Gelato Pique Cafe Umeda', area: 'Umeda', description: 'A crepe stop from our wish list. Confirm the branch and opening status if we choose the Osaka day.' },
    dotonbori: { name: 'Shinsaibashi & Dotonbori', area: 'Namba', description: 'Kushikatsu Daruma and Daiki Suisan are dinner options. Check trains back to Kyoto before staying late.' },
    'osaka-castle': { name: 'Osaka Castle Park', area: 'Osaka Castle', description: 'A ginkgo-viewing option. Choose this or extra Umeda shopping time instead of rushing through every stop.' }
  };
  const days = [
    { label: 'Arrival', title: 'Hello Tokyo, then a bowl of ramen', subtitle: 'Only three things today: arrive, check in and eat at AFURI.', route: 'Narita T3 → Tokyo Station → Aoyama → AFURI', tip: 'The 16:55 arrival is Japan time. Immigration, bags and the trip into town take time; keep check-in and dinner flexible.', items: [
      { title: 'GK14 departs Taoyuan', detail: 'Taoyuan Terminal 1. Departure time is Taiwan local time.' },
      { title: 'Arrive at Narita Terminal 3', detail: 'Clear immigration, collect bags and follow signs to Airport Terminal 2 Station.' },
      { time: 'After immigration', title: 'N’EX into town, then a taxi', detail: 'Suggested: N’EX to Tokyo Station, then a taxi to the hotel. Avoid booking a tight connection before landing.' },
      { time: 'Around 19:30', detail: 'Estimated check-in, depending on immigration and the train. Drop off our bags and freshen up.' },
      { time: 'Around 20:30', detail: 'Walk from the hotel. If the flight or immigration is delayed, check that the restaurant is still serving.' }
    ] },
    { label: 'Harajuku & Omotesando', title: 'Golden leaves, shopping and cake', subtitle: 'Our favorite neighborhoods along one walking route.', route: 'Gaienmae → Omotesando → Harajuku → Miyashita Park', tip: 'LOVE & TABLE does not take seat reservations. We do not need to visit every shop; start with our favorites.', items: [
      { detail: 'A walk and photos near the hotel. It is a weekend, so crowds are still possible.' },
      { detail: 'Our chosen cake café. Enjoy mille-crepe cake early before starting the shopping.' },
      { detail: 'Shoes and clothing around Omotesando. Keep lunch flexible nearby.' },
      { detail: 'Continue through Harajuku, with THE MATCHA TOKYO as a nearby stop.' },
      { detail: 'Browse KITH, try KITH TREATS and continue exploring Shibuya.' },
      { time: 'Dinner option', detail: 'No reservation confirmed. If booking YORONIKU, allow time to travel to the Ebisu branch.' }
    ] },
    { label: 'Shopping', title: 'Shinjuku finds and a walk in Ginza', subtitle: 'Clothing, everyday goods and a little luxury shopping.', route: 'Aoyama → Shinjuku → Ginza → Aoyama', tip: 'Split Shinjuku and Ginza into two parts. If we have lots of bags, drop them at the hotel before deciding whether to continue.', items: [
      { time: 'Morning', detail: 'LUMINE EST and Gelato Pique: start with the things we most want to buy.' },
      { time: 'Midday', detail: 'Menswear and department-store lunch. No need to rush to a fixed restaurant.' },
      { time: 'Afternoon', detail: 'GINZA SIX, THE ROW and a walk through Ginza.' },
      { time: 'Evening', title: 'Back to Aoyama to rest', detail: 'Organize our purchases and do laundry. Choose dinner in Aoyama or Ginza depending on our energy.' }
    ] },
    { label: 'Slow Tokyo', title: 'Coffee, Daikanyama and Tokyo Tower', subtitle: 'Leave some room for a favorite street corner.', route: 'Yoyogi Park → Daikanyama → Azabudai → Shiba Park', tip: 'Labor Thanksgiving Day in Japan may bring crowds. Pack a small overnight bag for Kawaguchiko. Ask the hotel about forwarding larger luggage to Kyoto, including cost and delivery date.', items: [
      { detail: 'Have coffee and take a walk around Yoyogi Park.' },
      { detail: 'Shops, bookstores and lunch. Combine nanamica with this part of town.' },
      { detail: 'Explore before dark and find a view of Tokyo Tower.' },
      { time: 'Dusk', detail: 'Stay until the lights come on. Decide on the day whether to go up the tower; eat nearby.' },
      { time: 'Alternative lunch', detail: 'If we book Hikiniku to Come, replace the Daikanyama slot and adjust the day around the reservation.' }
    ] },
    { label: 'Fuji & hot springs', title: 'To the lake, with an afternoon for Fuji', subtitle: 'Check out of Tokyo. Tonight: Sunnide.', route: 'Aoyama → Shinjuku → Kawaguchiko → Sunnide', tip: 'The current timetable for Fuji Excursion 15 is 10:30–12:24, not yet booked. Sales open Oct 24 at 10:00 Japan time. Check that our carriage is bound for Kawaguchiko.', items: [
      { title: 'Check out and taxi to Shinjuku', detail: 'Allow time for traffic and finding the platform. Aim to reach the station at least 30 minutes early.' },
      { title: 'Fuji Excursion 15', detail: 'Direct from Shinjuku to Kawaguchiko. Suggested departure; not booked yet.' },
      { title: 'Lunch in Kawaguchiko, then taxi to the hotel', detail: 'Allow about 15–20 minutes by taxi, depending on traffic. Ask about luggage storage if early.' },
      { time: 'Afternoon', detail: 'Choose the park or the nearby lakeshore. No need to rush to sights across the lake.' },
      { detail: 'Planned check-in and a bath. Confirm dinner time and the next morning’s transportation at reception.' },
      { time: 'Dinner', title: 'Dinner at the hotel', detail: 'Meals depend on our reservation. The booking page says dinner must start by 19:00.' },
      { time: 'After dinner · optional', detail: 'See the illuminations if we have energy, or simply stay at the hotel and rest.' }
    ] },
    { label: 'Travel & tea', title: 'Fuji at dawn, Kyoto in the afternoon', subtitle: 'Three nights at Kyoto Hyatt begin tonight.', route: 'Sunnide → Kawaguchiko Station → Mishima → Kyoto → Hyatt', tip: 'Suggested bus: 10:20 from Kawaguchiko, arriving at Mishima north exit at 11:50. Leave at least 60 minutes before the Shinkansen. Neither is booked; shorten the afternoon if delayed.', items: [
      { time: 'Early morning', detail: 'Check the weather and visibility, then pack after breakfast. Do not miss our transportation for a photo.' },
      { title: 'Check out and go to Kawaguchiko Station', detail: 'Ask reception to arrange a taxi. Allow time for the ride and the bus stop.' },
      { title: 'Mishima–Kawaguchiko Liner', detail: 'Suggested bus from Kawaguchiko Station to Mishima Station north exit. Reserve ahead.' },
      { time: 'After about 13:00', title: 'Shinkansen from Mishima to Kyoto', detail: 'No departure chosen. Some Hikari trains run direct; other options need a transfer. Check the route when booking.' },
      { time: 'On arrival in Kyoto', detail: 'If we prefer less walking, taxi to the hotel first and save hojicha for another free moment.' },
      { time: 'Afternoon', detail: 'Check in or leave our bags, then give our feet a rest.' },
      { time: 'If time allows', detail: 'Ippodo → HUMAN MADE 1928 → Shinpuhkan. If arrival is late, pick just one or have dinner near the hotel.' }
    ] },
    { label: 'Higashiyama', title: 'Autumn leaves, kimono and temple dusk', subtitle: 'A full day for Higashiyama, separate from Arashiyama.', route: 'Tofukuji → Gojo → Kiyomizu-dera → Ninenzaka & Sannenzaka → Gion', tip: 'If renting kimono, stay around Higashiyama for the afternoon and confirm the return deadline. Change back before an evening temple visit; avoid cross-city trips in kimono.', items: [
      { time: 'Morning', detail: 'An autumn foliage highlight. Keep the route manageable and leave luggage at the hotel.' },
      { time: 'Lunch option', detail: 'Check opening and reservations. If the detour is inconvenient, eat around Higashiyama instead.' },
      { time: '13:00 · optional', detail: 'No shop or reservation chosen. Skip the rental and start the historic-street walk if preferred.' },
      { time: 'Afternoon', detail: 'The temple stage and nearby historic streets, with time for photos and breaks.' },
      { time: 'Dusk', detail: 'Return rented kimono, then have dinner around Gion.' },
      { time: 'Evening · optional', detail: 'Special autumn evening opening. Return if we want the illuminations; both daytime and nighttime visits are optional.' }
    ] },
    { label: 'Arashiyama', title: 'Bamboo, the river and an autumn train', subtitle: 'Our last full day, spent in Arashiyama.', route: 'Kyoto Station → JR Saga-Arashiyama → Bamboo Grove → Katsura River → Romantic Train', tip: 'Train seats and Hirokawa are not booked. Adjust the route after securing tickets and a meal time. Osaka is an alternative, with the same Kyoto hotel that evening.', items: [
      { title: 'Travel to Arashiyama', detail: 'Taxi to Kyoto Station, then take the JR Sagano Line to Saga-Arashiyama. Check departures on the day.' },
      { detail: 'Start with the bamboo grove, adding Jojakkoji if we feel like walking farther.' },
      { time: 'Lunch option', detail: 'Reservation only. Lunch or dinner depends on the time we actually book.' },
      { time: 'Afternoon', detail: 'Walk by the Katsura River and have coffee. Try another café if the queue is too long.' },
      { time: 'Afternoon departure · to book', detail: 'Choose an available train, then plan the return. From Kameoka, walk to JR Umahori Station for Kyoto.' },
      { time: 'Evening', title: 'Return to Kyoto and pack', detail: 'Rest at Hyatt. Keep passports, flight details and tomorrow’s HARUKA information easy to reach.' }
    ], alternateItems: [
      { time: 'Morning', title: 'Kyoto → Osaka day trip', detail: 'JR Special Rapid to Osaka Station. Leave time to return; tonight is still at Hyatt Regency Kyoto.' },
      { time: 'Morning to afternoon', detail: 'Umeda shopping and lunch. Osaka Castle Park can replace part of the shopping time.' },
      { time: 'Dusk · optional', detail: 'Kushikatsu or sushi options. Check restaurant availability and trains back to Kyoto.' },
      { time: 'Evening', title: 'Return to Kyoto Hyatt', detail: 'No big bags and no hotel change. Leave Kyoto for Kansai Airport the next morning.' }
    ] },
    { label: 'Homeward bound', title: 'Leave Kyoto, bring autumn home', subtitle: 'The priority today: a relaxed arrival at Kansai Airport.', route: 'Hyatt → Kyoto Station → HARUKA → Kansai T1 → Taoyuan T1', tip: 'GK55 departs Kansai Terminal 1 at 14:55. Aim to reach the airport around 11:30–12:00. Skip Osaka sightseeing today; the train is not booked.', items: [
      { title: 'Check out and taxi to Kyoto Station', detail: 'Leave early enough to allow for road or rail delays.' },
      { time: 'Around 09:30–10:00', title: 'HARUKA to Kansai Airport', detail: 'Suggested departure range, with no specific train chosen. Allow around 80–90 minutes on the train plus station walking time.' },
      { title: 'Arrive at Kansai Terminal 1', detail: 'Check-in, bags, security and lunch. Check Jetstar’s confirmation and current check-in deadline.' },
      { title: 'GK55 departs Kansai', detail: 'Kansai Terminal 1. Departure time is Japan local time.' },
      { title: 'Arrive at Taoyuan Terminal 1', detail: 'Arrival time is Taiwan local time. Nine days and eight nights: our trip is complete.' }
    ] }
  ];
  const transport = [
    { title: 'Narita → Aoyama', subtitle: 'Choose the train after immigration', summary: 'N’EX to Tokyo Station, then a taxi to the hotel.', steps: ['Arrive at Narita T3, clear immigration and collect bags', 'Walk to Airport Terminal 2 Station (official estimate: 10 minutes; allow extra time to find the way)', 'N’EX → Tokyo Station', 'Taxi → Tokyu Stay Aoyama Premier'], note: 'N’EX to Tokyo Station takes roughly an hour, depending on the departure. Allow about 1.5–2 hours for the whole journey after immigration; the taxi depends on traffic. Another option is N’EX to Shibuya, then the Ginza Line to Gaienmae. A taxi is easier with lots of luggage.' },
    { title: 'Aoyama → Kawaguchiko', subtitle: 'Fuji Excursion 15 · not booked', summary: 'Departs Shinjuku at 10:30; arrives Kawaguchiko at 12:24.', steps: ['Taxi from the hotel → Shinjuku Station', 'Allow at least 30 minutes to find the platform and carriage', 'Fuji Excursion 15: 10:30 → 12:24', 'Lunch near Kawaguchiko Station, then taxi → Sunnide'], note: 'Current official fare: ¥4,200 per adult one way, including the base fare and reserved-seat limited-express fare. Two adults: ¥8,400. Sales open Oct 24 at 10:00 Japan time. The train runs coupled to Kaiji, so check the carriage bound for Kawaguchiko. Not booked; confirm the fare and timetable when buying.' },
    { title: 'Kawaguchiko → Kyoto', subtitle: 'Bus + Shinkansen · not booked', summary: 'Travel west via Mishima instead of going back to Tokyo.', steps: ['Taxi from Sunnide → Kawaguchiko Station', 'Suggested bus: 10:20 → Mishima Station north exit at 11:50', 'Leave at least 60 minutes for the connection', 'Shinkansen from Mishima → Kyoto, then taxi → Hyatt'], note: 'Traffic can delay the bus. Some Hikari trains go direct to Kyoto; other departures require a transfer. Verify stops when booking. On ordinary Shinkansen cars, seats D/E face Mount Fuji; E is the window seat. Views depend on weather. Check oversized-baggage rules for large luggage.' },
    { title: 'Kyoto → Kansai Airport', subtitle: 'GK55 departs at 14:55', summary: 'Hotel → Kyoto Station → HARUKA → Kansai T1.', steps: ['Check out around 08:30–09:00', 'Taxi → Kyoto Station; leave time to find the platform', 'Suggested HARUKA departure: around 09:30–10:00', 'Reach Kansai Terminal 1 around 11:30–12:00'], note: 'Allow roughly 80–90 minutes on HARUKA. Confirm the departure and platform with JR; no ticket booked yet. Keep airport day free of Osaka shopping. Flight, check-in and boarding deadlines depend on Jetstar’s confirmation and current announcements.' }
  ];
  const bookings = [
    { name: 'Fuji Excursion 15', when: 'Nov 24 · 10:30 → 12:24', description: 'Two adults, Shinjuku → Kawaguchiko. Reserved seats recommended; not booked yet.' },
    { name: 'Kawaguchiko → Mishima Bus', when: 'Nov 25 · suggested 10:20 → 11:50', description: 'About 90 minutes. Reserve ahead and leave at least 60 minutes before the Shinkansen.' },
    { name: 'Mishima → Kyoto Shinkansen', when: 'Nov 25 · a departure after 13:00', description: 'No train chosen. Check the bus connection, stopping pattern and any large-luggage needs.' },
    { name: 'Sagano Romantic Train', when: 'Nov 27 · afternoon departure to choose', description: 'Sales open Oct 27 at 00:00 Japan time. Coordinate the train with our preferred Hirokawa meal time.' },
    { name: 'Unagi Hirokawa', when: 'Nov 27 · lunch or dinner to choose', description: 'Booking opens Oct 27 at 10:00 Japan time. A ¥3,000 deposit per person is credited toward the meal; read cancellation rules first.' },
    { name: 'Kimono near Kiyomizu-dera', when: 'Nov 26 · afternoon, optional', description: 'Choose a shop, then check dressing time, returns and cancellation terms. Not reserved.' },
    { name: 'YORONIKU Ebisu', when: 'Tokyo dinner option', description: 'A restaurant option. Check current availability on the official booking page instead of the dates in the old itinerary.' },
    { name: 'Hikiniku to Come Shibuya', when: 'Tokyo lunch option', description: 'Online booking rules have changed, with a paid advance priority option. Check current availability directly.' },
    { name: 'HARUKA to Kansai Airport', when: 'Nov 28 · depart around 09:30–10:00', description: 'Choose a train reaching the airport around 11:30–12:00. Not booked yet.' }
  ];
  const resources = [
    { name: 'Visit Japan Web', detail: 'Official arrival declaration service' },
    { name: 'Jetstar Flight Information', detail: 'Flight status and check-in information' },
    { name: 'Japan Meteorological Agency', detail: 'Check the weather before going out' },
    { name: 'Fuji Excursion Timetable', detail: 'Official times, fares and ticket rules' },
    { name: 'Kawaguchiko Foliage Festival 2026', detail: 'Nov 7–29; illuminations until 21:00' },
    { name: 'Kiyomizu-dera Events 2026', detail: 'Evening visits and official announcements' },
    { name: 'Sagano Romantic Train FAQ', detail: 'Tickets and riding information' },
    { name: 'Mishima–Kawaguchiko Liner', detail: 'Bus timetable and booking links' },
    { name: 'Smart EX', detail: 'Tokaido Shinkansen reservations' },
    { name: 'HARUKA Tickets', detail: 'Kyoto–Kansai Airport travel' }
  ];
  window.TRIP_EN = {
    ...base, title: 'Autumn in Japan',
    places: base.places.map(p => ({ ...p, ...places[p.id] })),
    flights: base.flights.map((f,i) => ({ ...f, fromName: i ? 'Osaka · Kansai' : 'Taipei · Taoyuan', fromTerminal: 'Terminal 1 · T1', toName: i ? 'Taipei · Taoyuan' : 'Tokyo · Narita', toTerminal: i ? 'Terminal 1 · T1' : 'Terminal 3 · T3', duration: i ? '3 hr 20 min' : '3 hr 05 min' })),
    days: base.days.map((d,i) => ({ ...d, ...days[i], items: d.items.map((item,j) => ({ ...item, ...days[i].items[j] })), ...(d.alternateItems ? { alternateItems: d.alternateItems.map((item,j) => ({ ...item, ...days[i].alternateItems[j] })) } : {}) })),
    transport: base.transport.map((t,i) => ({ ...t, ...transport[i] })),
    bookings: base.bookings.map((b,i) => ({ ...b, ...bookings[i] })),
    resources: base.resources.map((r,i) => ({ ...r, ...resources[i] })),
    packing: ['Passports and outbound/return flight details', 'Check checked-bag and cabin-bag allowances', 'Save all three hotel confirmations on the phone', 'Save train and bus tickets on the phone', 'Complete arrival information in Visit Japan Web', 'Working credit cards and some yen in cash', 'Suica / transit card and mobile data', 'Warm layers, a jacket and comfortable shoes', 'Umbrella, power bank and charging cables', 'Personal essentials and travel insurance details', 'Pack a small overnight bag for Kawaguchiko', 'Check Nov 28 HARUKA and flight status']
  };
})();
