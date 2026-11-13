# Chakali Recipe & Production Manager

Responsive chakali recipe, costing and production material checklist.

## Stack
HTML5, CSS3, Bootstrap 5.3, Vanilla JavaScript ES6 and browser LocalStorage only. No backend.

## Production assumptions (editable)
- Grinding batch: 4,112 g raw ingredients yields 3,000 g flour.
- 1 kg flour yields 1.5 kg finished chakali.
- 1 kg flour makes 66 chakalis.
- Therefore 1 kg finished chakali needs 666.67 g flour, approx. 913.78 g raw grinding ingredients and yields approx. 44 pieces.
- Quick targets: 1, 2, 3, 4, 10, 20, 50 and 100 kg finished chakali.

## Grinding ingredients (only these 8)
Moong dal 500 g; urad dal 55 g; sabudana 225 g; coriander 177 g; cumin 55 g; rice 2,000 g; chana dal 1,000 g; poha 100 g.

## Recipe ingredients (separate from grinding)
Flour 666.67 g; oil 100 ml; ajwain 5 g; hing 1 g; red chilli 25 g; sesame 30 g; salt 15 g per 1 kg finished chakali. Recipe quantities are initial editable sample values except flour, which follows the stated 1 kg flour -> 1.5 kg chakali conversion. Oil rate is per litre; other ingredient rates are per kg.

## Checklist calculation
For target finished chakali T kg:
- Flour required = T / 1.5.
- Grinding ingredient required = each ingredient batch grams × (flour required / 3).
- Estimated chakali pieces = flour required × 66.
- Recipe ingredients = recipe quantity per finished kg × T.
- Raw-material and grinding cost is allocated from the current grinding batch; recipe ingredient, packing and utilities/labour costs are added.

The old Orders feature has been removed. Existing LocalStorage data is migrated to a 3 kg flour batch assumption. Export a JSON backup before clearing browser data. Validate actual yield, wastage, oil absorption, packing and recipe quantities against production before using estimates commercially.
