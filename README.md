# Chakali Recipe & Production Manager

A responsive, installable chakali production planner for ingredients, recipes, cost estimates and batch checklists. It runs in the browser, stores data locally and includes an offline app shell. The Orders module is intentionally excluded.

## Run locally

Serve this folder over `localhost` or HTTPS (for example with the VS Code Live Server extension). Open `index.html`, then install the app from the browser menu if desired. A service worker cannot be installed from a `file://` URL.

There is no build step, backend, external runtime dependency or account. The application uses HTML, CSS, vanilla JavaScript, the browser's LocalStorage and a service worker. Your data belongs to this browser and origin; export a JSON backup before changing devices, browser profiles or clearing site data.

## Production baseline

- Grinding ingredients total: **4,602 g**.
- Actual flour output from that grinding batch: **3,500 g (3.5 kg)**.
- Grinding yield: **76.05%**.
- 1 kg flour yields approximately **1.5 kg finished chakali**.
- 1 kg flour produces **60–65 chakalis**; the calculator shows a range.
- Quick targets: 1, 2, 3, 4, 10, 20, 50 and 100 kg finished chakali.

### Grinding ingredients

Moong dal 500 g; urad dal 350 g; sabudana 250 g; coriander 177 g; rice 2,000 g; cumin 225 g; chana dal 1,000 g; poha 100 g.

### Recipe ingredients (separate from grinding)

For the base 3.5 kg flour batch: ajwain 200 g; hing 100 g; oil 1,000 g; red chilli 200 g; sesame 200 g; salt 300 g. Quantities in the calculator are normalized to 1 kg finished chakali using 3.5 kg flour -> 5.25 kg finished chakali. Oil is the listed input quantity; actual oil consumption/reuse during frying must be measured separately before using costing commercially.

### Checklist formulas

For target finished chakali **T kg**:

- Flour required = T / 1.5.
- Grinding ingredient required = each base grinding ingredient x (flour required / 3.5).
- Recipe ingredient required = each base recipe ingredient x (T / 5.25).
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
