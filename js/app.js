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
/* Choix du starter : la Pokéball s'agite, s'ouvre dans un flash,
   puis révèle le Polimon. */
let starterChosen = false;   /* le choix est définitif */
function chooseStarter(el){
  if(starterChosen) return;                       /* choix verrouillé */
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
  starterChosen = true;
  document.querySelectorAll('.starter').forEach(s => {
    s.classList.remove('chosen');
    if(s !== el) s.classList.add('locked');       /* les autres se grisent */
  });
  el.classList.add('chosen');
  if(el.dataset.name) el.querySelector('.ballrow').textContent = el.dataset.name;
  /* le compagnon choisi suit Sachez sur la carte */
  const codes = { a: 7, b: 3, c: 10 };
  const follower = document.getElementById('follower');
  if(follower && codes[el.dataset.branch]){
    document.getElementById('follower-img').src =
      'images/story/polimon-smallonmap-' + codes[el.dataset.branch] + '.png';
    follower.hidden = false;
  }
  /* révèle la fin alternative correspondant au compagnon choisi */
  const files = { a: '11a-chosen-voltatal.webp', b: '11b-chosen-melava.webp', c: '11c-chosen-marinej.webp' };
  const scene = document.getElementById('branch-scene');
  const img   = document.getElementById('branch-img');
  if(scene && files[el.dataset.branch]){
    img.src = 'images/story/ep1/' + files[el.dataset.branch];
    scene.hidden = false;
    scene.classList.remove('on');
    requestAnimationFrame(() => requestAnimationFrame(() => activateScene(scene)));
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

/* ============ EXPLORATEUR D'IDÉES (scène du choix) ============
   Survole (ou touche) une dimension pour lire l'idée du Polimon. */
function initExplorer(){
  const box = document.getElementById('idea-explorer');
  if(!box) return;
  const codes = [7, 3, 10];   /* Voltatal, Melava, Marinej */
  box.innerHTML = `
    <div class="ie-grid">
      ${codes.map(c => {
        const p = byCode(c);
        return `<div class="ie-col">
          <div class="ie-head" data-code="${c}"></div>
          <div class="ie-name">${p.name.toUpperCase()}</div>
          <div class="ie-chips">
            ${DIMENSIONS.map(d => `
              <button class="ie-chip" data-code="${c}" data-dim="${d.key}"
                aria-label="${p.name} — ${d.label}">${d.icon}<span>${d.label}</span></button>`).join('')}
          </div>
        </div>`;
      }).join('')}
    </div>
    <div class="ie-display pxbox" id="ie-display">
      <p><i>Survole une dimension pour découvrir l'idée que chaque Polimon incarne…</i></p>
    </div>`;
  box.querySelectorAll('.ie-head').forEach(h => {
    h.appendChild(spriteNode(byCode(+h.dataset.code), 74));
  });
  const display = document.getElementById('ie-display');
  const show = chip => {
    const p = byCode(+chip.dataset.code);
    const d = DIMENSIONS.find(x => x.key === chip.dataset.dim);
    box.querySelectorAll('.ie-chip').forEach(c => c.classList.toggle('active', c === chip));
    display.innerHTML = `<b>${d.icon} ${p.name.toUpperCase()} — ${d.label}</b>
      <p>${(p.dims[d.key] && p.dims[d.key] !== 'TBD') ? p.dims[d.key] : 'À compléter — TBD'}</p>`;
  };
  box.querySelectorAll('.ie-chip').forEach(chip => {
    chip.addEventListener('mouseenter', () => show(chip));
    chip.addEventListener('focus', () => show(chip));
    chip.addEventListener('click', e => { e.preventDefault(); show(chip); });
  });
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

/* ============ COMBAT — mini-jeu en 5 rounds ============
   Pour l'instant limité au niveau 1 (Philosophie) : les contenus
   des niveaux 2 et 3 arrivent plus tard.
   Déroulé : sélection des 2 Polimons → LANCER LE COMBAT →
   intro animée → 5 rounds (une dimension chacun). À chaque round,
   les deux idées sont présentées À L'AVEUGLE (ordre mélangé) ;
   le joueur vote, l'appartenance se révèle, le perdant du round
   perd 20 PV. À la fin, le vainqueur est célébré. */

const COMBAT_LEVEL = 1;
/* un Polimon ne peut combattre que si ses 5 idées sont écrites */
function dimsComplete(p){
  return DIMENSIONS.every(d => p.dims[d.key] && p.dims[d.key] !== 'TBD');
}
const PV_MAX = 100, PV_HIT = 20;
let fight = null;   /* état du combat en cours (null = pas de combat) */

function say(text){ document.getElementById('battle-msg').textContent = text; }

function fillSelects(){
  /* Pour l'instant, seuls les dresseurs dont les visuels sont prêts
     participent au combat. Ajoute des id ici pour en débloquer d'autres. */
  const COMBAT_LINEAGES = [3, 5, 7, 8, 10, 13];
  const pool = POLIMONS.filter(p => p.level === COMBAT_LEVEL
    && COMBAT_LINEAGES.includes(p.lineage) && dimsComplete(p));
  const opts = sel => pool.map((p,i) =>
    `<option value="${p.code}" ${i===sel?'selected':''}>#${pad3(p.code)} ${p.name.toUpperCase()} — ${p.dresseur.toUpperCase()}</option>`).join('');
  document.getElementById('selA').innerHTML = opts(0);
  document.getElementById('selB').innerHTML = opts(1);
}

/* Plaque d'info : nom, éléments, barre de PV animée */
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
function updatePv(elId, pv){
  const box = document.getElementById(elId);
  const bar = box.querySelector('.pl-bar div');
  bar.style.width = pv + '%';
  if(pv <= 40) bar.style.background = '#c03028';
  box.querySelector('.pl-pv').textContent = pv;
}

/* Le Polimon sur la scène : image carrée entière, encadrée */
function battleSprite(p, slotId, enter){
  const slot = document.getElementById(slotId);
  slot.className = slot.className.replace(/\b(hit|faint|victory|enter)\b/g, '').trim();
  slot.innerHTML = '';
  const frame = document.createElement('div');
  frame.className = 'spr-frame';
  frame.appendChild(spriteNode(p, 150));
  slot.appendChild(frame);
  if(enter){ void slot.offsetWidth; slot.classList.add('enter'); }
}

function showEl(id, on){ document.getElementById(id).classList.toggle('gone', !on); }
/* Sprite du dresseur sur la scène d'intro */
function trainerSprite(p, slotId){
  const slot = document.getElementById(slotId);
  const l = LINEAGES.find(x => x.id === p.lineage);
  slot.className = slot.className.replace(/\bexit\b/g, '').trim();
  slot.innerHTML = '';
  if(l) slot.appendChild(trainerAvatar(l, 'battle-tr'));
}

function combatants(){
  return {
    a: byCode(+document.getElementById('selA').value),
    b: byCode(+document.getElementById('selB').value)
  };
}

/* État d'attente : aperçu des deux Polimons, prêt à combattre */
function renderIdle(){
  const {a, b} = combatants();
  if(!a || !b) return;
  plate(a, 'plateA', PV_MAX); plate(b, 'plateB', PV_MAX);
  trainerSprite(b, 'trFoe'); trainerSprite(a, 'trAlly');
  showEl('trFoe', true); showEl('trAlly', true);
  showEl('sprA', false); showEl('sprB', false);
  showEl('plateA', false); showEl('plateB', false);
  document.getElementById('compare').innerHTML = '';
  say(a.code === b.code
    ? 'Un Polimon ne peut pas affronter son propre reflet… choisis deux idées différentes !'
    : `${b.dresseur.toUpperCase()} te défie ! Lance le combat des idées.`);
}
function onCombatSelect(){ if(!fight) renderIdle(); }

function setCombatControls(on){
  document.getElementById('selA').disabled = !on;
  document.getElementById('selB').disabled = !on;
  document.getElementById('btn-fight').style.display = on ? '' : 'none';
}

function initCombat(){ fillSelects(); renderIdle(); }

/* ---------- déroulé du combat ---------- */
function startCombat(){
  const {a, b} = combatants();
  if(!a || !b || a.code === b.code){ renderIdle(); return; }
  fight = { a, b, pvA: PV_MAX, pvB: PV_MAX, winsA: 0, winsB: 0, round: 0, picks: [], busy: true };
  setCombatControls(false);
  document.getElementById('compare').innerHTML = '';
  /* 1. face-à-face des dresseurs */
  say(`${b.dresseur.toUpperCase()} VEUT SE BATTRE !`);
  /* 2. le dresseur adverse envoie son Polimon */
  setTimeout(() => {
    document.getElementById('trFoe').classList.add('exit');
    setTimeout(() => showEl('trFoe', false), 500);
    showEl('sprB', true); showEl('plateB', true);
    battleSprite(b, 'sprB', true);
    plate(b, 'plateB', PV_MAX, 0);
    say(`${b.dresseur.toUpperCase()} envoie ${b.name.toUpperCase()} !`);
  }, 1500);
  /* 3. ton dresseur envoie le sien */
  setTimeout(() => {
    document.getElementById('trAlly').classList.add('exit');
    setTimeout(() => showEl('trAlly', false), 500);
    showEl('sprA', true); showEl('plateA', true);
    battleSprite(a, 'sprA', true);
    plate(a, 'plateA', PV_MAX, 0);
    say(`En avant, ${a.name.toUpperCase()} !`);
  }, 3000);
  setTimeout(() => { fight.busy = false; nextRound(); }, 4400);
}

function nextRound(){
  if(!fight) return;
  if(fight.round >= DIMENSIONS.length) return endCombat();
  const d = DIMENSIONS[fight.round];   /* niveau 1 : les 5 dimensions, dans l'ordre */
  say(`ROUND ${fight.round + 1} / ${DIMENSIONS.length} — ${d.label.toUpperCase()} : quelle idée te parle le plus ?`);
  const first = Math.random() < .5 ? 'a' : 'b';     /* ordre mélangé : vote à l'aveugle */
  const order = first === 'a' ? ['a','b'] : ['b','a'];
  const card = side => {
    const p = fight[side];
    return `<div class="idea-card" data-side="${side}" onclick="pickIdea('${side}')" tabindex="0" role="button">
      <div class="own">💡 Idée de <b>${p.name.toUpperCase()}</b> (${p.dresseur})</div>
      <p>${p.dims[d.key]}</p>
    </div>`;
  };
  document.getElementById('compare').innerHTML = `
    <div class="round-head">${d.icon} ROUND ${fight.round + 1} — DIMENSION ${d.num} · ${d.label.toUpperCase()}</div>
    <p class="round-sub">Vote pour l'idée qui te ressemble le plus — tu découvriras ensuite quel Polimon la porte.</p>
    <div class="idea-row">${order.map(card).join('')}</div>`;
  document.querySelectorAll('.idea-card').forEach(c => {
    c.addEventListener('keydown', e => {
      if(e.key === 'Enter'){ e.preventDefault(); c.click(); }
    });
  });
}

function pickIdea(winSide){
  if(!fight || fight.busy) return;
  fight.busy = true;
  const d = DIMENSIONS[fight.round];
  const loseSide = winSide === 'a' ? 'b' : 'a';
  const winP = fight[winSide], loseP = fight[loseSide];
  /* révélation des deux idées */
  document.querySelectorAll('.idea-card').forEach(c => {
    c.classList.add('revealed', c.dataset.side === winSide ? 'picked' : 'lost');
    c.onclick = null;
  });
  /* dégâts + Pokéball gagnée */
  if(loseSide === 'a') fight.pvA -= PV_HIT; else fight.pvB -= PV_HIT;
  if(winSide === 'a') fight.winsA++; else fight.winsB++;
  const slot = document.getElementById(loseSide === 'a' ? 'sprA' : 'sprB');
  slot.classList.add('hit');
  setTimeout(() => slot.classList.remove('hit'), 650);
  plate(fight.a, 'plateA', fight.pvA, fight.winsA);
  plate(fight.b, 'plateB', fight.pvB, fight.winsB);
  say(`L'idée de ${winP.name.toUpperCase()} l'emporte ! ${loseP.name.toUpperCase()} perd ${PV_HIT} PV.`);
  fight.picks.push({ dim: d, winner: winP });
  /* bouton continuer */
  const wrap = document.createElement('div');
  wrap.className = 'continue-wrap';
  wrap.innerHTML = `<button class="btn small" onclick="continueFight()">${fight.round < DIMENSIONS.length - 1 ? 'ROUND SUIVANT ▸' : 'VOIR LE VERDICT ▸'}</button>`;
  document.getElementById('compare').appendChild(wrap);
}
function continueFight(){
  if(!fight) return;
  fight.round++; fight.busy = false;
  nextRound();
}

function endCombat(){
  const winA = fight.pvA > fight.pvB;
  const winP  = winA ? fight.a : fight.b;
  const loseP = winA ? fight.b : fight.a;
  const score = fight.picks.filter(p => p.winner.code === winP.code).length;
  document.getElementById(winA ? 'sprA' : 'sprB').classList.add('victory');
  document.getElementById(winA ? 'sprB' : 'sprA').classList.add('faint');
  say(`🏆 ${winP.name.toUpperCase()} remporte le combat des idées ${score} à ${DIMENSIONS.length - score} ! ${loseP.name.toUpperCase()} est K.O.`);
  document.getElementById('compare').innerHTML = `
    <div class="round-head">🏆 ${winP.name.toUpperCase()} GAGNE ${score} – ${DIMENSIONS.length - score}</div>
    <p class="round-sub">Tes idées se rapprochent ${score >= 4 ? 'nettement' : 'plutôt'} de celles de <b>${winP.dresseur}</b> (${winP.parti}) sur ces 5 dimensions.</p>
    <div class="recap">
      ${fight.picks.map(p => `
        <div class="recap-row"><span class="rd">${p.dim.icon} ${p.dim.label}</span>
        <span class="rw">${p.winner.name.toUpperCase()} <i>(${p.winner.dresseur})</i></span></div>`).join('')}
    </div>
    <div class="continue-wrap">
      <button class="btn" onclick="resetCombat()">↻ REJOUER</button>
      <button class="btn ghost" onclick="openFiche(${winP.code})">VOIR LA FICHE DE ${winP.name.toUpperCase()}</button>
    </div>`;
  fight = null;
}
function resetCombat(){
  fight = null;
  setCombatControls(true);
  renderIdle();
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
   attaque, texte d'ambiance — avec l'effet holographique. */
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
        <span>Résistance<br><b>—</b></span>
        <span>Retraite<br><b>${'★'.repeat(p.level)}</b></span>
      </div>
      <p class="tcg-flavor">${flavor}</p>
      <div class="tcg-credits"><span>Illus. DemZet</span><span>${pad3(p.code)}/${pad3(POLIMONS.length)} · ${p.parti}</span></div>
    </div>`;
  el.querySelector('.tcg-spr').appendChild(spriteNode(p, sprSize || 300));
  attachHolo(el);
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
    const card = tcgNode(p, 220);
    card.setAttribute('role', 'button');
    card.tabIndex = 0;
    card.title = 'Ouvrir la fiche de ' + p.name;
    card.onclick = () => openFiche(p.code);
    card.addEventListener('keydown', e => { if(e.key === 'Enter') openFiche(p.code); });
    slide.appendChild(card);
    rail.appendChild(slide);
  });
  rail.scrollLeft = 0;
  document.getElementById('dex-count').textContent =
    list.length + ' / ' + POLIMONS.length + ' Polimons affichés';
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
function trainerAvatar(l, cls){
  const initials = l.dresseur.split(/[\s-]+/).map(w => w[0]).join('').slice(0,3).toUpperCase();
  const av = document.createElement('div');
  av.className = cls;
  av.innerHTML = `<span class="initials">${initials}</span>`;
  const photo = new Image();
  photo.onload = () => { av.innerHTML = ''; av.appendChild(photo); };
  photo.alt = l.dresseur;
  photo.src = 'images/dresseurs/' + l.id + '.png';
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
    <div class="t-lineup">
      ${l.forms.map((f,i) => `
        <div class="t-poli" data-code="${f.code}" onclick="openFiche(${f.code})">
          <span class="pn">${f.name.toUpperCase()}</span>
          <span class="pl">${'★'.repeat(i+1)} ${lvlInfo(i+1).label}</span>
        </div>`).join('')}
    </div>`;
  const av = c.querySelector('#dr-avatar');
  av.replaceWith(trainerAvatar(l, 't-avatar'));
  c.querySelectorAll('.t-poli').forEach(el => {
    const p = byCode(+el.dataset.code);
    el.insertBefore(spriteNode(p, 72), el.firstChild);
  });
  openScreen('CARTE DRESSEUR');
}

/* ============ LES IDÉES (N1 / N2 / N3) ============
   Présentation par onglets : une dimension à la fois, plus lisible.
   - Niv.1 : la philosophie (X.0.0) en pleine lumière.
   - Niv.2 : philosophie en intro + les 5 sous-dimensions (X.Y.0) —
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
  const sub = p.level === 1 ? 'SA PHILOSOPHIE' : p.level === 2 ? 'SES PERSPECTIVES' : 'SON PROGRAMME';
  return `
    <div class="ideas" id="ideas-box">
      <h4>LES IDÉES — ${sub}</h4>
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
  let html = philo
    ? `<div class="idea-lead"${delay()}>
         <span class="idea-tag">${d.icon} ${d.num}.0 · PHILOSOPHIE</span>
         <p>${philo}</p>
       </div>`
    : `<div class="idea-empty"${delay()}>La philosophie de cette lignée sur « ${d.label} » arrive bientôt.</div>`;
  if(p.level === 2){
    const n2 = subs.filter(s => s.code.split('.').length === 2 && s.code.startsWith(d.num + '.'));
    const done = n2.filter(s => hasIdea(detail, s.code));
    const todo = n2.filter(s => !hasIdea(detail, s.code));
    html += done.map(card).join('');
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
          <div class="idea-group-h">${s2.code} — ${s2.label.toUpperCase()}</div>
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
  const lin = LINEAGES.find(l => l.id === p.lineage);
  const c = document.getElementById('fiche-content');
  const st = statBars(p);
  const c1 = ELEMENTS[p.elements[0]], c2 = ELEMENTS[p.elements[1]];
  const flavor = (p.dims.individu && p.dims.individu !== 'TBD') ? p.dims.individu : 'Un Polimon encore mystérieux…';
  c.innerHTML = `
    <div class="fiche-top">
      <!-- Carte à jouer dynamique (générée par tcgNode) -->
      <div id="tcg-slot"></div>
      <!-- Infos et lignée -->
      <div class="fiche-aside">
        <h3>#${pad3(p.code)} ${p.name.toUpperCase()}</h3>
        <div class="sub">
          ${elTags(p)}<br><br>
          <span class="dr-link" onclick="openDresseur(${p.lineage})" tabindex="0" role="button">
            <span class="dr-av" id="fh-drav"></span>
            Dresseur : <b>${p.dresseur}</b> — ${p.parti} <span class="dr-arrow">▸</span>
          </span><br>
          Niveau ${p.level} · <b>${lvlInfo(p.level).label}</b> — ${lvlInfo(p.level).desc}
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
        <h4>STATISTIQUES${st.hasAny ? '' : ' <span class="wip">EN CONSTRUCTION</span>'}</h4>
        <div class="statbars" style="max-width:none;grid-template-columns:1fr;">${st.bars}</div>
      </div>
    </div>
    ${ideasSection(p)}`;
  const tc = tcgNode(p, 300);
  tc.id = 'tcg-card';
  c.querySelector('#tcg-slot').replaceWith(tc);
  const lch = LINEAGES.find(x => x.id === p.lineage);
  const drav = c.querySelector('#fh-drav');
  if(lch && drav) drav.replaceWith(trainerAvatar(lch, 't-avatar dr-avatar-mini'));
  c.querySelectorAll('.mini').forEach(m => {
    m.appendChild(spriteNode(byCode(+m.dataset.code), 64));
  });
  renderIdeasPanel(p, DIMENSIONS[0]);
  openScreen('FICHE POLIMON');
}
/* Ouvre l'écran plein page (fiche Polimon ou carte dresseur) */
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

/* ============ INIT ============ */
initChapters();
initExplorer();
initCombat();
initDex();
initDresseurs();
initParallax();
const h0 = location.hash.replace('#','');
go(['aventure','combat','polidex','dresseurs'].includes(h0) ? h0 : 'aventure');
observeScenes();
