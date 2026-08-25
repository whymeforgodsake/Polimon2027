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
  if(['aventure','combat','polidex','dresseurs'].includes(h)) go(h);
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
/* Choix du starter : la Pokéball s'agite, s'ouvre dans un flash,
   puis révèle le Polimon. */
function chooseStarter(el){
  if(el.classList.contains('opened')){ selectStarter(el); return; }
  if(el.classList.contains('opening')) return;
  el.classList.add('opening');
  el.querySelector('.pokeball').classList.add('shaking');
  setTimeout(() => {
    el.classList.remove('opening');
    el.classList.add('opened');
    selectStarter(el);
  }, 950);
}
function selectStarter(el){
  document.querySelectorAll('.starter').forEach(s => s.classList.remove('chosen'));
  el.classList.add('chosen');
  if(el.dataset.name) el.querySelector('.ballrow').textContent = el.dataset.name;
  /* révèle la fin alternative correspondant au compagnon choisi */
  const files = { a: '11a-chosen-leaf.webp', b: '11b-chosen-stone.webp', c: '11c-chosen-ember.webp' };
  const scene = document.getElementById('branch-scene');
  const img   = document.getElementById('branch-img');
  if(scene && files[el.dataset.branch]){
    img.src = 'images/story/ep1/' + files[el.dataset.branch];
    scene.hidden = false;
    scene.classList.remove('on');
    requestAnimationFrame(() => requestAnimationFrame(() => scene.classList.add('on')));
  }
  const r = document.getElementById('starter-reponse');
  r.classList.add('show');
  (scene || r).scrollIntoView({behavior:'smooth', block:'center'});
}

/* ============ PARALLAXE DOUCE DES SCÈNES ============
   Les illustrations glissent légèrement au défilement.
   Désactivée si l'utilisateur préfère réduire les animations. */
function initParallax(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    document.querySelectorAll('#story .art').forEach(a => {
      const r = a.getBoundingClientRect();
      if(r.bottom < 0 || r.top > vh) return;
      const c = (r.top + r.height / 2 - vh / 2) / vh; // -0.5 → 0.5
      const img = a.querySelector('img');
      if(img) img.style.transform = `translateY(${(-c * 30).toFixed(1)}px) scale(1.1)`;
    });
  };
  window.addEventListener('scroll', () => {
    if(!ticking){ ticking = true; requestAnimationFrame(update); }
  }, {passive: true});
  update();
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
/* Version pixelisée façon Game Boy : l'image officielle est réduite
   sur une petite grille puis agrandie sans lissage. Repli sur le
   sprite généré si l'image n'existe pas. */
function pixelateNode(p, size, grid){
  grid = grid || 48;
  const cv = document.createElement('canvas');
  cv.className = 'gen';
  cv.width = grid; cv.height = grid;
  cv.style.width = size + 'px'; cv.style.height = size + 'px';
  const ctx = cv.getContext('2d');
  const img = new Image();
  img.onload = () => {
    ctx.drawImage(img, 0, 0, grid, grid);
    try { // fond blanc → transparent (peut échouer en local file://)
      const d = ctx.getImageData(0, 0, grid, grid);
      for(let i = 0; i < d.data.length; i += 4){
        if(d.data[i] > 232 && d.data[i+1] > 232 && d.data[i+2] > 232) d.data[i+3] = 0;
      }
      ctx.putImageData(d, 0, 0);
    } catch(e){ /* on garde le fond blanc, pas grave */ }
  };
  img.onerror = () => cv.replaceWith(makeSprite(p, size));
  img.src = p.image;
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

/* ============ EFFET CARTE HOLOGRAPHIQUE ============
   Inclinaison 3D qui suit la souris + reflet arc-en-ciel + éclat,
   comme une carte Pokémon brillante. Aucune librairie externe. */
function attachHolo(card){
  const holo  = document.createElement('div'); holo.className  = 'holo';
  const glare = document.createElement('div'); glare.className = 'glare';
  card.append(holo, glare);
  card.addEventListener('mousemove', e => {
    const r  = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top)  / r.height;
    card.classList.add('holo-on');
    card.style.transform =
      `perspective(750px) rotateX(${((py - .5) * -16).toFixed(2)}deg)` +
      ` rotateY(${((px - .5) * 16).toFixed(2)}deg) scale3d(1.06,1.06,1.06)`;
    holo.style.backgroundPosition = `${(px * 100).toFixed(1)}% ${(py * 100).toFixed(1)}%`;
    glare.style.background =
      `radial-gradient(circle at ${(px * 100).toFixed(1)}% ${(py * 100).toFixed(1)}%,` +
      ` rgba(255,255,255,.34), transparent 55%)`;
  });
  card.addEventListener('mouseleave', () => {
    card.classList.remove('holo-on');
    card.style.transform = '';
  });
}
/* Convertit une couleur hex en version transparente (pour les halos) */
function tint(hex, alpha){
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${alpha})`;
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
/* Plaque d'info façon Game Boy (nom, niveau, éléments, barre PV) */
function plate(p, elId){
  document.getElementById(elId).innerHTML = `
    <div class="pl-name"><span>${p.name.toUpperCase()}</span><span class="pl-lvl">${'★'.repeat(p.level)}</span></div>
    <div class="pl-el">${p.elements.map(e => ELEMENTS[e].emoji + ' ' + e.toUpperCase()).join(' · ')}
      — ${p.dresseur} (${p.parti})</div>
    <div class="pl-hp"><span>PV</span><div class="pl-bar"><div></div></div></div>`;
}
/* Place un Polimon pixelisé sur la scène, avec animation d'entrée */
function battleSprite(p, slotId){
  const slot = document.getElementById(slotId);
  slot.innerHTML = '';
  slot.appendChild(pixelateNode(p, 160));
  slot.classList.remove('enter');
  void slot.offsetWidth; // relance l'animation
  slot.classList.add('enter');
}
function renderCombat(){
  const a = byCode(+document.getElementById('selA').value);
  const b = byCode(+document.getElementById('selB').value);
  if(!a || !b) return;
  plate(a, 'plateA'); plate(b, 'plateB');
  battleSprite(a, 'sprA'); battleSprite(b, 'sprB');
  document.getElementById('battle-msg').textContent =
    a.code === b.code
      ? 'Un Polimon ne peut pas affronter son propre reflet…'
      : `${b.name.toUpperCase()} sauvage apparaît ! ${a.name.toUpperCase()}, le combat des idées commence !`;
  const cmp = document.getElementById('compare');
  let html = '';
  if(a.code === b.code){
    html = `<div class="placeholder-panel">Un Polimon ne peut pas affronter son propre reflet…<br>choisis deux idées différentes !</div>`;
  } else {
    /* Règle : le combat se joue sur la dimension correspondant au niveau
       des Polimons (niveau 1 → dimension 1, niveau 2 → dimension 2,
       niveau 3 → dimension 3). Les 5 dimensions restent visibles dans
       les fiches du Polidex. */
    const dimsShown = DIMENSIONS.filter(d => d.num === combatLevel);
    html = dimsShown.map(d => `
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
    const c1 = ELEMENTS[p.elements[0]], c2 = ELEMENTS[p.elements[1]];
    card.style.setProperty('--c1', c1.color);
    card.style.setProperty('--c1-glow', tint(c1.color, .28));
    card.style.background =
      `linear-gradient(165deg, ${tint(c1.dark,.5)}, #232329 42%, ${tint(c2.dark,.4)})`;
    card.innerHTML = `
      <div class="code-badge">#${pad3(p.code)}</div>
      <div class="lvl" title="Niveau ${p.level}">${'★'.repeat(p.level)}</div>
      <div class="spr"></div>
      <div class="nm">${p.name.toUpperCase()}</div>
      <div class="el">${p.elements.map(e => ELEMENTS[e].emoji).join(' ')}</div>
      <div class="who-mini">${p.dresseur}</div>`;
    card.querySelector('.spr').appendChild(spriteNode(p, 84));
    attachHolo(card);
    grid.appendChild(card);
  });
  document.getElementById('dex-count').textContent =
    list.length + ' / ' + POLIMONS.length + ' Polimons affichés';
}

/* ============ DRESSEURS ============
   Les fiches des 12 dresseurs sont générées depuis data/polimons.js.
   Photo optionnelle : dépose images/dresseurs/<id>.png (ex. 1.png pour
   la lignée n°1) — sinon un médaillon avec les initiales s'affiche. */
function initDresseurs(){
  const grid = document.getElementById('trainer-grid');
  if(!grid) return;
  grid.innerHTML = '';
  LINEAGES.forEach(l => {
    const c1 = ELEMENTS[l.elements[0]], c2 = ELEMENTS[l.elements[1]];
    const initials = l.dresseur.split(/[\s-]+/).map(w => w[0]).join('').slice(0,3).toUpperCase();
    const card = document.createElement('div');
    card.className = 'trainer-card';
    card.style.setProperty('--c1', c1.color);
    card.style.background =
      `linear-gradient(165deg, ${tint(c1.dark,.45)}, #232329 45%, ${tint(c2.dark,.35)})`;
    card.innerHTML = `
      <div class="t-head">
        <div class="t-avatar"><span class="initials">${initials}</span></div>
        <div>
          <div class="t-name">${l.dresseur.toUpperCase()}</div>
          <div class="t-parti">${l.parti.toUpperCase()}</div>
          <div>${l.elements.map(e => {
            const d = ELEMENTS[e];
            return `<span class="tag" style="background:${d.color}">${d.emoji} ${e.toUpperCase()}</span>`;
          }).join('')}</div>
        </div>
      </div>
      <p class="t-bio">${l.bio || ''}</p>
      <div class="t-lineup">
        ${l.forms.map((f,i) => `
          <div class="t-poli" data-code="${f.code}" onclick="openFiche(${f.code})">
            <span class="pn">${f.name.toUpperCase()}</span>
            <span class="pl">${'★'.repeat(i+1)}</span>
          </div>`).join('')}
      </div>`;
    // photo du dresseur (optionnelle), sinon initiales
    const av = card.querySelector('.t-avatar');
    const photo = new Image();
    photo.onload = () => { av.innerHTML = ''; av.appendChild(photo); };
    photo.alt = l.dresseur;
    photo.src = 'images/dresseurs/' + l.id + '.png';
    // vignettes des 3 Polimons de la lignée
    card.querySelectorAll('.t-poli').forEach(el => {
      const p = byCode(+el.dataset.code);
      el.insertBefore(spriteNode(p, 56), el.firstChild);
    });
    attachHolo(card);
    grid.appendChild(card);
  });
}

/* Dimensions affichées selon le niveau du Polimon :
   niv.1 → les 5 dimensions ; niv.2 → les 25 sous-dimensions (X.Y) ;
   niv.3 → les 59 thèmes (X.Y.Z). Les contenus des niveaux 2 et 3 se
   remplissent dans data/polimons.js via le bloc "dimsDetail". */
function dimsSection(p){
  if(p.level === 1){
    return `<h4>LES 5 DIMENSIONS — PHILOSOPHIE</h4>` +
      DIMENSIONS.map(d => `
        <div class="dim-row"><b>${d.icon} ${d.num}. ${d.label}</b><p>${p.dims[d.key]}</p></div>`).join('');
  }
  const subs   = POLIMON_DATA.sousDimensions || [];
  const detail = (LINEAGES.find(l => l.id === p.lineage).dimsDetail) || {};
  const depth  = p.level === 2 ? 2 : 3;
  const title  = depth === 2 ? 'LES 25 SOUS-DIMENSIONS — PERSPECTIVE' : 'LES 59 THÈMES — PROGRAMME';
  return `<h4>${title}</h4>` + DIMENSIONS.map(d => {
    const rows = subs.filter(s => s.code.split('.').length === depth && s.code.startsWith(d.num + '.'));
    return `
      <details class="dim-group">
        <summary>${d.icon} ${d.num}. ${d.label.toUpperCase()} (${rows.length})</summary>
        <p class="dim-intro">${p.dims[d.key]}</p>
        ${rows.map(s => `
          <div class="dim-row"><b>${s.code} — ${s.label}</b>
          <p>${detail[s.code] || '<i class="wip-txt">Contenu en préparation…</i>'}</p></div>`).join('')}
      </details>`;
  }).join('');
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
    ${dimsSection(p)}
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

/* ============ NAVIGATION CLAVIER DU SCROLLYTELLING ============
   Bonne pratique retenue : navigation discrète scène par scène.
   Espace / ▼ = scène suivante, Maj+Espace / ▲ = scène précédente,
   avec défilement doux — comme le bouton A d'une Game Boy.
   On n'intercepte jamais le clavier dans un champ de saisie,
   ni en dehors de l'espace Aventure. */
function visibleScenes(){
  return [...document.querySelectorAll('#story .scene')]
    .filter(s => !s.hidden && s.offsetParent !== null);
}
function stepScene(dir){
  const scenes = visibleScenes();
  if(!scenes.length) return false;
  const mid = window.innerHeight / 2;
  let target = null;
  if(dir > 0) target = scenes.find(s => s.getBoundingClientRect().top > mid + 40);
  else        target = [...scenes].reverse().find(s => s.getBoundingClientRect().bottom < mid - 40);
  if(!target) return false;
  target.scrollIntoView({behavior:'smooth', block:'center'});
  return true;
}
document.addEventListener('keydown', e => {
  const t = e.target;
  if(t && /^(INPUT|SELECT|TEXTAREA|BUTTON)$/.test(t.tagName)) return;
  if(document.getElementById('fiche-overlay').classList.contains('open')) return;
  if(!document.getElementById('aventure').classList.contains('visible')) return;
  const next = (e.key === ' ' && !e.shiftKey) || e.key === 'ArrowDown' || e.key === 'PageDown';
  const prev = (e.key === ' ' && e.shiftKey)  || e.key === 'ArrowUp'   || e.key === 'PageUp';
  if((next && stepScene(1)) || (prev && stepScene(-1))) e.preventDefault();
});
/* activation clavier des cartes d'espaces */
document.querySelectorAll('.space-card').forEach(c => {
  c.addEventListener('keydown', e => {
    if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); c.click(); }
  });
});

/* ============ MARCHEUR & AIDE CLAVIER ============
   Sachez (vu de dos) marche sur le chemin pendant le défilement ;
   l'aide clavier s'affiche une fois arrivé dans l'histoire. */
(function(){
  const walker = document.getElementById('walker');
  const hint   = document.getElementById('kbd-hint');
  if(!walker) return;
  let timer = null, hinted = false;
  window.addEventListener('scroll', () => {
    walker.classList.add('walking');
    clearTimeout(timer);
    timer = setTimeout(() => walker.classList.remove('walking'), 160);
    if(hint){
      const story = document.getElementById('story');
      const inStory = story && story.getBoundingClientRect().top < window.innerHeight * .6
                      && story.getBoundingClientRect().bottom > window.innerHeight * .4;
      const aventureOn = document.getElementById('aventure').classList.contains('visible');
      hint.classList.toggle('show', inStory && aventureOn && !hinted);
      if(inStory && !hinted) setTimeout(() => { hinted = true; hint.classList.remove('show'); }, 6000);
    }
  }, {passive:true});
})();

/* ============ INIT ============ */
initChapters();
initCombat();
initDex();
initDresseurs();
initParallax();
const h0 = location.hash.replace('#','');
go(['aventure','combat','polidex','dresseurs'].includes(h0) ? h0 : 'aventure');
observeScenes();
