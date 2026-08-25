/* ============================================================
   POLIMON 2027 — FICHIER DE DONNÉES
   ============================================================
   C'est ICI (et seulement ici) que tu modifies le contenu du
   site : Polimons, dresseurs, éléments, descriptions, stats.
   Tu n'as jamais besoin de toucher à index.html ou js/app.js.

   IMAGES DES POLIMONS — convention automatique :
   le site cherche l'image  images/polimons/<numéro>.png
   (ex. le Polimon n°14 → images/polimons/14.png).
   S'il ne trouve pas le fichier, il affiche un sprite pixel-art
   généré automatiquement à la place. Donc pour ajouter une
   image : dépose simplement le fichier au bon nom dans le
   dossier images/polimons/ — rien à modifier ici.

   RÈGLES D'ÉCRITURE (important) :
   - chaque texte est entre guillemets "..."
   - une virgule sépare chaque élément d'une liste
   - pour mettre un guillemet dans un texte, écris \"
   ============================================================ */

const POLIMON_DATA = {

  /* ---------- LES 12 ÉLÉMENTS ----------
     Tu peux changer les emojis et les couleurs (codes hexadécimaux). */
  elements: {
    "Acier":    { emoji: "⚙️", color: "#8f9ba8", dark: "#5c6670" },
    "Combat":   { emoji: "⚔️", color: "#c03028", dark: "#7d1f1a" },
    "Feu":      { emoji: "🔥", color: "#f08030", dark: "#9c531f" },
    "Vol":      { emoji: "🦅", color: "#a890f0", dark: "#6d5e9c" },
    "Roche":    { emoji: "🪨", color: "#b8a038", dark: "#786824" },
    "Sol":      { emoji: "⛰️", color: "#e0c068", dark: "#927d44" },
    "Plante":   { emoji: "🌿", color: "#78c850", dark: "#4e8234" },
    "Fée":      { emoji: "✨", color: "#ee99ac", dark: "#9b6470" },
    "Électrik": { emoji: "⚡", color: "#f8d030", dark: "#a1871f" },
    "Psy":      { emoji: "🧠", color: "#f85888", dark: "#a13959" },
    "Eau":      { emoji: "💧", color: "#6890f0", dark: "#445e9c" },
    "Glace":    { emoji: "🧊", color: "#98d8d8", dark: "#638d8d" }
  },

  /* ---------- LES 5 DIMENSIONS ---------- */
  dimensions: [
    { key: "individu",     num: 1, label: "Individu",     icon: "👤" },
    { key: "societe",      num: 2, label: "Société",      icon: "👥" },
    { key: "economie",     num: 3, label: "Économie",     icon: "💶" },
    { key: "ecologie",     num: 4, label: "Écologie",     icon: "🌱" },
    { key: "geopolitique", num: 5, label: "Géopolitique", icon: "🌍" }
  ],

  /* ---------- LES 3 NIVEAUX D'ÉVOLUTION « 3P » ---------- */
  levels: [
    { n: 1, label: "Philosophie", desc: "L'idée à l'état pur : la vision du monde." },
    { n: 2, label: "Perspective", desc: "L'idée prend forme : orientations et priorités." },
    { n: 3, label: "Programme",   desc: "L'idée devient tangible : mesures concrètes." }
  ],

  /* ---------- LES STATISTIQUES DE COMBAT ----------
     Pour l'instant à 0 (« en construction »). Quand tu seras prêt,
     ajoute un bloc  stats: {...}  à une lignée ou à un Polimon,
     avec des valeurs de 0 à 100, par exemple :
       stats: { "Attaque": 70, "Défense": 55, "Vision": 80,
                "Résilience": 60, "Cohérence": 75 }
     Dès qu'une stat est supérieure à 0, la barre s'affiche. */
  stats: ["Attaque", "Défense", "Vision", "Résilience", "Cohérence"],

  /* ---------- LES 12 LIGNÉES (36 POLIMONS) ----------
     Chaque lignée = 1 dresseur + 3 formes (niveaux 1, 2, 3).
     - "code" est le numéro du Polimon dans le Polidex (et le nom
       de son fichier image : images/polimons/<code>.png)
     - "bio" présente le dresseur dans l'espace DRESSEURS (texte
       libre, à réécrire à ta guise).
     - Photo du dresseur (optionnelle) : dépose images/dresseurs/<id>.png
       (ex. 1.png pour la lignée n°1) ; sinon ses initiales s'affichent.
     - "dims" décrit la vision de la lignée dans les 5 dimensions ;
       c'est ce texte qui s'affiche dans l'espace COMBAT.
     - Optionnel par forme : "image": "chemin/vers/image.png" pour
       utiliser un fichier au nom différent de la convention. */
  lineages: [
    {
      id: 1, dresseur: "Fabien Roussel", parti: "PCF", elements: ["Acier", "Combat"],
      bio: "Dresseur de la vieille forge, il élève ses Polimons Acier et Combat à la sueur du travail collectif : chez lui, une idée se trempe comme un métal, dans l'effort partagé et la fête populaire.",
      forms: [
        { code: 1,  name: "Ferousel" },
        { code: 13, name: "Fabiforge" },
        { code: 25, name: "Rouseliath" }
      ],
      dims: {
        individu:     "L'individu est un être social qui se réalise par le travail collectif.",
        societe:      "La société est une communauté de producteurs organisant la vie commune.",
        economie:     "L'économie est un outil de redistribution au service du bien commun.",
        ecologie:     "La nature est une ressource commune à préserver par l'action collective.",
        geopolitique: "La France est une communauté souveraine coopérant dans un monde multipolaire."
      }
    },
    {
      id: 2, dresseur: "François Ruffin", parti: "Indépendant", elements: ["Feu", "Vol"],
      bio: "Dresseur de terrain, il entraîne sa lignée Feu et Vol loin des grandes arènes, au plus près des ateliers et des ronds-points. Ses Polimons s'embrasent pour la dignité du travail et prennent de la hauteur sans oublier d'où ils décollent.",
      forms: [
        { code: 2,  name: "Francendre" },
        { code: 14, name: "Ruflame" },
        { code: 26, name: "Rufenix" }
      ],
      dims: {
        individu:     "L'individu est un travailleur dont la dignité exige reconnaissance.",
        societe:      "La société est une fraternité entre personnes interdépendantes.",
        economie:     "L'économie est un outil politique soumis à la volonté populaire.",
        ecologie:     "La nature est la limite matérielle imposant sobriété.",
        geopolitique: "La France est une terre de production à protéger."
      }
    },
    {
      id: 3, dresseur: "Jean-Luc Mélenchon", parti: "LFI", elements: ["Feu", "Roche"],
      bio: "Dresseur volcanique, il fait gronder ses Polimons Feu et Roche jusqu'à l'éruption : pour lui, c'est le peuple assemblé qui fait trembler la terre et redessine le paysage politique.",
      forms: [
        { code: 3,  name: "Melava" },
        { code: 15, name: "Magmelench" },
        { code: 27, name: "Volcanchon" }
      ],
      dims: {
        individu:     "L'individu est un citoyen porteur de volonté politique constituante.",
        societe:      "La société est un peuple souverain qui se donne ses propres règles.",
        economie:     "L'économie est un champ politique où le peuple impose l'intérêt général.",
        ecologie:     "La nature est le système qui détermine les possibilités humaines.",
        geopolitique: "La France est une république indépendante des blocs impériaux."
      }
    },
    {
      id: 4, dresseur: "Olivier Faure", parti: "PS", elements: ["Sol", "Combat"],
      bio: "Dresseur patient des terres de compromis, il fait pousser ses Polimons Sol et Combat sur un terrain d'entente : solidarité collective d'un côté, émancipation de chacun de l'autre.",
      forms: [
        { code: 4,  name: "Sablefor" },
        { code: 16, name: "Geoli" },
        { code: 28, name: "Olismic" }
      ],
      dims: {
        individu:     "L'individu est un être autonome dont l'État garantit l'émancipation.",
        societe:      "La société est un contrat équilibrant droits individuels et solidarité collective.",
        economie:     "L'économie est un marché encadré par la puissance publique redistributrice.",
        ecologie:     "La nature est un patrimoine commun nécessitant transformation graduelle et négociée.",
        geopolitique: "La France est un État-membre construisant une Europe sociale."
      }
    },
    {
      id: 5, dresseur: "Marine Tondelier", parti: "EELV", elements: ["Plante", "Fée"],
      bio: "Dresseuse-jardinière, elle cultive ses Polimons Plante et Fée dans le respect du vivant : chaque idée est une pousse qui ne grandit bien que si tout l'écosystème autour d'elle prospère.",
      forms: [
        { code: 5,  name: "Ecomar" },
        { code: 17, name: "Tondeliere" },
        { code: 29, name: "Tondeliane" }
      ],
      dims: {
        individu:     "L'individu est un nœud interdépendant du vivant.",
        societe:      "La société est une organisation horizontale rapprochant décision et impact territorial.",
        economie:     "L'économie est un métabolisme contraint par les limites biophysiques planétaires.",
        ecologie:     "La nature est la matrice suprême qui conditionne toute existence et guide toute décision.",
        geopolitique: "La France est une unité coopérative dans une gouvernance écologique mondiale."
      }
    },
    {
      id: 6, dresseur: "Raphaël Glucksmann", parti: "Place Publique", elements: ["Électrik", "Sol"],
      bio: "Dresseur sentinelle, il charge ses Polimons Électrik et Sol pour défendre les arènes démocratiques : vigilance permanente, règles communes et alliances par-delà les frontières.",
      forms: [
        { code: 6,  name: "Rafelec" },
        { code: 18, name: "Raforage" },
        { code: 30, name: "Rafoudre" }
      ],
      dims: {
        individu:     "L'individu est un porteur de droits universels transcendant toute frontière.",
        societe:      "La société est une démocratie fragile exigeant vigilance permanente contre l'oppression.",
        economie:     "L'économie est un marché nécessitant régulation supranationale face aux multinationales.",
        ecologie:     "La nature est un bien commun mondial exigeant gouvernance contraignante internationale.",
        geopolitique: "La France est un acteur moral défendant l'ordre démocratique par l'intervention."
      }
    },
    {
      id: 7, dresseur: "Gabriel Attal", parti: "Renaissance", elements: ["Électrik", "Psy"],
      bio: "Dresseur véloce, il entraîne ses Polimons Électrik et Psy à la vitesse de l'éclair : mérite, innovation et esprit de compétition sont ses techniques favorites.",
      forms: [
        { code: 7,  name: "Voltatal" },
        { code: 19, name: "Gabynamo" },
        { code: 31, name: "Gabitek" }
      ],
      dims: {
        individu:     "L'individu est un agent libre responsable de son destin.",
        societe:      "La société est une arène méritocratique où le talent et l'effort déterminent le succès.",
        economie:     "L'économie est un marché de compétition générant prospérité et innovation.",
        ecologie:     "La nature est un ensemble de défis techniques solubles par l'innovation humaine.",
        geopolitique: "La France est une puissance économique et diplomatique rayonnant par excellence."
      }
    },
    {
      id: 8, dresseur: "Édouard Philippe", parti: "Horizons", elements: ["Eau", "Vol"],
      bio: "Dresseur du grand large, il navigue avec ses Polimons Eau et Vol dans la brume du Havre : cap pragmatique, autorité tranquille et manœuvres calculées.",
      forms: [
        { code: 8,  name: "Brumedo" },
        { code: 20, name: "Edether" },
        { code: 32, name: "Zefilipe" }
      ],
      dims: {
        individu:     "L'individu est un être façonné par l'effort, le mérite et la liberté.",
        societe:      "La société est un ordre hiérarchisé maintenu par l'autorité légitime de l'État.",
        economie:     "L'économie est un équilibre pragmatique entre liberté d'entreprendre et régulation stratégique.",
        ecologie:     "La nature est un système adaptable par transition technologique progressive et réaliste.",
        geopolitique: "La France est un acteur stratégique combinant indépendance et partenariats sélectifs."
      }
    },
    {
      id: 9, dresseur: "Laurent Wauquiez", parti: "LR", elements: ["Eau", "Combat"],
      bio: "Dresseur des hauts plateaux, il endurcit ses Polimons Eau et Combat à la rude école de la montagne : travail, ordre et défense des intérêts vitaux du territoire.",
      forms: [
        { code: 9,  name: "Hydrokier" },
        { code: 21, name: "Loragan" },
        { code: 33, name: "Vokieluge" }
      ],
      dims: {
        individu:     "L'individu est défini par ses responsabilités morales et son engagement laborieux.",
        societe:      "La société est une structure ordonnée préservée par autorité et transmission culturelle.",
        economie:     "L'économie est un système récompensant le travail par liberté fiscale et propriété.",
        ecologie:     "La nature est un milieu gérable sans sacrifier croissance et prospérité nationale.",
        geopolitique: "La France est une entité souveraine défendant pragmatiquement ses intérêts vitaux."
      }
    },
    {
      id: 10, dresseur: "Marine Le Pen", parti: "RN", elements: ["Glace", "Acier"],
      bio: "Dresseuse des terres gelées, elle protège ses Polimons Glace et Acier derrière des frontières cristallines : pour elle, la communauté nationale passe avant tout le reste.",
      forms: [
        { code: 10, name: "Marinej" },
        { code: 22, name: "Lepolaire" },
        { code: 34, name: "Blizaren" }
      ],
      dims: {
        individu:     "L'individu est un être appartenant à une communauté nationale.",
        societe:      "La société est un organisme historique et culturel transmis par les générations.",
        economie:     "L'économie est organisée pour protéger et privilégier la communauté nationale.",
        ecologie:     "La nature est défendue par l'enracinement territorial et la souveraineté locale.",
        geopolitique: "La France est une civilisation délimitée ayant droit à l'autodétermination totale."
      }
    },
    {
      id: 11, dresseur: "Jordan Bardella", parti: "RN", elements: ["Glace", "Acier"],
      bio: "Jeune dresseur de la lignée polaire, il modernise les techniques de la banquise : ses Polimons Glace et Acier avancent en formation serrée, portés par les réseaux et la relève.",
      forms: [
        { code: 11, name: "Cryodane" },
        { code: 23, name: "Vergladela" },
        { code: 35, name: "Blizardela" }
      ],
      dims: {
        individu:     "L'individu est un être appartenant à une communauté nationale.",
        societe:      "La société est un organisme historique et culturel transmis par les générations.",
        economie:     "L'économie est organisée pour protéger et privilégier la communauté nationale.",
        ecologie:     "La nature est défendue par l'enracinement territorial et la souveraineté locale.",
        geopolitique: "La France est une civilisation délimitée ayant droit à l'autodétermination totale."
      }
    },
    {
      id: 12, dresseur: "Éric Zemmour", parti: "Reconquête", elements: ["Glace", "Psy"],
      bio: "Dresseur hypnotiseur, il fait miroiter à ses Polimons Glace et Psy le souvenir d'une civilisation idéalisée : illusions, mirages et batailles de mémoire sont son terrain de prédilection.",
      forms: [
        { code: 12, name: "Hypnerik" },
        { code: 24, name: "Zemirage" },
        { code: 36, name: "Zemystere" }
      ],
      dims: {
        individu:     "L'individu est un héritier d'une civilisation déterminant son essence.",
        societe:      "La société est un corps civilisationnel menacé d'effacement par substitution démographique.",
        economie:     "L'économie est un instrument de puissance nationale protégeant les intérêts français.",
        ecologie:     "La nature est une préoccupation secondaire face à l'urgence de survie civilisationnelle.",
        geopolitique: "La France est une civilisation en guerre défensive contre déclin et remplacement."
      }
    }
  ],

  /* ---------- LES CHAPITRES DE L'AVENTURE ----------
     status : "ok" = disponible, "soon" = à venir */
  chapters: [
    { num: "01", title: "RETOUR EN CLASSE", desc: "Sachez découvre les Polimons auprès du Professeur Chen.", status: "ok" },
    { num: "02", title: "CONFRONTATION",    desc: "Ton Polimon affronte ses premières idées contraires… Version variable selon le Polimon choisi.", status: "soon" },
    { num: "03", title: "CONSÉCRATION",     desc: "Le chemin vers l'Élysée se dessine.", status: "soon" }
  ]
};
