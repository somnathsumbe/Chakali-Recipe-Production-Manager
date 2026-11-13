# Chakali Recipe & Production Manager

Responsive chakali recipe, costing and production material checklist. The Orders module is intentionally excluded.

## Stack
HTML5, CSS3, Bootstrap 5.3, Vanilla JavaScript ES6 and browser LocalStorage only. No backend.

## Confirmed production baseline (user-provided)
- Grinding ingredients total: **4,602 g**.
- Actual flour output from that grinding batch: **3,500 g (3.5 kg)**.
- Grinding yield: **76.05%**.
- 1 kg flour yields approximately **1.5 kg finished chakali**.
- 1 kg flour produces **60–65 chakalis**; the calculator shows a range rather than a single assumed count.
- Quick targets: 1, 2, 3, 4, 10, 20, 50 and 100 kg finished chakali.

## Grinding ingredients (only these 8)
Moong dal 500 g; urad dal 350 g; sabudana 250 g; coriander 177 g; rice 2,000 g; cumin 225 g; chana dal 1,000 g; poha 100 g.

## Recipe ingredients (separate from grinding)
For the base 3.5 kg flour batch: ajwain 200 g; hing 100 g; oil 1,000 g; red chilli 200 g; sesame 200 g; salt 300 g. These quantities are normalized by the app to each 1 kg finished chakali target using 3.5 kg flour -> 5.25 kg finished chakali. Oil is treated as the listed input quantity; actual oil consumption/reuse during frying must be measured separately before using costing commercially.

## Checklist formulas
For target finished chakali T kg:
- Flour required = T / 1.5.
- Grinding ingredient required = each base grinding ingredient × (flour required / 3.5).
- Recipe ingredient required = each base recipe ingredient × (T / 5.25).
- Chakali count range = (flour required × 60) to (flour required × 65).
- Raw grinding baseline: 4.602 kg raw -> 3.5 kg flour.

The app has no Orders module. Existing browser data is migrated where possible; export a JSON backup before clearing browser data. Validate actual oil use/absorption, frying loss, packing and utilities/labour against production before relying on estimated commercial costs.
