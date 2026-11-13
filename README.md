# Chakali Recipe & Production Manager

Responsive chakali recipe, costing and production planner.

## Stack
- HTML5, CSS3, Bootstrap 5.3
- Vanilla JavaScript (ES6)
- Browser LocalStorage only; no backend or database

## Run locally
Open \`index.html\` in a modern browser. An internet connection is required for Bootstrap from jsDelivr. Data is stored in the current browser profile. Export JSON backups regularly.

## Separate ingredient workflows

### Grinding — only these 8 raw materials
- मूग डाळ — 500 g
- उडीद डाळ — 55 g
- साबुदाणा — 225 g
- धणे — 177 g
- जिरे — 55 g
- तांदूळ — 2,000 g
- हरभरा डाळ — 1,000 g
- पोहे — 100 g

Grinding records actual flour output and grinding charges. Recipe ingredients are deliberately excluded from the grinding list.

### Recipe — editable sample quantities per 1 kg finished chakali
- चकलीचे पीठ — 850 g
- तेल — 100 ml
- ओवा — 5 g
- हिंग — 1 g
- लाल मिरची — 25 g
- तीळ — 30 g
- मीठ — 15 g

Oil rate is entered per litre; other recipe ingredient rates are per kg. Quantities and rates are sample values and must be replaced with actual production measurements and purchase rates.

## Costing and production
- Flour cost/kg = (grinding raw-material cost + grinding charges) / actual flour output in kg.
- Recipe flour cost is allocated using the flour grams per kg chakali.
- Oil and spices are costed in Recipe. Packing, utilities and labour remain additional expenses.
- Production planner scales each recipe ingredient by requested chakali kg and estimates total cost and pieces.
- Validate real dough/final-product yield, oil absorption, wastage and packaging costs before relying on business costing.

## Existing data migration
Existing v1 data is retained where possible. Missing recipe ingredients are added automatically; legacy “तिखट” is mapped to “लाल मिरची”, and the old oil expense line is removed to prevent double-counting now that oil belongs in Recipe.
