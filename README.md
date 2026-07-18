<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Dilrabo</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<style>
  :root{
    --ink: #1a060a;
    --wine: #340b13;
    --wine-2: #4a121b;
    --gold: #e2263f;
    --gold-soft: #ff7a5c;
    --ivory: #fff6f0;
    --rose-dust: #ff9db0;
    --hairline: rgba(226,38,63,0.4);
  }
  *{box-sizing:border-box; margin:0; padding:0;}
  html{scroll-behavior:smooth;}
  body{
    background:
      radial-gradient(ellipse 900px 500px at 50% -10%, rgba(226,38,63,0.18), transparent 60%),
      var(--ink);
    color: var(--ivory);
    font-family: 'Manrope', sans-serif;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
  }
  @media (prefers-reduced-motion: reduce){
    *{animation-duration:0.001ms !important; transition-duration:0.001ms !important;}
  }

  .wrap{max-width: 620px; margin: 0 auto; padding: 0 24px;}

  /* ---------- Header ---------- */
  header{
    padding: 72px 0 40px;
    text-align:center;
  }
  .monogram{
    width: 56px; height: 56px;
    margin: 0 auto 28px;
    border: 1px solid var(--gold);
    border-radius: 50%;
    display:flex; align-items:center; justify-content:center;
    font-family:'Cormorant Garamond', serif;
    font-style: italic;
    font-weight: 600;
    font-size: 24px;
    color: var(--gold-soft);
    position: relative;
  }
  .monogram::before{
    content:"";
    position:absolute;
    inset: -8px;
    border: 1px solid rgba(226,38,63,0.45);
    border-radius: 50%;
  }
  .eyebrow{
    font-size: 11px;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: var(--rose-dust);
    font-weight: 600;
    margin-bottom: 20px;
  }
  h1{
    font-family: 'Cormorant Garamond', serif;
    font-weight: 500;
    font-style: italic;
    font-size: clamp(38px, 7vw, 56px);
    line-height: 1.12;
    letter-spacing: 0.005em;
    color: var(--ivory);
  }
  h1 span{ color: var(--gold-soft); }

  .flourish{
    width: 120px;
    margin: 22px auto 0;
    opacity: 0.7;
  }

  .sub{
    color: var(--rose-dust);
    font-size: 15.5px;
    margin-top: 22px;
    max-width: 420px;
    margin-left:auto; margin-right:auto;
    line-height:1.7;
    font-weight: 500;
  }

  /* ---------- Card ---------- */
  .card{
    background: linear-gradient(180deg, var(--wine), var(--ink));
    border: 1px solid var(--hairline);
    border-radius: 4px;
    padding: 40px 36px;
    margin: 44px 0 24px;
    position: relative;
  }
  .card::before{
    content:"";
    position:absolute; top:14px; left:14px; right:14px; bottom:14px;
    border: 1px solid rgba(226,38,63,0.25);
    pointer-events:none;
  }

  .label{
    font-size: 10.5px;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--gold);
    font-weight: 700;
    margin-bottom: 14px;
    display:block;
  }

  .her-quote{
    font-family:'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 22px;
    line-height: 1.5;
    color: var(--gold-soft);
    border-left: 2px solid var(--gold);
    padding-left: 20px;
    min-height: 34px;
  }

  textarea{
    width:100%;
    margin-top: 4px;
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--hairline);
    color: var(--ivory);
    font-family: 'Manrope', sans-serif;
    font-size: 14.5px;
    line-height:1.6;
    resize: none;
    min-height: 60px;
    outline:none;
    padding-bottom: 10px;
    margin-top: 24px;
  }
  textarea::placeholder{color: rgba(255,246,240,0.45);}
  textarea:focus{border-bottom-color: var(--gold);}

  .tone-line{
    display:flex; align-items:center; flex-wrap:wrap;
    gap: 10px;
    margin: 28px 0 6px;
  }
  .tone-word{
    background:none;
    border:none;
    color: var(--rose-dust);
    font-family: 'Manrope', sans-serif;
    font-size: 13px;
    letter-spacing: 0.04em;
    cursor:pointer;
    padding: 4px 2px;
    position: relative;
  }
  .tone-word::after{
    content:"";
    position:absolute; left:0; right:0; bottom:0;
    height:1px; background: var(--gold);
    transform: scaleX(0);
    transition: transform .2s ease;
  }
  .tone-word[aria-pressed="true"]{ color: var(--gold-soft); }
  .tone-word[aria-pressed="true"]::after{ transform: scaleX(1); }
  .tone-word:focus-visible{ outline: 1px solid var(--gold); outline-offset: 3px; }
  .tone-dot{ color: rgba(226,38,63,0.6); font-size: 12px; }

  .go-btn{
    width:100%;
    margin-top: 32px;
    padding: 16px;
    border-radius: 2px;
    border: 1px solid var(--gold);
    background: transparent;
    color: var(--gold-soft);
    font-family:'Manrope', sans-serif;
    font-weight:700;
    font-size: 12px;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    cursor:pointer;
    transition: all .25s ease;
  }
  .go-btn:hover{ background: var(--gold); color: var(--ink); }
  .go-btn:disabled{opacity:0.5; cursor:default; background:transparent; color:var(--gold-soft);}
  .go-btn:focus-visible{outline: 2px solid var(--gold-soft); outline-offset:3px;}

  .hint{
    text-align:center;
    color: var(--rose-dust);
    font-size: 13px;
    margin: 16px 0 0;
    min-height: 18px;
  }

  /* ---------- Results ---------- */
  .results{
    display:flex; flex-direction:column; gap:16px;
  }
  .reply-card{
    background: var(--wine);
    border: 1px solid var(--hairline);
    border-left: 2px solid var(--gold);
    border-radius: 2px;
    padding: 26px 28px;
    opacity:0;
    transform: translateY(10px);
    animation: rise .5s ease forwards;
  }
  .reply-card:nth-child(2){animation-delay:.1s;}
  @keyframes rise{ to{opacity:1; transform:translateY(0);} }

  .reply-head{
    display:flex; justify-content:space-between; align-items:baseline;
    margin-bottom:14px;
  }
  .reply-label{
    font-size: 10.5px;
    letter-spacing:0.24em;
    text-transform:uppercase;
    color: var(--gold);
    font-weight: 700;
  }
  .spark-meter{
    display:flex; align-items:center; gap:5px;
  }
  .spark-dots{display:flex; gap:4px;}
  .spark-dot{width:4px; height:4px; border-radius:50%; background: rgba(226,38,63,0.45);}
  .spark-dot.on{background: var(--gold-soft);}

  .reply-text{
    font-family: 'Cormorant Garamond', serif;
    font-size: 19px;
    font-style: italic;
    line-height:1.6;
    color: var(--ivory);
  }
  .copy-btn{
    margin-top:16px;
    background:none;
    border:none;
    border-bottom: 1px solid rgba(226,38,63,0.6);
    color: var(--rose-dust);
    font-size:11.5px;
    letter-spacing: 0.08em;
    padding: 0 0 2px;
    cursor:pointer;
  }
  .copy-btn:hover{color: var(--gold-soft); border-bottom-color: var(--gold);}

  footer{
    text-align:center;
    padding: 56px 0 60px;
    color: rgba(255,157,176,0.8);
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  /* ---------- Signup gate ---------- */
  #gate{
    position: fixed; inset: 0;
    background:
      radial-gradient(ellipse 900px 500px at 50% -10%, rgba(226,38,63,0.18), transparent 60%),
      var(--ink);
    display:flex; align-items:center; justify-content:center;
    padding: 24px;
    z-index: 100;
  }
  .gate-card{
    max-width: 400px;
    width: 100%;
    background: linear-gradient(180deg, var(--wine), var(--ink));
    border: 1px solid var(--hairline);
    border-radius: 4px;
    padding: 40px 32px;
    text-align:center;
  }
  .gate-card .monogram{ margin: 0 auto 24px; }
  .gate-title{
    font-family:'Cormorant Garamond', serif;
    font-style: italic;
    font-weight: 500;
    font-size: 28px;
    color: var(--ivory);
    margin-bottom: 8px;
  }
  .gate-sub{
    color: var(--rose-dust);
    font-size: 13.5px;
    margin-bottom: 28px;
    line-height: 1.6;
  }
  .gate-field{
    text-align: left;
    margin-bottom: 18px;
  }
  .gate-field label{
    display:block;
    font-size: 10.5px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    font-weight: 700;
    margin-bottom: 8px;
  }
  .gate-field input{
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--hairline);
    color: var(--ivory);
    font-family: 'Manrope', sans-serif;
    font-size: 14.5px;
    padding: 6px 2px 10px;
    outline: none;
  }
  .gate-field input::placeholder{ color: rgba(255,246,240,0.35); }
  .gate-field input:focus{ border-bottom-color: var(--gold); }
  .dob-row{ display:flex; gap: 10px; }
  .dob-row input{ text-align:center; }
  .gate-error{
    color: var(--gold-soft);
    font-size: 12.5px;
    margin-bottom: 14px;
    min-height: 16px;
  }
  .gate-note{
    color: rgba(255,157,176,0.6);
    font-size: 11px;
    margin-top: 20px;
    line-height: 1.6;
  }
  #app{ display:none; }
</style>
</head>
<body>
<div id="gate">
  <div class="gate-card">
    <div class="monogram">D</div>
    <div class="gate-title">Хуш омадед</div>
    <div class="gate-sub">Пеш аз идома додан, лутфан худро муаррифӣ кунед</div>

    <div class="gate-field">
      <label for="fname">Ном</label>
      <input type="text" id="fname" placeholder="Номи шумо">
    </div>
    <div class="gate-field">
      <label for="lname">Насаб</label>
      <input type="text" id="lname" placeholder="Насаби шумо">
    </div>
    <div class="gate-field">
      <label>Санаи таваллуд</label>
      <div class="dob-row">
        <input type="number" id="dob-day" placeholder="Рӯз" min="1" max="31">
        <input type="number" id="dob-month" placeholder="Моҳ" min="1" max="12">
        <input type="number" id="dob-year" placeholder="Сол" min="1930" max="2015">
      </div>
    </div>
    <div class="gate-field">
      <label for="phone">Рақами телефон</label>
      <input type="tel" id="phone" placeholder="+992 __ ___ __ __">
    </div>

    <div class="gate-error" id="gateError"></div>
    <button class="go-btn" id="gateBtn">Ворид шудан</button>
    <div class="gate-note">Маълумоти шумо танҳо дар ин дастгоҳ нигоҳ дошта мешавад ва ба ҷои дигар фиристода намешавад.</div>
  </div>
</div>

<div id="app">
<div class="wrap">
  <header>
    <div class="monogram">D</div>
    <div class="eyebrow">Намунаи аввалия</div>
    <h1>Ҳар калима<br><span>бо ноз интихоб карда шуд</span></h1>
    <svg class="flourish" viewBox="0 0 120 12" fill="none">
      <path d="M0 6 H45 M75 6 H120" stroke="#e2263f" stroke-width="0.75"/>
      <circle cx="60" cy="6" r="3" stroke="#e2263f" stroke-width="0.75"/>
    </svg>
    <p class="sub">Паёми ӯро гузор. Оҳангро интихоб кун. Дилрабо ду ҷавоби нозук пешниҳод мекунад — гуфтори ту, вале беҳтарин нусхаи он.</p>
  </header>

  <div class="card">
    <span class="label">Паёми ворида</span>
    <div class="her-quote" id="herMsgDisplay">— матни ӯро дар поён нависед</div>

    <textarea id="herMsg" placeholder="Масалан: «Шаб хуш» ё «Ту хеле аҷиб ҳастӣ»..."></textarea>

    <span class="label" style="margin-top:26px;">Оҳанг</span>
    <div class="tone-line" id="toneRow">
      <button class="tone-word" data-tone="ҳазломез" aria-pressed="true">ҳазломез</button>
      <span class="tone-dot">·</span>
      <button class="tone-word" data-tone="ҷиддӣ ва самимӣ" aria-pressed="false">самимӣ</button>
      <span class="tone-dot">·</span>
      <button class="tone-word" data-tone="боэътимод ва флирт" aria-pressed="false">флирт</button>
      <span class="tone-dot">·</span>
      <button class="tone-word" data-tone="оромона" aria-pressed="false">оромона</button>
    </div>

    <button class="go-btn" id="goBtn">Ду вариант пешниҳод кун</button>
    <div class="hint" id="hint"></div>
  </div>

  <div class="results" id="results"></div>

  <footer>Dilrabo · барои санҷиш сохта шудааст</footer>
</div>
</div>

<div id="adminPanel" style="display:none; position:fixed; inset:0; background:var(--ink); z-index:200; overflow-y:auto; padding:32px 20px;">
  <div class="wrap">
    <div class="label" style="margin-bottom:20px;">Рӯйхати сабтшудагон (танҳо барои соҳиб)</div>
    <div id="adminList" style="display:flex; flex-direction:column; gap:12px;"></div>
    <button class="go-btn" id="closeAdmin" style="margin-top:24px;">Пӯшидан</button>
  </div>
</div>

<script>
const SUPABASE_URL = 'https://ydmgymmwxmtoxnhsnztj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkbWd5bW13eG10b3huaHNuenRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQzMTQ5MTksImV4cCI6MjA5OTg5MDkxOX0.SlO7zU0FoAW9_mtz0jh22IMhP42xMzT6H-v3F0m3i2o';
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ---- Signup gate ----
const gate = document.getElementById('gate');
const app = document.getElementById('app');
const gateBtn = document.getElementById('gateBtn');
const gateError = document.getElementById('gateError');

gateBtn.addEventListener('click', async () => {
  const fname = document.getElementById('fname').value.trim();
  const lname = document.getElementById('lname').value.trim();
  const day = parseInt(document.getElementById('dob-day').value, 10);
  const month = parseInt(document.getElementById('dob-month').value, 10);
  const year = parseInt(document.getElementById('dob-year').value, 10);
  const phone = document.getElementById('phone').value.trim();

  if(!fname || !lname){
    gateError.textContent = 'Лутфан ном ва насабро ворид кунед.';
    return;
  }
  if(!day || !month || !year || day < 1 || day > 31 || month < 1 || month > 12 || year < 1930 || year > 2015){
    gateError.textContent = 'Лутфан санаи таваллудро дуруст ворид кунед.';
    return;
  }
  if(!phone || phone.replace(/\D/g,'').length < 9){
    gateError.textContent = 'Лутфан рақами телефонро дуруст ворид кунед.';
    return;
  }

  gateError.textContent = '';
  gateBtn.disabled = true;
  gateBtn.textContent = 'Нигоҳ дошта истодааст...';

  const dob = `${String(day).padStart(2,'0')}.${String(month).padStart(2,'0')}.${year}`;

  const { error } = await sb.from('signups').insert([{ fname, lname, dob, phone }]);

  if(error){
    console.error('Supabase error:', error);
    gateError.textContent = 'Хатогӣ: ' + (error.message || error.hint || error.details || JSON.stringify(error));
    gateBtn.disabled = false;
    gateBtn.textContent = 'Ворид шудан';
    return;
  }

  gate.style.display = 'none';
  app.style.display = 'block';
});

// ---- Admin panel (triple-click footer to open) ----
const adminPanel = document.getElementById('adminPanel');
const adminList = document.getElementById('adminList');
const closeAdmin = document.getElementById('closeAdmin');
const footerEl = document.querySelector('footer');
let clickCount = 0, clickTimer = null;

footerEl.style.cursor = 'pointer';
footerEl.addEventListener('click', () => {
  clickCount++;
  clearTimeout(clickTimer);
  clickTimer = setTimeout(() => { clickCount = 0; }, 600);
  if(clickCount >= 3){
    clickCount = 0;
    openAdmin();
  }
});

closeAdmin.addEventListener('click', () => {
  adminPanel.style.display = 'none';
});

async function openAdmin(){
  adminPanel.style.display = 'block';

  const { data: { session } } = await sb.auth.getSession();
  if(!session){
    renderLoginForm();
    return;
  }
  loadSignups();
}

function renderLoginForm(){
  adminList.innerHTML = `
    <div class="gate-field">
      <label for="adminEmail">Email</label>
      <input type="email" id="adminEmail" placeholder="email@example.com">
    </div>
    <div class="gate-field">
      <label for="adminPass">Парол</label>
      <input type="password" id="adminPass" placeholder="••••••••">
    </div>
    <div class="gate-error" id="adminLoginError"></div>
    <button class="go-btn" id="adminLoginBtn">Вуруд</button>
  `;
  document.getElementById('adminLoginBtn').addEventListener('click', async () => {
    const email = document.getElementById('adminEmail').value.trim();
    const password = document.getElementById('adminPass').value;
    const errEl = document.getElementById('adminLoginError');
    errEl.textContent = '';
    const { error } = await sb.auth.signInWithPassword({ email, password });
    if(error){
      errEl.textContent = 'Email ё парол нодуруст аст.';
      return;
    }
    loadSignups();
  });
}

async function loadSignups(){
  adminList.innerHTML = '<div class="hint">Бор карда истодааст...</div>';
  const { data, error } = await sb.from('signups').select('*').order('created_at', { ascending: false });
  if(error){
    adminList.innerHTML = '<div class="hint">Хатогӣ ҳангоми боркунӣ. Шумо ворид шудаед, вале иҷозати хондан надоред?</div>';
    console.error(error);
    return;
  }
  if(!data || data.length === 0){
    adminList.innerHTML = '<div class="hint">Ҳанӯз ҳеҷ кас сабти ном накардааст.</div>';
    return;
  }
  adminList.innerHTML = data.map(r => `
    <div class="reply-card">
      <div class="reply-text" style="font-style:normal; font-family:'Manrope',sans-serif; font-size:14px;">
        <strong>${r.fname} ${r.lname}</strong><br>
        Санаи таваллуд: ${r.dob}<br>
        Телефон: ${r.phone}<br>
        <span style="opacity:0.6; font-size:12px;">${new Date(r.created_at).toLocaleString('ru-RU')}</span>
      </div>
    </div>
  `).join('');
}
</script>

<script>
const herMsgInput = document.getElementById('herMsg');
const herMsgDisplay = document.getElementById('herMsgDisplay');
const toneRow = document.getElementById('toneRow');
const goBtn = document.getElementById('goBtn');
const hint = document.getElementById('hint');
const results = document.getElementById('results');

let selectedTone = 'ҳазломез';

herMsgInput.addEventListener('input', () => {
  herMsgDisplay.textContent = herMsgInput.value.trim() ? '"' + herMsgInput.value.trim() + '"' : '— матни ӯро дар поён нависед';
});

toneRow.addEventListener('click', (e) => {
  const btn = e.target.closest('.tone-word');
  if(!btn) return;
  [...toneRow.querySelectorAll('.tone-word')].forEach(c => c.setAttribute('aria-pressed','false'));
  btn.setAttribute('aria-pressed','true');
  selectedTone = btn.dataset.tone;
});

function sparkDots(level){
  let dots = '';
  for(let i=0;i<5;i++){
    dots += `<span class="spark-dot ${i<level ? 'on':''}"></span>`;
  }
  return dots;
}

async function generateReplies(){
  const msg = herMsgInput.value.trim();
  if(!msg){
    hint.textContent = 'Аввал паёмашро нависед.';
    return;
  }
  goBtn.disabled = true;
  goBtn.textContent = 'Фикр карда истодаам...';
  hint.textContent = '';
  results.innerHTML = '';

  try{
    const prompt = `Ту дар зимни бозии наздик "гуфтугӯи флирт" кӯмак мерасонӣ. Шахсе паёми зерро аз шахси дӯстдоштааш гирифтааст: "${msg}"

Оҳанги дилхоҳ: ${selectedTone}

Ду вариант ҷавоб пешниҳод кун, ки табиӣ, кӯтоҳ (1-2 ҷумла), эҳтиромона ва диққатҷалбкунанда бошанд. Ҳар ду вариант бояд ба забони тоҷикӣ бошанд ва аз ҳам фарқ кунанд (масалан як каме бештар боэътимод, дигаре мулоимтар).

Дар охири ҳар ҷавоб як смайлики мувофиқ ба оҳанг ва мазмуни ҷумла илова кун (масалан 😊, 😉, 🙂, ❤️, 😏 — вобаста ба оҳанг). Аз зиёда истифода бурдани смайлик худдорӣ кун — танҳо як смайлик дар охири ҳар ҷавоб кофист.

Ҷавобро ФАҚАТ дар формати JSON бидеҳ, бидуни ягон матни иловагӣ, чунин:
{"replies": [{"text": "...", "spark": 3}, {"text": "...", "spark": 4}]}

"spark" бояд рақами аз 1 то 5 бошад, ки дараҷаи ҷасорат/боэътимодии ҷавобро нишон медиҳад.`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    const rawText = data.content.map(b => b.text || '').join('');
    const clean = rawText.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);

    parsed.replies.forEach((r, i) => 
