# 秋日日本 · 2026

Trip companion for November 20–28, 2026. Published at https://kevinshen56714.github.io/japan-2026/.

The latest confirmed hotels and flight screenshots are authoritative. The older itinerary is a wish list; trains, restaurant reservations, and experiences are suggestions until the travelers book them.

## Use on a trip

- Open in Safari and use Share → Add to Home Screen.
- Open online once and check the offline confirmation on the preparation page. Itinerary, hotel address cards, and the place list then work offline.
- Maps, booking services, and phone calls need their own connection.
- Notes, favorites, checklists, and reservation progress stay in the current browser. Export and import a backup to transfer them between phones. There is no automatic synchronization.
- Calendar downloads contain the itinerary and reminders. Importing a reminder does not make a reservation.
- Use the 中文 / EN controls to switch languages. The language is remembered on the current device, and `?lang=en` opens a shareable English version. Switching preserves the selected day, personal notes, saved places and checklists. Japanese names, addresses and navigation destinations stay unchanged.

## Maintenance

This is a dependency-free static site that can be served directly. `data.js` contains dates, places, transportation, and source links; `app.js` renders the interface; `styles.css` defines the responsive layout. Original SVG illustrations and app icons live in `assets/`.

`en.js` supplies English trip copy over the shared IDs and confirmed details. `i18n.js` supplies interface copy. The `html` / `text` template helpers translate authored template fragments only, so interpolated personal notes, Japanese addresses and URLs are not translated. Keep both trip languages updated when editing content. The English install manifest is `manifest-en.webmanifest`.

When updating content or assets, increment the cache version in `sw.js`. Its scope is limited to this trip directory. Keep booking references, traveler phone numbers, payment information, and personal notes out of the public source.

The site lives below the existing GitHub Pages homepage and does not replace it.
