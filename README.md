# Chakali Recipe & Production Manager

A responsive, installable chakali production planner for ingredients, recipes, cost estimates and batch checklists. It runs in the browser, stores data locally and includes an offline app shell. The Orders module is intentionally excluded.

## Run locally

Serve this folder over `localhost` or HTTPS (for example with the VS Code Live Server extension). Open `index.html`, then install the app from the browser menu if desired. A service worker cannot be installed from a `file://` URL.

There is no build step, backend, external runtime dependency or account. The application uses HTML, CSS, vanilla JavaScript, the browser's LocalStorage and a service worker. Your data belongs to this browser and origin; export a JSON backup before changing devices, browser profiles or clearing site data.

## Production baseline

- Grinding ingredients total: **4,602 g**.
- Actual flour output from that grinding batch: **3,500 g (3.5 kg)**.
- Grinding yield: **76.05%**.
- Authoritative recipe baseline: **1,000 g flour produces 1.5 kg finished chakali** (finished yield = **1.5 kg per 1 kg flour**).
- 1 kg finished chakali contains approximately **65–68 chakalis**; the calculator scales this count directly from the finished-weight target.
- Quick targets: 250 g, 500 g, 1, 2, 3, 4, 10, 15, 20, 30, 50, 100 and 1,000 kg finished chakali.

### Grinding ingredients

Moong dal 500 g; urad dal 350 g; sabudana 250 g; coriander 177 g; rice 2,000 g; cumin 225 g; chana dal 1,000 g; poha 100 g.

### Authoritative recipe baseline (separate from grinding)

The confirmed baseline is **1,000 g flour -> 1.5 kg finished chakali**. For this 1 kg flour batch, use:

- Oil: **1,030 g total** (1,000 g recipe oil + 30 g oil for kneading)
- Sesame: **35 g**
- Ajwain: **12 g**
- Red chilli: **13 g**
- Salt: **28 g**
- Hing: **1 g**
- Turmeric: **2 g**
- Water: **1,260 ml** (existing saved baseline; adjust if a new measured quantity is supplied)

For a finished chakali target of **T kg**, every recipe ingredient is scaled by **T / 1.5**. Therefore, for 1 kg finished chakali use two-thirds of the baseline; for 500 g use one-third. The 1 kg flour batch produces 1.5 kg finished chakali.

The 65–68 piece estimate is per kg of finished chakali. Oil is recorded as recipe input; actual frying oil consumption/absorption should be measured separately for commercial costing.

### Print material checklist

The Production plan page scales both lists together for any entered target weight: grinding raw materials and recipe/mixing ingredients. Use the **Print both material lists** action to print a clean A4 checklist. Quick targets include 1, 10, 15, 100 and 1,000 kg; any other positive target can be entered manually.

### Checklist formulas

For target finished chakali **T kg**:

- Flour required = T / 1.5 kg, based on 1 kg flour producing 1.5 kg finished chakali.
- Grinding ingredient required = each base grinding ingredient x (flour required / 3.5).
- Recipe ingredient required = each 1 kg flour baseline recipe ingredient x (T / 1.5), because 1 kg flour produces 1.5 kg finished chakali.
- Chakali count range = (finished chakali target x 65) to (finished chakali target x 68).
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
