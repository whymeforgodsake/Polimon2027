/* ============================================================
   POLIMON 2027 — LOGIQUE DU SITE
   ============================================================
   Ce fichier lit les données de data/polimons.js et construit
   le site automatiquement (Polidex, Combat, chapitres…).
   En temps normal, tu n'as PAS besoin de le modifier :
   tout le contenu s'édite dans data/polimons.js.
   ============================================================ */

/* ---------- Raccourcis vers les données ---------- */
const ELEMENTS   = POLIMON_DATA.elements;
const DIMENSIONS = POLIMON_DATA.dimensions;
const STATS      = POLIMON_DATA.stats;
const LEVELS     = POLIMON_DATA.levels;
const LINEAGES   = POLIMON_DATA.lineages;
const CHAPTERS   = POLIMON_DATA.chapters;

/* ---------- Aplatir les lignées : 36 Polimons ---------- */
const POLIMONS = [];
LINEAGES.forEach(l => {
  l.forms.forEach((f, i) => {
    POLIMONS.push({
      code: f.code, name: f.name, level: i + 1,
      lineage: l.id, dresseur: l.dresseur, parti: l.parti,
      elements: l.elements, dims: l.dims,
      /* image officielle : chemin explicite, sinon convention <code>.png */
      image: f.image || ('images/polimons/' + f.code + '.png'),
      /* stats : celles de la forme, sinon celles de la lignée, sinon vide */
      stats: Object.assign({}, l.stats || {}, f.stats || {})
    });
  });
});
POLIMONS.sort((a, b) => a.code - b.code);
const byCode = c => POLIMONS.find(p => p.code === c);

/* ============ NAVIGATION SPA ============ */
function go(space){
  document.querySelectorAll('section.space').forEach(s => s.classList.toggle('visible', s.id === space));
  document.querySelectorAll('a.navlink, a.brand').forEach(a => a.classList.toggle('active', a.dataset.nav === space));
  if(location.hash !== '#' + space) history.replaceState(null, '', '#' + space);
  window.scrollTo({top:0, behavior:'instant'});
  if(space === 'aventure') observeScenes();
}
window.addEventListener('hashchange', () => {
  const h = location.hash.replace('#','') || 'aventure';
  if(['aventure','combat','polidex'].includes(h)) go(h);
});
function scrollToStory(e){
  if(e) e.preventDefault();
  document.getElementById('story').scrollIntoView({behavior:'smooth'});
}

/* ============ SCROLLYTELLING ============ */
let sceneObserver = null;
function observeScenes(){
  if(sceneObserver) return;
  sceneObserver = new IntersectionObserver(entries => {
    entries.forEach(en => { if(en.isIntersecting) en.target.classList.add('on'); });
  }, {threshold:0.18});
  document.querySelectorAll('.scene').forEach(sc => sceneObserver.observe(sc));
}
function chooseStarter(el){
  document.querySelectorAll('.starter').forEach(s => s.classList.remove('chosen'));
  el.classList.add('chosen');
  const r = document.getElementById('starter-reponse');
  r.classList.add('show');
  r.scrollIntoView({behavior:'smooth', block:'center'});
}

/* ============ CHAPITRES (depuis les données) ============ */
function initChapters(){
  const box = document.getElementById('chapter-list');
  box.innerHTML = CHAPTERS.map(c => `
    <div class="chapter-row ${c.status === 'ok' ? 'done' : ''}">
      <div class="num">${c.num}</div>
      <div class="t"><b>${c.title}</b><span>${c.desc}</span></div>
      <div class="stat ${c.status}">${c.status === 'ok' ? 'DISPONIBLE' : 'À VENIR'}</div>
    </div>`).join('');
}

/* ============ SPRITES ============
   Chaque Polimon affiche son image officielle (images/polimons/<code>.png).
   Si le fichier n'existe pas encore, un sprite pixel-art généré
   automatiquement prend sa place — le site ne casse jamais. */
function mulberry32(a){
  return function(){
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function makeSprite(p, size){
  const cv = document.createElement('canvas');
  cv.className = 'gen';
  const grid = 10 + p.level * 2;            // plus évolué = plus grand
  cv.width = grid; cv.height = grid;
  cv.style.width = size + 'px'; cv.style.height = size + 'px';
  const ctx = cv.getContext('2d');
  const rnd = mulberry32(p.code * 2654435761);
  const c1 = ELEMENTS[p.elements[0]], c2 = ELEMENTS[p.elements[1]];
  const colors = [c1.color, c1.dark, c2.color, c2.dark];
  const half = Math.ceil(grid / 2);
  const density = 0.42 + p.level * 0.06;
  for(let y = 1; y < grid - 1; y++){
    for(let x = 1; x < half; x++){
      const cy = Math.abs(y - grid/2) / (grid/2), cx = Math.abs(x - grid/2) / (grid/2);
      const inside = (cx*cx + cy*cy) < 0.95;
      if(inside && rnd() < density){
        ctx.fillStyle = colors[Math.floor(rnd() * colors.length)];
        ctx.fillRect(x, y, 1, 1);
        ctx.fillRect(grid - 1 - x, y, 1, 1);
      }
    }
  }
  // yeux
  ctx.fillStyle = '#16161a';
  const ey = Math.floor(grid * 0.4), ex = Math.floor(grid * 0.32);
  ctx.fillRect(ex, ey, 1, 1); ctx.fillRect(grid - 1 - ex, ey, 1, 1);
  return cv;
}
/* Image officielle avec repli automatique sur le sprite généré */
function spriteNode(p, size){
  const img = document.createElement('img');
  img.className = 'poli-img';
  img.alt = p.name;
  img.style.width = size + 'px';
  img.style.height = size + 'px';
  img.onerror = () => img.replaceWith(makeSprite(p, size));
  img.src = p.image;
  return img;
}

/* ============ HELPERS ============ */
function elTags(p){
  return p.elements.map(e => {
    const d = ELEMENTS[e];
    return `<span class="tag" style="background:${d.color}">${d.emoji} ${e.toUpperCase()}</span>`;
  }).join('');
}
function lvlInfo(n){ return LEVELS[n-1]; }
function pad3(n){ return String(n).padStart(3,'0'); }

/* Barres de statistiques : affiche les valeurs > 0, sinon « — » */
function statBars(p){
  const hasAny = STATS.some(s => (p.stats[s] || 0) > 0);
  const bars = STATS.map(s => {
    const v = p.stats[s] || 0;
    return `<div class="statbar"><span style="min-width:82px;">${s}</span>
      <div class="bar"><div style="position:absolute;inset:0;width:${Math.min(v,100)}%;background:var(--jaune);"></div></div>
      <span>${v > 0 ? v : '—'}</span></div>`;
  }).join('');
  const note = hasAny ? '' : `<p class="stats-note">Les statistiques seront révélées dans une prochaine version du Polidex.</p>`;
  return { bars, note, hasAny };
}

/* ============ COMBAT ============ */
let combatLevel = 1;
function initCombat(){
  const lp = document.getElementById('lvl-picker');
  lp.innerHTML = LEVELS.map(l =>
    `<button class="lvl-btn ${l.n===combatLevel?'active':''}" onclick="setLevel(${l.n})">NIV.${l.n} ${l.label.toUpperCase()}</button>`
  ).join('');
  fillSelects();
  renderCombat();
}
function setLevel(n){
  combatLevel = n;
  document.querySelectorAll('.lvl-btn').forEach((b,i) => b.classList.toggle('active', i === n-1));
  fillSelects();
  renderCombat();
}
function fillSelects(){
  const pool = POLIMONS.filter(p => p.level === combatLevel);
  const opts = sel => pool.map((p,i) =>
    `<option value="${p.code}" ${i===sel?'selected':''}>#${pad3(p.code)} ${p.name.toUpperCase()}</option>`).join('');
  document.getElementById('selA').innerHTML = opts(0);
  document.getElementById('selB').innerHTML = opts(1);
}
function face(p, elId){
  const box = document.getElementById(elId);
  box.innerHTML = `
    <div class="spr"></div>
    <div class="pname">${p.name.toUpperCase()}</div>
    <div class="meta">${elTags(p)}</div>
    <div class="meta">Dresseur : <b>${p.dresseur}</b> · ${p.parti}<br>
    Niveau ${p.level} — ${lvlInfo(p.level).label}</div>`;
  box.querySelector('.spr').appendChild(spriteNode(p, 116));
}
function renderCombat(){
  const a = byCode(+document.getElementById('selA').value);
  const b = byCode(+document.getElementById('selB').value);
  if(!a || !b) return;
  face(a, 'faceA'); face(b, 'faceB');
  const cmp = document.getElementById('compare');
  let html = '';
  if(a.code === b.code){
    html = `<div class="placeholder-panel">Un Polimon ne peut pas affronter son propre reflet…<br>choisis deux idées différentes !</div>`;
  } else {
    html = DIMENSIONS.map(d => `
      <h3>${d.icon} DIMENSION ${d.num} — ${d.label.toUpperCase()}</h3>
      <div class="cmp-row">
        <div class="cmp-cell a"><div class="who">${a.name.toUpperCase()} (${a.parti})</div>${a.dims[d.key]}</div>
        <div class="cmp-cell b"><div class="who">${b.name.toUpperCase()} (${b.parti})</div>${b.dims[d.key]}</div>
      </div>`).join('');
    const sa = statBars(a), sb = statBars(b);
    const wip = (sa.hasAny || sb.hasAny) ? '' : ' <span class="wip">EN CONSTRUCTION</span>';
    html += `
      <h3>📊 STATISTIQUES DE COMBAT${wip}</h3>
      <div class="cmp-row">
        <div class="cmp-cell a"><div class="who">${a.name.toUpperCase()}</div><div class="statbars" style="max-width:none;grid-template-columns:1fr;">${sa.bars}</div></div>
        <div class="cmp-cell b"><div class="who">${b.name.toUpperCase()}</div><div class="statbars" style="max-width:none;grid-template-columns:1fr;">${sb.bars}</div></div>
      </div>
      ${sa.note}`;
  }
  cmp.innerHTML = html;
}

/* ============ POLIDEX ============ */
function initDex(){
  const sel = document.getElementById('dex-element');
  sel.innerHTML += Object.keys(ELEMENTS).map(e =>
    `<option value="${e}">${ELEMENTS[e].emoji} ${e.toUpperCase()}</option>`).join('');
  renderDex();
}
function renderDex(){
  const q  = document.getElementById('dex-search').value.trim().toLowerCase();
  const lv = +document.getElementById('dex-level').value;
  const el = document.getElementById('dex-element').value;
  const grid = document.getElementById('dex-grid');
  const list = POLIMONS.filter(p =>
    (!lv || p.level === lv) &&
    (!el || p.elements.includes(el)) &&
    (!q || p.name.toLowerCase().includes(q) || p.dresseur.toLowerCase().includes(q) || p.parti.toLowerCase().includes(q))
  );
  grid.innerHTML = '';
  list.forEach(p => {
    const card = document.createElement('div');
    card.className = 'dex-card';
    card.onclick = () => openFiche(p.code);
    card.innerHTML = `
      <div class="code-badge">#${pad3(p.code)}</div>
      <div class="lvl" title="Niveau ${p.level}">${'★'.repeat(p.level)}</div>
      <div class="spr"></div>
      <div class="nm">${p.name.toUpperCase()}</div>
      <div class="el">${p.elements.map(e => ELEMENTS[e].emoji).join(' ')}</div>`;
    card.querySelector('.spr').appendChild(spriteNode(p, 84));
    grid.appendChild(card);
  });
  document.getElementById('dex-count').textContent =
    list.length + ' / ' + POLIMONS.length + ' Polimons affichés';
}

/* fiche */
function openFiche(code){
  const p = byCode(code);
  const lin = LINEAGES.find(l => l.id === p.lineage);
  const c = document.getElementById('fiche-content');
  const st = statBars(p);
  c.innerHTML = `
    <div class="fiche-head">
      <div class="spr"></div>
      <div>
        <h3>#${pad3(p.code)} ${p.name.toUpperCase()}</h3>
        <div class="sub">
          ${elTags(p)}<br><br>
          Dresseur : <b>${p.dresseur}</b> — ${p.parti}<br>
          Niveau ${p.level} · <b>${lvlInfo(p.level).label}</b> — ${lvlInfo(p.level).desc}
        </div>
      </div>
    </div>
    <h4>LIGNÉE D'ÉVOLUTION « 3P »</h4>
    <div class="evo-row">
      ${lin.forms.map((f,i) => `
        <div class="evo-step ${f.code===p.code?'cur':''}" onclick="openFiche(${f.code})">
          <div class="mini" data-code="${f.code}"></div>
          <span class="nm">${f.name.toUpperCase()}</span>
          <span class="lv">Niv.${i+1} ${lvlInfo(i+1).label}</span>
        </div>${i<2?'<span class="evo-arr">▶</span>':''}`).join('')}
    </div>
    <h4>LES 5 DIMENSIONS</h4>
    ${DIMENSIONS.map(d => `
      <div class="dim-row"><b>${d.icon} ${d.num}. ${d.label}</b><p>${p.dims[d.key]}</p></div>`).join('')}
    <h4>STATISTIQUES${st.hasAny ? '' : ' <span class="wip">EN CONSTRUCTION</span>'}</h4>
    <div class="statbars" style="max-width:none;">${st.bars}</div>
    ${st.note}`;
  c.querySelector('.fiche-head .spr').appendChild(spriteNode(p, 132));
  c.querySelectorAll('.mini').forEach(m => {
    m.appendChild(spriteNode(byCode(+m.dataset.code), 64));
  });
  document.getElementById('fiche-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeFiche(){
  document.getElementById('fiche-overlay').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeFiche(); });

/* ============ INIT ============ */
initChapters();
initCombat();
initDex();
const h0 = location.hash.replace('#','');
go(['aventure','combat','polidex'].includes(h0) ? h0 : 'aventure');
observeScenes();
