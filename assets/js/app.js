/* Chakali Manager v1.1 — separate Grinding and Recipe ingredients */
(() => {
'use strict';
const KEY='chakali-manager-v1';
const rawDefaults=[['मूग डाळ',500,120],['उडीद डाळ',55,150],['साबुदाणा',225,90],['धणे',177,140],['जिरे',55,220],['तांदूळ',2000,55],['हरभरा डाळ',1000,90],['पोहे',100,60]];
const recipeDefaults=[
{name:'चकलीचे पीठ',qty:850,unit:'g',rate:0,type:'flour'},
{name:'तेल',qty:100,unit:'ml',rate:140,type:'oil'},
{name:'ओवा',qty:5,unit:'g',rate:300},{name:'हिंग',qty:1,unit:'g',rate:1800},
{name:'लाल मिरची',qty:25,unit:'g',rate:400},{name:'तीळ',qty:30,unit:'g',rate:220},{name:'मीठ',qty:15,unit:'g',rate:20}
];
const defaults={raw:rawDefaults.map(x=>({name:x[0],grams:x[1],rate:x[2]})),flourProduced:3.7,grindingCost:150,recipe:recipeDefaults.map(x=>({...x})),expenses:[{name:'पॅकिंग / Packaging',amount:25},{name:'गॅस, वीज व मजुरी',amount:35}],sellingPrice:450,piecesPerKg:40,orders:[]};
const $=s=>document.querySelector(s),num=n=>Number(n)||0,fmt=n=>Number(n||0).toLocaleString('en-IN',{maximumFractionDigits:2}),money=n=>'₹'+fmt(n);
function load(){
 try{
 const old=JSON.parse(localStorage.getItem(KEY)||'{}'),s={...structuredClone(defaults),...old};
 s.raw=Array.isArray(old.raw)?old.raw:structuredClone(defaults.raw);
 s.expenses=Array.isArray(old.expenses)?old.expenses.filter(x=>!/^तेल\s*\/?\s*oil$/i.test(x.name||'')):structuredClone(defaults.expenses);
 s.recipe=structuredClone(defaults.recipe);
 (Array.isArray(old.recipe)?old.recipe:[]).forEach(x=>{
  let name=x.name==='तिखट'?'लाल मिरची':(x.name==='चकली पीठ'?'चकलीचे पीठ':x.name);
  let target=s.recipe.find(y=>y.name===name);
  if(target){target.qty=num(x.qty);if(target.type!=='flour'&&x.rate!==undefined)target.rate=num(x.rate);}
  else if(name&&name!=='तेल / Oil')s.recipe.push({name:name,qty:num(x.qty),unit:'g',rate:num(x.rate)});
 });
 return s;
 }catch(e){return structuredClone(defaults)}
}
let state=load();
function rawGrams(){return state.raw.reduce((a,x)=>a+num(x.grams),0)}
function rawCost(){return state.raw.reduce((a,x)=>a+num(x.grams)*num(x.rate)/1000,0)}
function flourUnitCost(){return state.flourProduced>0?(rawCost()+num(state.grindingCost))/state.flourProduced:0}
function itemCost(x){return x.type==='flour'||/पीठ|flour/i.test(x.name)?num(x.qty)*flourUnitCost()/1000:num(x.qty)*num(x.rate)/1000}
function recipeCost(){return state.recipe.reduce((a,x)=>a+itemCost(x),0)+state.expenses.reduce((a,x)=>a+num(x.amount),0)}
function esc(s){return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function save(){localStorage.setItem(KEY,JSON.stringify(state));render()}
function renderRaw(){
 $('#rawTable tbody').innerHTML=state.raw.map((x,i)=>'<tr><td><input class="form-control form-control-sm" data-list="raw" data-i="'+i+'" data-k="name" value="'+esc(x.name)+'"></td><td><input class="form-control form-control-sm" type="number" min="0" data-list="raw" data-i="'+i+'" data-k="grams" value="'+x.grams+'"></td><td><input class="form-control form-control-sm" type="number" min="0" data-list="raw" data-i="'+i+'" data-k="rate" value="'+x.rate+'"></td><td>'+money(x.grams*x.rate/1000)+'</td><td><button class="btn btn-sm btn-link text-danger" data-remove="raw" data-i="'+i+'">✕</button></td></tr>').join('');
}
function renderRecipe(){
 $('#recipeTable thead').innerHTML='<tr><th>Ingredient / साहित्य</th><th>Qty / kg chakali</th><th>Unit</th><th>Rate</th><th>Cost / kg</th><th></th></tr>';
 $('#recipeTable tbody').innerHTML=state.recipe.map((x,i)=>'<tr><td><input class="form-control form-control-sm" data-list="recipe" data-i="'+i+'" data-k="name" value="'+esc(x.name)+'"></td><td><input class="form-control form-control-sm" type="number" min="0" data-list="recipe" data-i="'+i+'" data-k="qty" value="'+x.qty+'"></td><td><select class="form-select form-select-sm" data-list="recipe" data-i="'+i+'" data-k="unit"><option value="g" '+(x.unit!=='ml'?'selected':'')+'>g</option><option value="ml" '+(x.unit==='ml'?'selected':'')+'>ml</option></select></td><td><input class="form-control form-control-sm" type="number" min="0" data-list="recipe" data-i="'+i+'" data-k="rate" value="'+x.rate+'" '+(x.type==='flour'?'disabled':'')+'><small class="text-secondary">'+(x.unit==='ml'?'₹/L':'₹/kg')+'</small></td><td>'+money(itemCost(x))+'</td><td><button class="btn btn-sm btn-link text-danger" data-remove="recipe" data-i="'+i+'" '+(x.type==='flour'?'disabled':'')+'>✕</button></td></tr>').join('');
 $('#expenseList').innerHTML=state.expenses.map((x,i)=>'<div class="expense-row"><input class="form-control form-control-sm" data-expense="'+i+'" data-k="name" value="'+esc(x.name)+'"><input class="form-control form-control-sm" type="number" min="0" data-expense="'+i+'" data-k="amount" value="'+x.amount+'"><button class="btn btn-sm btn-outline-danger" data-remove="expenses" data-i="'+i+'">×</button></div>').join('');
 $('#sellingPrice').value=state.sellingPrice;
}
function renderProduction(){
 const kg=num($('#orderKg').value),flour=state.recipe.find(x=>x.type==='flour'||/पीठ|flour/i.test(x.name));
 $('#piecesPerKg').value=state.piecesPerKg;$('#pieceTotal').textContent=fmt(kg*state.piecesPerKg);
 $('#flourRequired').textContent=fmt(kg*(flour?flour.qty:0)/1000)+' kg';
 $('#productionTable tbody').innerHTML=state.recipe.map(x=>'<tr><td>'+esc(x.name)+'</td><td>'+fmt(x.qty)+' '+x.unit+'</td><td>'+fmt(x.qty*kg)+' '+x.unit+'</td><td>'+money(itemCost(x)*kg)+'</td></tr>').join('');
 const raw=rawGrams()/1000,needFlour=kg*(flour?flour.qty:0)/1000;
 $('#rawRequired').textContent=raw&&state.flourProduced?fmt(raw*needFlour/state.flourProduced)+' kg raw input (estimated)':'Add grinding batch';
 $('#orderCost').textContent=money(recipeCost()*kg);
}
function renderOrders(){
 $('#ordersBody').innerHTML=state.orders.map(o=>'<tr><td>'+new Date(o.date).toLocaleDateString('en-IN')+'</td><td>'+fmt(o.kg)+' kg</td><td>'+fmt(o.pieces)+'</td><td>'+money(o.cost)+'</td><td><span class="badge text-bg-warning">Planned</span></td></tr>').join('');
 $('#emptyOrders').classList.toggle('d-none',state.orders.length>0);
}
function render(){
 renderRaw();renderRecipe();renderProduction();
 const g=rawGrams(),y=g?state.flourProduced*1000/g*100:0;
 $('#rawSummary').textContent=fmt(g)+' g · '+fmt(g/1000)+' kg';$('#statRaw').textContent=fmt(g)+' g';$('#statFlour').textContent=fmt(state.flourProduced)+' kg';$('#statCost').textContent=money(recipeCost());$('#statYield').textContent=fmt(y)+'%';
 $('#rawKg').textContent=fmt(g/1000)+' kg';$('#grindYield').textContent=fmt(y)+'%';$('#flourCostKg').textContent=money(flourUnitCost());
 $('#recipeCost').textContent=money(recipeCost());const profit=num(state.sellingPrice)-recipeCost();$('#profitKg').textContent=money(profit);$('#marginPct').textContent=state.sellingPrice?fmt(profit/state.sellingPrice*100)+'%':'0%';
 $('#flourProduced').value=state.flourProduced;$('#grindingCost').value=state.grindingCost;renderOrders();
}
document.addEventListener('change',e=>{
 const el=e.target;
 if(el.matches('[data-list]')){const x=state[el.dataset.list][Number(el.dataset.i)],k=el.dataset.k;x[k]=(k==='name'||k==='unit')?el.value:num(el.value);if(el.dataset.list==='recipe'&&x.name==='तेल')x.unit='ml';save()}
 if(el.matches('[data-expense]')){const x=state.expenses[Number(el.dataset.expense)];x[el.dataset.k]=el.dataset.k==='name'?el.value:num(el.value);save()}
});
document.addEventListener('click',e=>{const b=e.target.closest('[data-remove]');if(b){state[b.dataset.remove].splice(Number(b.dataset.i),1);save()}});
$('#addRaw').onclick=()=>{state.raw.push({name:'नवीन साहित्य',grams:0,rate:0});save()};
$('#addRecipe').onclick=()=>{state.recipe.push({name:'नवीन साहित्य',qty:0,unit:'g',rate:0});save()};
$('#addExpense').onclick=()=>{state.expenses.push({name:'इतर खर्च',amount:0});save()};
$('#flourProduced').onchange=e=>{state.flourProduced=num(e.target.value);save()};
$('#grindingCost').onchange=e=>{state.grindingCost=num(e.target.value);save()};
$('#sellingPrice').onchange=e=>{state.sellingPrice=num(e.target.value);save()};
$('#piecesPerKg').onchange=e=>{state.piecesPerKg=num(e.target.value);save()};
$('#orderKg').oninput=renderProduction;
$('#saveGrinding').onclick=()=>{save();alert('Grinding batch saved in this browser.')};
$('#saveRecipe').onclick=()=>{save();alert('Recipe and costing saved.')};
$('#createOrder').onclick=()=>{const kg=num($('#orderKg').value);if(kg<=0)return alert('Enter a valid order quantity.');state.orders.unshift({id:Date.now(),date:new Date().toISOString(),kg:kg,pieces:kg*state.piecesPerKg,cost:kg*recipeCost()});save();document.querySelector('[data-bs-target="#orders"]').click()};
$('#clearOrders').onclick=()=>{if(confirm('Delete all saved orders?')){state.orders=[];save()}};
$('#resetRaw').onclick=()=>{if(confirm('Restore sample grinding list?')){state.raw=structuredClone(defaults.raw);save()}};
$('#exportBtn').onclick=()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='chakali-manager-backup.json';a.click();URL.revokeObjectURL(a.href)};
$('#importFile').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{state={...structuredClone(defaults),...JSON.parse(await f.text())};save();alert('Data imported successfully.')}catch{alert('Invalid backup file.')}e.target.value=''};
$('#langToggle').onclick=()=>alert('Marathi and English labels are shown together in this release.');
render();
})();