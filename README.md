# Chakali Recipe & Production Manager

A responsive, browser-based chakali recipe, costing and production planning tool.

## Stack
- HTML5, CSS3
- Bootstrap 5.3
- Vanilla JavaScript (ES6)
- LocalStorage (no backend, no database, no framework)

## Run locally
Open `index.html` in a modern browser. An internet connection is needed to load Bootstrap from jsDelivr CDN. All app data is saved in the browser's LocalStorage.

## Features in v1.0
- Raw ingredient list with gram weights and per-kg rates
- Total raw material weight, kilograms and estimated raw cost
- Grinding output weight, grinding charge, yield percentage and flour cost estimate
- Per-kg chakali recipe ingredients
- Oil, packaging, utilities and labour expenses
- Estimated cost per kg, selling price, gross profit and margin
- Order calculator for any chakali quantity, including 10 kg; estimated pieces and ingredient quantities
- Save planned production orders locally
- JSON export/import backup

## Sample raw-material recipe
Moong dal 500 g, urad dal 55 g, sabudana 225 g, coriander 177 g, cumin 55 g, rice 2,000 g, chana dal 1,000 g and poha 100 g.

## Important calculation notes
Sample quantities and prices are editable. The sample grinding flour output (3.7 kg), per-kg chakali ingredient quantities, expense amounts and pieces-per-kg are placeholders for demonstration. Replace them with actual measured production data before using the costing for business decisions. Flour conversion is estimated from the entered grinding batch; production planning scales recipe quantities linearly.

## Data and privacy
Data is stored only in the current browser profile. Clearing browser storage/site data can remove it. Use Export data regularly to keep a backup. This is a frontend-only app; LocalStorage does not synchronize across devices.
