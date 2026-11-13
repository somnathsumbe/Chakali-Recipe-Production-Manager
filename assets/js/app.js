/* Chakali Recipe & Production Manager — Vanilla ES6, browser LocalStorage only */
(() => {
'use strict';
const KEY='chakali-manager-v1';
const sampleRaw=[['मूग डाळ',500,120],['उडद डाळ',55,150],['साबुदाणा',225,90],['धणे',177,140],['जिरे',55,220],['तांदूळ',2000,55],['हरभरा डाळ',1000,90],['पोहे',100,60]];
const sampleRecipe=[['चकली पीठ',850,0],['तीळ',30,180],['तिखट',25,240],['ओवा',5,200],['मीठ',15,20]];
const defaults={raw:sampleRaw.map(([name,grams,rate])=>({name,grams,rate})),flourProduced:3.7,grindingCost:150,recipe:sampleRecipe.map(([name,qty,rate])=>({name,qty,rate})),expenses:[{name:'तेल / Oil',amount:90},{name:'पॅकिंग / Packaging',amount:25},{name:'गॅस, वीज व मजुरी',amount:35}],sellingPrice:450,piecesPerKg:40,orders:[]};
let state=load();
const $=s=>document.querySelector(s), money=n=>'₹'+Number(n||0).toLocaleString('en-IN',{maximumFractionDigits:2}), num=n=>Number(n)||0, fmt=n=>Number(n||0).toLocaleString('en-IN',{maximumFractionDigits:2});
function load(){try{return {...structuredClone(defaults),...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{return structuredClone(defaults)}}
function save(){localStorage.setItem(KEY,JSON.stringify(state));render()}
function rawGrams(){return state.raw.reduce((s,x)=>s+num(x.grams),0)}
function rawCost(){return state.raw.reduce((s,x)=>s+num(x.grams)*num(x.rate)/1000,0)}
function flourKg(){return num(state.flourProduced)}
function flourUnitCost(){return flourKg()>0?(rawCost()+num(state.grindingCost))/flourKg():0}
function recipeUnitCost(){const ingredients=state.recipe.reduce((s,x)=>s+num(x.qty)*num(x.rate)/1000,0);return ingredients+num(state.expenses.reduce((s,x)=>s+num(x.amount),0))+flourUnitCost()*state.recipe.filter(x=>/पीठ|flour/i.test(x.name)).reduce((s,x)=>s+num(x.qty)/1000,0)}
function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function renderRaw(){$('#rawTable tbody').innerHTML=state.raw.map((x,i)=>`<tr><td><input class="form-control form-control-sm" data-list="raw" data-i="${i}" data-k="name" value="${esc(x.name)}"></td><td><input class="form-control form-control-sm" type="number" min="0" data-list="raw" data-i="${i}" data-k="grams" value="${x.grams}"></td><td><input class="form-control form-control-sm" type="number" min="0" data-list="raw" data-i="${i}" data-k="rate" value="${x.rate}"></td><td class="fw-semibold">${money(x.grams*x.rate/1000)}</td><td><button class="btn btn-sm btn-link text-danger" data-remove="raw" data-i="${i}">✕</button></td></tr>`).join('')}
function renderRecipe(){$('#recipeTable tbody').innerHTML=state.recipe.map((x,i)=>`<tr><td><input class="form-control form-control-sm" data-list="recipe" data-i="${i}" data-k="name" value="${esc(x.name)}"></td><td><input class="form-control form-control-sm" type="number" min="0" data-list="recipe" data-i="${i}" data-k="qty" value="${x.qty}"></td><td><input class="form-control form-control-sm" type="number" min="0" data-list="recipe" data-i="${i}" data-k="rate" value="${x.rate}"></td><td><button class="btn btn-sm btn-link text-danger" data-remove="recipe" data-i="${i}">✕</button></td></tr>`).join('');$('#expenseList').innerHTML=state.expenses.map((x,i)=>`<div class="expense-row"><input class="form-control form-control-sm" data-expense="${i}" data-k="name" value="${esc(x.name)}"><input class="form-control form-control-sm" type="number" min="0" data-expense="${i}" data-k="amount" value="${x.amount}"><button class="btn btn-sm btn-outline-danger" data-remove="expenses" data-i="${i}">×</button></div>`).join('');$('#sellingPrice').value=state.sellingPrice}
function renderProduction(){const kg=num($('#orderKg').value)||0,pieces=num(state.piecesPerKg)*kg;$('#piecesPerKg').value=state.piecesPerKg;$('#pieceTotal').textContent=fmt(pieces);$('#flourRequired').textContent=fmt(kg)+' kg';const tbody=$('#productionTable tbody');tbody.innerHTML=state.recipe.map(x=>{const qty=num(x.qty)*kg;return `<tr><td>${esc(x.name)}</td><td>${fmt(x.qty)} g</td><td>${fmt(qty)} g</td><td>${money(qty*x.rate/1000)}</td></tr>`}).join('');const baseRaw=rawGrams()>0?rawGrams()/1000:0;$('#rawRequired').textContent=baseRaw?fmt(baseRaw*kg/(flourKg()||1))+' kg raw input (estimated)':'Add grinding batch';$('#orderCost').textContent=money(recipeUnitCost()*kg)}
function render(){renderRaw();renderRecipe();renderProduction();const grams=rawGrams(),yieldPct=grams?flourKg()*1000/grams*100:0;$('#rawSummary').textContent=fmt(grams)+' g · '+fmt(grams/1000)+' kg';$('#statRaw').textContent=fmt(grams)+' g';$('#statFlour').textContent=fmt(flourKg())+' kg';$('#statCost').textContent=money(recipeUnitCost());$('#statYield').textContent=state.piecesPerKg+' pcs/kg';$('#rawKg').textContent=fmt(grams/1000)+' kg';$('#grindYield').textContent=fmt(yieldPct)+'%';$('#flourCostKg').textContent=money(flourUnitCost());$('#statCost').textContent=money(recipeUnitCost());$('#recipeCost').textContent=money(recipeUnitCost());const profit=num(state.sellingPrice)-recipeUnitCost();$('#profitKg').textContent=money(profit);$('#marginPct').textContent=state.sellingPrice?fmt(profit/state.sellingPrice*100)+'%':'0%';$('#flourProduced').value=state.flourProduced;$('#grindingCost').value=state.grindingCost;renderOrders()}
function renderOrders(){$('#ordersBody').innerHTML=state.orders.map(o=>`<tr><td>${new Date(o.date).toLocaleDateString('en-IN')}</td><td>${fmt(o.kg)} kg</td><td>${fmt(o.pieces)}</td><td>${money(o.cost)}</td><td><span class="badge text-bg-warning">Planned</span></td></tr>`).join('');$('#emptyOrders').classList.toggle('d-none',state.orders.length>0)}
function updateField(el){const i=Number(el.dataset.i),k=el.dataset.k,list=el.dataset.list;if(list&&state[list]?.[i])state[list][i][k]=k==='name'?el.value:num(el.value);if(el.dataset.expense!==undefined){const x=state.expenses[Number(el.dataset.expense)];if(x)x[k]=k==='name'?el.value:num(el.value)}}
document.addEventListener('change',e=>{const el=e.target;if(el.matches('[data-list],[data-expense]')){updateField(el);save()}});
document.addEventListener('click',e=>{const b=e.target.closest('[data-remove]');if(b){state[b.dataset.remove].splice(Number(b.dataset.i),1);save()}});
$('#addRaw').onclick=()=>{state.raw.push({name:'New ingredient',grams:0,rate:0});save()};
$('#addRecipe').onclick=()=>{state.recipe.push({name:'New ingredient',qty:0,rate:0});save()};
$('#addExpense').onclick=()=>{state.expenses.push({name:'Other expense',amount:0});save()};
$('#flourProduced').onchange=e=>{state.flourProduced=num(e.target.value);save()};
$('#grindingCost').onchange=e=>{state.grindingCost=num(e.target.value);save()};
$('#sellingPrice').onchange=e=>{state.sellingPrice=num(e.target.value);save()};
$('#piecesPerKg').onchange=e=>{state.piecesPerKg=num(e.target.value);save()};
$('#orderKg').oninput=renderProduction;
$('#saveGrinding').onclick=()=>{save();alert('Grinding batch saved in this browser.')};
$('#saveRecipe').onclick=()=>{save();alert('Recipe and costing saved.')};
$('#createOrder').onclick=()=>{const kg=num($('#orderKg').value);if(kg<=0)return alert('Enter a valid order quantity.');state.orders.unshift({id:Date.now(),date:new Date().toISOString(),kg,pieces:kg*state.piecesPerKg,cost:kg*recipeUnitCost()});save();document.querySelector('[data-bs-target="#orders"]').click()};
$('#clearOrders').onclick=()=>{if(confirm('Delete all saved orders?')){state.orders=[];save()}};
$('#resetRaw').onclick=()=>{if(confirm('Restore sample raw material list?')){state.raw=structuredClone(defaults.raw);save()}};
$('#exportBtn').onclick=()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='chakali-manager-backup.json';a.click();URL.revokeObjectURL(a.href)};
$('#importFile').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{const imported=JSON.parse(await f.text());state={...structuredClone(defaults),...imported};save();alert('Data imported successfully.')}catch{alert('Invalid backup file.')}e.target.value=''};
$('#langToggle').onclick=()=>alert('Marathi and English labels are shown together in this starter release.');
render();
})();