/* ============================================================
   POLIMON 2027 - LOGIQUE DU SITE
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
/* Lignées masquées temporairement du site entier
   (Bardella tant que Marine Le Pen est en lice) */
const HIDDEN_LINEAGES = [11];
const LINEAGES   = POLIMON_DATA.lineages.filter(l => !HIDDEN_LINEAGES.includes(l.id));
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

/* ============ v19 - CARTES SECRÈTES & DÉBLOCAGE ============
   Les Polimons de niveau 2 et 3 sont cachés (carte secrète).
   - Un niveau 2 se révèle en réussissant le quizz de sa lignée.
   - Les niveaux 3 ne sont pas déblocables par le quizz.
   - Le code secret révèle toutes les cartes d'un coup.
   La progression est mémorisée dans le navigateur (localStorage). */
const SECRET_CODE = 'jevoteen2027';
const UNLOCK_KEY  = 'polimon-unlocked';
let unlockState = { codes: [], all: false };
try {
  const u = JSON.parse(localStorage.getItem(UNLOCK_KEY) || 'null');
  if(u && Array.isArray(u.codes)) unlockState = { codes: u.codes, all: !!u.all };
} catch(e){}
function saveUnlocks(){
  try { localStorage.setItem(UNLOCK_KEY, JSON.stringify(unlockState)); } catch(e){}
}
function isUnlocked(p){
  return p.level === 1 || unlockState.all || unlockState.codes.includes(p.code);
}
function shuffle(a){
  for(let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

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
    entries.forEach(en => { if(en.isIntersecting) activateScene(en.target); });
  }, {threshold:0.18});
  document.querySelectorAll('.scene').forEach(sc => sceneObserver.observe(sc));
}
function activateScene(sc){
  if(sc.classList.contains('on')) return;
  sc.classList.add('on');
  startTyping(sc);
}

/* ============ MACHINE À ÉCRIRE FAÇON GAME BOY ============
   Le texte des dialogues s'écrit lettre à lettre quand la scène
   apparaît. Un clic sur la bulle affiche tout instantanément.
   Désactivée si l'utilisateur préfère réduire les animations. */
const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function startTyping(scene){
  if(REDUCED_MOTION) return;
  scene.querySelectorAll('.pxbox.dialog').forEach((box, i) => {
    setTimeout(() => typeDialog(box), 260 + i * 700);
  });
}
function typeDialog(box){
  if(box.dataset.typed) return;
  box.dataset.typed = '1';
  const nodes = [];
  (function collect(el){
    el.childNodes.forEach(n => {
      if(n.nodeType === 3) nodes.push({ n, text: n.textContent });
      else if(n.nodeType === 1 && !n.classList.contains('speaker') && !n.classList.contains('arrow')) collect(n);
    });
  })(box);
  const total = nodes.reduce((s, x) => s + x.text.length, 0);
  if(!total) return;
  nodes.forEach(x => x.n.textContent = '');
  box.classList.add('typing');
  const step = total > 260 ? 3 : 2;          // textes longs : un peu plus vite
  let ni = 0, ci = 0;
  const finish = () => {
    nodes.forEach(x => x.n.textContent = x.text);
    box.classList.remove('typing');
    clearInterval(timer);
    box.removeEventListener('click', finish);
  };
  box.addEventListener('click', finish);
  const timer = setInterval(() => {
    for(let k = 0; k < step; k++){
      if(ni >= nodes.length) return finish();
      const cur = nodes[ni];
      ci++;
      cur.n.textContent = cur.text.slice(0, ci);
      if(ci >= cur.text.length){ ni++; ci = 0; }
    }
  }, 16);
}
/* ============ CHOIX DU COMPAGNON - directement dans l'image ============
   La scène « 10-explore-ideas » contient déjà, dessinés dans l'image,
   les 5 hexagones de dimensions au-dessus de chaque Polimon. On pose
   par-dessus des zones interactives invisibles (en % de l'image) :
   survoler un hexagone révèle la philosophie correspondante, cliquer
   sur un Polimon le choisit - définitivement. Le choix est mémorisé
   (localStorage) pour que l'épisode 2 s'en souvienne. */
const BRANCHES = {
  a: { code: 7,  starter: 'voltatal', file: '11a-chosen-voltatal.webp' },
  b: { code: 3,  starter: 'melava',   file: '11b-chosen-melava.webp' },
  c: { code: 10, starter: 'marinej',  file: '11c-chosen-marinej.webp' }
};
let starterChosen = false;   /* le choix est définitif */
let currentBranch = null;

/* positions, en % de l'image : centre de chaque Polimon + centre de
   son groupe d'hexagones */
const CHOIX_SPOTS = [
  { branch: 'a', poli: { x: 34.4, y: 47.5 }, hexCx: 33.7 },
  { branch: 'b', poli: { x: 54.1, y: 47.0 }, hexCx: 54.1 },
  { branch: 'c', poli: { x: 74.8, y: 45.5 }, hexCx: 75.0 }
];
/* décalage de chaque hexagone autour du centre du groupe
   (haut = individu ; milieu = société/économie ; bas = écologie/géopolitique) */
const HEX_OFF = {
  individu:     { dx:  0.0, y: 15.9 },
  societe:      { dx: -2.2, y: 23.6 },
  economie:     { dx:  2.8, y: 23.6 },
  ecologie:     { dx: -4.4, y: 31.0 },
  geopolitique: { dx:  5.2, y: 31.0 }
};
function initChoixScene(){
  const art = document.getElementById('choix-art');
  if(!art) return;
  CHOIX_SPOTS.forEach(s => {
    const p = byCode(BRANCHES[s.branch].code);
    /* pastilles à survoler, une par dimension - chaque pastille porte
       sa propre bulle (pur CSS : fiable et sans décalage) */
    DIMENSIONS.forEach(d => {
      const o = HEX_OFF[d.key];
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'hs-dim col-' + s.branch;
      b.style.left = (s.hexCx + o.dx) + '%';
      b.style.top  = o.y + '%';
      b.setAttribute('aria-label', p.name + ' : dimension ' + d.label);
      const txt = (p.dims[d.key] && p.dims[d.key] !== 'TBD') ? p.dims[d.key] : 'À compléter…';
      b.innerHTML = `<span class="hs-dtip"><b>${d.icon} ${p.name.toUpperCase()} · ${d.label.toUpperCase()}</b><i>${txt}</i></span>`;
      b.addEventListener('click', e => e.preventDefault());
      art.appendChild(b);
    });
    /* zone cliquable du Polimon lui-même */
    const z = document.createElement('button');
    z.type = 'button';
    z.className = 'hs-poli';
    z.dataset.branch = s.branch;
    z.style.left = s.poli.x + '%';
    z.style.top  = s.poli.y + '%';
    z.setAttribute('aria-label', 'Choisir ' + p.name + ' comme compagnon');
    z.innerHTML = `<span class="hs-ring"></span><span class="hs-name">CHOISIR ${p.name.toUpperCase()} ▸</span>`;
    z.addEventListener('click', () => selectBranch(s.branch));
    art.appendChild(z);
  });
  /* si un choix a déjà été fait lors d'une visite précédente, on le restaure */
  let saved = null;
  try { saved = localStorage.getItem('polimon-branch'); } catch(e){}
  if(saved && BRANCHES[saved]) selectBranch(saved, true);
}
function selectBranch(branch, restoring){
  if(starterChosen && !restoring) return;         /* choix verrouillé */
  starterChosen = true;
  currentBranch = branch;
  try { localStorage.setItem('polimon-branch', branch); } catch(e){}
  const B = BRANCHES[branch];
  /* état visuel directement dans l'image */
  document.querySelectorAll('.hs-poli').forEach(z => {
    const isChosen = z.dataset.branch === branch;
    z.classList.toggle('chosen', isChosen);
    z.classList.toggle('locked', !isChosen);
    if(!isChosen) z.disabled = true;
    else {
      z.querySelector('.hs-name').textContent = '★ TON COMPAGNON';
      z.setAttribute('aria-pressed', 'true');
    }
  });
  /* le compagnon choisi suit Sachez sur la carte */
  const follower = document.getElementById('follower');
  if(follower){
    document.getElementById('follower-img').src =
      'images/story/polimon-smallonmap-' + B.code + '.png';
    follower.hidden = false;
  }
  /* révèle la fin alternative de l'épisode 1 */
  const scene = document.getElementById('branch-scene');
  const img   = document.getElementById('branch-img');
  if(scene){
    img.src = 'images/story/ep1/' + B.file;
    scene.hidden = false;
    document.getElementById('starter-reponse').classList.add('show');
    if(!restoring){
      scene.classList.remove('on');
      requestAnimationFrame(() => requestAnimationFrame(() => activateScene(scene)));
      scene.scrollIntoView({behavior:'smooth', block:'center'});
    } else {
      scene.classList.add('on');
    }
  }
  /* déverrouille et personnalise l'épisode 2 */
  applyBranchEp2(branch);
  /* le bouton « recommencer » devient disponible */
  const rb = document.getElementById('restart-btn');
  if(rb) rb.hidden = false;
}

/* ============ RECOMMENCER LA PARTIE ============
   Efface le compagnon mémorisé puis recharge la page.
   Double-clic de confirmation pour éviter les faux pas. */
function restartGame(btn){
  if(!btn.dataset.armed){
    btn.dataset.armed = '1';
    btn.textContent = '⚠ SÛR ? CLIQUE ENCORE POUR TOUT EFFACER';
    setTimeout(() => {
      btn.dataset.armed = '';
      btn.textContent = '↺ RECOMMENCER LA PARTIE';
    }, 3500);
    return;
  }
  try { localStorage.removeItem('polimon-branch'); } catch(e){}
  location.reload();
}

/* ============ ÉPISODE 2 - Le Dîner de famille ============
   Les 7 scènes existent en 3 variantes (une par compagnon choisi).
   On personnalise images, nom du compagnon et citations d'idées
   (les textes viennent de data/polimons.js, jamais dupliqués ici). */
function applyBranchEp2(branch){
  const B = BRANCHES[branch];
  const ally = byCode(B.code);
  const foe  = byCode(8);   /* Brumedo, l'idée de tonton Gérard */
  document.querySelectorAll('[data-ep2]').forEach(img => {
    img.src = 'images/story/ep2/' + img.dataset.ep2 + '-' + B.starter + '.webp';
  });
  document.querySelectorAll('[data-ep2-name]').forEach(el => {
    el.textContent = ally.name.toUpperCase();
  });
  document.querySelectorAll('[data-eq]').forEach(el => {
    const side = el.dataset.eq.split(':')[0], key = el.dataset.eq.split(':')[1];
    const src = side === 'ally' ? ally : foe;
    el.textContent = (src.dims[key] && src.dims[key] !== 'TBD') ? src.dims[key] : 'À compléter…';
  });
  const gate = document.getElementById('ep2-gate');
  const sc   = document.getElementById('ep2-scenes');
  if(gate) gate.hidden = true;
  if(sc && sc.hidden){
    sc.hidden = false;
    if(sceneObserver) sc.querySelectorAll('.scene').forEach(x => sceneObserver.observe(x));
  }
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
      if(a.classList.contains('interactive')) return;
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

/* ============ ÉPISODES (depuis les données) ============ */
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
   automatiquement prend sa place - le site ne casse jamais. */
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

/* Barres de statistiques : affiche les valeurs > 0, sinon « - » */
function statBars(p){
  const hasAny = STATS.some(s => (p.stats[s] || 0) > 0);
  const bars = STATS.map(s => {
    const v = p.stats[s] || 0;
    return `<div class="statbar"><span style="min-width:82px;">${s}</span>
      <div class="bar"><div style="position:absolute;inset:0;width:${Math.min(v,100)}%;background:var(--jaune);"></div></div>
      <span>${v > 0 ? v : '-'}</span></div>`;
  }).join('');
  const note = hasAny ? '' : `<p class="stats-note">Les statistiques seront révélées dans une prochaine version du Polidex.</p>`;
  return { bars, note, hasAny };
}

/* ============ COMBAT v22 - la riposte des idées ============
   Sélection façon jeu vidéo (sprites pixel qui défilent), puis :
   à chaque round, l'ADVERSAIRE attaque avec son idée (bulle BD) ;
   le joueur riposte en choisissant la bonne idée de SON Polimon
   parmi 2 suggestions (l'autre est un leurre d'une autre lignée).
   Bonne riposte : l'adversaire perd 20 PV ; mauvaise : toi.
   Victoire : capture de l'idée adverse dans la Poliball, puis
   TON Polimon évolue (sa carte secrète est révélée). */

let combatLevel = 1;   /* niveau choisi dans le menu déroulant (1, 2 ou 3) */
/* un Polimon ne peut combattre que si ses 5 idées sont écrites */
function dimsComplete(p){
  return DIMENSIONS.every(d => p.dims[d.key] && p.dims[d.key] !== 'TBD');
}
const PV_MAX = 100, PV_HIT = 20;
let fight = null;                            /* état du combat en cours */
const pickState = { a: null, b: 'rand' };    /* sélection : codes ou 'rand' */

function say(text){ document.getElementById('battle-msg').textContent = text; }
function combatPool(){
  return POLIMONS.filter(p =>
    p.level === combatLevel && dimsComplete(p) && isUnlocked(p));
}
/* changement de niveau dans le menu déroulant */
function onLevelChange(){
  if(fight) return;
  combatLevel = +document.getElementById('combat-level').value || 1;
  pickState.a = null;
  pickState.b = 'rand';
  refreshPick();
}

/* ---------- sélection façon écran de choix de personnage ---------- */
function buildPickers(){
  const pool = combatPool();
  const fightBtn = document.getElementById('btn-fight');
  if(pool.length < 2){
    /* pas assez de Polimons révélés à ce niveau pour un duel */
    ['railA','railB'].forEach(id => {
      const r = document.getElementById(id);
      if(r) r.innerHTML = '<div class="pick-empty">Pas assez de Polimons de niveau ' + combatLevel +
        ' révélés… Fais-les évoluer en gagnant des combats de niveau inférieur !</div>';
    });
    const nA = document.getElementById('pickNameA'), nB = document.getElementById('pickNameB');
    if(nA) nA.textContent = ''; if(nB) nB.textContent = '';
    if(fightBtn) fightBtn.disabled = true;
    return;
  }
  if(fightBtn) fightBtn.disabled = false;
  if(pickState.a === null || !pool.some(p => p.code === pickState.a)) pickState.a = pool[0].code;
  if(pickState.b !== 'rand' && !pool.some(p => p.code === pickState.b)) pickState.b = 'rand';
  buildRail('railA', 'a', pool);
  buildRail('railB', 'b', pool);
  updatePickNames();
}
function buildRail(railId, side, pool){
  const rail = document.getElementById(railId);
  if(!rail) return;
  rail.innerHTML = '';
  /* l'adversaire peut être tiré au hasard */
  if(side === 'b'){
    const t = document.createElement('button');
    t.type = 'button';
    t.className = 'pick-tile rand' + (pickState.b === 'rand' ? ' sel' : '');
    t.innerHTML = '<span class="pt-q">?</span><span class="pt-n">AU HASARD</span>';
    t.onclick = () => { pickState.b = 'rand'; refreshPick(); };
    rail.appendChild(t);
  }
  pool.forEach(p => {
    const t = document.createElement('button');
    t.type = 'button';
    const selected  = pickState[side] === p.code;
    /* 2 Polimons identiques ne peuvent pas se battre */
    const forbidden = side === 'b' ? pickState.a === p.code : pickState.b === p.code;
    t.className = 'pick-tile' + (selected ? ' sel' : '') + (forbidden ? ' off' : '');
    t.disabled = forbidden;
    const img = document.createElement('img');
    img.alt = p.name;
    img.onerror = () => img.replaceWith(spriteNode(p, 56));
    img.src = 'images/polimons/battle/front/' + p.code + '.png';
    t.appendChild(img);
    const n = document.createElement('span');
    n.className = 'pt-n';
    n.textContent = p.name.toUpperCase();
    t.appendChild(n);
    t.onclick = () => {
      pickState[side] = p.code;
      if(side === 'a' && pickState.b === p.code) pickState.b = 'rand';
      refreshPick();
    };
    rail.appendChild(t);
  });
}
function refreshPick(){
  buildPickers();
  if(!fight) renderIdle();
}
function updatePickNames(){
  const a = byCode(pickState.a);
  const nA = document.getElementById('pickNameA');
  if(nA && a) nA.textContent = a.name.toUpperCase() + ' · ' + a.dresseur;
  const nB = document.getElementById('pickNameB');
  if(nB) nB.textContent = pickState.b === 'rand'
    ? '? · Adversaire tiré au hasard'
    : byCode(pickState.b).name.toUpperCase() + ' · ' + byCode(pickState.b).dresseur;
}

/* ---------- plaques, sprites, bulles ---------- */
function plate(p, elId, pv, wins){
  wins = wins || 0;
  const balls = Array.from({length: DIMENSIONS.length}, (_, k) =>
    `<span class="ball ${k < wins ? 'full' : ''}"></span>`).join('');
  document.getElementById(elId).innerHTML = `
    <div class="pl-name">${p.name.toUpperCase()} <span class="pl-l">:N${p.level}</span></div>
    <div class="pl-sub">${p.dresseur}</div>
    <div class="pl-hp"><span>PV:</span><div class="pl-bar"><div style="width:${pv}%;${pv<=40?'background:#c03028;':''}"></div></div></div>
    <div class="pl-foot"><span class="pl-balls">${balls}</span><span class="pl-pv">${pv}/ ${PV_MAX}</span></div>`;
}
function battleSprite(p, slotId, enter){
  const slot = document.getElementById(slotId);
  slot.className = slot.className.replace(/\b(hit|faint|victory|enter|sucked)\b/g, '').trim();
  slot.innerHTML = '';
  const frame = document.createElement('div');
  frame.className = 'spr-frame';
  /* ton Polimon est vu de dos, l'adversaire de face */
  const view = slotId === 'sprA' ? 'back' : 'front';
  const img = document.createElement('img');
  img.className = 'gb-sprite';
  img.alt = p.name;
  img.onerror = () => { frame.classList.add('no-gbsprite'); img.replaceWith(spriteNode(p, 150)); };
  img.src = 'images/polimons/battle/' + view + '/' + p.code + '.png';
  frame.appendChild(img);
  slot.appendChild(frame);
  if(enter){ void slot.offsetWidth; slot.classList.add('enter'); }
}
function showEl(id, on){ document.getElementById(id).classList.toggle('gone', !on); }
function trainerSprite(p, slotId){
  const slot = document.getElementById(slotId);
  const l = LINEAGES.find(x => x.id === p.lineage);
  slot.className = slot.className.replace(/\bexit\b/g, '').trim();
  slot.innerHTML = '';
  if(l) slot.appendChild(trainerAvatar(l, 'battle-tr', 'gb'));
}
/* bulles BD posées sur l'écran de jeu */
function showBubble(side, text){
  const el = document.getElementById(side === 'foe' ? 'bubbleFoe' : 'bubbleAlly');
  if(!el) return;
  el.textContent = text;
  el.hidden = false;
  el.classList.remove('pop');
  void el.offsetWidth;
  el.classList.add('pop');
}
function clearBubbles(){
  ['bubbleFoe','bubbleAlly'].forEach(id => {
    const e = document.getElementById(id);
    if(e) e.hidden = true;
  });
}

/* ---------- états ---------- */
function renderIdle(){
  ['sprA','sprB','plateA','plateB','trFoe','trAlly'].forEach(id => showEl(id, false));
  clearBubbles();
  const pb = document.getElementById('pokeball');
  if(pb) pb.hidden = true;
  document.getElementById('compare').innerHTML = '';
  const a = byCode(pickState.a);
  if(combatPool().length < 2){
    say(`Pas encore assez de Polimons de niveau ${combatLevel} révélés pour un duel !`);
  } else {
    say(a
      ? `${a.name.toUpperCase()} est prêt ! Choisis ton adversaire, puis lance le combat des idées.`
      : 'Choisis ton Polimon !');
  }
}
function setCombatControls(on){
  document.getElementById('btn-fight').style.display = on ? '' : 'none';
  document.querySelectorAll('.pick-panel').forEach(p => p.classList.toggle('locked', !on));
  const lv = document.getElementById('combat-level');
  if(lv) lv.disabled = !on;
}
function initCombat(){ buildPickers(); renderIdle(); }

/* ---------- déroulé du combat ---------- */
function startCombat(){
  const a = byCode(pickState.a);
  if(!a) return;
  let b;
  if(pickState.b === 'rand'){
    const pool = combatPool().filter(p => p.code !== a.code);
    b = pool[Math.floor(Math.random() * pool.length)];
  } else {
    b = byCode(pickState.b);
  }
  if(!b || b.code === a.code){
    say('Deux Polimons identiques ne peuvent pas se battre !');
    return;
  }
  fight = { a, b, pvA: PV_MAX, pvB: PV_MAX, winsA: 0, winsB: 0, round: 0, picks: [], busy: true };
  setCombatControls(false);
  document.getElementById('compare').innerHTML = '';
  clearBubbles();
  document.getElementById('pokeball').hidden = true;
  ['sprA','sprB','plateA','plateB'].forEach(id => showEl(id, false));
  /* face-à-face des dresseurs */
  trainerSprite(b, 'trFoe'); trainerSprite(a, 'trAlly');
  showEl('trFoe', true); showEl('trAlly', true);
  say(`${b.dresseur.toUpperCase()} VEUT SE BATTRE !`);
  setTimeout(() => {
    document.getElementById('trFoe').classList.add('exit');
    setTimeout(() => showEl('trFoe', false), 500);
    showEl('sprB', true); showEl('plateB', true);
    battleSprite(b, 'sprB', true);
    plate(b, 'plateB', PV_MAX, 0);
    say(`${b.dresseur.toUpperCase()} envoie ${b.name.toUpperCase()} !`);
  }, 1600);
  setTimeout(() => {
    document.getElementById('trAlly').classList.add('exit');
    setTimeout(() => showEl('trAlly', false), 500);
    showEl('sprA', true); showEl('plateA', true);
    battleSprite(a, 'sprA', true);
    plate(a, 'plateA', PV_MAX, 0);
    say(`En avant, ${a.name.toUpperCase()} !`);
  }, 3100);
  setTimeout(() => { fight.busy = false; nextRound(); }, 4400);
}

function nextRound(){
  if(!fight) return;
  if(fight.round >= DIMENSIONS.length) return endCombat();
  const d = DIMENSIONS[fight.round];
  clearBubbles();
  document.getElementById('compare').innerHTML = '';
  say(`ROUND ${fight.round + 1}/${DIMENSIONS.length} · ${d.label.toUpperCase()}`);
  /* 1. l'adversaire attaque avec son idée, en bulle BD */
  setTimeout(() => {
    showBubble('foe', fight.b.dims[d.key]);
    say(`ROUND ${fight.round + 1}/${DIMENSIONS.length} · ${d.label.toUpperCase()} - ${fight.b.name.toUpperCase()} attaque ! À toi de riposter ▼`);
    /* 2. deux suggestions : la bonne + un leurre d'une autre lignée */
    const correct = fight.a.dims[d.key];
    const others = POLIMONS.filter(x =>
      x.level === combatLevel && x.code !== fight.a.code && x.code !== fight.b.code &&
      x.dims[d.key] && x.dims[d.key] !== 'TBD');
    const decoy = others[Math.floor(Math.random() * others.length)].dims[d.key];
    const options = shuffle([{ txt: correct, ok: 1 }, { txt: decoy, ok: 0 }]);
    document.getElementById('compare').innerHTML = `
      <div class="riposte-head"><span class="rh-cursor">▼</span> RIPOSTE AVEC LA VRAIE IDÉE DE ${fight.a.name.toUpperCase()}</div>
      <div class="idea-row">${options.map((o, i) => `
        <div class="idea-card" data-ok="${o.ok ? 1 : ''}" onclick="answerRound(this)" tabindex="0" role="button">
          <span class="ic-tag">▶ RIPOSTE ${i === 0 ? 'A' : 'B'}</span>
          <p>${o.txt}</p>
        </div>`).join('')}
      </div>`;
    document.querySelectorAll('#compare .idea-card').forEach(c => {
      c.addEventListener('keydown', e => {
        if(e.key === 'Enter'){ e.preventDefault(); c.click(); }
      });
    });
  }, 800);
}

function answerRound(card){
  if(!fight || fight.busy) return;
  fight.busy = true;
  const ok = !!card.dataset.ok;
  const d = DIMENSIONS[fight.round];
  document.querySelectorAll('#compare .idea-card').forEach(c => {
    c.onclick = null;
    c.classList.add('revealed');
    if(c.dataset.ok) c.classList.add('picked');
    else if(c === card) c.classList.add('lost');
  });
  /* ta riposte apparaît en bulle BD côté allié */
  showBubble('ally', card.querySelector('p').textContent);
  setTimeout(() => {
    if(ok){
      fight.pvB -= PV_HIT; fight.winsA++;
      const slot = document.getElementById('sprB');
      slot.classList.add('hit');
      setTimeout(() => slot.classList.remove('hit'), 650);
      say(`Riposte parfaite ! ${fight.b.name.toUpperCase()} perd ${PV_HIT} PV.`);
    } else {
      fight.pvA -= PV_HIT; fight.winsB++;
      const slot = document.getElementById('sprA');
      slot.classList.add('hit');
      setTimeout(() => slot.classList.remove('hit'), 650);
      say(`Ce n'était pas l'idée de ${fight.a.name.toUpperCase()}… il perd ${PV_HIT} PV !`);
    }
    plate(fight.a, 'plateA', fight.pvA, fight.winsA);
    plate(fight.b, 'plateB', fight.pvB, fight.winsB);
    fight.picks.push({ dim: d, ok });
    /* enchaînement automatique vers le round suivant */
    setTimeout(() => continueFight(), 2400);
  }, 1000);
}
function continueFight(){
  if(!fight) return;
  fight.round++; fight.busy = false;
  nextRound();
}

function recapHtml(){
  return `<div class="recap">${fight.picks.map(p => `
    <div class="recap-row"><span class="rd">${p.dim.icon} ${p.dim.label}</span>
    <span class="rw">${p.ok ? '✔ RIPOSTE RÉUSSIE' : '✘ RIPOSTE RATÉE'}</span></div>`).join('')}</div>`;
}

function endCombat(){
  clearBubbles();
  const a = fight.a, b = fight.b;
  const won = fight.pvA > fight.pvB;
  const score = fight.winsA;
  document.getElementById('compare').innerHTML = '';
  if(!won){
    document.getElementById('sprA').classList.add('faint');
    document.getElementById('sprB').classList.add('victory');
    say(`${a.name.toUpperCase()} est K.O. (${score} / ${DIMENSIONS.length})… Pas d'évolution cette fois. Relis sa carte et retente ta chance !`);
    document.getElementById('compare').innerHTML = recapHtml() + `
      <div class="continue-wrap">
        <button class="btn" onclick="resetCombat()">↺ REJOUER</button>
        <button class="btn ghost" onclick="openFiche(${a.code})">RELIRE LA CARTE DE ${a.name.toUpperCase()}</button>
      </div>`;
    fight = null;
    return;
  }
  /* victoire : scénette de capture de l'idée adverse dans la Poliball */
  fight.busy = true;
  say(`${b.name.toUpperCase()} vacille… C'est le moment !`);
  const ball = document.getElementById('pokeball');
  ball.hidden = false;
  ball.className = 'pokeball throw';
  setTimeout(() => {
    document.getElementById('sprB').classList.add('sucked');
    ball.className = 'pokeball landed';
    say('L\'idée adverse est aspirée dans la Poliball…');
  }, 950);
  setTimeout(() => { ball.className = 'pokeball wobble'; }, 1700);
  setTimeout(() => {
    ball.className = 'pokeball caught';
    document.getElementById('sprA').classList.add('victory');
    say(`Clic ! ${b.name.toUpperCase()} est capturé. ${a.name.toUpperCase()} remporte le combat des idées ${score} / ${DIMENSIONS.length} !`);
  }, 3500);
  setTimeout(() => {
    const lin = LINEAGES.find(l => l.id === a.lineage);
    const t = evoTarget(lin);
    fight = null;
    if(t){
      if(!unlockState.codes.includes(t.target.code)){
        unlockState.codes.push(t.target.code);
        saveUnlocks();
        renderDex();
      }
      showEvolutionReveal(t.src, t.target);
    } else {
      say(`Victoire ${score} / ${DIMENSIONS.length} ! La lignée de ${a.name.toUpperCase()} est déjà complète.`);
      document.getElementById('compare').innerHTML = `
        <div class="continue-wrap"><button class="btn" onclick="resetCombat()">↺ REJOUER</button></div>`;
    }
  }, 5000);
}
function resetCombat(){
  fight = null;
  setCombatControls(true);
  refreshPick();
}

/* ============ POLIDEX ============ */
function initDex(){
  const sel = document.getElementById('dex-element');
  sel.innerHTML += Object.keys(ELEMENTS).map(e =>
    `<option value="${e}">${ELEMENTS[e].emoji} ${e.toUpperCase()}</option>`).join('');
  /* La molette verticale fait défiler le carrousel horizontalement,
     comme sur les galeries de cartes officielles. */
  const rail = document.getElementById('dex-rail');
  rail.addEventListener('wheel', e => {
    if(Math.abs(e.deltaY) > Math.abs(e.deltaX)){
      rail.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  }, { passive: false });
  renderDex();
}
/* La carte à jouer (partagée entre le carrousel du Polidex et la fiche).
   Retourne un élément .tcg complet : cadre élémentaire, art, talent,
   attaque, texte d'ambiance - avec l'effet holographique. */
function tcgNode(p, sprSize){
  const lin = LINEAGES.find(l => l.id === p.lineage);
  const c1 = ELEMENTS[p.elements[0]], c2 = ELEMENTS[p.elements[1]];
  const flavor = (p.dims.individu && p.dims.individu !== 'TBD') ? p.dims.individu : 'Un Polimon encore mystérieux…';
  const el = document.createElement('div');
  el.className = 'tcg';
  el.style.cssText = `--c1:${c1.color};--c2:${c2.color};--c1d:${c1.dark};--c2d:${c2.dark}`;
  el.innerHTML = `
    <div class="tcg-inner">
      <div class="tcg-head">
        <span class="tcg-stage">NIV.${p.level}</span>
        <span class="tcg-name">${p.name}</span>
        <span class="tcg-pv">PV<b>100</b></span>
        <span class="tcg-elicon">${c1.emoji}</span>
      </div>
      <div class="tcg-art"><div class="tcg-spr"></div></div>
      <div class="tcg-strip">N° ${pad3(p.code)} · Polimon ${lvlInfo(p.level).label} · Lignée ${lin.dresseur}</div>
      <div class="tcg-talent">
        <span class="talent-pill">Talent</span>
        <span class="talent-name">${lvlInfo(p.level).label}</span>
        <p>${lvlInfo(p.level).desc}</p>
      </div>
      <div class="tcg-attack">
        <span class="tcg-energy">${p.elements.map(e => `<i>${ELEMENTS[e].emoji}</i>`).join('')}</span>
        <span class="tcg-atk-name">Combat des idées</span>
        <span class="tcg-atk-dmg">${p.level * 40}</span>
      </div>
      <div class="tcg-foot">
        <span>Faiblesse<br><b>?</b></span>
        <span>Résistance<br><b>-</b></span>
        <span>Retraite<br><b>${'★'.repeat(p.level)}</b></span>
      </div>
      <p class="tcg-flavor">${flavor}</p>
      <div class="tcg-credits"><span>Illus. DemZet</span><span>${pad3(p.code)}/${pad3(POLIMONS.length)} · ${p.parti}</span></div>
    </div>`;
  el.querySelector('.tcg-spr').appendChild(spriteNode(p, sprSize || 300));
  attachHolo(el);
  return el;
}

/* Carte secrète : même format qu'une vraie carte, mais tout est masqué.
   Cliquer sur une carte secrète de niveau 2 lance le quizz de sa lignée. */
function secretCardNode(p){
  const hint = p.level === 2
    ? 'Remporte un combat d\'idées avec sa lignée pour révéler cette carte !'
    : 'Remporte un nouveau combat d\'idées avec sa lignée pour révéler cette carte !';
  const el = document.createElement('div');
  el.className = 'tcg tcg-secret';
  el.innerHTML = `
    <div class="tcg-inner">
      <div class="tcg-head">
        <span class="tcg-stage">NIV.${p.level}</span>
        <span class="tcg-name">???</span>
        <span class="tcg-pv">PV<b>?</b></span>
        <span class="tcg-elicon">❓</span>
      </div>
      <div class="tcg-art"><span class="secret-q">?</span></div>
      <div class="tcg-strip">N° ${pad3(p.code)} · CARTE SECRÈTE</div>
      <div class="tcg-talent">
        <span class="talent-pill">Secret</span>
        <span class="talent-name">${lvlInfo(p.level).label}</span>
        <p>${hint}</p>
      </div>
      <div class="tcg-foot">
        <span>Faiblesse<br><b>?</b></span>
        <span>Résistance<br><b>?</b></span>
        <span>Retraite<br><b>?</b></span>
      </div>
      <div class="tcg-credits"><span>Illus. ???</span><span>${pad3(p.code)}/${pad3(POLIMONS.length)}</span></div>
    </div>`;
  return el;
}

/* Le Polidex en carrousel : toutes les cartes côte à côte, triées par
   lignée puis par niveau (les 3 évolutions se suivent), défilement
   horizontal doux (molette, flèches, doigt) avec magnétisme léger. */
function renderDex(){
  const q  = document.getElementById('dex-search').value.trim().toLowerCase();
  const lv = +document.getElementById('dex-level').value;
  const el = document.getElementById('dex-element').value;
  const rail = document.getElementById('dex-rail');
  const list = POLIMONS.filter(p =>
    (!lv || p.level === lv) &&
    (!el || p.elements.includes(el)) &&
    (!q || p.name.toLowerCase().includes(q) || p.dresseur.toLowerCase().includes(q) || p.parti.toLowerCase().includes(q))
  ).sort((a, b) => a.lineage - b.lineage || a.level - b.level);
  rail.innerHTML = '';
  list.forEach(p => {
    const slide = document.createElement('div');
    slide.className = 'dex-slide';
    const locked = !isUnlocked(p);
    const card = locked ? secretCardNode(p) : tcgNode(p, 220);
    card.setAttribute('role', 'button');
    card.tabIndex = 0;
    if(locked){
      card.title = 'Carte secrète : remporte un combat avec sa lignée pour la révéler';
      card.onclick = () => goCombatFor(p.lineage);
      card.addEventListener('keydown', e => { if(e.key === 'Enter') goCombatFor(p.lineage); });
    } else {
      card.title = 'Ouvrir la carte de ' + p.name;
      card.onclick = () => openFiche(p.code);
      card.addEventListener('keydown', e => { if(e.key === 'Enter') openFiche(p.code); });
    }
    slide.appendChild(card);
    rail.appendChild(slide);
  });
  /* dernière carte du rail : le code secret */
  const endSlide = document.createElement('div');
  endSlide.className = 'dex-slide';
  endSlide.innerHTML = `
    <div class="dex-endcard">
      <div class="qz-emoji">🔐</div>
      <h4>CODE SECRET</h4>
      <p>On raconte que le Professeur Chen aurait caché un code magique capable de révéler toutes les cartes d'un coup…</p>
      <div class="secret-code">
        <div class="code-row">
          <input type="text" id="dex-code" placeholder="TON CODE…" autocomplete="off"
                 onkeydown="if(event.key==='Enter')trySecretCode()">
          <button class="btn small" type="button" onclick="trySecretCode()">OK</button>
        </div>
        <div class="code-msg" id="code-msg"></div>
      </div>
    </div>`;
  rail.appendChild(endSlide);
  rail.scrollLeft = 0;
  const revealed = POLIMONS.filter(isUnlocked).length;
  document.getElementById('dex-count').textContent =
    list.length + ' / ' + POLIMONS.length + ' Polimons affichés · ' +
    revealed + ' / ' + POLIMONS.length + ' cartes révélées';
}

/* Le code secret révèle toutes les cartes */
function trySecretCode(){
  const inp = document.getElementById('dex-code');
  const val = (inp.value || '').trim().toLowerCase();
  if(!val) return;
  if(val === SECRET_CODE){
    unlockState.all = true;
    saveUnlocks();
    renderDex();
    const msg = document.getElementById('code-msg');
    if(msg){ msg.textContent = '✔ CODE ACCEPTÉ : toutes les cartes sont révélées !'; msg.className = 'code-msg ok'; }
  } else {
    const msg = document.getElementById('code-msg');
    msg.textContent = '✘ Code inconnu…';
    msg.className = 'code-msg ko';
    inp.value = '';
  }
}
/* Flèches ◀ ▶ : avance de deux cartes, en douceur */
function railScroll(dir){
  const rail = document.getElementById('dex-rail');
  const slide = rail.querySelector('.dex-slide');
  const w = slide ? slide.getBoundingClientRect().width + 22 : 360;
  rail.scrollBy({ left: dir * w * 2, behavior: 'smooth' });
}

/* ============ DRESSEURS ============
   Liste épurée : portrait (ou initiales), nom, éléments.
   Un clic ouvre la carte détaillée du dresseur (bio + lignée).
   Photo optionnelle : images/dresseurs/<id>.png. */
function trainerAvatar(l, cls, variant){
  /* variant : 'head' (préviews, recadrées sur le visage), 'full'
     (illustration entière, fiche dresseur) ou 'gb' (sprite pixel, combat) */
  variant = variant || 'head';
  const initials = l.dresseur.split(/[\s-]+/).map(w => w[0]).join('').slice(0,3).toUpperCase();
  const av = document.createElement('div');
  av.className = cls;
  av.innerHTML = `<span class="initials">${initials}</span>`;
  const photo = new Image();
  photo.onload = () => { av.innerHTML = ''; av.appendChild(photo); };
  photo.alt = l.dresseur;
  photo.src = variant === 'gb'   ? 'images/dresseurs/gb/' + l.id + '.png'
            : variant === 'full' ? 'images/dresseurs/' + l.id + '.png'
            :                      'images/dresseurs/' + l.id + '-head.png';
  return av;
}
function initDresseurs(){
  const grid = document.getElementById('trainer-grid');
  if(!grid) return;
  grid.innerHTML = '';
  LINEAGES.forEach(l => {
    const c1 = ELEMENTS[l.elements[0]];
    const statutCls = l.statut === 'Déclaré' ? 'ok' : 'soon';
    const bar = document.createElement('div');
    bar.className = 'trainer-bar';
    bar.tabIndex = 0;
    bar.setAttribute('role', 'button');
    bar.style.setProperty('--c1', c1.color);
    bar.innerHTML = `
      <div class="tb-id">
        <div class="tb-name">${l.dresseur.toUpperCase()}</div>
        <div class="tb-parti">${l.parti}</div>
      </div>
      <div class="tb-el">${l.elements.map(e => {
        const d = ELEMENTS[e];
        return `<span class="tag" style="background:${d.color}">${d.emoji} ${e.toUpperCase()}</span>`;
      }).join('')}</div>
      <div class="tb-badges">
        ${l.statut ? `<span class="stat ${statutCls}">${l.statut.toUpperCase()}</span>` : ''}
        ${l.intentions && l.intentions !== '?' ? `<span class="tb-int">${l.intentions}</span>` : ''}
      </div>
      <div class="tb-go">▸</div>`;
    bar.insertBefore(trainerAvatar(l, 't-avatar tb-avatar'), bar.firstChild);
    bar.onclick = () => openDresseur(l.id);
    bar.addEventListener('keydown', e => {
      if(e.key === 'Enter'){ e.preventDefault(); bar.click(); }
    });
    grid.appendChild(bar);
  });
}

/* Carte détaillée du dresseur, en modale */
function openDresseur(id){
  const l = LINEAGES.find(x => x.id === id);
  if(!l) return;
  const c = document.getElementById('fiche-content');
  const statutCls = l.statut === 'Déclaré' ? 'ok' : 'soon';
  c.innerHTML = `
    <div class="t-head">
      <div class="t-avatar" id="dr-avatar"></div>
      <div>
        <div class="t-name">${l.dresseur.toUpperCase()}</div>
        <div class="t-parti">${l.parti.toUpperCase()}</div>
        <div>${l.elements.map(e => {
          const d = ELEMENTS[e];
          return `<span class="tag" style="background:${d.color}">${d.emoji} ${e.toUpperCase()}</span>`;
        }).join('')}</div>
        <div class="t-badges">
          ${l.statut ? `<span class="stat ${statutCls}">${l.statut.toUpperCase()}</span>` : ''}
          ${l.intentions && l.intentions !== '?' ? `<span class="stat soon">INTENTIONS DE VOTE : ${l.intentions}</span>` : ''}
        </div>
      </div>
    </div>
    ${l.bioReelle ? `<h4>QUI EST-CE ?</h4><p class="t-fact">${l.bioReelle}. ${l.faits ? l.faits + '.' : ''}</p>` : ''}
    <h4>SON PROFIL DE DRESSEUR</h4>
    <p class="t-bio">${l.bio || ''}</p>
    <h4>SA LIGNÉE « 3P »</h4>
    <div class="t-cards" id="t-cards"></div>`;
  const av = c.querySelector('#dr-avatar');
  av.replaceWith(trainerAvatar(l, 't-avatar t-full', 'full'));
  /* les 3 cartes Polimon de la lignée, en vraies cartes à jouer
     (les évolutions non révélées restent des cartes secrètes) */
  const cardsBox = c.querySelector('#t-cards');
  l.forms.forEach(f => {
    const p = byCode(f.code);
    if(!p) return;
    const slot = document.createElement('div');
    slot.className = 'dex-slide';
    const locked = !isUnlocked(p);
    const card = locked ? secretCardNode(p) : tcgNode(p, 220);
    card.setAttribute('role', 'button');
    card.tabIndex = 0;
    if(locked){
      card.title = 'Carte secrète : remporte un combat avec sa lignée pour la révéler';
      card.onclick = () => goCombatFor(p.lineage);
    } else {
      card.title = 'Ouvrir la carte de ' + p.name;
      card.onclick = () => openFiche(p.code);
    }
    card.addEventListener('keydown', e => { if(e.key === 'Enter') card.click(); });
    slot.appendChild(card);
    cardsBox.appendChild(slot);
  });
  openScreen('FICHE DRESSEUR');
}

/* ============ LES IDÉES (N1 / N2 / N3) ============
   Présentation par onglets : une dimension à la fois, plus lisible.
   - Niv.1 : la philosophie (X.0.0) en pleine lumière.
   - Niv.2 : philosophie en intro + les 5 sous-dimensions (X.Y.0) -
     celles qui sont rédigées en cartes, les autres en pastilles « à compléter ».
   - Niv.3 : idem avec les thèmes (X.Y.Z) groupés par sous-dimension,
     avec leurs sujets clés.
   Les textes viennent de dims / dimsDetail dans data/polimons.js. */
function hasIdea(detail, code){ return !!(detail[code] && detail[code] !== 'TBD'); }
function ideaStats(p, d){
  if(p.level === 1){
    const ok = p.dims[d.key] && p.dims[d.key] !== 'TBD';
    return { filled: ok ? 1 : 0, badge: ok ? '✓' : '…' };
  }
  const detail = (LINEAGES.find(l => l.id === p.lineage).dimsDetail) || {};
  const rows = (POLIMON_DATA.sousDimensions || []).filter(s =>
    s.code.split('.').length === p.level && s.code.startsWith(d.num + '.'));
  const filled = rows.filter(s => hasIdea(detail, s.code)).length;
  return { filled, badge: filled + '/' + rows.length };
}
function ideasSection(p){
  /* Niveau 1 : les 5 dimensions de la philosophie, toutes visibles
     d'un coup, en grandes cartes - c'est le cœur éducatif du Polidex. */
  if(p.level === 1){
    let i = 0;
    return `
    <div class="ideas ideas-hero" id="ideas-box">
      <h4>SA PHILOSOPHIE · 5 DIMENSIONS</h4>
      <div class="ideas-all">
        ${DIMENSIONS.map(d => {
          const txt = (p.dims[d.key] && p.dims[d.key] !== 'TBD') ? p.dims[d.key] : null;
          return `
          <div class="idea-full${txt ? '' : ' empty'}" style="animation-delay:${(i++) * 90}ms">
            <div class="if-head"><span class="if-ico">${d.icon}</span><b>${d.label.toUpperCase()}</b></div>
            <p>${txt || 'Cette dimension arrive bientôt…'}</p>
          </div>`;
        }).join('')}
      </div>
    </div>`;
  }
  const sub = p.level === 2 ? 'SES PERSPECTIVES' : 'SON PROGRAMME';
  return `
    <div class="ideas" id="ideas-box">
      <h4>LES IDÉES - ${sub}</h4>
      <div class="ideas-tabs" role="tablist">
        ${DIMENSIONS.map((d, i) => {
          const st = ideaStats(p, d);
          return `
          <button class="itab${i === 0 ? ' active' : ''}" id="itab-${d.num}" role="tab"
                  onclick="switchDim(${p.code}, ${d.num})">
            <span class="ico">${d.icon}</span><span class="lb">${d.label.toUpperCase()}</span>
            <span class="cnt${st.filled ? ' on' : ''}">${st.badge}</span>
          </button>`;
        }).join('')}
      </div>
      <div class="ideas-panel" id="ideas-panel"></div>
    </div>`;
}
function switchDim(code, num){
  document.querySelectorAll('.ideas-tabs .itab').forEach(b =>
    b.classList.toggle('active', b.id === 'itab-' + num));
  renderIdeasPanel(byCode(code), DIMENSIONS.find(d => d.num === num));
}
function renderIdeasPanel(p, d){
  const box = document.getElementById('ideas-panel');
  if(!box) return;
  const detail = (LINEAGES.find(l => l.id === p.lineage).dimsDetail) || {};
  const subs = POLIMON_DATA.sousDimensions || [];
  const philo = (p.dims[d.key] && p.dims[d.key] !== 'TBD') ? p.dims[d.key] : '';
  let i = 0;
  const delay = () => ` style="animation-delay:${(i++) * 60}ms"`;
  const card = s => `
    <div class="idea-card"${delay()}>
      <div class="idea-head"><span class="idea-code">${s.code}</span><b>${s.label}</b></div>
      <p>${detail[s.code]}</p>
      ${s.sujets && s.sujets.length ? `<div class="sujets">${s.sujets.map(t => `<span>${t}</span>`).join('')}</div>` : ''}
    </div>`;
  /* Niveau 1 : la philosophie (X.0.0). Niveaux 2 et 3 : uniquement les
     sous-dimensions / thèmes du niveau - la philosophie reste sur la
     fiche du Polimon de niveau 1. */
  let html = '';
  if(p.level === 1){
    html = philo
      ? `<div class="idea-lead"${delay()}>
           <span class="idea-tag">${d.icon} ${d.num}.0 · PHILOSOPHIE</span>
           <p>${philo}</p>
         </div>`
      : `<div class="idea-empty"${delay()}>La philosophie de cette lignée sur « ${d.label} » arrive bientôt.</div>`;
  }
  if(p.level === 2){
    const n2 = subs.filter(s => s.code.split('.').length === 2 && s.code.startsWith(d.num + '.'));
    const done = n2.filter(s => hasIdea(detail, s.code));
    const todo = n2.filter(s => !hasIdea(detail, s.code));
    html += done.map(card).join('');
    if(!done.length) html += `<div class="idea-empty"${delay()}>Les perspectives de ${p.name.toUpperCase()} sur « ${d.label} » sont encore en préparation…</div>`;
    if(todo.length) html += `
      <div class="idea-todo"${delay()}>
        <span class="lbl">À COMPLÉTER</span>
        ${todo.map(s => `<span class="ghost">${s.code} ${s.label}</span>`).join('')}
      </div>`;
  } else if(p.level === 3){
    const n2 = subs.filter(s => s.code.split('.').length === 2 && s.code.startsWith(d.num + '.'));
    html += n2.map(s2 => {
      const n3 = subs.filter(s => s.code.split('.').length === 3 && s.code.startsWith(s2.code + '.'));
      const done = n3.filter(s => hasIdea(detail, s.code));
      const todo = n3.filter(s => !hasIdea(detail, s.code));
      return `
        <div class="idea-group"${delay()}>
          <div class="idea-group-h">${s2.code} - ${s2.label.toUpperCase()}</div>
          ${done.map(card).join('')}
          ${todo.length ? `
          <div class="idea-todo">
            <span class="lbl">THÈMES À VENIR</span>
            ${todo.map(s => `<span class="ghost" title="${(s.sujets || []).join(' · ')}">${s.code} ${s.label}</span>`).join('')}
          </div>` : ''}
        </div>`;
    }).join('');
  }
  box.innerHTML = html;
}

/* fiche */
function openFiche(code){
  const p = byCode(code);
  if(!p) return;
  /* carte encore secrète : direction le combat d'évolution de sa lignée */
  if(!isUnlocked(p)){
    goCombatFor(p.lineage);
    return;
  }
  const lin = LINEAGES.find(l => l.id === p.lineage);
  const c = document.getElementById('fiche-content');
  const st = statBars(p);
  const c1 = ELEMENTS[p.elements[0]], c2 = ELEMENTS[p.elements[1]];
  const flavor = (p.dims.individu && p.dims.individu !== 'TBD') ? p.dims.individu : 'Un Polimon encore mystérieux…';
  c.innerHTML = `
    <div class="fiche-top v2">
      <!-- Colonne gauche : la carte et ses caractéristiques -->
      <div class="f-card">
        <div id="tcg-slot"></div>
        ${(() => {
          /* bouton d'évolution : visible si la forme suivante de la
             lignée est encore une carte secrète */
          const nf = lin.forms[p.level];
          const np = nf && byCode(nf.code);
          return np && !isUnlocked(np)
            ? `<button class="btn evolve-btn" type="button" onclick="goCombatFor(${p.lineage})">⚔ FAIRE ÉVOLUER ${p.name.toUpperCase()} AU COMBAT</button>`
            : '';
        })()}
        <button class="btn ghost share-btn" type="button" onclick="shareCard(${p.code}, this)">📤 PARTAGER CETTE CARTE À UN AMI</button>
      </div>
      <!-- Colonne principale : les idées, au premier plan -->
      <div class="f-ideas fiche-aside">
        <h3>#${pad3(p.code)} ${p.name.toUpperCase()}</h3>
        <div class="sub">
          ${elTags(p)} &nbsp; Niveau ${p.level} · <b>${lvlInfo(p.level).label}</b> - ${lvlInfo(p.level).desc}
        </div>
        ${ideasSection(p)}
      </div>
      <!-- Sous la carte : caractéristiques, dresseur, lignée -->
      <div class="f-side fiche-aside">
        <h4>STATISTIQUES${st.hasAny ? '' : ' <span class="wip">EN CONSTRUCTION</span>'}</h4>
        <div class="statbars" style="max-width:none;grid-template-columns:1fr;">${st.bars}</div>
        <!-- Le dresseur : portrait (si disponible) + lien vers sa fiche -->
        <div class="fh-trainer" onclick="openDresseur(${p.lineage})" tabindex="0" role="button" aria-label="Voir la fiche de ${p.dresseur}">
          <span class="fh-tav" id="fh-drav"></span>
          <span class="fh-tinfo"><b>${p.dresseur.toUpperCase()}</b><span>${p.parti}</span></span>
          <span class="fh-tgo">VOIR SA FICHE ▸</span>
        </div>
        <h4>LIGNÉE D'ÉVOLUTION « 3P »</h4>
        <div class="evo-row">
          ${lin.forms.map((f,i) => {
            const fp = byCode(f.code), locked = fp && !isUnlocked(fp);
            return `
            <div class="evo-step ${f.code===p.code?'cur':''} ${locked?'locked':''}" onclick="openFiche(${f.code})">
              <div class="mini ${locked?'mini-secret':''}" data-code="${f.code}">${locked?'<span class="q">?</span>':''}</div>
              <span class="nm">${locked ? '???' : f.name.toUpperCase()}</span>
              <span class="lv">Niv.${i+1} ${lvlInfo(i+1).label}</span>
            </div>${i<2?'<span class="evo-arr">▶</span>':''}`;}).join('')}
        </div>
      </div>
    </div>`;
  const tc = tcgNode(p, 300);
  tc.id = 'tcg-card';
  c.querySelector('#tcg-slot').replaceWith(tc);
  const lch = LINEAGES.find(x => x.id === p.lineage);
  const drav = c.querySelector('#fh-drav');
  if(lch && drav) drav.replaceWith(trainerAvatar(lch, 'fh-tav'));
  const ftr = c.querySelector('.fh-trainer');
  if(ftr) ftr.addEventListener('keydown', e => {
    if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); ftr.click(); }
  });
  c.querySelectorAll('.mini:not(.mini-secret)').forEach(m => {
    m.appendChild(spriteNode(byCode(+m.dataset.code), 64));
  });
  if(p.level > 1) renderIdeasPanel(p, DIMENSIONS[0]);
  openScreen('CARTE POLIMON');
}
/* ============ v19.1 - PARTAGER UNE CARTE ============
   Sur mobile, navigator.share ouvre la feuille de partage native
   (Messages, WhatsApp, Instagram, e-mail…). Sur ordinateur, le
   lien est copié dans le presse-papiers. Le lien partagé ouvre
   directement la carte grâce au paramètre ?carte=<code>. */
function shareCard(code, btn){
  const p = byCode(code);
  if(!p) return;
  const url  = location.origin + location.pathname + '?carte=' + p.code + '#polidex';
  const text = 'Découvre ' + p.name + ', un Polimon de la lignée ' + p.dresseur +
               ' sur Polimon 2027, le jeu éducatif de la présidentielle !';
  if(navigator.share){
    navigator.share({ title: 'Polimon 2027 · ' + p.name, text, url }).catch(() => {});
  } else if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text + ' ' + url).then(() => {
      if(btn){
        const t = btn.textContent;
        btn.textContent = '✔ LIEN COPIÉ, ENVOIE-LE À UN AMI !';
        setTimeout(() => { btn.textContent = t; }, 2800);
      }
    }).catch(() => {});
  }
}

/* Ouvre l'écran plein page (carte Polimon, fiche dresseur ou quizz) */
function openScreen(label){
  const ov = document.getElementById('fiche-overlay');
  const lab = document.getElementById('screen-label');
  if(lab) lab.textContent = label;
  ov.classList.add('open');
  ov.scrollTop = 0;
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
   avec défilement doux - comme le bouton A d'une Game Boy.
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
    const fol = document.getElementById('follower');
    if(fol && !fol.hidden) fol.classList.add('walking');
    clearTimeout(timer);
    timer = setTimeout(() => {
      walker.classList.remove('walking');
      if(fol) fol.classList.remove('walking');
    }, 160);
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

/* ============ v22 - ÉVOLUTION PAR LE COMBAT ============
   Le quizz a disparu : désormais un Polimon évolue en remportant
   un combat d'idées. Ces helpers gèrent la cible d'évolution et
   la révélation de la nouvelle carte (pop-up animé). */

/* Quelle est la prochaine évolution à révéler pour cette lignée ?
   Retourne { src, target } ou null si la lignée est complète. */
function evoTarget(lin){
  const p1 = byCode(lin.forms[0].code);
  const p2 = lin.forms[1] && byCode(lin.forms[1].code);
  const p3 = lin.forms[2] && byCode(lin.forms[2].code);
  if(p2 && !isUnlocked(p2)) return { src: p1, target: p2 };
  if(p3 && !isUnlocked(p3)) return { src: p2, target: p3 };
  return null;
}

/* Rejoindre l'espace combat avec le niveau 1 d'une lignée présélectionné */
function goCombatFor(lineageId){
  const lin = LINEAGES.find(l => l.id === lineageId);
  if(!lin) return;
  const p1 = byCode(lin.forms[0].code);
  closeFiche();
  go('combat');
  if(p1 && dimsComplete(p1)){
    if(fight){ fight = null; }
    combatLevel = 1;
    const lv = document.getElementById('combat-level');
    if(lv) lv.value = '1';
    pickState.a = p1.code;
    if(pickState.b === p1.code) pickState.b = 'rand';
    setCombatControls(true);
    refreshPick();
    const t = document.querySelector('#railA .pick-tile.sel');
    if(t) t.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }
}

/* Pop-up de révélation : la carte secrète tournoie puis se révèle */
function showEvolutionReveal(src, tgt){
  const c = document.getElementById('fiche-content');
  const sparks = Array.from({length: 18}, (_, i) => {
    const ang  = (i / 18) * Math.PI * 2 + Math.random() * 0.5;
    const dist = 130 + Math.random() * 150;
    const dx = Math.cos(ang) * dist, dy = Math.sin(ang) * dist;
    const delay = 1.95 + Math.random() * 0.25;
    const size = 10 + Math.random() * 18;
    const glyph = Math.random() < 0.5 ? '✦' : '✧';
    return `<span class="spark" style="--dx:${dx|0}px;--dy:${dy|0}px;font-size:${size|0}px;animation-delay:${delay.toFixed(2)}s">${glyph}</span>`;
  }).join('');
  c.innerHTML = `
    <div class="quiz-end win">
      <p class="reveal-pre">Mais… que se passe-t-il ?</p>
      <div class="reveal-stage">
        <div class="reveal-rays"></div>
        <div class="reveal-glow"></div>
        <span class="reveal-ring r1"></span>
        <span class="reveal-ring r2"></span>
        <div class="float-wrap">
          <div class="shake-wrap">
            <div class="flip-card">
              <div class="flip-face flip-back dex-slide"></div>
              <div class="flip-face flip-front dex-slide"></div>
            </div>
          </div>
        </div>
        ${sparks}
        <div class="reveal-flash"></div>
      </div>
      <div class="reveal-after">
        <h3>${src.name.toUpperCase()} ÉVOLUE EN ${tgt.name.toUpperCase()} !</h3>
        <p>Tu as débloqué une nouvelle carte Polimon.</p>
        <div class="quiz-end-btns">
          <button class="btn" type="button" onclick="openFiche(${tgt.code})">✨ VOIR ${tgt.name.toUpperCase()} ▸</button>
          <button class="btn ghost" type="button" onclick="closeFiche();resetCombat()">⚔ RETOUR AU COMBAT</button>
        </div>
      </div>
    </div>`;
  c.querySelector('.flip-back').appendChild(secretCardNode(tgt));
  c.querySelector('.flip-front').appendChild(tcgNode(tgt, 220));
  openScreen('ÉVOLUTION !');
}

/* ============ v20 - INTRO CINÉMATIQUE ============
   Première visite : écran noir, le logo apparaît, puis les deux
   rideaux s'ouvrent sur le site au premier défilement (ou clic,
   ou touche). L'intro n'est jamais rejouée ensuite (localStorage). */
function initIntro(){
  const intro = document.getElementById('intro');
  if(!intro) return;
  let seen = null;
  try { seen = localStorage.getItem('polimon-intro-seen'); } catch(e){}
  /* déjà vue, ou lien direct vers un autre espace / une carte partagée */
  const directLink = (location.hash && location.hash !== '#aventure') || location.search.includes('carte=');
  if(seen || directLink){ intro.remove(); return; }

  intro.hidden = false;
  document.body.classList.add('intro-open');

  let leaving = false;
  const leave = () => {
    if(leaving) return;
    leaving = true;
    try { localStorage.setItem('polimon-intro-seen', '1'); } catch(e){}
    intro.classList.add('leave');
    document.body.classList.remove('intro-open');
    setTimeout(() => intro.remove(), 1100);
    cleanup();
  };
  const onWheel  = e => { if(e.deltaY > 0) leave(); };
  const onTouch  = () => leave();
  const onKey    = e => {
    if([' ', 'Enter', 'ArrowDown', 'PageDown'].includes(e.key)){ e.preventDefault(); leave(); }
  };
  const cleanup = () => {
    window.removeEventListener('wheel', onWheel);
    window.removeEventListener('touchmove', onTouch);
    window.removeEventListener('keydown', onKey);
  };
  window.addEventListener('wheel', onWheel, {passive:true});
  window.addEventListener('touchmove', onTouch, {passive:true});
  window.addEventListener('keydown', onKey);
  intro.addEventListener('click', leave);
}

/* ============ INIT ============ */
initIntro();
initChapters();
initChoixScene();
initCombat();
initDex();
initDresseurs();
initParallax();
const h0 = location.hash.replace('#','');
go(['aventure','combat','polidex','dresseurs'].includes(h0) ? h0 : 'aventure');
observeScenes();

/* lien de partage ?carte=<code> : ouvre directement la carte */
(function(){
  const shared = +(new URLSearchParams(location.search).get('carte') || 0);
  const p = shared && byCode(shared);
  if(p){
    go('polidex');
    if(isUnlocked(p)) setTimeout(() => openFiche(p.code), 250);
  }
})();
