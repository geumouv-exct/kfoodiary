const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const STORE_KEY = "kfood-dodam-v3";
const AUTH_KEY = "kfood-dodam-auth";
const STATE_DB_NAME = "kfood-dodam-account-data";
const STATE_DB_STORE = "accounts";
const DRIVE_SCOPE = "https://www.googleapis.com/auth/drive.appdata";
const DRIVE_STATE_FILE = "kfoodiary-account-state.json";

const dishDB = [
  ["Tteokbokki","떡볶이","Sweet and spicy rice cakes","Street Food","Seoul","🌶️"],
  ["Gimbap","김밥","Seaweed rice rolls with fillings","Home Meal","Busan","🍙"],
  ["Bibimbap","비빔밥","Mixed rice with vegetables","Home Meal","Jeonju","🥗"],
  ["Hotteok","호떡","Sweet pancake with brown sugar","Street Food","Seoul","🥞"],
  ["Bungeoppang","붕어빵","Fish-shaped pastry with sweet filling","Street Food","Seoul","🐟"],
  ["Korean Corn Dog","핫도그","Crispy chewy corn dog","Street Food","Seoul","🌭"],
  ["Japchae","잡채","Stir-fried glass noodles","Home Meal","Seoul","🍜"],
  ["Sundubu-jjigae","순두부찌개","Spicy soft tofu stew","Soup","Jeju","🍲"],
  ["Mandu","만두","Korean dumplings","Snack","Seoul","🥟"],
  ["Kimchi-jjigae","김치찌개","Kimchi stew with deep flavor","Soup","Seoul","🍲"],
  ["Samgyeopsal","삼겹살","Grilled pork belly","BBQ","Seoul","🥓"],
  ["Jjajangmyeon","짜장면","Black bean sauce noodles","Noodles","Incheon","🍝"],
  ["Naengmyeon","냉면","Cold buckwheat noodles","Noodles","Pyongyang","🍜"],
  ["Bulgogi","불고기","Sweet soy marinated beef","BBQ","Seoul","🥩"],
  ["Dakgalbi","닭갈비","Spicy stir-fried chicken","BBQ","Chuncheon","🍗"],
  ["Kalguksu","칼국수","Knife-cut noodle soup","Noodles","Seoul","🍜"],
  ["Pajeon","파전","Savory scallion pancake","Snack","Busan","🥞"],
  ["Odeng","오뎅","Warm fish cake skewers","Street Food","Busan","🍢"],
  ["Gyeran-ppang","계란빵","Egg bread street snack","Street Food","Seoul","🥚"],
  ["Jokbal","족발","Braised pig's trotters","Night Food","Seoul","🍖"],
  ["Bossam","보쌈","Boiled pork wraps","Home Meal","Seoul","🥬"],
  ["Galbitang","갈비탕","Short rib soup","Soup","Seoul","🥣"],
  ["Seolleongtang","설렁탕","Ox bone soup","Soup","Seoul","🥣"],
  ["Samgyetang","삼계탕","Ginseng chicken soup","Soup","Seoul","🍗"],
  ["Maeuntang","매운탕","Spicy fish stew","Soup","Busan","🐟"],
  ["Haemul Pajeon","해물파전","Seafood scallion pancake","Snack","Busan","🦑"],
  ["Tangsuyuk","탕수육","Sweet sour fried pork","Fried","Incheon","🍖"],
  ["Kkanpunggi","깐풍기","Spicy garlic fried chicken","Fried","Seoul","🍗"],
  ["Yangnyeom Chicken","양념치킨","Sweet spicy fried chicken","Fried","Daegu","🍗"],
  ["Soy Garlic Chicken","간장치킨","Crispy soy garlic chicken","Fried","Seoul","🍗"],
  ["Jumeokbap","주먹밥","Korean rice balls","Home Meal","Seoul","🍙"],
  ["Kimbap Triangle","삼각김밥","Convenience store rice triangle","Snack","Seoul","🍙"],
  ["Kimchi Fried Rice","김치볶음밥","Fried rice with kimchi","Home Meal","Seoul","🍚"],
  ["Budae-jjigae","부대찌개","Army base stew","Soup","Uijeongbu","🍲"],
  ["Doenjang-jjigae","된장찌개","Soybean paste stew","Soup","Seoul","🍲"],
  ["Janchi-guksu","잔치국수","Banquet noodle soup","Noodles","Seoul","🍜"],
  ["Makguksu","막국수","Buckwheat noodles","Noodles","Chuncheon","🍜"],
  ["Sotteok-sotteok","소떡소떡","Sausage and rice cake skewer","Street Food","Seoul","🍢"],
  ["Dakkochi","닭꼬치","Chicken skewer","Street Food","Seoul","🍢"],
  ["Gungjung Tteokbokki","궁중떡볶이","Royal soy sauce rice cakes","Home Meal","Seoul","🍽️"],
  ["Yukhoe","육회","Korean beef tartare","Special","Seoul","🥩"],
  ["Ganjang Gejang","간장게장","Soy marinated crab","Seafood","Incheon","🦀"],
  ["Agujjim","아귀찜","Spicy braised monkfish","Seafood","Masan","🐟"],
  ["Mulhoe","물회","Spicy cold raw fish soup","Seafood","Pohang","🐟"],
  ["Hoe","회","Korean sliced raw fish","Seafood","Busan","🍣"],
  ["Gopchang","곱창","Grilled beef intestines","BBQ","Daegu","🥘"],
  ["Makchang","막창","Grilled entrails","BBQ","Daegu","🥘"],
  ["Dakbal","닭발","Spicy chicken feet","Night Food","Seoul","🌶️"],
  ["Patbingsu","팥빙수","Shaved ice with red beans","Dessert","Seoul","🍧"],
  ["Yakgwa","약과","Honey cookie dessert","Dessert","Seoul","🍪"],
  ["Songpyeon","송편","Half-moon rice cake","Dessert","Seoul","🍡"],
  ["Injeolmi","인절미","Roasted soybean rice cake","Dessert","Seoul","🍡"],
  ["Hodu-gwaja","호두과자","Walnut-shaped pastry","Dessert","Cheonan","🥮"],
  ["Kkwabaegi","꽈배기","Twisted Korean doughnut","Dessert","Seoul","🥨"],
  ["Gamja Hotdog","감자핫도그","Potato coated corn dog","Street Food","Seoul","🌭"],
  ["Kongguksu","콩국수","Cold soy milk noodles","Noodles","Seoul","🍜"],
  ["Ganjang Bibim Guksu","간장비빔국수","Soy sauce mixed noodles","Noodles","Seoul","🍜"],
  ["Ojingeo Bokkeum","오징어볶음","Spicy stir-fried squid","Seafood","Busan","🦑"],
  ["Kimchi Jeon","김치전","Kimchi pancake","Snack","Seoul","🥞"],
  ["Garaetteok","가래떡","Long cylinder rice cake","Snack","Seoul","🍡"]
].map((d, i) => ({ id: `dish-${i+1}`, name:d[0], kr:d[1], desc:d[2], category:d[3], city:d[4], emoji:d[5] }));

const stampDB = [
  ["First Bite","Add your first dish",1,s=>s.total>=1,"✨"],
  ["Tteokbokki Lover","Collect Tteokbokki",1,s=>s.names.has("tteokbokki")||s.kr.has("떡볶이"),"🌶️"],
  ["Street Food Explorer","Collect 3 street foods",2,s=>s.category("Street Food")>=3,"🍢"],
  ["Seoul Starter","Eat in Seoul twice",2,s=>s.city("seoul")>=2,"🌃"],
  ["Favorite Keeper","Mark 3 favorites",2,s=>s.favorites>=3,"💚"],
  ["Soup Master","Collect 4 soups",3,s=>s.category("Soup")>=4,"🍲"],
  ["Noodle Hunter","Collect 5 noodle dishes",3,s=>s.category("Noodles")>=5,"🍜"],
  ["Busan Taster","Try 3 dishes from Busan",3,s=>s.city("busan")>=3,"🌊"],
  ["Seven Day Dodam","Collect 7 meals",3,s=>s.total>=7,"📅"],
  ["Dessert Friend","Collect 4 desserts",4,s=>s.category("Dessert")>=4,"🍧"],
  ["Spicy Challenger","Add 8 spicy/street dishes",4,s=>s.spicy>=8,"🔥"],
  ["City Hopper","Collect from 4 cities",4,s=>s.cities>=4,"📍"],
  ["BBQ Party","Collect 5 BBQ foods",5,s=>s.category("BBQ")>=5,"🥩"],
  ["Fried Crunch","Collect 4 fried foods",5,s=>s.category("Fried")>=4,"🍗"],
  ["Sea Breeze","Collect 5 seafood dishes",5,s=>s.category("Seafood")>=5,"🦀"],
  ["Monthly Collector","Collect 15 meals",6,s=>s.total>=15,"🏅"],
  ["Local Guide","Visit 8 restaurants",6,s=>s.restaurants>=8,"🏪"],
  ["Five City Feast","Collect from 5 cities",6,s=>s.cities>=5,"🗺️"],
  ["K-Food Scholar","Unlock 20 book pages",7,s=>s.unlocked>=20,"📖"],
  ["Favorite Legend","Mark 10 favorites",7,s=>s.favorites>=10,"💖"],
  ["Stamp Collector","Unlock 15 stamps",8,s=>s.unlockedStamps>=15,"⭐"],
  ["K-Food Master","Collect 30 meals",8,s=>s.total>=30,"👑"],
  ["World Host","Collect 12 categories",9,s=>s.categories>=12,"🌏"],
  ["Dodam Complete","Unlock all 60 K-food pages",10,s=>s.unlocked>=60,"🌱"]
].map((x,i)=>({id:`stamp-${i+1}`, title:x[0], requirement:x[1], level:x[2], test:x[3], emoji:x[4]}));

let authUser = loadAuthUser();
let state = loadState();
let isRestoringAccountState = !!authUser;
let viewMonth = new Date().getMonth();
let viewYear = new Date().getFullYear();
let uploadData = null;
let googlePlacesLoaded = false;
let googleInitializedClientId = "";
let googleScriptFailed = false;
let isSavingRecord = false;
let isPreparingPhoto = false;
let photoSelectionId = 0;
let driveAccessToken = "";
let driveAccessTokenExpiresAt = 0;
let driveTokenEmail = "";
let driveTokenRequest = null;
let driveTokenPending = null;
let driveTokenPendingEmail = "";
let driveStateFileId = "";
let isCloudSyncReady = false;
let isCloudSyncing = false;
let cloudSyncStatus = "";
let accountSaveQueue = Promise.resolve();
let initialAccountRestore = Promise.resolve();
let driveStartupRestoreStarted = false;

function isLocalPreviewHost(){
  return ["localhost", "127.0.0.1", "::1", "[::1]"].includes(window.location.hostname);
}

function loadAuthUser(){
  try {
    const user = JSON.parse(localStorage.getItem(AUTH_KEY)) || null;
    if(user?.loginProvider === "local-preview" && (!isLocalPreviewHost() || googleClientId())){
      localStorage.removeItem(AUTH_KEY);
      return null;
    }
    if(user?.loginProvider === "google" && (!Number.isFinite(Number(user.expiresAt)) || Number(user.expiresAt) <= Date.now())){
      localStorage.removeItem(AUTH_KEY);
      return null;
    }
    return user;
  }
  catch { return null; }
}
function saveAuthUser(){
  if(authUser) localStorage.setItem(AUTH_KEY, JSON.stringify(authUser));
  else localStorage.removeItem(AUTH_KEY);
}
function userStateKey(email = authUser?.email){
  return email ? `${STORE_KEY}-${String(email).trim().toLowerCase()}` : `${STORE_KEY}-guest`;
}
function defaultState(){ return { records: [], profileIcon: null }; }
function normalizeState(value){
  return { ...defaultState(), ...(value && typeof value === "object" ? value : {}), records: Array.isArray(value?.records) ? value.records : [] };
}
function loadLegacyAccountState(email = authUser?.email){
  if(!email) return defaultState();
  try { return normalizeState(JSON.parse(localStorage.getItem(userStateKey(email)))); }
  catch { return defaultState(); }
}
function loadState(){ return authUser ? loadLegacyAccountState() : defaultState(); }
function openStateDatabase(){
  if(!window.indexedDB) return Promise.reject(new Error("IndexedDB is unavailable."));
  return new Promise((resolve,reject)=>{
    const request = indexedDB.open(STATE_DB_NAME,1);
    request.onupgradeneeded = ()=>{
      const db = request.result;
      if(!db.objectStoreNames.contains(STATE_DB_STORE)) db.createObjectStore(STATE_DB_STORE);
    };
    request.onsuccess = ()=>resolve(request.result);
    request.onerror = ()=>reject(request.error || new Error("Could not open local account storage."));
  });
}
async function readLocalAccountState(email){
  const key = userStateKey(email);
  try{
    const db = await openStateDatabase();
    const value = await new Promise((resolve,reject)=>{
      const transaction = db.transaction(STATE_DB_STORE,"readonly");
      const request = transaction.objectStore(STATE_DB_STORE).get(key);
      request.onsuccess = ()=>resolve(request.result);
      request.onerror = ()=>reject(request.error || new Error("Could not read local account storage."));
      transaction.oncomplete = ()=>db.close();
      transaction.onerror = ()=>{ db.close(); reject(transaction.error || new Error("Could not read local account storage.")); };
    });
    if(value) return normalizeState(value);
    const legacy = loadLegacyAccountState(email);
    if(legacy.records.length || legacy.profileIcon){
      try { await writeLocalAccountState(email,legacy); } catch {}
    }
    return legacy;
  } catch {
    return loadLegacyAccountState(email);
  }
}
async function writeLocalAccountState(email,snapshot){
  const key = userStateKey(email);
  const value = normalizeState(snapshot);
  const db = await openStateDatabase();
  await new Promise((resolve,reject)=>{
    const transaction = db.transaction(STATE_DB_STORE,"readwrite");
    transaction.objectStore(STATE_DB_STORE).put(value,key);
    transaction.oncomplete = resolve;
    transaction.onerror = ()=>reject(transaction.error || new Error("Could not write local account storage."));
    transaction.onabort = ()=>reject(transaction.error || new Error("Local account storage write was canceled."));
  }).finally(()=>db.close());
  try { localStorage.removeItem(key); } catch {}
}
async function saveState(){
  const email = authUser?.email;
  if(!email) return;
  state.updatedAt = new Date().toISOString();
  const snapshot = normalizeState(JSON.parse(JSON.stringify(state)));
  const save = async ()=>{
    try { await writeLocalAccountState(email,snapshot); }
    catch(error){ localStorage.setItem(userStateKey(email),JSON.stringify(snapshot)); }
    let cloudSynced=false;
    if(isCloudSyncReady && authUser?.email?.toLowerCase() === email.toLowerCase()){
      try {
        await syncAccountStateToDrive(snapshot);
        cloudSyncStatus = "All activity is synced to your Google account.";
        cloudSynced=true;
      } catch(error){
        isCloudSyncReady = false;
        cloudSyncStatus = "Saved on this device. Reconnect Google Drive to sync other devices.";
        console.warn("Could not sync account data to Google Drive.",error);
      }
    }
    return {cloudSynced};
  };
  accountSaveQueue = accountSaveQueue.then(save,save);
  return accountSaveQueue;
}
function driveTokenIsValid(){ return !!driveAccessToken && driveAccessTokenExpiresAt > Date.now()+30000 && driveTokenEmail===authUser?.email?.toLowerCase(); }
function requestDriveAccessToken(email,prompt=""){
  if(driveTokenIsValid()) return Promise.resolve(driveAccessToken);
  if(driveTokenPending){
    if(driveTokenPendingEmail===email?.toLowerCase()) return driveTokenPending;
    return Promise.reject(new Error("Finish the current Google Drive connection first."));
  }
  const oauth = window.google?.accounts?.oauth2;
  if(!oauth || !googleClientId()) return Promise.reject(new Error("Google Drive authorization is unavailable."));
  let resolvePending, rejectPending, settled=false;
  const pending=new Promise((resolve,reject)=>{ resolvePending=resolve; rejectPending=reject; });
  driveTokenPending=pending;
  driveTokenPendingEmail=email?.toLowerCase() || "";
  const finish = (error,token)=>{
    if(settled) return;
    settled=true;
    if(driveTokenPending===pending){
      driveTokenPending=null;
      driveTokenPendingEmail="";
    }
    if(error) rejectPending(error);
    else resolvePending(token);
  };
  try{
    driveTokenRequest = oauth.initTokenClient({
      client_id: googleClientId(),
      scope: `${DRIVE_SCOPE} openid email profile`,
      callback: async response=>{
        if(response?.error || !response?.access_token){ finish(new Error(response?.error_description || response?.error || "Google Drive permission was not granted.")); return; }
        try{
          const identity=await fetch("https://openidconnect.googleapis.com/v1/userinfo",{headers:{Authorization:`Bearer ${response.access_token}`}});
          if(!identity.ok) throw new Error("Could not confirm the Google account for sync.");
          const profile=await identity.json();
          if(email && profile.email?.toLowerCase()!==email.toLowerCase()) throw new Error("Choose the same Google account used to sign in.");
        } catch(error){ finish(error); return; }
        if(authUser?.email?.toLowerCase()!==email?.toLowerCase()){ finish(new Error("The signed-in account changed before Google Drive connected.")); return; }
        driveAccessToken = response.access_token;
        driveAccessTokenExpiresAt = Date.now()+(Number(response.expires_in)||3600)*1000;
        driveTokenEmail=email?.toLowerCase() || "";
        finish(null,driveAccessToken);
      },
      error_callback: error=>finish(new Error(error?.message || error?.type || "Google Drive authorization failed."))
    });
    driveTokenRequest.requestAccessToken({prompt,login_hint:email || ""});
  } catch(error){ finish(error); }
  return pending;
}
async function driveApi(path,options={}){
  if(!driveTokenIsValid()) throw new Error("Google Drive permission expired. Connect again to sync.");
  const response=await fetch(`https://www.googleapis.com/drive/v3/${path}`,{
    ...options,
    headers:{Authorization:`Bearer ${driveAccessToken}`,...options.headers}
  });
  if(!response.ok){
    const detail=await response.text().catch(()=>"");
    throw new Error(`Google Drive request failed (${response.status}). ${detail.slice(0,240)}`);
  }
  return response;
}
async function findDriveStateFile(){
  const query=new URLSearchParams({spaces:"appDataFolder",pageSize:"100",fields:"files(id,name,modifiedTime)",q:`name='${DRIVE_STATE_FILE}'`});
  const result=await (await driveApi(`files?${query}`)).json();
  const file=result.files?.find(item=>item.name===DRIVE_STATE_FILE);
  driveStateFileId=file?.id || "";
  return file || null;
}
async function readDriveAccountState(){
  const file=await findDriveStateFile();
  if(!file) return defaultState();
  const response=await driveApi(`files/${encodeURIComponent(file.id)}?alt=media`);
  const payload=await response.json();
  return normalizeState(payload?.state || payload);
}
async function uploadDriveStateFile(snapshot){
  const payload=JSON.stringify({version:1,updatedAt:new Date().toISOString(),state:normalizeState(snapshot)});
  let sessionUrl;
  if(driveStateFileId){
    const response=await fetch(`https://www.googleapis.com/upload/drive/v3/files/${encodeURIComponent(driveStateFileId)}?uploadType=resumable`,{
      method:"PATCH",
      headers:{Authorization:`Bearer ${driveAccessToken}`,"Content-Type":"application/json; charset=UTF-8","X-Upload-Content-Type":"application/json","X-Upload-Content-Length":String(new TextEncoder().encode(payload).length)},
      body:JSON.stringify({mimeType:"application/json"})
    });
    if(!response.ok) throw new Error(`Google Drive upload setup failed (${response.status}).`);
    sessionUrl=response.headers.get("Location");
  } else {
    const response=await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&fields=id",{
      method:"POST",
      headers:{Authorization:`Bearer ${driveAccessToken}`,"Content-Type":"application/json; charset=UTF-8","X-Upload-Content-Type":"application/json","X-Upload-Content-Length":String(new TextEncoder().encode(payload).length)},
      body:JSON.stringify({name:DRIVE_STATE_FILE,mimeType:"application/json",parents:["appDataFolder"]})
    });
    if(!response.ok) throw new Error(`Google Drive file setup failed (${response.status}).`);
    sessionUrl=response.headers.get("Location");
  }
  if(!sessionUrl) throw new Error("Google Drive did not return an upload session.");
  const upload=await fetch(sessionUrl,{method:"PUT",headers:{"Content-Type":"application/json"},body:payload});
  if(!upload.ok) throw new Error(`Google Drive upload failed (${upload.status}).`);
  const result=await upload.json().catch(()=>({}));
  if(result.id) driveStateFileId=result.id;
}
async function syncAccountStateToDrive(snapshot){
  if(isCloudSyncing) return;
  if(!driveTokenIsValid()) throw new Error("Google Drive permission expired.");
  isCloudSyncing=true;
  try{
    // Read the latest account snapshot before each write so a device that has
    // been open for a while does not replace entries added from another device.
    const cloudSnapshot=await readDriveAccountState();
    const merged=mergeAccountStates(cloudSnapshot,snapshot);
    await uploadDriveStateFile(merged);
  } finally { isCloudSyncing=false; }
}
function mergeAccountStates(cloudValue,localValue){
  const cloud=normalizeState(cloudValue), local=normalizeState(localValue);
  const recordsById=new Map();
  for(const record of [...cloud.records,...local.records]){
    const current=recordsById.get(record.id);
    const currentTime=Date.parse(current?.updatedAt || current?.createdAt || current?.date || 0) || 0;
    const nextTime=Date.parse(record.updatedAt || record.createdAt || record.date || 0) || 0;
    if(!current || nextTime>=currentTime) recordsById.set(record.id,record);
  }
  const records=[...recordsById.values()].sort((a,b)=>(Date.parse(a.date)||0)-(Date.parse(b.date)||0));
  const cloudTime=Date.parse(cloud.updatedAt || 0) || 0, localTime=Date.parse(local.updatedAt || 0) || 0;
  const localHasData=local.records.length>0 || !!local.profileIcon;
  const preferLocal=localTime>cloudTime || (!cloudTime && localHasData);
  const latestTime=Math.max(cloudTime,localTime);
  return {records,profileIcon:preferLocal?local.profileIcon:cloud.profileIcon,updatedAt:latestTime?new Date(latestTime).toISOString():null};
}
async function restoreAccountState(email,tokenPromise=null){
  const account=email?.trim().toLowerCase();
  if(!account) return;
  isRestoringAccountState=true;
  try{
    const local=await readLocalAccountState(account);
    if(authUser?.email?.toLowerCase()!==account) return;
    state=local;
    render();
    if(tokenPromise){
      try{
        await tokenPromise;
        const cloud=await readDriveAccountState();
        if(authUser?.email?.toLowerCase()!==account) return;
        state=mergeAccountStates(cloud,local);
        isCloudSyncReady=true;
        cloudSyncStatus="Google Drive sync is connected.";
        await writeLocalAccountState(account,state);
        await syncAccountStateToDrive(state);
        cloudSyncStatus="All activity is synced to your Google account.";
      } catch(error){
        isCloudSyncReady=false;
        cloudSyncStatus=/403|accessNotConfigured|Drive API/i.test(String(error?.message))
          ? "Enable Google Drive API and add drive.appdata to OAuth Data Access, then reconnect."
          : "Google Drive sync needs permission. Your device copy is kept.";
        console.warn("Could not restore cloud account data.",error);
      }
    } else {
      isCloudSyncReady=false;
      cloudSyncStatus="Connect Google Drive to restore and sync activity on other devices.";
    }
  } finally {
    if(authUser?.email?.toLowerCase()===account){
      await indexSavedPhotos(state.records);
      isRestoringAccountState=false;
      render();
    }
  }
}
function connectGoogleDriveSync(){
  if(!authUser?.email) return;
  const email=authUser.email;
  const tokenPromise=requestDriveAccessToken(email);
  closeAccountPanel();
  toast("Connecting Google Drive sync…");
  restoreAccountState(email,tokenPromise);
}
function isLoggedIn(){ return !!authUser; }
function toast(msg){
  let el = $(".toast");
  if(!el){ el = document.createElement("div"); el.className="toast"; $(".phone").appendChild(el); }
  el.textContent = msg; el.classList.add("show"); setTimeout(()=>el.classList.remove("show"), 1900);
}
function showPage(pageId){
  if(isRestoringAccountState){ toast("Restoring your account data…"); return; }
  if(!isLoggedIn()){
    openAccountPanel();
    toast("Please sign in with Google first.");
    renderAuthGate();
    return;
  }
  $$(".page").forEach(p=>p.classList.toggle("active", p.id===pageId));
  $$(".tab").forEach(t=>t.classList.toggle("active", t.dataset.page===pageId));
  render();
}
$$('.tab').forEach(btn=>btn.addEventListener('click',()=>showPage(btn.dataset.page)));

function ymd(date){
  const value = date instanceof Date ? date : new Date(date);
  if(!Number.isFinite(value.getTime())) return "";
  return `${value.getFullYear()}-${String(value.getMonth()+1).padStart(2,"0")}-${String(value.getDate()).padStart(2,"0")}`;
}
function localDateTimeValue(date = new Date()){
  const pad = value => String(value).padStart(2,"0");
  return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
function parseLocalDateTime(value){
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(value);
  if(!match) return new Date(NaN);
  const [year, month, day, hour, minute] = match.slice(1).map(Number);
  const date = new Date(year, month-1, day, hour, minute);
  if(date.getFullYear() !== year || date.getMonth() !== month-1 || date.getDate() !== day || date.getHours() !== hour || date.getMinutes() !== minute) return new Date(NaN);
  return date;
}
function monthName(y,m){ return new Date(y,m,1).toLocaleString('en',{month:'long', year:'numeric'}); }
function recordsThisMonth(){ return uniquePhotoRecords().filter(r=>{ const d=new Date(r.date); return d.getFullYear()===viewYear && d.getMonth()===viewMonth; }); }
function unique(arr){ return [...new Set(arr.filter(Boolean))]; }
function matchDish(record){
  const q = `${record.dishName||""} ${record.dishKr||""}`.toLowerCase();
  return dishDB.find(d => q.includes(d.name.toLowerCase()) || (d.kr && q.includes(d.kr))) || null;
}
function unlockedDishIds(){ return new Set(uniquePhotoRecords().map(matchDish).filter(Boolean).map(d=>d.id)); }
function uniquePhotoRecords(records = state.records){
  const accepted = [];
  records.forEach(record=>{
    const hash = record.photoHash;
    if(hash && accepted.some(saved=>areSamePhoto(saved.photoHash,hash))) return;
    accepted.push(record);
  });
  return accepted;
}
function photoPerceptualPart(hash){
  const match = typeof hash === "string" ? hash.match(/^visual-v1:[a-f0-9]+:([a-f0-9]{16})$/i) : null;
  return match?.[1]?.toLowerCase() || "";
}
function areSamePhoto(a, b){
  if(!a || !b) return false;
  if(a === b) return true;
  const hashA = photoPerceptualPart(a), hashB = photoPerceptualPart(b);
  if(!hashA || !hashB) return false;
  let bits = BigInt(`0x${hashA}`) ^ BigInt(`0x${hashB}`), distance = 0;
  while(bits){ distance++; bits &= bits-1n; }
  return distance <= 2;
}
function isCurrentPhotoHash(hash){ return typeof hash === "string" && hash.startsWith("visual-v1:"); }
function favoriteDishIds(){
  const ids = new Set();
  uniquePhotoRecords().filter(r=>r.favorite).forEach(r=>{ const d=matchDish(r); if(d) ids.add(d.id); });
  return ids;
}
function stats(){
  const countedRecords = uniquePhotoRecords();
  const cats = unique(countedRecords.map(r=>r.category));
  const cities = unique(countedRecords.map(r=>(r.city||"").toLowerCase()));
  const rests = unique(countedRecords.map(r=>r.restaurant));
  const unlocked = unlockedDishIds();
  const favoriteIds = favoriteDishIds();
  const helper = {
    total: countedRecords.length,
    favorites: countedRecords.filter(r=>r.favorite).length,
    restaurants: rests.length,
    cities: cities.length,
    categories: cats.length,
    unlocked: unlocked.size,
    names: new Set(countedRecords.map(r=>(r.dishName||"").toLowerCase())),
    kr: new Set(countedRecords.map(r=>(r.dishKr||"").toLowerCase())),
    spicy: countedRecords.filter(r=>/spicy|street food|떡볶이|매운|hot|chili/i.test(`${r.notes} ${r.category} ${r.dishName} ${r.dishKr}`)).length,
    category: c => countedRecords.filter(r=>r.category===c).length,
    city: c => countedRecords.filter(r=>(r.city||"").toLowerCase()===c).length,
    unlockedStamps: 0
  };
  helper.unlockedStamps = stampDB.filter(st=>st.test(helper)).length;
  return helper;
}

function render(){
  if($("#calendarPage").classList.contains("active")) renderCalendar();
  if($("#addPage").classList.contains("active")) renderAdd();
  if($("#bookPage").classList.contains("active")) renderBook();
  if($("#stampsPage").classList.contains("active")) renderStamps();
  attachHeaderMenu();
  renderAuthGate();
}

function commonHeader(title, sub = "", right="🔔"){
  const subtitle = sub ? `<p>${sub}</p>` : "";
  return `<div class="header"><button class="icon-btn menu-btn" type="button" aria-label="Open account menu">☰</button><div class="title"><h1>${title}</h1>${subtitle}</div><button class="icon-btn" type="button">${right}</button></div>`;
}

function renderCalendar(){
  const page = $("#calendarPage");
  const calendarRecords = uniquePhotoRecords();
  const monthRecords = recordsThisMonth();
  const first = new Date(viewYear, viewMonth, 1);
  const start = new Date(viewYear, viewMonth, 1 - first.getDay());
  const today = ymd(new Date());
  let cells = "";
  for(let i=0;i<42;i++){
    const d = new Date(start); d.setDate(start.getDate()+i);
    const dayRecords = calendarRecords.filter(r=>ymd(r.date)===ymd(d));
    const sticker = dayRecords[0]?.sticker || "";
    cells += `<button class="day ${d.getMonth()!==viewMonth?'muted':''} ${ymd(d)===today?'today':''}" data-date="${ymd(d)}">
      <span class="date-num">${d.getDate()}</span>${sticker?`<img class="cal-sticker" src="${sticker}" alt="food sticker">`:""}
    </button>`;
  }
  page.innerHTML = `<div class="scroll">
    ${commonHeader("K-Foodendar","Collect your delicious moments")}
    <div class="month-nav"><button id="prevMonth" class="round">‹</button><h2 class="big-title">${monthName(viewYear,viewMonth).replace(' ','<br class="mob">')}</h2><button id="nextMonth" class="round">›</button></div>
    <div class="calendar card"><div class="week"><b>Sun</b><b>Mon</b><b>Tue</b><b>Wed</b><b>Thu</b><b>Fri</b><b>Sat</b></div><div class="grid">${cells}</div></div>
    ${calendarRecords.length===0?`<div class="empty-state"><strong>No K-food yet</strong>Tap Add and start filling your calendar from zero.</div>`:""}
    <div class="stats"><div class="stat"><span>🍽️</span><b>${monthRecords.length}</b><span>meals<br>this month</span></div><div class="stat"><span>📍</span><b>${unique(monthRecords.map(r=>r.restaurant)).length}</b><span>restaurants<br>this month</span></div></div>
  </div>`;
  $("#prevMonth").onclick=()=>{ viewMonth--; if(viewMonth<0){viewMonth=11;viewYear--;} renderCalendar(); };
  $("#nextMonth").onclick=()=>{ viewMonth++; if(viewMonth>11){viewMonth=0;viewYear++;} renderCalendar(); };
  $$(".day",page).forEach(b=>b.onclick=()=>{
    const recs = calendarRecords.filter(r=>ymd(r.date)===b.dataset.date);
    if(recs.length){ openDayGallery(b.dataset.date); return; }
    showPage("addPage");
    setTimeout(()=>{ const input=$("#dateInput"); if(input) input.value = `${b.dataset.date}T12:00`; },0);
  });
}

// GitHub Pages serves source files directly, so keep a no-build gallery available when the React
// bridge hasn't been bundled. Vite's compiled bridge replaces this implementation when present.
if(!window.mountDayPhotoStack){
  window.mountDayPhotoStack=(container,records,onChange)=>{
    let index=0, pointerStart=null, wasSwipe=false;
    const frame=document.createElement("div");
    frame.className="day-photo-fallback";
    const card=document.createElement("article");
    card.className="day-photo-card";
    const image=document.createElement("img");
    image.alt="Original food photo";
    image.draggable=false;
    const placeholder=document.createElement("div");
    placeholder.className="day-photo-placeholder";
    placeholder.textContent="No photo saved for this entry";
    const details=document.createElement("div");
    details.className="day-photo-details";
    const name=document.createElement("b");
    const description=document.createElement("small");
    details.append(name,description);
    card.append(image,placeholder,details);
    const controls=document.createElement("div");
    controls.className="day-photo-fallback-controls";
    const previous=document.createElement("button");
    previous.type="button"; previous.className="day-photo-step"; previous.textContent="‹"; previous.setAttribute("aria-label","Previous photo");
    const counter=document.createElement("small");
    counter.setAttribute("aria-live","polite");
    const next=document.createElement("button");
    next.type="button"; next.className="day-photo-step"; next.textContent="›"; next.setAttribute("aria-label","Next photo");
    controls.append(previous,counter,next);
    frame.append(card,controls);
    container.replaceChildren(frame);
    const show=nextIndex=>{
      index=(nextIndex+records.length)%records.length;
      const record=records[index];
      image.hidden=!record.original;
      placeholder.hidden=!!record.original;
      if(record.original) image.src=record.original;
      name.textContent=record.dishName || "Food photo";
      const recordDate=new Date(record.date);
      const time=Number.isFinite(recordDate.getTime())?recordDate.toLocaleTimeString(undefined,{hour:"numeric",minute:"2-digit"}):"";
      description.textContent=[record.dishKr,record.restaurant || "Unknown restaurant",time].filter(Boolean).join(" · ");
      counter.textContent=`${index+1} of ${records.length} photos`;
      const single=records.length<2;
      previous.hidden=next.hidden=single;
      controls.hidden=single;
      onChange?.(index);
    };
    const showPrevious=()=>show(index-1), showNext=()=>show(index+1);
    previous.addEventListener("click",showPrevious);
    next.addEventListener("click",showNext);
    card.addEventListener("pointerdown",event=>{ pointerStart=event.clientX; });
    card.addEventListener("pointerup",event=>{
      if(pointerStart===null) return;
      const delta=event.clientX-pointerStart;
      pointerStart=null;
      wasSwipe=Math.abs(delta)>35;
      if(wasSwipe) show(delta<0?index+1:index-1);
    });
    card.addEventListener("pointercancel",()=>{pointerStart=null;});
    card.addEventListener("click",event=>{
      if(event.target===image && records.length>1 && !wasSwipe) showNext();
      wasSwipe=false;
    });
    show(0);
    return ()=>{
      previous.removeEventListener("click",showPrevious);
      next.removeEventListener("click",showNext);
      container.replaceChildren();
    };
  };
}

function openDayGallery(dayKey){
  const records = uniquePhotoRecords().filter(record=>ymd(record.date)===dayKey);
  if(!records.length) return;
  $("#dayGallery")?.remove();
  const date = new Date(`${dayKey}T12:00:00`);
  const dateLabel = date.toLocaleDateString(undefined,{year:"numeric",month:"long",day:"numeric"});
  const gallery = document.createElement("div");
  const returnFocus = document.activeElement;
  gallery.id = "dayGallery";
  gallery.className = "day-gallery-wrap";
  gallery.innerHTML = `<div class="shade" data-action="close-day-gallery"></div>
    <section class="day-gallery" role="dialog" aria-modal="true" aria-labelledby="dayGalleryTitle">
      <header class="day-gallery-head"><div><b id="dayGalleryTitle"></b><small>${records.length} / 3 photos</small></div><button class="day-gallery-close" data-action="close-day-gallery" aria-label="Close photo gallery">×</button></header>
      <div class="day-photo-stack" role="group" aria-label="Photo stack"></div>
      <div class="day-gallery-actions"><small class="day-photo-position" aria-live="polite"></small><small class="day-photo-hint">Swipe, drag, or tap a photo</small></div>
    </section>`;
  $("#dayGalleryTitle",gallery).textContent = dateLabel;
  const stack = $(".day-photo-stack",gallery);
  if(records.length < 2){
    stack.classList.add("single-photo");
    $(".day-photo-hint",gallery).hidden = true;
  }
  const positionLabel = $(".day-photo-position",gallery);
  positionLabel.textContent = `1 of ${records.length} photos`;
  const close = ()=>{
    gallery._unmountPhotoStack?.();
    gallery.remove();
    document.removeEventListener("keydown",handleKeydown);
    returnFocus?.focus?.();
  };
  const handleKeydown = event=>{ if(event.key==="Escape") close(); };
  gallery.querySelectorAll("[data-action='close-day-gallery']").forEach(button=>button.addEventListener("click",close));
  document.addEventListener("keydown",handleKeydown);
  $(".phone").appendChild(gallery);
  gallery._unmountPhotoStack = window.mountDayPhotoStack?.(stack,records,index=>{
    positionLabel.textContent = `${index+1} of ${records.length} photos`;
  });
  $(".day-gallery-close",gallery).focus();
}

function renderAdd(){
  const page = $("#addPage");
  const dateTimeValue = localDateTimeValue();
  page.innerHTML = `<div class="scroll">
    <div class="header"><button class="round menu-btn" type="button" aria-label="Open account menu">☰</button><div class="title"><h1>Add K-Food</h1><p>We turn your food photo into a sticker</p></div><button id="quickSave" class="round">✓</button></div>
    <div class="card upload-card">
      <div class="preview-row">
        <div><div class="preview-label">Original photo</div><div class="photo-box" id="photoBox"><span class="muted">Choose photo</span></div></div>
        <div class="arrow">⋯›</div>
        <div><div class="preview-label">Auto-cut sticker</div><div class="sticker-box" id="stickerBox"><span class="muted">Sticker preview</span></div></div>
      </div>
      <input id="photoInput" type="file" accept="image/*" hidden>
      <button class="upload-btn" id="uploadBtn">📷 Add photo</button>
    </div>
    <div class="card form-card">
      <div class="row date-row"><span class="ico">📅</span><div class="date-control"><label for="dateInput">Date &amp; time</label><input id="dateInput" type="datetime-local" step="60" value="${dateTimeValue}" aria-label="Date and time"></div></div>
      <small class="daily-photo-limit">Save up to 3 photos per date.</small>
      <div class="row"><span class="ico">📍</span><label>Restaurant</label><input id="restaurantInput" placeholder="Search with Google Maps"><span>›</span></div>
      <div class="map-actions"><button id="mapsBtn" class="mini-btn">Open Google Maps</button><small class="map-help">Paste a Google Maps place URL here to auto-fill the name.</small></div>
      <div class="row"><span class="ico">🏙️</span><label>City</label><input id="cityInput" placeholder="Seoul"></div>
      <div class="row"><span class="ico">🍲</span><label>Dish</label><input id="dishInput" list="dishList" placeholder="Tteokbokki / 떡볶이"><datalist id="dishList">${dishDB.map(d=>`<option value="${d.name} / ${d.kr}">`).join("")}</datalist></div>
      <div class="row"><span class="ico">🏷️</span><label>Category</label><select id="categoryInput">${unique(dishDB.map(d=>d.category)).map(c=>`<option>${c}</option>`).join("")}<option>Other</option></select></div>
      <div class="row"><span class="ico">📝</span><label>Notes</label><textarea id="notesInput" placeholder="Chewy, spicy, cozy..."></textarea></div>
      <div class="favorite-line"><b>Favorite</b><button id="favoriteInput" class="heart-toggle" type="button">♡ Favorite</button></div>
    </div>
    <button id="saveBtn" class="save">Save</button>
    <p class="notice">Tip: Put your Google Maps API key in config.js to enable restaurant autocomplete.</p>
  </div>`;
  $("#quickSave").onclick=saveAddForm; $("#saveBtn").onclick=saveAddForm;
  $("#uploadBtn").onclick=()=>$("#photoInput").click();
  $("#photoInput").onchange=handlePhoto;
  $("#dishInput").addEventListener("input", autoFillDish);
  $("#favoriteInput").onclick=e=>{ e.currentTarget.classList.toggle("on"); e.currentTarget.textContent = e.currentTarget.classList.contains("on") ? "♥ Favorite" : "♡ Favorite"; };
  $("#mapsBtn").onclick=openGoogleMaps;
  $("#restaurantInput").addEventListener("paste", handleRestaurantPaste);
  $("#restaurantInput").addEventListener("change", handleRestaurantUrlInput);
  $("#restaurantInput").addEventListener("blur", handleRestaurantUrlInput);
  initPlacesAutocomplete();
  if(uploadData) paintPreview(uploadData.original, uploadData.sticker);
}
function autoFillDish(){
  const q = $("#dishInput").value.toLowerCase();
  const d = dishDB.find(x=>q.includes(x.name.toLowerCase()) || q.includes(x.kr));
  if(d){ $("#categoryInput").value=d.category; if(!$("#cityInput").value) $("#cityInput").value=d.city; }
}
function openGoogleMaps(){
  const current = $("#restaurantInput")?.value?.trim();
  const dish = $("#dishInput").value || "Korean food";
  const city = $("#cityInput").value || "near me";
  const query = current && !/^https?:\/\//i.test(current) ? current : `${dish} restaurant ${city}`;
  const url = `https://www.google.com/maps/search/${encodeURIComponent(query)}`;
  window.open(url, "_blank", "noopener");
}
function handleRestaurantPaste(e){
  const text = e.clipboardData?.getData("text")?.trim() || "";
  if(/^https?:\/\//i.test(text)){
    e.preventDefault();
    const name = extractRestaurantNameFromMapsUrl(text);
    if(name){
      $("#restaurantInput").value = name;
      toast("Restaurant name filled from Google Maps link.");
    } else {
      $("#restaurantInput").value = text;
      toast("Copy the full Google Maps address URL, not a shortened link.");
    }
  }
}
function handleRestaurantUrlInput(e){
  const value = e.currentTarget.value.trim();
  if(!/^https?:\/\//i.test(value)) return;
  const name = extractRestaurantNameFromMapsUrl(value);
  if(name){
    e.currentTarget.value = name;
    toast("Restaurant name filled from Google Maps link.");
  }
}
function extractRestaurantNameFromMapsUrl(value){
  try{
    const url = new URL(value);
    const path = decodeURIComponent(url.pathname.replace(/\+/g," "));
    const placeMatch = path.match(/\/place\/([^/]+)/i);
    if(placeMatch) return cleanRestaurantName(placeMatch[1]);
    const query = url.searchParams.get("q") || url.searchParams.get("query") || url.searchParams.get("destination");
    if(query) return cleanRestaurantName(query);
  } catch {}
  return "";
}
function cleanRestaurantName(name){
  return name
    .replace(/\s*@.*$/g,"")
    .replace(/,\s*South Korea.*$/i,"")
    .replace(/,\s*Korea.*$/i,"")
    .replace(/\s+-\s+Google Maps$/i,"")
    .replace(/\s+/g," ")
    .trim();
}
function initPlacesAutocomplete(){
  const key = window.KFOOD_CONFIG?.GOOGLE_MAPS_API_KEY;
  if(!key || googlePlacesLoaded || window.google?.maps?.places) return setupAutocomplete();
  googlePlacesLoaded = true;
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&callback=setupKfoodPlaces`;
  script.async = true; script.defer = true;
  document.head.appendChild(script);
}
window.setupKfoodPlaces = setupAutocomplete;
function setupAutocomplete(){
  const input = $("#restaurantInput");
  if(!input || !window.google?.maps?.places) return;
  const ac = new google.maps.places.Autocomplete(input, { fields:["name","address_components"], types:["restaurant"] });
  ac.addListener("place_changed",()=>{
    const place = ac.getPlace();
    if(place.name) input.value = place.name;
    const cityComp = place.address_components?.find(c=>c.types.includes("locality")||c.types.includes("administrative_area_level_1"));
    if(cityComp && !$("#cityInput").value) $("#cityInput").value = cityComp.long_name;
  });
}
async function handlePhoto(e){
  const input = e.currentTarget;
  const file = input.files?.[0];
  if(!file) return;
  input.value = "";
  const selectionId = ++photoSelectionId;
  isPreparingPhoto = true;
  uploadData = null;
  $("#photoBox").innerHTML = `<span class="muted">Preparing photo…</span>`;
  $("#stickerBox").innerHTML = `<span class="muted">Preparing sticker…</span>`;
  try{
    const original = await fileToDataURL(file);
    const [sticker, photoHash] = await Promise.all([makeSticker(original), makePhotoHash(original)]);
    if(selectionId !== photoSelectionId) return;
    isPreparingPhoto = false;
    uploadData = { original, sticker, photoHash };
    paintPreview(original, sticker);
  } catch(error){
    if(selectionId !== photoSelectionId) return;
    isPreparingPhoto = false;
    console.error("Could not prepare this food photo.", error);
    $("#photoBox").innerHTML = `<span class="muted">Choose photo</span>`;
    $("#stickerBox").innerHTML = `<span class="muted">Sticker preview</span>`;
    toast("Could not process this photo. Try a different or smaller image.");
  }
}
function fileToDataURL(file){
  return new Promise((resolve,reject)=>{
    const reader = new FileReader();
    reader.onload = ()=>resolve(reader.result);
    reader.onerror = ()=>reject(reader.error || new Error("Could not read this photo."));
    reader.onabort = ()=>reject(new Error("Photo reading was canceled."));
    reader.readAsDataURL(file);
  });
}
function loadImg(src){ return new Promise((res,rej)=>{ const img=new Image(); img.onload=()=>res(img); img.onerror=rej; img.src=src; }); }
// Hash normalized image pixels and a perceptual signature. This catches byte-identical images and
// visually identical re-encodes while remaining specific enough to allow another photo of the same dish.
async function makePhotoHash(src){
  const image = await loadImg(src);
  const canonicalCanvas=document.createElement("canvas");
  canonicalCanvas.width=128; canonicalCanvas.height=128;
  const canonicalContext=canonicalCanvas.getContext("2d",{willReadFrequently:true});
  if(!canonicalContext) throw new Error("Could not normalize the image.");
  canonicalContext.fillStyle="#fff"; canonicalContext.fillRect(0,0,128,128);
  const canonicalScale=Math.min(128/image.naturalWidth,128/image.naturalHeight);
  const canonicalWidth=image.naturalWidth*canonicalScale, canonicalHeight=image.naturalHeight*canonicalScale;
  canonicalContext.drawImage(image,(128-canonicalWidth)/2,(128-canonicalHeight)/2,canonicalWidth,canonicalHeight);
  const canonicalPixels=canonicalContext.getImageData(0,0,128,128).data;
  const size = 32;
  const canvas = document.createElement("canvas");
  canvas.width = size; canvas.height = size;
  const ctx = canvas.getContext("2d",{willReadFrequently:true});
  if(!ctx) throw new Error("Could not read the image pixels.");
  ctx.fillStyle = "#fff"; ctx.fillRect(0,0,size,size);
  const scale = Math.min(size/image.naturalWidth,size/image.naturalHeight);
  const width = image.naturalWidth*scale, height = image.naturalHeight*scale;
  ctx.drawImage(image,(size-width)/2,(size-height)/2,width,height);
  const pixels = ctx.getImageData(0,0,size,size).data;
  const gray = new Float64Array(size*size);
  for(let i=0;i<gray.length;i++){
    const offset=i*4;
    gray[i]=0.299*pixels[offset]+0.587*pixels[offset+1]+0.114*pixels[offset+2];
  }
  const cos = Array.from({length:8},(_,frequency)=>Array.from({length:size},(_,position)=>Math.cos(((2*position+1)*frequency*Math.PI)/(2*size))));
  const coefficients=[];
  for(let v=0;v<8;v++) for(let u=0;u<8;u++){
    if(u===0 && v===0) continue;
    let sum=0;
    for(let y=0;y<size;y++) for(let x=0;x<size;x++) sum+=gray[y*size+x]*cos[u][x]*cos[v][y];
    coefficients.push(sum);
  }
  const sorted=[...coefficients].sort((a,b)=>a-b);
  const median=sorted[Math.floor(sorted.length/2)];
  let signature=0n;
  coefficients.forEach((value,index)=>{ if(value>=median) signature |= 1n<<BigInt(index); });
  let pixelDigest="";
  if(window.crypto?.subtle){
    const digest=await window.crypto.subtle.digest("SHA-256",canonicalPixels.buffer);
    pixelDigest=[...new Uint8Array(digest)].map(byte=>byte.toString(16).padStart(2,"0")).join("");
  } else {
    let a=0x811c9dc5;
    for(const byte of canonicalPixels) a=Math.imul(a^byte,0x01000193);
    pixelDigest=(a>>>0).toString(16).padStart(8,"0");
  }
  return `visual-v1:${pixelDigest}:${signature.toString(16).padStart(16,"0")}`;
}
async function indexSavedPhotos(records = state.records){
  const sourceState = state;
  const email = authUser?.email;
  let changed = false;
  for(const record of records){
    if(isCurrentPhotoHash(record.photoHash) || !record.original) continue;
    try{
      record.photoHash = await makePhotoHash(record.original);
      changed = true;
    } catch(error){
      console.warn("Could not index a saved food photo.", error);
    }
  }
  const deduplicated = [];
  for(const record of records){
    const duplicate = record.photoHash && deduplicated.some(saved=>areSamePhoto(saved.photoHash,record.photoHash));
    if(duplicate) changed = true;
    else deduplicated.push(record);
  }
  if(changed && state === sourceState && authUser?.email === email){
    state.records = deduplicated;
    try { await saveState(); }
    catch(error){ console.warn("Could not save updated photo indexes.",error); }
    if(!$("#addPage")?.classList.contains("active")) render();
  }
}
async function getRecordPhotoHash(record){
  if(isCurrentPhotoHash(record.photoHash)) return record.photoHash;
  if(!record.original) return "";
  record.photoHash = await makePhotoHash(record.original);
  return record.photoHash;
}
async function makeSticker(src){
  const img = await loadImg(src);
  const canvas = $("#stickerCanvas"); const size = 520; canvas.width=size; canvas.height=size;
  const ctx = canvas.getContext("2d"); ctx.clearRect(0,0,size,size);
  // Soft auto-fit: preserve full photo even when food is not centered, then create a clean white sticker edge.
  const pad = 32;
  const scale = Math.min((size-pad*2)/img.width, (size-pad*2)/img.height);
  const w = img.width*scale, h = img.height*scale, x=(size-w)/2, y=(size-h)/2;
  ctx.save();
  ctx.beginPath();
  roundRect(ctx, x, y, w, h, 42); ctx.clip();
  ctx.drawImage(img,x,y,w,h);
  ctx.restore();
  ctx.lineWidth=24; ctx.strokeStyle="#fffaf0"; ctx.shadowColor="rgba(0,0,0,.25)"; ctx.shadowBlur=18; ctx.shadowOffsetY=8;
  ctx.beginPath(); roundRect(ctx, x, y, w, h, 42); ctx.stroke();
  ctx.shadowColor="transparent"; ctx.lineWidth=4; ctx.strokeStyle="rgba(52,86,55,.18)";
  ctx.beginPath(); roundRect(ctx, x+10, y+10, w-20, h-20, 34); ctx.stroke();
  return canvas.toDataURL("image/png", .92);
}
function roundRect(ctx,x,y,w,h,r){
  const rr=Math.min(r,w/2,h/2); ctx.moveTo(x+rr,y); ctx.arcTo(x+w,y,x+w,y+h,rr); ctx.arcTo(x+w,y+h,x,y+h,rr); ctx.arcTo(x,y+h,x,y,rr); ctx.arcTo(x,y,x+w,y,rr);
}
function paintPreview(original, sticker){
  const photoBox = $("#photoBox");
  const stickerBox = $("#stickerBox");
  if(!photoBox || !stickerBox) return;
  photoBox.innerHTML = `<img src="${original}" alt="original food photo">`;
  stickerBox.innerHTML = `<img src="${sticker}" alt="auto cut food sticker">`;
}
async function saveAddForm(){
  if(!isLoggedIn()){ openAccountPanel(); toast("Please sign in with Google first."); return; }
  if(isRestoringAccountState){ toast("Restoring your account data…"); return; }
  if(isSavingRecord) return;
  const dishRaw = $("#dishInput")?.value.trim();
  if(!dishRaw){ toast("Please enter a dish name."); return; }
  if(isPreparingPhoto){ toast("Photo is still processing. Please wait a moment."); return; }
  if(!uploadData?.sticker){ toast("Please add a photo first."); return; }
  const dateValue = $("#dateInput")?.value || "";
  const recordDate = dateValue ? parseLocalDateTime(dateValue) : new Date();
  if(!Number.isFinite(recordDate.getTime())){ toast("Please choose a valid date."); return; }
  const recordDay = ymd(recordDate);
  await indexSavedPhotos(state.records);
  const recordsForDay = uniquePhotoRecords().filter(record=>ymd(record.date)===recordDay).length;
  if(recordsForDay >= 3){ toast("You can save up to 3 photos per date."); return; }
  const form = {
    restaurant: $("#restaurantInput").value.trim() || "Unknown restaurant",
    city: $("#cityInput").value.trim() || "Unknown city",
    category: $("#categoryInput").value,
    notes: $("#notesInput").value.trim(),
    favorite: $("#favoriteInput").classList.contains("on")
  };
  const photo = uploadData;
  const saveButtons = [$("#quickSave"), $("#saveBtn")].filter(Boolean);
  isSavingRecord = true;
  saveButtons.forEach(button=>button.disabled=true);
  let saved = false;
  let rec;
  try{
    const photoHash = photo.photoHash || await makePhotoHash(photo.original);
    let photoAlreadyUsed = false;
    for(const record of state.records){
      const priorHash = await getRecordPhotoHash(record);
      if(areSamePhoto(photoHash, priorHash)) photoAlreadyUsed = true;
    }
    if(photoAlreadyUsed){
      toast("This photo was already added. Choose a different photo.");
      return;
    }
    const [name, kr=""] = dishRaw.split("/").map(s=>s.trim());
    rec = {
      id: crypto.randomUUID ? crypto.randomUUID() : `rec-${Date.now()}`,
      date: recordDate.toISOString(),
      restaurant: form.restaurant,
      city: form.city,
      dishName: name,
      dishKr: kr,
      category: form.category,
      notes: form.notes,
      favorite: form.favorite,
      original: photo.original,
      sticker: photo.sticker,
      photoHash,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    state.records.push(rec);
    try{
      await saveState();
      saved = true;
    } catch(error){
      state.records = state.records.filter(record=>record.id !== rec.id);
      throw error;
    }
  } catch(error){
    console.error("Could not save the food record.", error);
    toast("Could not save this entry. Please try again.");
    return;
  } finally {
    isSavingRecord = false;
    saveButtons.forEach(button=>{ if(button.isConnected) button.disabled=false; });
  }
  if(!saved) return;
  if(uploadData === photo) uploadData = null;
  const d = new Date(rec.date); viewYear=d.getFullYear(); viewMonth=d.getMonth();
  try{
    renderAdd();
    showPage("calendarPage");
  } catch(error){
    console.error("The food record was saved, but the screen could not refresh.", error);
    $$(".page").forEach(page=>page.classList.toggle("active", page.id === "calendarPage"));
    $$(".tab").forEach(button=>button.classList.toggle("active", button.dataset.page === "calendarPage"));
    try{ renderCalendar(); attachHeaderMenu(); renderAuthGate(); } catch(refreshError){ console.error("Could not refresh the saved calendar.", refreshError); }
  }
  toast("Completed!");
}

function renderBook(){
  const page = $("#bookPage");
  const unlocked = unlockedDishIds();
  const favIds = favoriteDishIds();
  const s = stats();
  page.innerHTML = `<div class="scroll">
    ${commonHeader("K-Foodiary","","📖")}
    <div class="segment"><button class="active" data-filter="all">All</button><button data-filter="collected">Collected</button><button data-filter="locked">Locked</button><button data-filter="favorites">Favorites</button></div>
    <div class="card progress-card"><div class="mascot">📗</div><div><b>${s.unlocked} / ${dishDB.length}</b> collected<div class="bar"><i style="width:${s.unlocked/dishDB.length*100}%"></i></div><small>Keep collecting and discover more K-food!</small></div><div>⭐</div></div>
    <div class="book-scroll"><div id="bookGrid" class="book-grid"></div></div>
  </div>`;
  $$(".segment button",page).forEach(b=>b.onclick=()=>{ $$(".segment button",page).forEach(x=>x.classList.remove("active")); b.classList.add("active"); fillBookGrid(b.dataset.filter); });
  fillBookGrid("all");
  function fillBookGrid(filter){
    let list = dishDB.filter(d=>{
      if(filter==="collected") return unlocked.has(d.id);
      if(filter==="locked") return !unlocked.has(d.id);
      if(filter==="favorites") return favIds.has(d.id);
      return true;
    });
    if(list.length===0){ $("#bookGrid").innerHTML = `<div class="empty-state" style="grid-column:1/-1;color:#35513a;border-color:#d9ceb5"><strong style="color:#244c31">Nothing here yet</strong>Collect more dishes to fill this tab.</div>`; return; }
    $("#bookGrid").innerHTML = list.map(d=>dishCard(d, unlocked.has(d.id), favIds.has(d.id))).join("");
    $$(".fav-btn",$("#bookGrid")).forEach(btn=>btn.onclick=()=>toggleBookFavorite(btn.dataset.id));
  }
}
function dishCard(d, isUnlocked, isFav){
  const rec = uniquePhotoRecords().find(r=>matchDish(r)?.id===d.id);
  const img = rec?.sticker;
  return `<article class="dish-card ${isUnlocked?'':'locked'}">
    <button class="fav-btn ${isFav?'on':''}" data-id="${d.id}" ${isUnlocked?'':'disabled'} title="Favorite">${isFav?'♥':'♡'}</button>
    <div class="dish-img">${img?`<img src="${img}" alt="${d.name}">`:`<span class="emoji">${d.emoji}</span>`}</div>
    <h3>${d.name}</h3><div class="kr">${d.kr}</div><p>${isUnlocked?d.desc:'???'}</p>
    ${isUnlocked?`<div class="badges"><span class="badge">${d.category}</span><span class="badge">${d.city}</span></div>`:`<div class="locked-overlay"><span>🔒 Locked</span></div>`}
  </article>`;
}
async function toggleBookFavorite(dishId){
  const records = uniquePhotoRecords().filter(r=>matchDish(r)?.id===dishId);
  if(!records.length) return;
  const shouldFav = !records.some(r=>r.favorite);
  const before=records.map(record=>record.favorite);
  records.forEach(r=>{r.favorite = shouldFav; r.updatedAt=new Date().toISOString();});
  try { await saveState(); renderBook(); toast(shouldFav?"Added to Favorites":"Removed from Favorites"); }
  catch(error){ records.forEach((record,index)=>record.favorite=before[index]); toast("Could not save this change. Please try again."); }
}

function renderStamps(){
  const page = $("#stampsPage"); const s = stats();
  const unlockedMap = new Map(); stampDB.forEach(st=>unlockedMap.set(st.id, st.test(s)));
  page.innerHTML = `<div class="scroll stamp-scroll">
    ${commonHeader("My Stamps","Collect your delicious moments")}
    <div class="stamp-summary"><div><b>${[...unlockedMap.values()].filter(Boolean).length}</b><br>stamps</div><div><b>${s.restaurants}</b><br>shops</div><div><b>${s.cities}</b><br>cities</div></div>
    <p class="stamp-rules">Duplicate photos cannot be added. A different photo of the same food counts.</p>
    <div class="stamp-list">${stampDB.map(st=>stampCard(st,unlockedMap.get(st.id))).join("")}</div>
  </div>
  <div class="challenge challenge-docked"><b>Next challenge</b><br>${nextChallenge(s)}</div>`;
}
function stampCard(st, ok){
  return `<article class="stamp ${ok?'unlocked':'locked'}"><div class="pic">${st.emoji}</div><small>Level ${st.level}</small><h3>${st.title}</h3><small>${ok?'Unlocked':st.requirement}</small></article>`;
}
function nextChallenge(s){
  const next = stampDB.find(st=>!st.test(s));
  return next ? `Lv.${next.level} ${next.title}: ${next.requirement}` : "You unlocked every stamp. Amazing!";
}


function attachHeaderMenu(){
  $$(".menu-btn").forEach(btn=>btn.onclick=openAccountPanel);
}
function attachAuthButtons(){
  $$("[data-action='login']").forEach(btn=>btn.onclick=startGoogleLogin);
  $$("[data-action='logout']").forEach(btn=>btn.onclick=logout);
  $$("[data-action='connect-drive-sync']").forEach(btn=>btn.onclick=connectGoogleDriveSync);
  $$("[data-action='close-account']").forEach(btn=>btn.onclick=closeAccountPanel);
  $$("[data-action='account']").forEach(btn=>btn.onclick=openAccountPanel);
  $$("[data-action='open-icon-picker']").forEach(btn=>btn.onclick=openIconPicker);
  $$("[data-icon-type]").forEach(btn=>btn.onclick=()=>selectProfileIcon(btn.dataset.iconType, btn.dataset.iconValue));
}
function renderAuthGate(){
  let gate = $("#authGate");
  if(isLoggedIn()){
    if(gate) gate.remove();
    $$(".tab").forEach(t=>t.disabled=false);
    return;
  }
  $$(".tab").forEach(t=>t.disabled=false);
  if(!gate){
    gate = document.createElement("div");
    gate.id = "authGate";
    gate.className = "auth-gate";
    $(".phone").appendChild(gate);
  }
  const clientId = googleClientId();
  const localPreviewAllowed = !clientId && isLocalPreviewHost();
  const message = clientId
    ? (googleScriptFailed ? "Google sign-in could not load. Check your connection and reload." : "Continue with your Google account.")
    : (localPreviewAllowed ? "Google sign-in needs a Client ID. Local preview is available on this device." : "Set GOOGLE_CLIENT_ID in config.js and add this site's origin in Google Cloud Console.");
  gate.innerHTML = `<button class="auth-menu" data-action="account" aria-label="Open account menu">☰</button><div class="auth-card">
    <div class="auth-mascot">🍙</div>
    <h2>Sign in to start your K-Foodendar</h2>
    <p>Google login is required before using Calendar, Add, Book, and Stamps.</p>
    <div id="gateGoogleButton" class="google-button-slot"></div>
    ${localPreviewAllowed ? `<button class="google-fallback" data-action="login">Continue with local preview</button>` : ""}
    <small>${message}</small>
  </div>`;
  attachAuthButtons();
  renderGoogleButton("gateGoogleButton");
}
function googleClientId(){ return window.KFOOD_CONFIG?.GOOGLE_CLIENT_ID?.trim() || ""; }
function startGoogleLogin(){
  if(googleClientId() || !isLocalPreviewHost()){
    toast(googleClientId() ? "Use the Google sign-in button to continue." : "Google sign-in is not configured for this site yet.");
    return;
  }
  authUser = {
    name: "K-Food Guest",
    email: "local-preview@kfood.local",
    picture: "",
    loginProvider: "local-preview"
  };
  saveAuthUser();
  state = defaultState();
  closeAccountPanel();
  toast("Local preview login enabled.");
  render();
  restoreAccountState(authUser.email);
}
function initGoogleLogin(){
  const clientId = googleClientId();
  const googleId = window.google?.accounts?.id;
  if(!clientId || !googleId) return false;
  if(googleInitializedClientId === clientId) return true;
  try{
    googleId.initialize({
      client_id: clientId,
      callback: handleGoogleCredential,
      auto_select: false,
      cancel_on_tap_outside: true
    });
    googleInitializedClientId = clientId;
    return true;
  } catch(error){
    console.error("Could not initialize Google sign-in.", error);
    return false;
  }
}
function renderGoogleButton(containerId){
  const el = $("#"+containerId);
  if(!el) return;
  const clientId = googleClientId();
  if(!clientId){ el.innerHTML=""; return; }
  if(googleScriptFailed){ el.innerHTML = `<span class="google-login-status">Google sign-in could not load.</span>`; return; }
  if(!initGoogleLogin()){
    el.innerHTML = `<span class="google-login-status">Loading Google sign-in…</span>`;
    return;
  }
  el.innerHTML = "";
  try{
    window.google.accounts.id.renderButton(el, { theme:"outline", size:"large", shape:"pill", width:260, text:"signin_with" });
  } catch(error){
    console.error("Could not render the Google sign-in button.", error);
    el.innerHTML = `<span class="google-login-status">Google sign-in is unavailable.</span>`;
  }
}
function decodeJwt(token){
  try{
    let body = token.split(".")[1].replace(/-/g,"+").replace(/_/g,"/");
    body += "=".repeat((4 - body.length % 4) % 4);
    return JSON.parse(decodeURIComponent(atob(body).split("").map(c=>"%"+("00"+c.charCodeAt(0).toString(16)).slice(-2)).join("")));
  } catch { return {}; }
}
function handleGoogleCredential(response){
  const profile = decodeJwt(response?.credential || "");
  const expiresAt = Number(profile.exp) * 1000;
  if(!profile.email || profile.email_verified === false || profile.aud !== googleClientId() || !Number.isFinite(expiresAt) || expiresAt <= Date.now()){
    toast("Google sign-in could not be confirmed. Please try again.");
    return;
  }
  authUser = {
    name: profile.name || profile.given_name || "K-Food User",
    email: profile.email,
    picture: profile.picture || "",
    expiresAt,
    loginProvider: "google"
  };
  driveAccessToken="";
  driveAccessTokenExpiresAt=0;
  driveTokenEmail="";
  driveStateFileId="";
  isCloudSyncReady=false;
  cloudSyncStatus="";
  const accountEmail=authUser.email;
  const driveTokenPromise=requestDriveAccessToken(accountEmail);
  saveAuthUser();
  state = defaultState();
  isRestoringAccountState=true;
  closeAccountPanel();
  toast(`Welcome, ${authUser.name}!`);
  render();
  restoreAccountState(accountEmail,driveTokenPromise);
}
function logout(){
  window.google?.accounts?.id?.disableAutoSelect?.();
  authUser = null;
  driveAccessToken="";
  driveAccessTokenExpiresAt=0;
  driveTokenEmail="";
  driveStateFileId="";
  isCloudSyncReady=false;
  cloudSyncStatus="";
  isRestoringAccountState=false;
  saveAuthUser();
  state = loadState();
  uploadData = null;
  isPreparingPhoto = false;
  photoSelectionId++;
  closeAccountPanel();
  $$(".page").forEach(p=>p.classList.toggle("active", p.id==="calendarPage"));
  $$(".tab").forEach(t=>t.classList.toggle("active", t.dataset.page==="calendarPage"));
  toast("Logged out.");
  render();
}
function getProfileVisual(){
  if(state.profileIcon?.type === "emoji") return { type:"emoji", value:state.profileIcon.value };
  if(state.profileIcon?.type === "image") return { type:"image", value:state.profileIcon.value };
  if(authUser?.picture) return { type:"image", value:authUser.picture };
  return { type:"emoji", value:"🍙" };
}
function profileAvatarHtml(extraClass=""){
  const p = getProfileVisual();
  if(p.type === "image") return `<img class="profile-avatar ${extraClass}" src="${p.value}" alt="profile photo">`;
  return `<span class="profile-avatar emoji-avatar ${extraClass}">${p.value}</span>`;
}
function unlockedIconOptions(){
  const s = stats();
  return stampDB.map(st=>({ ...st, unlocked: st.test(s) }));
}
function openAccountPanel(){
  let panel = $("#accountPanel");
  if(!panel){
    panel = document.createElement("div");
    panel.id = "accountPanel";
    panel.className = "account-panel-wrap";
    $(".phone").appendChild(panel);
  }
  const logged = isLoggedIn();
  const localPreviewAllowed = !googleClientId() && isLocalPreviewHost();
  const loginMessage = googleClientId()
    ? (googleScriptFailed ? "Google sign-in could not load. Check your connection and reload." : "Continue with your Google account.")
    : (localPreviewAllowed ? "Google sign-in needs a Client ID. Local preview is available on this device." : "Set GOOGLE_CLIENT_ID in config.js and add this site's origin in Google Cloud Console.");
  panel.innerHTML = `<div class="shade" data-action="close-account"></div>
    <aside class="account-panel">
      <div class="panel-head"><b>Account</b><button data-action="close-account">×</button></div>
      ${logged ? `<button class="profile-button" data-action="open-icon-picker">
          ${profileAvatarHtml("large")}
          <span><b>${authUser.name}</b><small>${authUser.email}</small><small>Tap photo to change icon</small></span>
        </button>
        <div class="cloud-sync-card"><small>${cloudSyncStatus || "Connect Google Drive to restore and sync activity on other devices."}</small><button class="panel-btn" data-action="connect-drive-sync" ${isRestoringAccountState?"disabled":""}>${isCloudSyncReady?"Sync now":"Connect Google Drive sync"}</button></div>
        <button class="panel-btn" data-action="logout">Log out</button>` : `<div class="login-empty"><div class="auth-mascot small">🍜</div><b>Login required</b><p>Sign in with Google to unlock every feature.</p><div id="panelGoogleButton" class="google-button-slot"></div>${localPreviewAllowed ? `<button class="panel-btn" data-action="login">Continue with local preview</button>` : ""}<small>${loginMessage}</small></div>`}
    </aside>`;
  attachAuthButtons();
  renderGoogleButton("panelGoogleButton");
}
function closeAccountPanel(){ $("#accountPanel")?.remove(); $("#iconPicker")?.remove(); }
function openIconPicker(){
  if(!isLoggedIn()) return;
  const options = unlockedIconOptions();
  let picker = $("#iconPicker");
  if(!picker){
    picker = document.createElement("div");
    picker.id = "iconPicker";
    picker.className = "icon-picker-wrap";
    $(".phone").appendChild(picker);
  }
  picker.innerHTML = `<div class="shade" data-action="close-account"></div>
    <section class="icon-picker">
      <div class="panel-head"><b>Choose profile icon</b><button data-action="close-account">×</button></div>
      <div class="icon-grid">
        <button class="icon-choice" data-icon-type="google" data-icon-value="google">${authUser.picture ? `<img src="${authUser.picture}" alt="Google profile">` : "👤"}<small>Google</small></button>
        ${options.map(st=>`<button class="icon-choice ${st.unlocked?'':'locked'}" ${st.unlocked?`data-icon-type="emoji" data-icon-value="${st.emoji}"`:"disabled"}><span>${st.emoji}</span><small>${st.unlocked?st.title:"Locked"}</small></button>`).join("")}
      </div>
      <p class="picker-help">Complete stamps and challenges to unlock more cute K-food icons.</p>
    </section>`;
  attachAuthButtons();
}
async function selectProfileIcon(type, value){
  const previous=state.profileIcon;
  if(type === "google") state.profileIcon = null;
  else state.profileIcon = { type, value };
  try { await saveState(); }
  catch(error){ state.profileIcon=previous; toast("Could not save this change. Please try again."); return; }
  $("#iconPicker")?.remove();
  openAccountPanel();
  toast("Profile icon changed.");
}
function onGoogleIdentityReady(){
  initGoogleLogin();
  renderGoogleButton("gateGoogleButton");
  renderGoogleButton("panelGoogleButton");
  if(isLoggedIn() && !driveStartupRestoreStarted){
    driveStartupRestoreStarted=true;
    const email=authUser.email;
    initialAccountRestore.then(()=>{
      if(authUser?.email?.toLowerCase()!==email.toLowerCase()) return;
      restoreAccountState(email,requestDriveAccessToken(email,"none"));
    });
  }
}
const googleIdentityScript = $("#googleIdentityScript");
googleIdentityScript?.addEventListener("load", onGoogleIdentityReady);
googleIdentityScript?.addEventListener("error",()=>{
  googleScriptFailed = true;
  renderGoogleButton("gateGoogleButton");
  renderGoogleButton("panelGoogleButton");
});
window.addEventListener("load", onGoogleIdentityReady);

render();
if(isLoggedIn()) initialAccountRestore=restoreAccountState(authUser.email);
