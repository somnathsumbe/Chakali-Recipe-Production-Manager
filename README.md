# Chakali Recipe & Production Manager

A responsive, installable chakali production planner for ingredients, recipes, cost estimates and batch checklists. It runs in the browser, stores data locally and includes an offline app shell. The Orders module is intentionally excluded.

## Run locally

Serve this folder over `localhost` or HTTPS (for example with the VS Code Live Server extension). Open `index.html`, then install the app from the browser menu if desired. A service worker cannot be installed from a `file://` URL.

There is no build step, backend, external runtime dependency or account. The application uses HTML, CSS, vanilla JavaScript, the browser's LocalStorage and a service worker. Your data belongs to this browser and origin; export a JSON backup before changing devices, browser profiles or clearing site data.

## Production baseline

- Grinding ingredients total: **4,602 g**.
- Actual flour output from that grinding batch: **3,500 g (3.5 kg)**.
- Grinding yield: **76.05%**.
- Latest measured production baseline: **1,070 g flour for 1 kg finished chakali** (finished yield ≈ **0.9346 kg per 1 kg flour**).
- 1 kg flour produces approximately **60–65 chakalis**; the calculator shows a range based on flour required.
- Quick targets: 1, 2, 3, 4, 10, 20, 50 and 100 kg finished chakali.

### Grinding ingredients

Moong dal 500 g; urad dal 350 g; sabudana 250 g; coriander 177 g; rice 2,000 g; cumin 225 g; chana dal 1,000 g; poha 100 g.

### Latest measured recipe batch (separate from grinding)

The latest user-recorded batch is the planner's **1 kg finished chakali baseline**: **1,070 g flour**, **1,000 ml oil**, **35 g sesame**, **12 g ajwain**, **13 g red chilli**, **28 g salt**, **1 g hing**, and **1,260 ml water**. The planner therefore uses 1.07 kg flour per 1 kg finished chakali. The 60–65 piece estimate remains per kg of flour. Oil quantity is the batch input, not measured oil absorption/consumption; track actual oil use separately for commercial costing.

### Print material checklist

The Production plan page scales both lists together for any entered target weight: grinding raw materials and recipe/mixing ingredients. Use the **Print both material lists** action to print a clean A4 checklist. Quick targets include 1, 10, 15, 100 and 1,000 kg; any other positive target can be entered manually.

### Checklist formulas

For target finished chakali **T kg**:

- Flour required = T x 1.07 kg, based on the latest measured 1 kg finished batch.
- Grinding ingredient required = each base grinding ingredient x (flour required / 3.5).
- Recipe ingredient required = each latest measured recipe ingredient x T.
- Chakali count range = (flour required x 60) to (flour required x 65).
- Raw grinding baseline: 4.602 kg raw -> 3.5 kg flour.

These are the existing production formulas; the interface redesign and new tracking features do not change them.

## Dashboard and local data

- Record optional on-hand quantities (grams) alongside grinding batch quantities. Existing saved recipes are not treated as inventory: on-hand amounts remain unknown until entered. Stock alerts compare entered amounts with the raw ingredients required for the current plan; they do not alter costing or production calculations.
- Save planned production batches from the quick calculator. The dashboard totals saved target weights and shows the latest five plans; the most recent 20 plans are kept in the existing `chakali-manager-v1` LocalStorage record. These are plans, not records of actual finished output.
- Language preference, inventory fields and production history are additive fields in that same record. Existing browser data is migrated where possible. Importing a JSON backup requires confirmation; reset restores the default grinding list and its stock entries.
- Export a JSON backup before clearing browser data. Validate actual oil use/absorption, frying loss, packing, utilities and labour against production before relying on commercial cost estimates.

## Offline support

`manifest.json` describes the installable app. `service-worker.js` precaches only the app shell (HTML, CSS, JavaScript, icon, manifest and offline fallback), serves static shell assets from cache, tries the network first for page navigation, and removes older `chakali-manager-*` caches on activation. When an updated worker is ready, use the in-app refresh prompt to activate it.

Offline behavior and installation require a secure context: HTTPS or localhost. LocalStorage remains browser- and origin-specific; the service worker does not sync or upload business data.
