/* Chakali Manager — browser-only recipe, costing and production planning. */
(() => {
  'use strict';

  const KEY = 'chakali-manager-v1';
  const rawDefaults = [
    ['मूग डाळ', 500, 120], ['उडीद डाळ', 350, 150], ['साबुदाणा', 250, 90],
    ['धणे', 177, 140], ['जिरे', 225, 220], ['तांदूळ', 2000, 55],
    ['हरभरा डाळ', 1000, 90], ['पोहे', 100, 60]
  ];
  // Recipe quantities are normalized per 1 kg finished chakali from the user's 3.5 kg flour batch (5.25 kg finished output).
  const recipeDefaults = [
    { name: 'चकलीचे पीठ', qty: 666.6667, unit: 'g', rate: 0, type: 'flour' },
    { name: 'तेल', qty: 190.4762, unit: 'g', rate: 140 },
    { name: 'ओवा', qty: 38.0952, unit: 'g', rate: 300 },
    { name: 'हिंग', qty: 19.0476, unit: 'g', rate: 1800 },
    { name: 'लाल मिरची', qty: 38.0952, unit: 'g', rate: 400 },
    { name: 'तीळ', qty: 38.0952, unit: 'g', rate: 220 },
    { name: 'मीठ', qty: 57.1429, unit: 'g', rate: 20 }
  ];
  const defaults = {
    raw: rawDefaults.map(([name, grams, rate]) => ({ name, grams, rate })),
    flourProduced: 3.5,
    grindingCost: 150,
    recipe: recipeDefaults.map(item => ({ ...item })),
    expenses: [{ name: 'पॅकिंग / Packaging', amount: 25 }, { name: 'गॅस, वीज व मजुरी', amount: 35 }],
    sellingPrice: 450,
    flourYield: 1.5,
    piecesMinPerFlourKg: 60,
    piecesMaxPerFlourKg: 65,
    productionHistory: [],
    language: 'mr'
  };
  const translations = {
    en: {
      workspace: 'WORKSPACE', dashboard: 'Dashboard', grinding: 'Grinding & stock', recipe: 'Recipe & costing', production: 'Production plan',
      localData: 'Your data stays on this device', language: 'मराठी / English', export: 'Export backup', import: 'Import backup',
      breadcrumb: 'YOUR BUSINESS / OVERVIEW', dashboardTitle: 'Business overview', grindingPageTitle: 'Grinding & stock',
      recipePageTitle: 'Recipe & costing', productionPageTitle: 'Production plan', welcomeEyebrow: 'YOUR HOMEMADE FOOD BUSINESS',
      welcomeTitle: 'A better batch starts here.', welcomeCopy: 'Your ingredients, costs and next production plan — all in one calm, clear workspace.',
      madeWithCare: 'Made with care', atAGlance: 'AT A GLANCE', businessSnapshot: 'Business snapshot', liveOverview: 'Live overview',
      totalProduction: 'Planned production', productionTracked: 'Across saved production targets', flourAvailable: 'Flour produced',
      latestGrinding: 'Recorded grinding output', rawStock: 'Raw material stock', estimatedPieces: 'Estimated chakalis',
      currentPlanPieces: 'For your current production target', quickTool: 'QUICK TOOL', quickCalculator: 'Production calculator',
      quickCalculatorCopy: 'Plan a batch and see what you’ll need.', finishedTarget: 'Finished chakali target',
      flourPerKg: 'Finished chakali from 1 kg flour', flourNeeded: 'Flour needed', piecesRange: 'Estimated pieces',
      rawNeeded: 'Raw ingredients needed', viewChecklist: 'View material checklist', recordRun: 'Save planned batch',
      stockWatch: 'STOCK WATCH', stockAlerts: 'Low stock alerts', latestUpdates: 'LATEST UPDATES', recentActivity: 'Recent plans',
      seePlan: 'View plan', noStockTracked: 'On-hand stock is not tracked yet.',
      addStock: 'Enter on-hand amounts in Grinding & stock to see low-stock alerts.', allStockReady: 'Tracked stock covers this production target.',
      lowStock: 'Below this plan', stockAmount: 'On hand', notTracked: 'Not tracked', unknownStock: 'items not tracked',
      noRuns: 'No production runs saved yet.', recordFirstRun: 'Record a run from the calculator to start your history.',
      batchLabel: 'Planned batch', grindingEyebrow: 'RAW MATERIALS', grindingTitle: 'Grinding & stock',
      grindingCopy: 'Update batch ingredients, track what’s on hand, and record your flour output.',
      ingredientsTitle: 'Grinding ingredients', ingredientsCopy: 'Batch quantities and optional on-hand stock, in grams.',
      resetSample: 'Reset sample', ingredient: 'Ingredient', batchWeight: 'Batch weight (g)', onHand: 'On hand (g)',
      rate: 'Rate (₹/kg)', cost: 'Cost (₹)', addIngredient: '+ Add ingredient', batchTotal: 'Total batch ingredients',
      grindingOutput: 'Grinding output', grindingOutputCopy: 'Enter the flour you actually produce from a grinding batch.',
      flourProduced: 'Flour produced (kg)', grindingCharge: 'Grinding charge (₹)', rawInputWeight: 'Raw input weight',
      grindingYield: 'Grinding yield', flourCostPerKg: 'Flour cost per kg', saveGrinding: 'Save grinding batch',
      recipeEyebrow: 'YOUR SIGNATURE RECIPE', recipeTitle: 'Recipe & costing',
      recipeCopy: 'Understand your per-kilo costs and keep pricing decisions close at hand.',
      recipeIngredients: 'Recipe ingredients', recipeIngredientCopy: 'Quantities are calculated per 1 kg of finished chakali.',
      otherCosts: 'Other production costs', otherCostsCopy: 'Packaging, fuel, utilities and labour.', addExpense: '+ Add expense',
      estimatedCost: 'Estimated cost / kg', sellingPrice: 'Selling price per kg (₹)', grossProfit: 'Gross profit / kg',
      grossMargin: 'Gross margin', saveRecipe: 'Save recipe & costing', productionEyebrow: 'BATCH PLANNING',
      productionTitle: 'Production material checklist',
      productionCopy: 'Scale your grinding ingredients and recipe materials for the selected chakali target.',
      pieceRangeLabel: 'Pieces from 1 kg flour', to: 'to', target: 'Finished chakali target',
      estimatedTotalCost: 'Estimated total cost', rawChecklist: 'Grinding raw material checklist',
      rawChecklistCopy: 'Scaled from your saved grinding batch.', perKgChakali: 'Per 1 kg chakali',
      forTarget: 'For this target', baseline: 'Baseline batch', recipeChecklist: 'Recipe material checklist',
      recipeChecklistCopy: 'Recipe ingredients added after grinding.', recipePlusExtras: 'Recipe + additional costs',
      productionNote: 'Planning estimates use your saved yields and batch quantities. Save a planned batch to build your activity history.',
      localFirst: 'Private by design · Saved on this device', unknownItems: 'Add on-hand amounts to check these ingredients.',
      resetConfirm: 'Restore the 8 default grinding ingredients? This will clear their on-hand amounts.',
      resetSaved: 'Sample grinding ingredients restored.', grindingSaved: 'Grinding batch saved on this device.',
      recipeSaved: 'Recipe and costing saved.', runSaved: 'Production plan saved.',
      importConfirm: 'Replace the data saved on this device with this backup?', importSaved: 'Backup imported successfully.',
      invalidBackup: 'This backup file is invalid. Your saved data has not changed.',
      saveFailed: 'Could not save to this browser. Check available device storage.',
      loadFailed: 'Saved data could not be read. Defaults are shown; export a backup before making changes.',
      updateReady: 'A new version is ready.', updateButton: 'Refresh to update', serviceWorkerFailed: 'Offline updates are unavailable in this browser.',
      invalidTarget: 'Enter a production target greater than zero.', newIngredient: 'नवीन साहित्य',
      newExpense: 'Other expense', remove: 'Remove',
      rawHeader: 'Ingredient / साहित्य', quantityHeader: 'Qty / kg chakali', unitHeader: 'Unit', rateHeader: 'Rate (₹/kg)',
      costPerKgHeader: 'Cost / kg', expenseName: 'Expense name'
    },
    mr: {
      workspace: 'कार्यस्थान', dashboard: 'आढावा', grinding: 'दळण आणि साठा', recipe: 'रेसिपी आणि खर्च', production: 'उत्पादन नियोजन',
      localData: 'तुमची माहिती याच उपकरणात सुरक्षित', language: 'मराठी / English', export: 'बॅकअप निर्यात', import: 'बॅकअप आयात',
      breadcrumb: 'तुमचा व्यवसाय / आढावा', dashboardTitle: 'व्यवसायाचा आढावा', grindingPageTitle: 'दळण आणि साठा',
      recipePageTitle: 'रेसिपी आणि खर्च', productionPageTitle: 'उत्पादन नियोजन', welcomeEyebrow: 'तुमचा घरगुती खाद्य व्यवसाय',
      welcomeTitle: 'उत्तम बॅचची सुरुवात इथून.', welcomeCopy: 'साहित्य, खर्च आणि पुढील उत्पादनाचे नियोजन — एकाच सोप्या ठिकाणी.',
      madeWithCare: 'आपुलकीने बनवलेले', atAGlance: 'थोडक्यात', businessSnapshot: 'व्यवसायाचा आढावा', liveOverview: 'थेट माहिती',
      totalProduction: 'नियोजित उत्पादन', productionTracked: 'जतन केलेल्या उत्पादन लक्ष्यांची बेरीज', flourAvailable: 'तयार केलेले पीठ',
      latestGrinding: 'नोंदवलेले दळण उत्पादन', rawStock: 'कच्च्या मालाचा साठा', estimatedPieces: 'अंदाजे चकल्या',
      currentPlanPieces: 'सध्याच्या उत्पादन लक्ष्याप्रमाणे', quickTool: 'जलद साधन', quickCalculator: 'उत्पादन गणक',
      quickCalculatorCopy: 'बॅचचे नियोजन करा आणि लागणारे साहित्य पहा.', finishedTarget: 'तयार चकलीचे लक्ष्य',
      flourPerKg: '१ किलो पिठापासून तयार चकली', flourNeeded: 'लागणारे पीठ', piecesRange: 'अंदाजे चकल्या',
      rawNeeded: 'लागणारा कच्चा माल', viewChecklist: 'साहित्य यादी पहा', recordRun: 'नियोजित बॅच जतन',
      stockWatch: 'साठा तपासणी', stockAlerts: 'कमी साठ्याचे इशारे', latestUpdates: 'अलीकडील नोंदी', recentActivity: 'अलीकडील नियोजन',
      seePlan: 'नियोजन पहा', noStockTracked: 'सध्या उपलब्ध साठ्याची नोंद नाही.',
      addStock: 'साठ्याचे इशारे पाहण्यासाठी दळण आणि साठा येथे उपलब्ध प्रमाण भरा.', allStockReady: 'नोंदवलेला साठा या उत्पादन लक्ष्याला पुरेसा आहे.',
      lowStock: 'या उत्पादनासाठी कमी', stockAmount: 'उपलब्ध', notTracked: 'नोंद नाही', unknownStock: 'साहित्याची नोंद नाही',
      noRuns: 'अजून उत्पादन बॅच नोंदवलेली नाही.', recordFirstRun: 'इतिहास सुरू करण्यासाठी गणकातून बॅच नोंदवा.',
      batchLabel: 'नियोजित बॅच', grindingEyebrow: 'कच्चा माल', grindingTitle: 'दळण आणि साठा',
      grindingCopy: 'बॅचमधील साहित्य, उपलब्ध साठा आणि तयार पिठाची नोंद ठेवा.',
      ingredientsTitle: 'दळणाचे साहित्य', ingredientsCopy: 'बॅचचे प्रमाण आणि उपलब्ध साठा ग्रॅममध्ये नोंदवा.',
      resetSample: 'नमुना पूर्ववत', ingredient: 'साहित्य', batchWeight: 'बॅच वजन (ग्रॅम)', onHand: 'उपलब्ध (ग्रॅम)',
      rate: 'दर (₹/किलो)', cost: 'खर्च (₹)', addIngredient: '+ साहित्य जोडा', batchTotal: 'बॅचमधील एकूण साहित्य',
      grindingOutput: 'दळण उत्पादन', grindingOutputCopy: 'दळणानंतर प्रत्यक्ष मिळालेल्या पिठाची नोंद करा.',
      flourProduced: 'तयार पीठ (किलो)', grindingCharge: 'दळण खर्च (₹)', rawInputWeight: 'कच्च्या मालाचे वजन',
      grindingYield: 'दळण उत्पादन टक्केवारी', flourCostPerKg: 'प्रति किलो पिठाचा खर्च', saveGrinding: 'दळण बॅच जतन करा',
      recipeEyebrow: 'तुमची खास रेसिपी', recipeTitle: 'रेसिपी आणि खर्च',
      recipeCopy: 'प्रति किलो उत्पादन खर्च समजून घ्या आणि विक्री दराचे नियोजन करा.',
      recipeIngredients: 'रेसिपीचे साहित्य', recipeIngredientCopy: 'प्रमाण १ किलो तयार चकलीसाठी मोजले जाते.',
      otherCosts: 'इतर उत्पादन खर्च', otherCostsCopy: 'पॅकिंग, इंधन, वीज आणि मजुरी.', addExpense: '+ खर्च जोडा',
      estimatedCost: 'अंदाजे खर्च / किलो', sellingPrice: 'विक्री दर प्रति किलो (₹)', grossProfit: 'नफा / किलो',
      grossMargin: 'नफ्याचे प्रमाण', saveRecipe: 'रेसिपी आणि खर्च जतन करा', productionEyebrow: 'बॅच नियोजन',
      productionTitle: 'उत्पादन साहित्य यादी',
      productionCopy: 'निवडलेल्या चकलीच्या लक्ष्याप्रमाणे दळणाचे व रेसिपीचे साहित्य मोजा.',
      pieceRangeLabel: '१ किलो पिठापासून नग', to: 'ते', target: 'तयार चकलीचे लक्ष्य',
      estimatedTotalCost: 'अंदाजे एकूण खर्च', rawChecklist: 'दळणाच्या कच्च्या मालाची यादी',
      rawChecklistCopy: 'जतन केलेल्या दळण बॅचच्या प्रमाणात.', perKgChakali: '१ किलो चकलीसाठी',
      forTarget: 'या लक्ष्याकरिता', baseline: 'मूळ बॅच', recipeChecklist: 'रेसिपी साहित्य यादी',
      recipeChecklistCopy: 'दळणानंतर मिसळायचे रेसिपीचे साहित्य.', recipePlusExtras: 'रेसिपी + अतिरिक्त खर्च',
      productionNote: 'योजना जतन केलेल्या उत्पादन प्रमाणांवर आधारित आहेत. उत्पादन नियोजनाचा इतिहास तयार करण्यासाठी नियोजित बॅच जतन करा.',
      localFirst: 'खाजगी आणि सुरक्षित · या उपकरणात जतन केले', unknownItems: 'या साहित्याचा उपलब्ध साठा भरा.',
      resetConfirm: 'दळणाचे ८ मूळ साहित्य पूर्ववत करायचे? उपलब्ध साठ्याची नोंद देखील हटवली जाईल.',
      resetSaved: 'दळणाचे मूळ साहित्य पूर्ववत केले.', grindingSaved: 'दळण बॅच या उपकरणात जतन केली.',
      recipeSaved: 'रेसिपी आणि खर्च जतन केले.', runSaved: 'उत्पादन नियोजन जतन झाले.',
      importConfirm: 'या बॅकअपने उपकरणातील जतन केलेली माहिती बदलायची?', importSaved: 'बॅकअप यशस्वीपणे आयात झाला.',
      invalidBackup: 'बॅकअप फाइल वैध नाही. जतन केलेली माहिती बदललेली नाही.',
      saveFailed: 'ब्राउझरमध्ये जतन करता आले नाही. उपकरणातील उपलब्ध जागा तपासा.',
      loadFailed: 'जतन केलेली माहिती वाचता आली नाही. बदल करण्यापूर्वी बॅकअप निर्यात करा.',
      updateReady: 'नवीन आवृत्ती उपलब्ध आहे.', updateButton: 'अपडेटसाठी पुन्हा उघडा', serviceWorkerFailed: 'या ब्राउझरमध्ये ऑफलाइन अपडेट उपलब्ध नाही.',
      invalidTarget: 'शून्यापेक्षा मोठे उत्पादन लक्ष्य भरा.', newIngredient: 'नवीन साहित्य',
      newExpense: 'इतर खर्च', remove: 'काढून टाका',
      rawHeader: 'साहित्य', quantityHeader: 'प्रमाण / किलो चकली', unitHeader: 'एकक', rateHeader: 'दर (₹/किलो)',
      costPerKgHeader: 'खर्च / किलो', expenseName: 'खर्चाचे नाव'
    }
  };
  const $ = selector => document.querySelector(selector);
  const byId = id => document.getElementById(id);
  const elements = {
    pageTitle: byId('pageTitle'), todayLabel: byId('todayLabel'), rawBody: $('#rawTable tbody'),
    recipeHead: $('#recipeTable thead'), recipeBody: $('#recipeTable tbody'), expenseList: byId('expenseList'),
    orderKg: byId('orderKg'), flourProduced: byId('flourProduced'), grindingCost: byId('grindingCost'),
    flourYield: byId('flourYield'), piecesMin: byId('piecesMinPerFlourKg'), piecesMax: byId('piecesMaxPerFlourKg'),
    sellingPrice: byId('sellingPrice'), rawChecklistBody: $('#rawChecklist tbody'),
    productionBody: $('#productionTable tbody'), stockAlerts: byId('stockAlertsList'),
    activityList: byId('activityList'), toastRegion: byId('toastRegion')
  };
  let loadWarning = false;
  let saveWarning = false;
  let toastTimer;
  let recordingRun = false;

  const num = value => Number(value) || 0;
  const fmt = value => Number(value || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 });
  const money = value => '₹' + fmt(value);
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
  const t = key => translations[state.language]?.[key] || translations.en[key] || key;
  const cloneDefaults = () => structuredClone(defaults);

  function toast(message, options = {}) {
    clearTimeout(toastTimer);
    const node = document.createElement('div');
    node.className = 'toast-message' + (options.error ? ' error' : '');
    const text = document.createElement('span');
    text.textContent = message;
    node.append(text);
    if (options.action) {
      const action = document.createElement('button');
      action.type = 'button';
      action.textContent = options.action.label;
      action.addEventListener('click', options.action.callback, { once: true });
      node.append(action);
    }
    elements.toastRegion.replaceChildren(node);
    if (!options.action) {
      toastTimer = setTimeout(() => node.remove(), 4800);
    }
  }

  function load() {
    let old;
    try {
      old = JSON.parse(localStorage.getItem(KEY) || '{}');
    } catch (error) {
      loadWarning = true;
      console.error('Unable to parse the saved Chakali Manager data.', error);
      return cloneDefaults();
    }

    try {
      const saved = { ...cloneDefaults(), ...old };
      saved.raw = Array.isArray(old.raw) ? old.raw : cloneDefaults().raw;
      const corrections = { 'उडीद डाळ': [55, 350], 'साबुदाणा': [225, 250], 'जिरे': [55, 225] };
      saved.raw.forEach(item => {
        const correction = corrections[item.name];
        if (correction && num(item.grams) === correction[0]) item.grams = correction[1];
      });
      if (!old.flourProduced || [3, 3.7].includes(num(old.flourProduced))) saved.flourProduced = 3.5;
      saved.expenses = Array.isArray(old.expenses)
        ? old.expenses.filter(item => !/^तेल\s*\/?\s*oil$/i.test(item.name || ''))
        : cloneDefaults().expenses;
      const oldRecipe = Array.isArray(old.recipe)
        ? old.recipe.filter(item => item && typeof item === 'object' && !Array.isArray(item))
        : [];
      if (oldRecipe.some(item => item.type === 'flour')) {
        // Retain custom entries in the normalized schema; migrate older base-batch records below.
        saved.recipe = oldRecipe.map(item => ({
          ...item,
          name: String(item.name ?? ''),
          qty: num(item.qty),
          unit: String(item.unit || 'g'),
          rate: num(item.rate)
        }));
      } else {
        const oldRates = {};
        oldRecipe.forEach(item => {
          const name = item.name === 'तिखट' ? 'लाल मिरची' : item.name;
          oldRates[name] = item.rate;
        });
        saved.recipe = cloneDefaults().recipe;
        saved.recipe.forEach(item => {
          if (oldRates[item.name] !== undefined && item.type !== 'flour') item.rate = num(oldRates[item.name]);
        });
      }
      saved.flourYield = num(old.flourYield) || 1.5;
      saved.piecesMinPerFlourKg = num(old.piecesMinPerFlourKg) || 60;
      saved.piecesMaxPerFlourKg = num(old.piecesMaxPerFlourKg) || 65;
      saved.productionHistory = Array.isArray(old.productionHistory)
        ? old.productionHistory.filter(run => run && Number.isFinite(Number(run.target)) && Number(run.target) > 0 && run.createdAt)
        : [];
      saved.language = old.language === 'en' ? 'en' : 'mr';
      return saved;
    } catch (error) {
      loadWarning = true;
      console.error('Unable to migrate the saved Chakali Manager data.', error);
      return cloneDefaults();
    }
  }

  let state = load();

  function rawGrams() {
    return state.raw.reduce((total, item) => total + num(item.grams), 0);
  }

  function rawCost() {
    return state.raw.reduce((total, item) => total + num(item.grams) * num(item.rate) / 1000, 0);
  }

  function flourUnitCost() {
    return state.flourProduced > 0 ? (rawCost() + num(state.grindingCost)) / state.flourProduced : 0;
  }

  function itemCost(item) {
    return item.type === 'flour' ? num(item.qty) * flourUnitCost() / 1000 : num(item.qty) * num(item.rate) / 1000;
  }

  function recipeCost() {
    return state.recipe.reduce((total, item) => total + itemCost(item), 0)
      + state.expenses.reduce((total, item) => total + num(item.amount), 0);
  }

  function productionMetrics() {
    const target = Math.max(0, num(elements.orderKg.value));
    const yieldKg = Math.max(.01, num(elements.flourYield.value));
    const minPieces = Math.max(0, num(elements.piecesMin.value));
    const maxPieces = Math.max(minPieces, num(elements.piecesMax.value));
    const flourNeed = target / yieldKg;
    const scale = state.flourProduced > 0 ? flourNeed / state.flourProduced : 0;
    let rawTotal = 0;
    state.raw.forEach(item => { rawTotal += num(item.grams) * scale; });
    const piecesMin = flourNeed * minPieces;
    const piecesMax = flourNeed * maxPieces;
    const rawCostForTarget = state.flourProduced > 0
      ? (rawCost() + num(state.grindingCost)) * flourNeed / state.flourProduced
      : 0;
    const recipeOtherCost = state.recipe.filter(item => item.type !== 'flour')
      .reduce((total, item) => total + itemCost(item), 0) * target;
    const expenseCost = state.expenses.reduce((total, item) => total + num(item.amount), 0) * target;
    return {
      target, yieldKg, flourNeed, scale, rawTotal, piecesMin, piecesMax,
      rawCostForTarget, recipeOtherCost, expenseCost, totalCost: rawCostForTarget + recipeOtherCost + expenseCost
    };
  }

  function renderRaw() {
    elements.rawBody.innerHTML = state.raw.map((item, index) => `
      <tr>
        <td><input class="form-control" data-list="raw" data-i="${index}" data-k="name" aria-label="${escapeHtml(t('ingredient'))}" value="${escapeHtml(item.name)}"></td>
        <td><input class="form-control" type="number" min="0" data-list="raw" data-i="${index}" data-k="grams" aria-label="${escapeHtml(t('batchWeight'))}" value="${num(item.grams)}" inputmode="decimal"></td>
        <td><input class="form-control" type="number" min="0" data-list="raw" data-i="${index}" data-k="stockGrams" aria-label="${escapeHtml(t('onHand'))}" placeholder="—" value="${item.stockGrams === undefined || item.stockGrams === null ? '' : num(item.stockGrams)}" inputmode="decimal"></td>
        <td><input class="form-control" type="number" min="0" data-list="raw" data-k="rate" aria-label="${escapeHtml(t('rate'))}" value="${num(item.rate)}" inputmode="decimal"></td>
        <td>${money(num(item.grams) * num(item.rate) / 1000)}</td>
        <td><button class="remove-button" type="button" data-remove="raw" data-i="${index}" aria-label="${t('remove')} ${escapeHtml(item.name)}">×</button></td>
      </tr>`).join('');
  }

  function renderRecipe() {
    elements.recipeHead.innerHTML = `<tr>
      <th>${t('rawHeader')}</th><th>${t('quantityHeader')}</th><th>${t('unitHeader')}</th>
      <th>${t('rateHeader')}</th><th>${t('costPerKgHeader')}</th><th></th>
    </tr>`;
    elements.recipeBody.innerHTML = state.recipe.map((item, index) => `
      <tr>
        <td><input class="form-control" data-list="recipe" data-i="${index}" data-k="name" aria-label="${escapeHtml(t('ingredient'))}" value="${escapeHtml(item.name)}"></td>
        <td><input class="form-control" type="number" min="0" step="any" data-list="recipe" data-i="${index}" data-k="qty" aria-label="${escapeHtml(t('quantityHeader'))}" value="${num(item.qty)}" ${item.type === 'flour' ? 'readonly' : ''}></td>
        <td><input class="form-control" value="${escapeHtml(item.unit || 'g')}" aria-label="${escapeHtml(t('unitHeader'))}" readonly></td>
        <td><input class="form-control" type="number" min="0" data-list="recipe" data-i="${index}" data-k="rate" aria-label="${escapeHtml(t('rate'))}" value="${num(item.rate)}" ${item.type === 'flour' ? 'disabled' : ''} inputmode="decimal"></td>
        <td>${money(itemCost(item))}</td>
        <td><button class="remove-button" type="button" data-remove="recipe" data-i="${index}" aria-label="${t('remove')} ${escapeHtml(item.name)}" ${item.type === 'flour' ? 'disabled' : ''}>×</button></td>
      </tr>`).join('');
    elements.expenseList.innerHTML = state.expenses.map((expense, index) => `
      <div class="expense-row">
        <input class="form-control" data-expense="${index}" data-k="name" aria-label="${escapeHtml(t('expenseName'))}" value="${escapeHtml(expense.name)}">
        <input class="form-control" type="number" min="0" data-expense="${index}" data-k="amount" aria-label="${escapeHtml(t('cost'))}" value="${num(expense.amount)}" inputmode="decimal">
        <button class="remove-button" type="button" data-remove="expenses" data-i="${index}" aria-label="${t('remove')} ${escapeHtml(expense.name)}">×</button>
      </div>`).join('');
    elements.sellingPrice.value = num(state.sellingPrice);
  }

  function renderChecklist() {
    const metrics = productionMetrics();
    const divisor = state.flourProduced * metrics.yieldKg;
    elements.rawChecklistBody.innerHTML = state.raw.map(item => {
      const quantity = num(item.grams) * metrics.scale;
      const perKg = divisor ? num(item.grams) / divisor : 0;
      return `<tr><td>${escapeHtml(item.name)}</td><td>${fmt(perKg)} g</td><td><strong>${fmt(quantity)} g</strong> <span class="muted">(${fmt(quantity / 1000)} kg)</span></td></tr>`;
    }).join('');
    elements.productionBody.innerHTML = state.recipe.map(item => {
      const quantity = num(item.qty) * metrics.target;
      return `<tr><td>${escapeHtml(item.name)}</td><td>${fmt(item.qty)} ${escapeHtml(item.unit)}</td><td><strong>${fmt(quantity)} ${escapeHtml(item.unit)}</strong></td><td>${money(itemCost(item) * metrics.target)}</td></tr>`;
    }).join('');
    byId('rawChecklistTotal').textContent = `${fmt(metrics.rawTotal)} g · ${fmt(metrics.rawTotal / 1000)} kg`;
    byId('flourRequired').textContent = `${fmt(metrics.flourNeed)} kg`;
    byId('pieceTotal').textContent = `${fmt(metrics.piecesMin)}–${fmt(metrics.piecesMax)}`;
    byId('rawRequired').textContent = `${fmt(metrics.rawTotal / 1000)} kg`;
    byId('orderCost').textContent = money(metrics.totalCost);
    byId('recipeOrderCost').textContent = money(metrics.recipeOtherCost + metrics.expenseCost);
    byId('summaryFinished').textContent = `${fmt(metrics.target)} kg`;
    byId('summaryFlour').textContent = `${fmt(metrics.flourNeed)} kg`;
    byId('summaryPieces').textContent = `${fmt(metrics.piecesMin)}–${fmt(metrics.piecesMax)}`;
    byId('summaryRaw').textContent = `${fmt(metrics.rawTotal / 1000)} kg`;
    byId('summaryCost').textContent = money(metrics.totalCost);
    return metrics;
  }

  function trackedStock(item) {
    return item.stockGrams !== undefined && item.stockGrams !== null && item.stockGrams !== '';
  }

  function renderDashboard(metrics) {
    const trackedItems = state.raw.filter(trackedStock);
    const totalStock = trackedItems.reduce((total, item) => total + num(item.stockGrams), 0);
    const totalProduction = state.productionHistory.reduce((total, run) => total + num(run.target), 0);
    byId('statProduction').textContent = `${fmt(totalProduction)} kg`;
    byId('statFlour').textContent = `${fmt(state.flourProduced)} kg`;
    byId('statStock').textContent = trackedItems.length ? `${fmt(totalStock / 1000)} kg` : t('notTracked');
    byId('stockCaption').textContent = trackedItems.length ? `${trackedItems.length} / ${state.raw.length} ${t('ingredient').toLowerCase()}` : t('noStockTracked');
    byId('statPieces').textContent = `${fmt(metrics.piecesMin)}–${fmt(metrics.piecesMax)}`;

    const lowStock = state.raw.filter(item => trackedStock(item)
      && num(item.stockGrams) < num(item.grams) * metrics.scale);
    const untrackedCount = state.raw.length - trackedItems.length;
    if (!trackedItems.length) {
      elements.stockAlerts.innerHTML = `<div class="empty-insight">${t('noStockTracked')} ${t('addStock')}</div>`;
    } else {
      const alerts = lowStock.map(item => `
        <div class="insight-item"><span class="insight-marker low" aria-hidden="true"></span><div>
          <strong>${escapeHtml(item.name)} · ${t('lowStock')}</strong>
          <small>${t('stockAmount')}: ${fmt(item.stockGrams)} g · ${t('rawNeeded')}: ${fmt(num(item.grams) * metrics.scale)} g</small>
        </div></div>`);
      if (untrackedCount) {
        alerts.push(`<div class="insight-item"><span class="insight-marker" aria-hidden="true"></span><div>
          <strong>${untrackedCount} ${t('unknownStock')}</strong><small>${t('unknownItems')}</small>
        </div></div>`);
      }
      if (!lowStock.length && !untrackedCount) {
        alerts.push(`<div class="empty-insight">${t('allStockReady')}</div>`);
      }
      elements.stockAlerts.innerHTML = alerts.join('');
    }

    if (!state.productionHistory.length) {
      elements.activityList.innerHTML = `<div class="empty-insight">${t('noRuns')} ${t('recordFirstRun')}</div>`;
      return;
    }
    const locale = state.language === 'mr' ? 'mr-IN' : 'en-IN';
    elements.activityList.innerHTML = [...state.productionHistory].reverse().slice(0, 5).map(run => {
      const date = new Date(run.createdAt);
      const dateText = Number.isNaN(date.getTime()) ? '' : new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short' }).format(date);
      return `<div class="activity-item"><span class="activity-mark" aria-hidden="true">↗</span>
        <div><strong>${t('batchLabel')} · ${fmt(run.target)} kg</strong><small>${fmt(run.piecesMin)}–${fmt(run.piecesMax)} ${t('piecesRange').toLowerCase()}</small></div>
        <span class="activity-date">${dateText}</span></div>`;
    }).join('');
  }

  function applyLanguage() {
    document.documentElement.lang = state.language;
    document.querySelectorAll('[data-i18n]').forEach(node => {
      const translation = translations[state.language][node.dataset.i18n];
      if (translation) node.textContent = translation;
    });
    byId('breadcrumb').textContent = t('breadcrumb');
    const activeView = document.querySelector('.page-view:not([hidden])');
    const titleKeys = {
      dashboard: 'dashboardTitle', grinding: 'grindingPageTitle',
      recipe: 'recipePageTitle', production: 'productionPageTitle'
    };
    elements.pageTitle.textContent = t(titleKeys[activeView.id]);
    byId('langToggle').setAttribute('aria-label', t('language'));
    byId('langToggleTop').setAttribute('aria-label', t('language'));
    elements.todayLabel.textContent = new Intl.DateTimeFormat(state.language === 'mr' ? 'mr-IN' : 'en-IN', {
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
    }).format(new Date());
  }

  function render() {
    renderRaw();
    renderRecipe();
    const grams = rawGrams();
    const yieldPct = grams ? state.flourProduced * 1000 / grams * 100 : 0;
    byId('rawSummary').textContent = `${fmt(grams)} g · ${fmt(grams / 1000)} kg`;
    byId('rawKg').textContent = `${fmt(grams / 1000)} kg`;
    byId('grindYield').textContent = `${fmt(yieldPct)}%`;
    byId('flourCostKg').textContent = money(flourUnitCost());
    byId('recipeCost').textContent = money(recipeCost());
    const profit = num(state.sellingPrice) - recipeCost();
    byId('profitKg').textContent = money(profit);
    byId('marginPct').textContent = state.sellingPrice ? `${fmt(profit / state.sellingPrice * 100)}%` : '0%';
    elements.flourProduced.value = num(state.flourProduced);
    elements.grindingCost.value = num(state.grindingCost);
    elements.flourYield.value = num(state.flourYield);
    elements.piecesMin.value = num(state.piecesMinPerFlourKg);
    elements.piecesMax.value = num(state.piecesMaxPerFlourKg);
    applyLanguage();
    const metrics = renderChecklist();
    renderDashboard(metrics);
  }

  function save() {
    let saved = true;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      saveWarning = false;
    } catch (error) {
      console.error('Unable to save Chakali Manager data in local storage.', error);
      if (!saveWarning) toast(t('saveFailed'), { error: true });
      saveWarning = true;
      saved = false;
    }
    render();
    return saved;
  }

  function showView(id) {
    const view = byId(id);
    if (!view || !view.classList.contains('page-view')) return;
    document.querySelectorAll('.page-view').forEach(section => { section.hidden = section !== view; });
    document.querySelectorAll('[data-view]').forEach(button => {
      const active = button.dataset.view === id;
      button.classList.toggle('active', active);
      button.setAttribute('aria-current', active ? 'page' : 'false');
    });
    elements.pageTitle.textContent = t({
      dashboard: 'dashboardTitle', grinding: 'grindingPageTitle',
      recipe: 'recipePageTitle', production: 'productionPageTitle'
    }[id]);
    if (window.matchMedia('(max-width: 760px)').matches) {
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
      window.scrollTo({ top: 0, behavior });
    }
  }

  function recordProduction() {
    if (recordingRun) return;
    recordingRun = true;
    try {
      const metrics = productionMetrics();
      if (!metrics.target) {
        toast(t('invalidTarget'), { error: true });
        return;
      }
      state.productionHistory.push({
        target: metrics.target,
        piecesMin: metrics.piecesMin,
        piecesMax: metrics.piecesMax,
        createdAt: new Date().toISOString()
      });
      state.productionHistory = state.productionHistory.slice(-20);
      if (save()) toast(t('runSaved'));
    } finally {
      recordingRun = false;
    }
  }

  function importBackup(file) {
    return file.text().then(text => {
      const imported = JSON.parse(text);
      if (!imported || typeof imported !== 'object' || Array.isArray(imported)
        || (imported.raw !== undefined && !Array.isArray(imported.raw))
        || (imported.recipe !== undefined && !Array.isArray(imported.recipe))
        || (imported.expenses !== undefined && !Array.isArray(imported.expenses))
        || (imported.productionHistory !== undefined && !Array.isArray(imported.productionHistory))
        || ['raw', 'recipe', 'expenses', 'productionHistory'].some(key =>
          Array.isArray(imported[key]) && imported[key].some(item => !item || typeof item !== 'object' || Array.isArray(item)))) {
        throw new TypeError('Backup structure is invalid.');
      }
      if (!window.confirm(t('importConfirm'))) return false;
      state = { ...cloneDefaults(), ...imported };
      state.productionHistory = Array.isArray(state.productionHistory) ? state.productionHistory : [];
      state.language = state.language === 'en' ? 'en' : 'mr';
      if (save()) toast(t('importSaved'));
      return true;
    });
  }

  document.addEventListener('click', event => {
    const viewButton = event.target.closest('[data-view]');
    if (viewButton) {
      event.preventDefault();
      showView(viewButton.dataset.view);
      return;
    }
    const targetButton = event.target.closest('[data-target]');
    if (targetButton) {
      elements.orderKg.value = targetButton.dataset.target;
      render();
      return;
    }
    const removeButton = event.target.closest('[data-remove]');
    if (removeButton) {
      const list = removeButton.dataset.remove;
      const index = Number(removeButton.dataset.i);
      if (!Array.isArray(state[list]) || !state[list][index]) return;
      if (list === 'recipe' && state.recipe[index].type === 'flour') return;
      state[list].splice(index, 1);
      save();
    }
  });

  document.addEventListener('change', event => {
    const input = event.target;
    if (input.matches('[data-list]')) {
      const list = input.dataset.list;
      const item = state[list]?.[Number(input.dataset.i)];
      const key = input.dataset.k;
      if (!item || !(key in item) && !(list === 'raw' && key === 'stockGrams')) return;
      if (item.type === 'flour' && key === 'qty') return;
      if (key === 'name') item[key] = input.value;
      else if (key === 'stockGrams' && input.value === '') delete item[key];
      else item[key] = num(input.value);
      save();
      return;
    }
    if (input.matches('[data-expense]')) {
      const expense = state.expenses[Number(input.dataset.expense)];
      if (!expense) return;
      expense[input.dataset.k] = input.dataset.k === 'name' ? input.value : num(input.value);
      save();
    }
  });

  byId('addRaw').addEventListener('click', () => {
    state.raw.push({ name: t('newIngredient'), grams: 0, rate: 0 });
    save();
  });
  byId('addRecipe').addEventListener('click', () => {
    state.recipe.push({ name: t('newIngredient'), qty: 0, unit: 'g', rate: 0 });
    save();
  });
  byId('addExpense').addEventListener('click', () => {
    state.expenses.push({ name: t('newExpense'), amount: 0 });
    save();
  });

  [
    [elements.flourProduced, 'flourProduced', value => Math.max(.001, num(value))],
    [elements.grindingCost, 'grindingCost', value => Math.max(0, num(value))],
    [elements.sellingPrice, 'sellingPrice', value => Math.max(0, num(value))],
    [elements.flourYield, 'flourYield', value => Math.max(.01, num(value))],
    [elements.piecesMin, 'piecesMinPerFlourKg', value => Math.max(0, num(value))],
    [elements.piecesMax, 'piecesMaxPerFlourKg', value => Math.max(state.piecesMinPerFlourKg, num(value))]
  ].forEach(([input, key, normalize]) => {
    input.addEventListener('change', event => {
      state[key] = normalize(event.target.value);
      save();
    });
  });
  elements.orderKg.addEventListener('input', () => {
    const metrics = renderChecklist();
    renderDashboard(metrics);
  });
  byId('openProduction').addEventListener('click', () => showView('production'));
  byId('recordProduction').addEventListener('click', recordProduction);
  byId('saveGrinding').addEventListener('click', () => {
    if (save()) toast(t('grindingSaved'));
  });
  byId('saveRecipe').addEventListener('click', () => {
    if (save()) toast(t('recipeSaved'));
  });
  byId('resetRaw').addEventListener('click', () => {
    if (!window.confirm(t('resetConfirm'))) return;
    state.raw = cloneDefaults().raw;
    state.flourProduced = 3.5;
    if (save()) toast(t('resetSaved'));
  });
  const toggleLanguage = () => {
    state.language = state.language === 'mr' ? 'en' : 'mr';
    save();
  };
  byId('exportBtn').addEventListener('click', exportBackup);
  byId('topExport').addEventListener('click', exportBackup);
  byId('importFile').addEventListener('change', event => {
    const file = event.target.files[0];
    if (!file) return;
    importBackup(file).catch(error => {
      console.error('Unable to import Chakali Manager backup.', error);
      toast(t('invalidBackup'), { error: true });
    }).finally(() => { event.target.value = ''; });
  });
  byId('langToggle').addEventListener('click', toggleLanguage);
  byId('langToggleTop').addEventListener('click', toggleLanguage);
  byId('todayLabel').textContent = new Intl.DateTimeFormat(state.language === 'mr' ? 'mr-IN' : 'en-IN', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
  }).format(new Date());
  render();
  if (loadWarning) toast(t('loadFailed'), { error: true });

  function exportBackup() {
    try {
      const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'chakali-manager-backup.json';
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      console.error('Unable to export Chakali Manager data.', error);
      toast(t('invalidBackup'), { error: true });
    }
  }

  if ('serviceWorker' in navigator) {
    let applyUpdate = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (applyUpdate) window.location.reload();
    });
    navigator.serviceWorker.register('./service-worker.js').then(registration => {
      const showUpdate = worker => toast(t('updateReady'), {
        action: { label: t('updateButton'), callback: () => {
          applyUpdate = true;
          worker.postMessage({ type: 'SKIP_WAITING' });
        } }
      });
      if (registration.waiting && navigator.serviceWorker.controller) showUpdate(registration.waiting);
      registration.addEventListener('updatefound', () => {
        const worker = registration.installing;
        if (!worker) return;
        worker.addEventListener('statechange', () => {
          if (worker.state === 'installed' && navigator.serviceWorker.controller) showUpdate(worker);
        });
      });
    }).catch(error => {
      console.error('Unable to register the Chakali Manager offline app shell.', error);
      toast(t('serviceWorkerFailed'), { error: true });
    });
  }
})();
