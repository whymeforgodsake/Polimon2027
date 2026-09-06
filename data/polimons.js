/* ============================================================
   POLIMON 2027 - FICHIER DE DONNÉES
   ============================================================
   C'est ICI (et seulement ici) que tu modifies le contenu du
   site : Polimons, dresseurs, éléments, descriptions, stats.
   Tu n'as jamais besoin de toucher à index.html ou js/app.js.

   IMAGES DES POLIMONS - convention automatique :
   le site cherche l'image  images/polimons/<numéro>.png
   (ex. le Polimon n°14 → images/polimons/14.png).
   S'il ne trouve pas le fichier, il affiche un sprite pixel-art
   généré automatiquement à la place. Donc pour ajouter une
   image : dépose simplement le fichier au bon nom dans le
   dossier images/polimons/ - rien à modifier ici.

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

  /* ---------- SOUS-DIMENSIONS ET THÈMES ----------
     La granularité des dimensions suit le niveau du Polimon :
       Niveau 1 (Philosophie)  → les 5 dimensions ci-dessus
       Niveau 2 (Perspective)  → les 25 sous-dimensions (codes X.Y)
       Niveau 3 (Programme)    → les 59 thèmes (codes X.Y.Z)
     Tu peux renommer un intitulé ici. Pour remplir le CONTENU d'un
     Polimon sur une sous-dimension ou un thème, ajoute dans sa
     lignée un bloc "dimsDetail", par exemple :
       dimsDetail: {
         "1.1": "Vision de la spiritualité au niveau Perspective…",
         "1.1.1": "Position sur les religions au niveau Programme…"
       }
     Tant qu'un code n'est pas rempli, la fiche affiche
     « Contenu en préparation… ». */
  sousDimensions: [
    /* 1. Individu */
    { code: "1.1",   label: "Spiritualité" },
    { code: "1.1.1", label: "Religions et croyances", sujets: ["Port des signes religieux", "Financement des lieux de culte", "Séparatisme et radicalisation religieuse", "Enseignement du fait religieux", "Blasphème et liberté d'expression", "Dérives sectaires"] },
    { code: "1.1.2", label: "Vie et mort", sujets: ["Euthanasie et aide active à mourir", "Soins palliatifs", "IVG et droits reproductifs", "Don d'organes", "Bioéthique et statut de l'embryon", "Peine de mort (débat récurrent)"] },
    { code: "1.2",   label: "Famille et sexualité" },
    { code: "1.2.1", label: "Famille", sujets: ["Politique familiale et allocations", "Natalité et démographie", "PMA et GPA", "Modes de garde et petite enfance", "Congé parental", "Protection de l'enfance (ASE)", "Violences intrafamiliales"] },
    { code: "1.2.2", label: "Sexualité", sujets: ["Éducation à la vie affective et sexuelle", "Droits LGBT+ et lutte contre les discriminations", "Transidentité (parcours des mineurs)", "Prostitution et travail du sexe", "Consentement et majorité sexuelle"] },
    { code: "1.3",   label: "Santé" },
    { code: "1.3.1", label: "Système de santé", sujets: ["Hôpital public vs cliniques privées", "Prix et pénuries de médicaments", "Formation des soignants (numerus apertus)", "Psychiatrie et santé mentale à l'hôpital"] },
    { code: "1.3.2", label: "Santé publique et prévention", sujets: ["Vaccination", "Santé mentale des jeunes", "Addictions (tabac, alcool, drogues)", "Légalisation du cannabis", "Nutrition et obésité", "Santé environnementale (perturbateurs endocriniens)", "Préparation aux pandémies"] },
    { code: "1.4",   label: "Éducation" },
    { code: "1.4.1", label: "Enseignement primaire et secondaire", sujets: ["Niveau scolaire et savoirs fondamentaux (PISA)", "Carte scolaire et mixité sociale", "École privée sous contrat", "Harcèlement scolaire", "Uniforme et autorité à l'école", "Écrans à l'école", "École inclusive (AESH)"] },
    { code: "1.4.2", label: "Enseignement supérieur et recherche", sujets: ["Parcoursup et sélection", "Précarité étudiante et frais d'inscription", "Financement des universités", "Recherche publique et attractivité (fuite des cerveaux)", "Apprentissage et formation professionnelle", "Grandes écoles vs universités", "Logement étudiant"] },
    { code: "1.5",   label: "Participation citoyenne" },
    { code: "1.5.1", label: "Vote", sujets: ["Abstention", "Vote obligatoire", "Reconnaissance du vote blanc", "Droit de vote à 16 ans", "Vote des étrangers aux élections locales", "Scrutin proportionnel", "Référendum d'initiative citoyenne (RIC)"] },
    { code: "1.5.2", label: "Association", sujets: ["Financement de la vie associative", "Bénévolat et engagement des jeunes", "Service civique et SNU", "Contrat d'engagement républicain et dissolutions", "Syndicats et corps intermédiaires", "Conventions citoyennes et budgets participatifs"] },
    /* 2. Société */
    { code: "2.1",   label: "Culture et médias" },
    { code: "2.1.1", label: "Arts et patrimoine", sujets: ["Budget de la culture", "Pass Culture", "Protection du patrimoine (loto du patrimoine)", "Restitution des œuvres d'art (Afrique)", "Intermittents du spectacle", "Accès à la culture en ruralité"] },
    { code: "2.1.2", label: "Sports", sujets: ["Sport à l'école et sport-santé", "Financement du sport amateur", "Violences et abus dans le sport", "Sport féminin", "Paris sportifs et addiction", "Équipements sportifs de proximité"] },
    { code: "2.1.3", label: "Langue", sujets: ["Défense du français (loi Toubon, anglicismes)", "Langues régionales", "Écriture inclusive", "Illettrisme et illectronisme", "Français langue d'intégration"] },
    { code: "2.1.4", label: "Médias", sujets: ["Concentration des médias", "Audiovisuel public et financement", "Désinformation et fake news", "Régulation des réseaux sociaux (DSA)", "Protection des journalistes et secret des sources", "Temps de parole en campagne (Arcom)"] },
    { code: "2.2",   label: "Ordre public" },
    { code: "2.2.1", label: "Justice", sujets: ["Moyens de la justice et délais", "Surpopulation carcérale et prisons", "Justice des mineurs", "Échelle des peines (laxisme vs fermeté)", "Récidive et réinsertion", "Indépendance de la magistrature", "Aide juridictionnelle"] },
    { code: "2.2.2", label: "Sécurité", sujets: ["Narcotrafic et points de deal", "Délinquance du quotidien et incivilités", "Violences policières et contrôle (IGPN)", "Vidéosurveillance et reconnaissance faciale", "Émeutes urbaines", "Polices municipales", "Sentiment d'insécurité"] },
    { code: "2.3",   label: "Cadre de vie" },
    { code: "2.3.1", label: "Logement et urbanisme", sujets: ["Crise du logement et construction", "Logement social (loi SRU)", "Encadrement des loyers", "Passoires thermiques et rénovation (DPE)", "Sans-abrisme et hébergement d'urgence", "Airbnb et locations touristiques", "Accession à la propriété", "Artificialisation des sols (ZAN)"] },
    { code: "2.3.2", label: "Mobilité et transport", sujets: ["Transports en commun et RER métropolitains", "SNCF, petites lignes et trains de nuit", "Voiture électrique et ZFE", "Prix des carburants", "Vélo et mobilités douces", "Gratuité des transports", "Sécurité routière"] },
    { code: "2.4",   label: "État et territoire" },
    { code: "2.4.1", label: "Institutions", sujets: ["49.3 et pouvoirs du Parlement", "Référendum et RIC", "Transparence et déontologie (HATVP, lobbying)", "Haute fonction publique"] },
    { code: "2.4.2", label: "Organisation des territoires", sujets: ["Millefeuille territorial (communes, départements, régions)", "Ruralité et accès aux services publics", "Métropolisation et fractures territoriales", "Outre-mer (vie chère, Mayotte, Nouvelle-Calédonie)", "Corse et autonomie", "Finances des collectivités locales", "Politique de la ville (banlieues)"] },
    { code: "2.5",   label: "Vivre ensemble" },
    { code: "2.5.1", label: "Égalité homme-femme", sujets: ["Violences faites aux femmes et féminicides", "Parité en politique et en entreprise", "Partage des tâches et congés parentaux", "Sexisme et harcèlement", "Retraites et précarité des femmes", "Place des femmes dans l'espace public"] },
    { code: "2.5.2", label: "Multiculturalisme", sujets: ["Intégration vs assimilation", "Discriminations et racisme", "Statistiques ethniques (débat)", "Islam de France", "Antisémitisme", "Mémoire coloniale et esclavage", "Universalisme républicain vs multiculturalisme"] },
    { code: "2.5.3", label: "Autonomie, handicap, dépendance", sujets: ["Grand âge et EHPAD", "Financement de la dépendance (5e branche)", "Aidants et aide à domicile", "Accessibilité universelle", "Emploi des personnes handicapées et AAH", "École inclusive et AESH", "Désinstitutionnalisation"] },
    /* 3. Économie */
    { code: "3.1",   label: "Travail et consommation" },
    { code: "3.1.1", label: "Emploi et marché du travail", sujets: ["Chômage et assurance chômage", "Objectif plein emploi", "RSA et conditionnalité (France Travail)", "SMIC et bas salaires", "Emploi des seniors", "Ubérisation et statut des indépendants", "Métiers en tension"] },
    { code: "3.1.2", label: "Conditions de travail", sujets: ["Temps de travail (35 h, semaine de 4 jours)", "Télétravail", "Santé au travail et accidents", "Burn-out et risques psychosociaux", "Pénibilité", "Dialogue social et syndicats", "Sens au travail et démissions silencieuses"] },
    { code: "3.1.3", label: "Consommation", sujets: ["Pouvoir d'achat", "Inflation et prix alimentaires", "Protection des consommateurs", "Étiquetage et malbouffe (Nutri-score)", "Publicité et surconsommation", "Crédit et surendettement", "Fast fashion"] },
    { code: "3.1.4", label: "Retraites", sujets: ["Âge légal de départ (retour sur les 64 ans)", "Répartition vs capitalisation", "Carrières longues et pénibilité", "Petites pensions et minimum contributif", "Équilibre financier du système", "Régimes spéciaux", "Retraite progressive et emploi des seniors"] },
    { code: "3.2",   label: "Agriculture, industries, services" },
    { code: "3.2.1", label: "Agriculture", sujets: ["Revenu des agriculteurs (Egalim)", "PAC et normes", "Souveraineté alimentaire", "Bio et agroécologie", "Élevage et bien-être animal", "Renouvellement des générations (installation)", "Eau et mégabassines", "Accords de libre-échange (Mercosur)"] },
    { code: "3.2.2", label: "Industries", sujets: ["Réindustrialisation et relocalisation", "Industrie verte et décarbonation", "Automobile et transition électrique", "Gigafactories et batteries", "Aides publiques et conditionnalité", "Simplification des normes", "Pénuries de médicaments (relocalisation pharma)"] },
    { code: "3.2.3", label: "Services", sujets: ["Commerce de proximité et dévitalisation des centres-villes", "Grande distribution vs e-commerce", "Tourisme (premier pays visité, surtourisme)", "Artisanat et transmission", "Économie sociale et solidaire", "Hôtellerie-restauration et emplois en tension"] },
    { code: "3.3",   label: "Monnaie et finance" },
    { code: "3.3.1", label: "Politique monétaire", sujets: ["BCE et indépendance", "Inflation et taux d'intérêt", "Euro (et débat sur sa sortie)", "Euro numérique", "Création monétaire et quantitative easing", "Cryptomonnaies et souveraineté monétaire"] },
    { code: "3.3.2", label: "Régulation bancaire et financière", sujets: ["Séparation banques de dépôt / d'affaires", "Taxe sur les transactions financières", "Régulation des cryptoactifs", "Finance verte et critères ESG", "Protection de l'épargne (Livret A, assurance-vie)", "Prévention des crises bancaires", "Spéculation et haute fréquence"] },
    { code: "3.3.3", label: "Dette publique", sujets: ["Niveau de la dette (~110 % du PIB)", "Charge de la dette (intérêts)", "Règles budgétaires européennes", "Notation de la France", "Austérité vs relance", "Baisse des dépenses vs hausse des impôts", "Dette Covid et « quoi qu'il en coûte »"] },
    { code: "3.4",   label: "Redistribution" },
    { code: "3.4.1", label: "Fiscalité des personnes", sujets: ["Taxation du patrimoine (retour de l'ISF, taxe Zucman)", "Droits de succession", "TVA et fiscalité indirecte", "Impôts locaux et taxe foncière", "Niches fiscales", "Flat tax sur le capital", "Justice fiscale et consentement à l'impôt"] },
    { code: "3.4.2", label: "Fiscalité des entreprises", sujets: ["Impôt sur les sociétés", "Impôt minimum mondial (15 %)", "Taxe GAFA", "Impôts de production", "Taxation des superprofits", "Crédit d'impôt recherche", "Allègements de cotisations"] },
    { code: "3.5",   label: "Innovation et technologie" },
    { code: "3.5.1", label: "Souveraineté technologique", sujets: ["Cloud souverain et dépendance aux GAFAM", "Semi-conducteurs", "Spatial et quantique", "Financement des startups (BPI, licornes)", "Attractivité des talents"] },
    { code: "3.5.2", label: "Nouvelles technologies", sujets: ["IA et emploi", "Régulation de l'IA (AI Act)", "Réseaux sociaux et mineurs (majorité numérique)", "Deepfakes et désinformation", "Fracture numérique"] },
    { code: "3.5.3", label: "Protection des données", sujets: ["Surveillance de masse et fichiers de police", "Données de santé (hébergement souverain)", "Chiffrement (vie privée vs enquêtes)", "Identité numérique", "Transferts de données UE-USA", "Exploitation des données par les plateformes"] },
    /* 4. Écologie */
    { code: "4.1",   label: "Changement climatique" },
    { code: "4.1.1", label: "Mitigation des GES", sujets: ["Neutralité carbone 2050 (SNBC, planification)", "Taxe carbone et quotas européens (ETS)", "Décarbonation des transports et de l'industrie", "Sobriété vs solutions technologiques", "Rénovation thermique des bâtiments"] },
    { code: "4.1.2", label: "Adaptation aux effets", sujets: ["Canicules et îlots de chaleur urbains", "Sécheresses et partage de l'eau", "Inondations et recul du trait de côte", "Assurabilité face aux catastrophes", "Feux de forêt", "Adaptation de l'agriculture"] },
    { code: "4.2",   label: "Développement durable" },
    { code: "4.2.1", label: "Croissance verte", sujets: ["Croissance verte vs décroissance", "Découplage PIB / émissions", "Planification écologique", "Emplois verts et reconversions", "Investissements et fonds verts", "Greenwashing", "Reporting extra-financier (CSRD)"] },
    { code: "4.2.2", label: "Économie circulaire", sujets: ["Recyclage et tri des déchets", "Réparation et réemploi (indice de réparabilité)", "Lutte contre le gaspillage (loi AGEC)", "Plastique à usage unique et consigne", "Obsolescence programmée", "Fast fashion et textile", "Incinération et décharges"] },
    { code: "4.3",   label: "Énergie" },
    { code: "4.3.1", label: "Souveraineté énergétique", sujets: ["Dépendance aux importations (gaz russe, GNL)", "Prix de l'électricité et marché européen", "EDF et service public de l'énergie", "Sobriété énergétique", "Approvisionnement en uranium", "Interconnexions européennes"] },
    { code: "4.3.2", label: "Énergies fossiles", sujets: ["Sortie du pétrole et du gaz", "Chauffage au fioul et au gaz", "Subventions aux énergies fossiles", "Interdiction des nouveaux forages", "Gaz de schiste", "Avenir des raffineries"] },
    { code: "4.3.3", label: "Énergies vertes et nucléaire", sujets: ["Relance du nucléaire (EPR2, SMR)", "Déchets nucléaires (Cigéo)", "Éolien terrestre et en mer", "Solaire photovoltaïque", "Hydrogène", "Hydroélectricité et biogaz", "Acceptabilité locale des projets"] },
    { code: "4.4",   label: "Ressources et pollutions" },
    { code: "4.4.1", label: "Usage des ressources", sujets: ["Forêts et filière bois", "Métaux critiques et mines (lithium)", "Pêche et ressources marines", "Sobriété matière"] },
    { code: "4.4.2", label: "Gestion de la pollution", sujets: ["PFAS (polluants éternels)", "Pollution plastique", "Nitrates et algues vertes", "Sites et sols pollués"] },
    { code: "4.5",   label: "Biodiversité" },
    { code: "4.5.1", label: "Protection de la biodiversité", sujets: ["Aires protégées et parcs nationaux", "Effondrement des insectes et pollinisateurs", "Loup, ours et grands prédateurs", "Chasse", "Restauration de la nature (règlement européen)", "Haies, bocage et zones humides", "Condition animale"] },
    /* 5. Géopolitique */
    { code: "5.1",   label: "Commerce international" },
    { code: "5.1.1", label: "Ouverture commerciale", sujets: ["Accords commerciaux (CETA, Mercosur)", "Guerre commerciale et droits de douane américains", "Dépendances à la Chine", "Mécanisme carbone aux frontières (MACF)", "Avenir de l'OMC"] },
    { code: "5.1.2", label: "Souveraineté économique", sujets: ["Contrôle des investissements étrangers", "Préférence européenne dans la commande publique", "Extraterritorialité du droit américain", "Sécurisation des matières premières critiques"] },
    { code: "5.1.3", label: "Commerce équitable", sujets: ["Labels et certifications équitables", "Devoir de vigilance des multinationales", "Travail des enfants et travail forcé dans les chaînes d'approvisionnement", "Juste rémunération des producteurs du Sud", "Déforestation importée", "Aide au développement par le commerce"] },
    { code: "5.2",   label: "Migrations internationales" },
    { code: "5.2.1", label: "Gestion des flux migratoires", sujets: ["Régularisation des travailleurs sans papiers (métiers en tension)", "Regroupement familial", "Aide médicale d'État (AME)", "Pacte européen asile et migration", "Accords visas / laissez-passer avec les pays d'origine"] },
    { code: "5.2.2", label: "Accueil et intégration des migrants", sujets: ["Apprentissage du français", "Hébergement des demandeurs d'asile", "Mineurs non accompagnés", "Accès au travail des demandeurs d'asile", "Naturalisation et droit du sol (Mayotte)", "Répartition territoriale de l'accueil"] },
    { code: "5.2.3", label: "Sécurité aux frontières", sujets: ["Frontex et frontières extérieures de l'UE", "Rétablissement des contrôles intérieurs (Schengen)", "Lutte contre les passeurs", "Sauvetage en mer et drames en Méditerranée", "Externalisation des demandes d'asile", "Calais et traversées de la Manche"] },
    { code: "5.3",   label: "Diplomatie internationale" },
    { code: "5.3.1", label: "Europe et intégration régionale", sujets: ["Élargissement de l'UE (Ukraine, Balkans)", "Fédéralisme vs Europe des nations", "Défense européenne et autonomie stratégique", "Budget européen et ressources propres", "Primauté du droit européen", "Couple franco-allemand"] },
    { code: "5.3.2", label: "Reste du monde", sujets: ["Relations avec les États-Unis et l'OTAN", "Chine et Indopacifique", "Afrique (retrait du Sahel, Françafrance en question)", "Multilatéralisme et ONU", "Relations avec la Russie"] },
    { code: "5.4",   label: "Défense nationale" },
    { code: "5.4.1", label: "Budget et équipement militaire", sujets: ["Loi de programmation militaire (objectif 2 % du PIB et au-delà)", "Dissuasion nucléaire", "Industrie de défense et exportations d'armes", "Réarmement européen", "Recrutement, réserve et service militaire", "Drones et guerre de haute intensité", "Économie de guerre"] },
    { code: "5.4.2", label: "Lutte contre le terrorisme", sujets: ["Menace djihadiste", "Radicalisation en ligne et en prison", "Moyens du renseignement", "État d'urgence et libertés publiques", "Retour des djihadistes et de leurs familles", "Terrorismes d'ultradroite et d'ultragauche", "Plan Vigipirate et protection des sites"] },
    { code: "5.5",   label: "Justice climatique" },
    { code: "5.5.1", label: "Justice climatique", sujets: ["Pertes et dommages", "Contentieux climatiques (Affaire du siècle)"] }
  ],

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
      id: 1, dresseur: "Fabien Roussel", parti: "PCF", elements: ["Combat", "Acier"],
      statut: "Non déclaré", intentions: "<5%",
      bioReelle: "Secrétaire national du PCF, candidat 2022 (2,3 %)",
      faits: "Communisme « du travail et de la fête », gauche populaire",
      bio: "Dresseur de la vieille forge, il élève ses Polimons Acier et Combat à la sueur du travail collectif : chez lui, une idée se trempe comme un métal, dans l'effort partagé et la fête populaire.",
      dimsDetail: {
        "1.1": "La laïcité est une et indivisible, opposée à tous les communautarismes ; la fin de vie se décide avec les citoyens.",
        "1.2": "Chaque famille a droit aux mêmes protections, mais le corps des femmes ne sera jamais une marchandise.",
        "1.3": "La santé doit être remboursée à 100 % par la Sécu : le soin est un droit, pas un marché.",
        "1.4": "L'école publique exige des moyens massifs et une vraie mixité : le savoir est la première des richesses partagées.",
        "1.5": "Le peuple doit pouvoir décider directement des grands sujets, sans jamais toucher aux droits fondamentaux.",
        "2.1": "L'information est un bien public : des médias libérés des milliardaires, des rédactions qui ont le dernier mot.",
        "2.2": "La tranquillité publique est un droit populaire, qui s'obtient par la présence et la justice, pas par les peines automatiques.",
        "2.3": "Se loger ne doit jamais coûter plus qu'une part juste du revenu : le logement est un droit, pas une rente.",
        "2.4": "La République doit redevenir parlementaire : le président rend le pouvoir au peuple et à ses représentants.",
        "2.5": "L'égalité passe par la Sécurité sociale : les droits des femmes, des malades et des fragiles se financent collectivement.",
        "3.1": "Le travail doit nourrir les jours heureux : salaires relevés, temps libéré, retraite à 60 ans, un emploi plutôt qu'une allocation.",
        "3.2": "Les secteurs stratégiques appartiennent à la nation : produire en France, sous maîtrise publique, en payant bien les paysans.",
        "3.3": "L'argent existe, il coule à flots : le crédit et les banques doivent être réorientés vers l'utile.",
        "3.4": "Ceux qui ont beaucoup doivent beaucoup : la fortune, les superprofits et les gros héritages financent la justice sociale.",
        "3.5": "La technologie doit être maîtrisée publiquement, au service des besoins et non de la course au profit.",
        "4.1": "L'écologie se finance par les pollueurs, jamais par les fins de mois modestes.",
        "4.2": "Le progrès partagé est le vrai développement durable : produire mieux pour vivre mieux, sans décroissance.",
        "4.3": "L'énergie est un service public : nucléaire et renouvelables sous maîtrise publique, prix réglementés.",
        "4.4": "Les poisons avérés sortent des champs progressivement, avec les paysans et jamais contre eux.",
        "4.5": "La nature se protège avec le monde rural, ses chasseurs et ses éleveurs, sans interdits venus d'en haut.",
        "5.1": "La souveraineté démocratique prime sur les traités : les multinationales paient là où elles produisent.",
        "5.2": "Les travailleurs sans papiers sont des travailleurs : régulariser, accueillir dignement, et agir sur les causes.",
        "5.3": "La paix se construit par le dialogue et le droit, pas par l'escalade des blocs.",
        "5.4": "Les milliards du réarmement alimentent le cycle des guerres : la sécurité passe par le désarmement négocié.",
        "5.5": "La justice climatique est une justice sociale mondiale : que paient les pollueurs, pas les peuples."
      },
      forms: [
        { code: 1, name: "Ferousel",
          stats: { "Attaque": 51, "Défense": 52, "Vision": 34, "Résilience": 54, "Cohérence": 32 } },
        { code: 13, name: "Fabiforge",
          stats: { "Attaque": 67, "Défense": 65, "Vision": 53, "Résilience": 63, "Cohérence": 52 } },
        { code: 25, name: "Rouseliath",
          stats: { "Attaque": 81, "Défense": 78, "Vision": 71, "Résilience": 76, "Cohérence": 72 } }
      ],
      dims: {
        individu:     "L'individu est un être qui se réalise par le travail et a droit aux jours heureux.",
        societe:      "La société est une communauté de producteurs, tenue par ses services publics.",
        economie:     "L'économie est l'affaire de ceux qui produisent, pas de ceux qui spéculent.",
        ecologie:     "La nature est un bien commun que protège le progrès, non la privation.",
        geopolitique: "La France est une république sociale et souveraine, artisane de paix dans un monde multipolaire."
      }
    },
    {
      id: 2, dresseur: "François Ruffin", parti: "Debout !", elements: ["Feu", "Vol"],
      statut: "Non déclaré", intentions: "<5%",
      bioReelle: "Député de la Somme, réalisateur de « Merci patron ! », ex-LFI",
      faits: "Gauche du travail, ancrage populaire, rupture avec Mélenchon",
      bio: "Dresseur de terrain, il entraîne sa lignée Feu et Vol loin des grandes arènes, au plus près des ateliers et des ronds-points. Ses Polimons s'embrasent pour la dignité du travail et prennent de la hauteur sans oublier d'où ils décollent.",
      dimsDetail: {
        "1.1": "La laïcité est la liberté de croire, pas l'interdiction de la religion ; la fin de vie se règle d'abord par les soins qui accompagnent.",
        "1.2": "Les droits des familles sont acquis ; l'essentiel est ailleurs : le travail, le partage des richesses, la démocratie.",
        "1.3": "La santé se répare par des bras à l'hôpital et des centres de santé près des gens.",
        "1.4": "L'école publique doit tenir partout, dans les bourgs comme dans les tours, avec des adultes en nombre.",
        "1.5": "Le référendum d'initiative citoyenne est une exigence née des ronds-points : rendre la parole à ceux qui ne l'ont jamais.",
        "2.1": "Les médias appartiennent à une poignée de milliardaires : les libérer est une question de survie démocratique.",
        "2.2": "La sécurité vaut pour tous, y compris face à la police : des comptes rendus, des alternatives, pas de surenchère.",
        "2.3": "Se loger dignement passe avant la rente : bloquer les loyers, réquisitionner le vide, construire du social.",
        "2.4": "La parole doit revenir d'en bas : une nouvelle République où les bourgs et les ronds-points comptent autant que Paris.",
        "2.5": "Les métiers du lien - celles qui soignent, aident, accompagnent - sont les héros invisibles à payer enfin.",
        "3.1": "Le travail des essentiels mérite salaire et repos : mieux payés, partis plus tôt, jamais humiliés.",
        "3.2": "On protège ce qu'on produit : douanes et quotas sur le vital, prix garantis aux paysans, usines défendues.",
        "3.3": "L'orthodoxie budgétaire européenne étrangle les peuples : l'argent doit servir la reconstruction du pays.",
        "3.4": "Les riches doivent rendre : la fortune et les grands héritages financent la réparation sociale.",
        "3.5": "Le numérique doit être un service public européen, pas une colonie des GAFAM ni un outil de surveillance.",
        "4.1": "L'écologie sera populaire ou ne sera pas : le climat se gagne avec les gens, jamais sur leur dos.",
        "4.2": "Le toujours-plus épuise les hommes et la terre : ralentir, réparer, bien vivre.",
        "4.3": "L'avenir énergétique n'est pas au tout-nucléaire : les renouvelables, décidés avec les habitants.",
        "4.4": "La terre et l'eau se soignent avec les paysans : sortir des poisons, progressivement mais sûrement.",
        "4.5": "Le respect du vivant commence par la fin des souffrances inutiles : corrida, élevage intensif, poisons.",
        "5.1": "Le protectionnisme est une protection des gens : nos ouvriers ne doivent plus être mis en concurrence avec le monde entier.",
        "5.2": "L'immigré n'est pas le problème du travailleur français : accueillir dignement, sans immigration jetable au service du patronat.",
        "5.3": "Le monde a besoin d'une France qui dérange, pas d'une France qui se range : indépendante, sans double standard.",
        "5.4": "La défense s'organise entre nations libres et volontaires, sans course aux milliards ni vassalité.",
        "5.5": "Le temps des colonies est fini : la France doit réparer, aider et regarder le Sud en égal."
      },
      forms: [
        { code: 2, name: "Francendre",
          stats: { "Attaque": 59, "Défense": 40, "Vision": 48, "Résilience": 38, "Cohérence": 41 } },
        { code: 14, name: "Ruflame",
          stats: { "Attaque": 76, "Défense": 49, "Vision": 67, "Résilience": 52, "Cohérence": 56 } },
        { code: 26, name: "Rufenix",
          stats: { "Attaque": 85, "Défense": 63, "Vision": 81, "Résilience": 68, "Cohérence": 76 } }
      ],
      dims: {
        individu:     "L'individu est un travailleur essentiel dont la dignité exige respect et fierté.",
        societe:      "La société est une fraternité à recoudre entre les deux France.",
        economie:     "L'économie est faite pour relier les gens, pas pour les mettre en concurrence.",
        ecologie:     "La nature est un bonheur simple à partager, pas une leçon donnée d'en haut.",
        geopolitique: "La France est un pays entier, pas à moitié - une terre qui vit de ce qu'elle produit."
      }
    },
    {
      id: 3, dresseur: "Jean-Luc Mélenchon", parti: "LFI", elements: ["Feu", "Roche"],
      /* Carte spéciale : se révèle quand les 3 Polimons de la lignée
         ont triomphé au combat (l'évolution ultime, en quelque sorte). */
      speciale: {
        code: 103,
        title: "La République, c'est moi !",
        image: "images/polimons/special/3.jpg"
      },
      statut: "Déclaré", intentions: "10-20%",
      bioReelle: "Fondateur de LFI, 3e en 2022 avec ~22 %",
      faits: "Refuse la primaire de gauche ; ligne de rupture",
      bio: "Dresseur volcanique, il fait gronder ses Polimons Feu et Roche jusqu'à l'éruption : pour lui, c'est le peuple assemblé qui fait trembler la terre et redessine le paysage politique.",
      dimsDetail: {
        "1.1": "La laïcité est la règle commune qui sépare le religieux du politique et protège la liberté de conscience, jusqu'au droit de mourir dans la dignité.",
        "1.2": "La famille n'a pas de modèle imposé : l'État garantit à chacun la liberté de fonder la sienne, sans jamais marchandiser le corps.",
        "1.3": "La prévention doit devenir le cœur de la politique de santé, car les maux évitables coûtent bien plus cher à la société que les normes qui les empêchent.",
        "1.4": "L'enseignement professionnel et technique, qui accueille la moitié de la jeunesse, doit offrir une voie d'excellence continue vers le travail qualifié.",
        "1.5": "La démocratie ne vit que si le peuple décide directement : initiative citoyenne, référendums, révocation des élus.",
        "2.1": "La culture est un bien commun à libérer du marché, et les médias doivent appartenir à ceux qui les font, pas aux milliardaires.",
        "2.2": "La sécurité naît d'une police républicaine proche des citoyens et d'une justice de prévention, pas du tout-carcéral.",
        "2.3": "Se loger dignement exige de rénover massivement l'habitat existant plutôt que de seulement construire du neuf.",
        "2.4": "L'État planificateur doit revenir au centre du jeu, la dépense publique étant une richesse redistribuée et non de l'argent gaspillé.",
        "2.5": "L'égalité ne se proclame pas, elle se garantit : salaires des femmes, droits effectifs, lutte contre toutes les discriminations.",
        "3.1": "Le partage de la richesse par les salaires et un droit universel à une retraite précoce conditionnent à la fois la dignité des travailleurs et la demande qui fait tourner l'économie.",
        "3.2": "La réindustrialisation exige que la nation fixe elle-même ses objectifs productifs et protège son appareil industriel des logiques purement financières.",
        "3.3": "La monnaie et le crédit sont des outils publics à remettre au service de l'économie réelle, plutôt que de laisser la finance surveiller et étrangler l'activité.",
        "3.4": "La justice fiscale exige que tout le monde paie réellement et que chaque soutien public aux entreprises ait une contrepartie, les cadeaux fiscaux sans condition étant la vraie source du déficit.",
        "3.5": "La puissance technologique se conquiert par de grands objectifs nationaux assumés, non par le marché seul.",
        "4.1": "Le changement climatique est le choc majeur des années qui viennent et seule une planification écologique s'imposant à tous permet de s'y préparer.",
        "4.2": "L'économie circulaire doit devenir l'organisation normale de la production et de l'usage des ressources.",
        "4.3": "La politique énergétique doit partir du réel technique et climatique plutôt que de paris industriels hasardeux sur le nucléaire.",
        "4.4": "L'eau est une ressource sous contrainte climatique qui doit être gérée selon le réel, non accaparée.",
        "4.5": "Le vivant a des droits que l'humanité doit respecter, jusqu'à reconnaître le crime d'écocide.",
        "5.1": "Le libre-échange généralisé est une impasse : le commerce doit se négocier en échanges équilibrés, y compris avec la Chine, sans en faire un ennemi.",
        "5.2": "Les migrations sont un fait humain à organiser dignement, en s'attaquant à leurs causes plutôt qu'aux migrants.",
        "5.3": "La souveraineté populaire prime sur les traités européens, qu'il faut renégocier et auxquels il faut savoir désobéir quand ils contredisent les intérêts des Français.",
        "5.4": "La défense doit être strictement souveraine et servir la paix, hors de toute alliance intégrée.",
        "5.5": "Les pays riches doivent réparer leur dette écologique envers le Sud, par des financements et des transferts réels."
      },
      forms: [
        { code: 3, name: "Melava",
          stats: { "Attaque": 61, "Défense": 44, "Vision": 38, "Résilience": 46, "Cohérence": 33 } },
        { code: 15, name: "Magmelench",
          stats: { "Attaque": 76, "Défense": 60, "Vision": 55, "Résilience": 68, "Cohérence": 41 } },
        { code: 27, name: "Volcanchon",
          stats: { "Attaque": 95, "Défense": 67, "Vision": 69, "Résilience": 85, "Cohérence": 58 } }
      ],
      dims: {
        individu:     "L'individu est un être autonome, qui doit s'émanciper de toute domination.",
        societe:      "La société est un peuple aux multiples racines et un réseau d'entraide.",
        economie:     "L'économie est un choix politique commun, affranchi de la finance.",
        ecologie:     "La nature est un tout dont l'humain fait partie, on ne lui prélève que ce qu'elle peut redonner.",
        geopolitique: "La France est une puissance libre qui ne s'aligne sur aucun empire."
      }
    },
    {
      id: 4, dresseur: "Olivier Faure", parti: "PS", elements: ["Sol", "Combat"],
      statut: "Non déclaré", intentions: "?",
      bioReelle: "Premier secrétaire du PS, député",
      faits: "Arbitre de la primaire socialiste, ligne d'union",
      bio: "Dresseur patient des terres de compromis, il fait pousser ses Polimons Sol et Combat sur un terrain d'entente : solidarité collective d'un côté, émancipation de chacun de l'autre.",
      dimsDetail: {
        "1.1": "La laïcité garantit la liberté des usagers et la neutralité de l'État seul ; chacun doit pouvoir choisir sa fin de vie.",
        "1.2": "Les droits des familles et des personnes progressent sans retour en arrière : la République protège toutes les manières d'aimer.",
        "1.3": "La Sécu doit couvrir l'essentiel pour tous : la santé se soigne en commun, pas au guichet des complémentaires.",
        "1.4": "L'école doit redevenir la promesse d'égalité : mixité réelle, orientation choisie, enseignants respectés.",
        "1.5": "La démocratie se répare en rendant la parole : initiative citoyenne, vote des jeunes, débat plutôt qu'affrontement.",
        "2.1": "L'information libre est un pilier républicain, à défendre contre les prédateurs qui achètent les médias.",
        "2.2": "La sécurité efficace est celle qui prévient et éduque : les peines automatiques ne protègent personne.",
        "2.3": "Le logement est la première des politiques sociales : construire du social, encadrer les loyers, protéger les locataires.",
        "2.4": "Le Parlement doit avoir le dernier mot : la République se rééquilibre par le compromis, pas par le passage en force.",
        "2.5": "L'égalité se mesure dans la feuille de paie, l'entreprise et la vie quotidienne : des écarts bornés, des droits effectifs.",
        "3.1": "Le travail doit payer dignement et laisser sa place à la vie : salaires relevés, retraite juste, salariés associés aux décisions.",
        "3.2": "L'heure du socialisme écologique a sonné : l'État reprend la main sur le stratégique et conditionne ses aides.",
        "3.3": "L'investissement public assume le déficit utile : réparer le pays et financer la transition passent avant les dogmes comptables.",
        "3.4": "Les très riches doivent contribuer à la mesure de leur fortune : la justice fiscale est la mère des politiques publiques.",
        "3.5": "Le numérique se régule : des plateformes responsables, pas de surveillance biométrique généralisée.",
        "4.1": "La transition se finance sans peser sur les modestes : l'effort climatique se répartit selon les moyens.",
        "4.2": "Ni décroissance ni productivisme : une écologie de l'investissement et de la règle.",
        "4.3": "L'électricité doit être décarbonée sans précipitation nucléaire : la prudence sur les réacteurs, l'ambition sur le reste.",
        "4.4": "Les sols, l'eau et la santé passent avant les rendements : sortir du tout-pesticide, tenir le cap du zéro artificialisation.",
        "4.5": "La biodiversité se protège par la transition négociée, avec les territoires et les filières.",
        "5.1": "L'échange doit être juste : harmonisation fiscale, conditionnalité des aides, refus des traités qui sacrifient les nôtres.",
        "5.2": "Le droit du sol est constitutif de la France, pays métissé : l'immigration se gère par le droit et le travail, jamais par le déshonneur.",
        "5.3": "La France défend le droit international partout et pour tous : soutenir l'Ukraine, reconnaître la Palestine, sans double standard.",
        "5.4": "La défense de l'Europe s'assume ensemble, dans l'OTAN et au-delà, avec une dissuasion à sa juste suffisance.",
        "5.5": "La transition mondiale se finance en épargnant les modestes, ici comme au Sud."
      },
      forms: [
        { code: 4, name: "Sablefor",
          stats: { "Attaque": 44, "Défense": 55, "Vision": 36, "Résilience": 45, "Cohérence": 43 } },
        { code: 16, name: "Geoli",
          stats: { "Attaque": 59, "Défense": 65, "Vision": 54, "Résilience": 61, "Cohérence": 64 } },
        { code: 28, name: "Olismic",
          stats: { "Attaque": 64, "Défense": 85, "Vision": 75, "Résilience": 76, "Cohérence": 74 } }
      ],
      dims: {
        individu:     "L'individu est un citoyen dont l'émancipation exige l'égalité réelle, garantie par la République.",
        societe:      "La société est un contrat de solidarité, qui ne progresse que rassemblée.",
        economie:     "L'économie est un marché encadré, mis au service de la justice sociale.",
        ecologie:     "La nature est un enjeu de justice autant que de survie.",
        geopolitique: "La France est une république sociale qui tient ses promesses en construisant l'Europe."
      }
    },
    {
      id: 5, dresseur: "Marine Tondelier", parti: "Les Écologistes", elements: ["Plante", "Fée"],
      statut: "Non déclaré", intentions: "<5%",
      bioReelle: "Secrétaire nationale des Écologistes",
      faits: "A porté la refondation d'EELV ; ligne unitaire à gauche",
      bio: "Dresseuse-jardinière, elle cultive ses Polimons Plante et Fée dans le respect du vivant : chaque idée est une pousse qui ne grandit bien que si tout l'écosystème autour d'elle prospère.",
      dimsDetail: {
        "1.1": "La laïcité garantit des libertés, elle ne fabrique pas des suspects ; chacun doit rester maître de sa vie jusqu'à sa fin.",
        "1.2": "Chaque famille et chaque identité méritent les mêmes droits, garantis simplement et gratuitement.",
        "1.3": "Un système de santé qui s'effondre ne se redresse pas par des économies aveugles, qui rendent les gens plus malades au lieu de prévenir.",
        "1.4": "L'école publique doit redevenir le lieu de la mixité et de l'égalité, avec des enseignants nombreux et respectés.",
        "1.5": "La démocratie se réinvente par la participation : citoyens tirés au sort, initiative populaire, décisions co-construites.",
        "2.1": "La culture et l'information sont des biens publics à protéger de la concentration entre les mains de quelques milliardaires.",
        "2.2": "La sécurité durable naît de la prévention et d'une police exemplaire, pas de la surenchère carcérale.",
        "2.3": "Se loger et se déplacer dignement sont des droits : des logements accessibles et rénovés, le rail avant la route.",
        "2.4": "La simplification administrative est légitime tant qu'elle ne sert pas d'alibi à la dérégulation environnementale, et le pays doit se gouverner avec ses corps intermédiaires plutôt que depuis l'Élysée seul.",
        "2.5": "Aucune discrimination n'est secondaire : combattre le racisme, le sexisme, les LGBTphobies et le validisme, c'est défendre la République.",
        "3.1": "Le travail doit protéger de la pauvreté comme de la mort au travail, faute de quoi la fracture sociale finira par rompre le pacte républicain.",
        "3.2": "L'industrie est un enjeu de souveraineté qu'il faut défendre et transformer écologiquement, en orientant l'argent public selon des critères écologiques et vers les petites entreprises.",
        "3.3": "L'argent public doit servir la transition : le vrai surendettement est écologique, et l'inaction coûte plus cher que l'investissement.",
        "3.4": "La justice fiscale exige que les grandes entreprises et les héritiers contribuent au moins autant que les PME et les travailleurs, les baisses d'impôts non financées creusant le déficit.",
        "3.5": "La technologie doit rester sous contrôle démocratique : ni surveillance biométrique, ni plateformes toxiques au-dessus des lois.",
        "4.1": "L'écologie est la condition de la liberté : nier les limites planétaires rend vulnérable, et l'inaction climatique coûte bien plus cher que l'action.",
        "4.2": "La prospérité se découple de la croissance : produire moins mais mieux, et garantir à chacun l'essentiel.",
        "4.3": "C'est l'énergie chère, et non le coût du travail, qui mine la compétitivité, et les renouvelables sont une arme économique que nos concurrents déploient déjà massivement.",
        "4.4": "L'eau, l'air et les sols sont des droits vitaux : les polluants éternels et les poisons chimiques doivent sortir de nos vies.",
        "4.5": "Le vivant n'est pas un stock : les espèces et les écosystèmes se protègent pour eux-mêmes, et leur destruction est un crime.",
        "5.1": "L'Europe doit assumer un protectionnisme écologique, par sa commande publique et ses frontières carbone, pour se battre à armes égales avec la Chine et les États-Unis.",
        "5.2": "L'économie française a durablement besoin des travailleurs étrangers, et l'immigration ne doit pas servir de bouc émissaire budgétaire.",
        "5.3": "La solidarité internationale ne se divise pas : mêmes règles et même droit pour l'Ukraine, Gaza et tous les peuples.",
        "5.4": "La défense ne se limite pas aux armes : la guerre est aussi économique, industrielle et énergétique, et chaque dépendance est une vulnérabilité exploitée par les impérialismes.",
        "5.5": "Les plus riches et les pays riches doivent payer leur part climatique : la justice entre nations est la condition de l'action."
      },
      forms: [
        { code: 5, name: "Ecomar",
          stats: { "Attaque": 34, "Défense": 43, "Vision": 57, "Résilience": 48, "Cohérence": 46 } },
        { code: 17, name: "Tondeliere",
          stats: { "Attaque": 56, "Défense": 54, "Vision": 78, "Résilience": 54, "Cohérence": 60 } },
        { code: 29, name: "Tondeliane",
          stats: { "Attaque": 66, "Défense": 66, "Vision": 94, "Résilience": 71, "Cohérence": 81 } }
      ],
      dims: {
        individu:     "L'individu est un vivant parmi les vivants, dont la liberté naît du soin porté à ce qui le fait vivre.",
        societe:      "La société est un tissu d'interdépendances, entre humains et avec le vivant, qui ne tient que par la justice.",
        economie:     "L'économie est une activité humaine tenue par les limites de la planète.",
        ecologie:     "La nature est la matrice suprême qui conditionne toute existence et guide toute décision.",
        geopolitique: "La France est une terre dont la liberté commence par l'indépendance écologique."
      }
    },
    {
      id: 6, dresseur: "Raphaël Glucksmann", parti: "Place Publique", elements: ["Électrik", "Sol"],
      statut: "Non déclaré", intentions: "5-15%",
      bioReelle: "Eurodéputé, tête de liste PS-PP aux européennes 2024 (~14 %)",
      faits: "Social-démocrate pro-européen, ligne anti-autoritaire",
      bio: "Dresseur sentinelle, il charge ses Polimons Électrik et Sol pour défendre les arènes démocratiques : vigilance permanente, règles communes et alliances par-delà les frontières.",
      dimsDetail: {
        "1.1": "La laïcité est une règle de concorde : neutralité de l'État, liberté des citoyens, et droits universels - jusqu'à celui de choisir sa fin.",
        "1.2": "Les droits des familles s'alignent vers le haut : même filiation, mêmes droits, pour tous les couples.",
        "1.3": "La santé est une solidarité qui oblige tous ses acteurs : l'accès de tous aux soins prime sur les intérêts de chacun.",
        "1.4": "L'école est le premier front de la démocratie : face aux écrans et au vide, elle doit reconquérir les esprits.",
        "1.5": "La démocratie exige des citoyens actifs : leur donner l'initiative et la proportionnelle, pour réapprendre le compromis.",
        "2.1": "L'espace public ne s'achète pas : l'information doit être protégée des milliardaires et financée par ceux qui la captent.",
        "2.2": "L'autorité n'est légitime que contrôlée : fermeté sans naïveté, mais une police qui rend des comptes.",
        "2.3": "Se loger est la première des dignités : un effort massif de construction et de rénovation, encadré là où le marché exclut.",
        "2.4": "Les institutions doivent réapprendre le partage du pouvoir : un Parlement qui décide, un exécutif qui rend des comptes.",
        "2.5": "L'égalité entre les femmes et les hommes se finance et se mesure, elle ne se décrète pas.",
        "3.1": "Le travail doit redevenir le cœur du pacte social (mieux payé, mieux protégé, mieux représenté dans l'entreprise) avec des retraites fondées sur la pénibilité plutôt que sur un âge unique.",
        "3.2": "La dette est le prix de la désindustrialisation : il faut reproduire en France en choisissant des filières stratégiques, la révolution écologique étant la révolution industrielle du siècle.",
        "3.3": "Le redressement ne peut se financer ni par la dette ni par la casse du modèle social, car casser le modèle social, c'est casser la démocratie.",
        "3.4": "Une société qui taxe plus le travail que l'héritage devient une héritocratie : la fiscalité doit remettre le mérite au-dessus de la rente, dans un cadre stable.",
        "3.5": "L'Europe doit investir dans une filière IA souveraine pour rester technologiquement autonome, notamment des USA et de la Chine.",
        "4.1": "Investir massivement et immédiatement dans la transition écologique est la seule vraie économie, l'impréparation coûtant toujours plus cher que l'action.",
        "4.2": "La transition est une croissance à conquérir : verdir l'économie par l'investissement, sans religion de la décroissance.",
        "4.3": "L'énergie décarbonée prend tout : le nucléaire comme socle, les renouvelables comme accélérateur.",
        "4.4": "Les ressources relèvent de règles communes européennes : ce qui empoisonne ici doit être banni partout.",
        "4.5": "Le vivant se protège par le droit : aires protégées, fin des souffrances inutiles, sanctions réelles contre l'écocide.",
        "5.1": "Le temps du libre-échange naïf est terminé : l'Europe doit protéger ses producteurs par la préférence européenne, la réciprocité des normes et le refus des produits du dumping social.",
        "5.2": "Les migrations se gouvernent sans hystérie : des règles appliquées, des voies légales réelles, et jamais la trahison du droit d'asile.",
        "5.3": "La France doit user de son poids stratégique pour imposer à Bruxelles la réorientation industrielle et commerciale de l'Europe, dont la sortie serait en revanche un suicide économique.",
        "5.4": "La sécurité de l'Europe est l'affaire des Européens : réarmer ensemble, car le parapluie américain s'est refermé.",
        "5.5": "La justice climatique est un devoir des riches : tenir l'objectif d'aide, réparer, et regarder l'histoire en face."
      },
      forms: [
        { code: 6, name: "Rafelec",
          stats: { "Attaque": 35, "Défense": 45, "Vision": 61, "Résilience": 43, "Cohérence": 42 } },
        { code: 18, name: "Raforage",
          stats: { "Attaque": 56, "Défense": 54, "Vision": 72, "Résilience": 58, "Cohérence": 61 } },
        { code: 30, name: "Rafoudre",
          stats: { "Attaque": 74, "Défense": 71, "Vision": 85, "Résilience": 70, "Cohérence": 78 } }
      ],
      dims: {
        individu:     "L'individu est un être de liens, qui se vide dans l'isolement et s'accomplit dans le commun.",
        societe:      "La société est une démocratie fragile, à défendre contre les empires au-dehors et l'injustice au-dedans.",
        economie:     "L'économie est le socle de la promesse démocratique : que chacun puisse changer sa vie par son travail, à armes égales.",
        ecologie:     "La nature est une condition de notre liberté autant que de notre survie.",
        geopolitique: "La France est la locomotive d'une Europe souveraine et démocratique."
      }
    },
    {
      id: 7, dresseur: "Gabriel Attal", parti: "Renaissance / bloc central", elements: ["Électrik", "Psy"],
      statut: "Déclaré", intentions: "10-20%",
      bioReelle: "Plus jeune Premier ministre de la Ve République (2024), patron de Renaissance",
      faits: "Incarne la relève macroniste ; méritocratie et innovation",
      bio: "Dresseur véloce, il entraîne ses Polimons Électrik et Psy à la vitesse de l'éclair : mérite, innovation et esprit de compétition sont ses techniques favorites.",
      dimsDetail: {
        "1.1": "La laïcité protège d'abord les plus jeunes contre les emprises communautaires ; chacun doit rester maître de sa fin de vie.",
        "1.2": "Chaque famille est légitime : les droits acquis - PMA, IVG, droits LGBT - sont non négociables et doivent progresser.",
        "1.3": "La santé doit être garantie à ceux qui bossent et aux plus modestes, avec des devoirs pour les soignants comme pour les assurés.",
        "1.4": "L'éducation est la mère des batailles : l'école exigeante et l'autorité du professeur décident du destin du pays.",
        "1.5": "La démocratie doit sortir de la verticalité comme de la vétocratie : décider vite, avec les citoyens, sans se faire bloquer.",
        "2.1": "La culture et les médias doivent rester libres, sans que l'État finance sans compter ni dicte leur propriété.",
        "2.2": "La sanction doit tomber vite et tôt : la réponse pénale rapide, dès le plus jeune âge, protège la promesse républicaine.",
        "2.3": "Le logement est un secteur productif et le socle de la promesse d'ascension sociale : il faut libérer la construction et rouvrir l'accès à la propriété aux jeunes générations.",
        "2.4": "L'administration doit servir le mandat démocratique et la rapidité de décision, avec des règles simples et des délais garantis plutôt qu'une culture de l'empêchement.",
        "2.5": "L'égalité se joue dans le concret des vies : protéger les enfants des écrans, mieux reconnaître ceux qui accompagnent les plus fragiles.",
        "3.1": "Le travail doit payer davantage pour la classe moyenne qui bosse, et les grands équilibres sociaux se réforment en changeant de système plutôt qu'en ajustant sans fin les paramètres.",
        "3.2": "La simplification ne se décrète pas par des lois successives mais par un changement de méthode qui fait confiance au terrain et lève les blocages concrets.",
        "3.3": "Le retour à l'équilibre budgétaire exige d'assumer des économies d'abord sur la dépense sociale et de faire mieux avec moins grâce à l'innovation.",
        "3.4": "Une fiscalité plus basse, stable et prévisible rapporte davantage qu'une fiscalité punitive, car elle libère l'activité.",
        "3.5": "L'innovation et l'IA sont la bataille décisive du siècle et la seule source durable de productivité et de hausse des salaires.",
        "4.1": "L'écologie doit rester un moyen pragmatique de transition et non une fin en soi qui bascule dans la décroissance.",
        "4.2": "Le développement durable est une affaire d'innovation et de responsabilité, pas de décroissance.",
        "4.3": "L'énergie française doit rester nucléaire, stable et bon marché : c'est la condition de tout le reste.",
        "4.4": "L'adaptation au climat relève du bon sens pratique, comme stocker l'eau quand elle abonde pour affronter les sécheresses.",
        "4.5": "La protection animale mérite du courage concret - jusqu'à interdire les spectacles de souffrance - sans condamner l'élevage.",
        "5.1": "La Chine mène une offensive délibérée pour couler notre industrie et appelle des réponses commerciales fermes plutôt que des débats.",
        "5.2": "Les frontières sont vitales : le Parlement décide qui entre, le travail prime sur le reste, dans le respect du droit.",
        "5.3": "L'Europe est le camp de la France : face à la Russie, le soutien à l'Ukraine ne se marchande pas.",
        "5.4": "La défense s'européanise : réarmer ensemble, jusqu'à une armée commune, pour ne plus dépendre de personne.",
        "5.5": "La solidarité climatique se juge aux résultats : l'innovation partagée plutôt que les chèques sans suite."
      },
      forms: [
        { code: 7, name: "Voltatal",
          stats: { "Attaque": 52, "Défense": 33, "Vision": 55, "Résilience": 37, "Cohérence": 51 } },
        { code: 19, name: "Gabynamo",
          stats: { "Attaque": 66, "Défense": 49, "Vision": 74, "Résilience": 44, "Cohérence": 66 } },
        { code: 31, name: "Gabitek",
          stats: { "Attaque": 78, "Défense": 69, "Vision": 85, "Résilience": 65, "Cohérence": 76 } }
      ],
      dims: {
        individu:     "L'individu est la somme de ce qu'il fait, non ce dont il hérite.",
        societe:      "La société est une promesse d'ascension qui doit valoir pour tous.",
        economie:     "L'économie est un gâteau qui grandit par l'innovation et profite à tous.",
        ecologie:     "La nature est une responsabilité entre générations, que le progrès permet d'honorer.",
        geopolitique: "La France est une puissance d'avenir, qui tient sa place dans le monde par l'audace et l'innovation."
      }
    },
    {
      id: 8, dresseur: "Édouard Philippe", parti: "Horizons", elements: ["Eau", "Vol"],
      statut: "Déclaré", intentions: "10-20%",
      bioReelle: "Premier ministre 2017-2020, maire du Havre, fondateur d'Horizons",
      faits: "Premier grand candidat déclaré ; droite modérée pragmatique",
      bio: "Dresseur du grand large, il navigue avec ses Polimons Eau et Vol dans la brume du Havre : cap pragmatique, autorité tranquille et manœuvres calculées.",
      dimsDetail: {
        "1.1": "La laïcité est un équilibre à préserver, sans surenchère d'interdits ; la fin de vie appelle la prudence plus que la loi.",
        "1.2": "La famille relève des choix privés : l'État accompagne, il ne prescrit pas de modèle.",
        "1.3": "La santé s'organise avec les soignants de terrain, en s'appuyant sur la médecine libérale plutôt qu'en étatisant tout.",
        "1.4": "La formation, l'éducation et l'apprentissage sont le socle de la compétitivité d'une nation et exigent la constance des politiques publiques.",
        "1.5": "La démocratie est représentative : au peuple les grandes décisions par référendum, aux élus la responsabilité de gouverner.",
        "2.1": "La culture et l'audiovisuel publics méritent un financement stable, tenu à l'écart des passions idéologiques.",
        "2.2": "La peine doit être certaine et connue : la fermeté prévisible protège mieux que la sévérité proclamée.",
        "2.3": "Un pays prospère investit massivement dans ses infrastructures pour s'adapter à son époque, notamment climatique.",
        "2.4": "Une règle stable, même imparfaite, vaut mieux qu'une norme mouvante, et simplifier exige le courage de résister aux demandes qui en produisent sans cesse de nouvelles.",
        "2.5": "La solidarité envers l'âge et le handicap est une affaire de sérieux : des droits financés plutôt que des promesses.",
        "3.1": "Préserver le modèle social et le pouvoir d'achat des classes moyennes, condition de survie de la démocratie, impose de travailler collectivement plus longtemps et d'élargir le financement de la protection sociale au-delà du seul travail.",
        "3.2": "La prospérité naît d'une politique de l'offre constante qui laisse les entreprises créer la richesse et soigne la compétitivité face à des concurrents d'abord européens.",
        "3.3": "Une nation tient parole sur sa dette et remet ses comptes en ordre par le travail plutôt que par l'impôt, sous peine de choc financier brutal ou d'étranglement lent.",
        "3.4": "La fiscalité ne doit frapper les entreprises que sur ce qu'elles ont réellement gagné, et toute baisse d'impôt doit être honnêtement financée.",
        "3.5": "La technologie se saisit avec pragmatisme : l'innovation d'abord, la précaution ensuite.",
        "4.1": "Le climat se traite comme un problème sérieux : par le nucléaire, la technique et l'adaptation, sans écologie punitive.",
        "4.2": "Le développement durable passe par l'investissement de long terme, pas par la contrainte des modes de vie.",
        "4.3": "L'énergie de la France, c'est plus de nucléaire : décarbonée, pilotable et compétitive.",
        "4.4": "Les ressources se gèrent avec réalisme, en donnant aux producteurs les moyens de faire plutôt qu'en empilant les interdits.",
        "4.5": "La biodiversité se protège sans sacrifier ceux qui vivent de la terre.",
        "5.1": "Le commerce avec les grandes puissances doit reposer sur la réciprocité stricte : ce qui se vend chez nous doit se produire chez nous, comme elles nous l'ont imposé.",
        "5.2": "L'immigration doit être choisie et contrôlée : le Parlement fixe des quotas, le pays assume ses besoins de travail.",
        "5.3": "L'Europe doit assumer d'être une puissance qui achève son marché intérieur et parle d'égal à égal avec la Chine et les États-Unis.",
        "5.4": "La défense exige l'effort dans la durée : une armée forte, la dissuasion intacte, l'OTAN comme pilier.",
        "5.5": "La solidarité climatique internationale compte, mais un pays surendetté n'aide personne : le sérieux d'abord."
      },
      forms: [
        { code: 8, name: "Brumedo",
          stats: { "Attaque": 37, "Défense": 57, "Vision": 38, "Résilience": 52, "Cohérence": 41 } },
        { code: 20, name: "Edether",
          stats: { "Attaque": 48, "Défense": 67, "Vision": 57, "Résilience": 65, "Cohérence": 61 } },
        { code: 32, name: "Zefilipe",
          stats: { "Attaque": 60, "Défense": 91, "Vision": 72, "Résilience": 86, "Cohérence": 69 } }
      ],
      dims: {
        individu:     "L'individu est un adulte lucide et responsable, qui regarde le réel en face.",
        societe:      "La société est un contrat exigeant, qui tient par des règles stables et l'effort de chacun.",
        economie:     "L'économie est une richesse qui se crée, par le travail et la stabilité, avant de se partager.",
        ecologie:     "La nature est une réalité qui change, à laquelle un pays s'adapte par la technique et l'investissement.",
        geopolitique: "La France est une puissance d'équilibre dans une Europe qui s'assume, sans vivre à crédit."
      }
    },
    {
      id: 9, dresseur: "Laurent Wauquiez", parti: "LR", elements: ["Eau", "Combat"],
      statut: "Non déclaré", intentions: "?",
      bioReelle: "Président du groupe Droite Républicaine à l'Assemblée, ex-président d'AuRA",
      faits: "Battu pour la désignation LR ; garde ses ambitions",
      bio: "Dresseur des hauts plateaux, il endurcit ses Polimons Eau et Combat à la rude école de la montagne : travail, ordre et défense des intérêts vitaux du territoire.",
      dimsDetail: {
        "1.1": "La laïcité protège une civilisation aux racines chrétiennes : le voile recule, les racines demeurent.",
        "1.2": "La famille est la cellule de base de la transmission, à soutenir sans bouleverser ses repères.",
        "1.3": "La santé se soigne au plus près du terrain, sans grandes machines étatiques.",
        "1.4": "L'école transmet le roman national et l'exigence : l'autorité du maître d'abord.",
        "1.5": "Le peuple tranche par référendum les sujets que les élites esquivent, l'immigration en tête.",
        "2.1": "La culture fait vivre le patrimoine et l'identité, loin des modes militantes.",
        "2.2": "La fermeté ne se discute pas : celui qui menace la France doit être mis hors d'état de nuire, où que ce soit.",
        "2.3": "La liberté de construire et de rouler appartient aux territoires : les normes des métropoles ne font pas la loi des campagnes.",
        "2.4": "La France se gouverne depuis ses territoires : moins d'État parisien, moins d'agences, moins de normes.",
        "2.5": "La solidarité doit récompenser l'effort : plafonner l'assistanat pour respecter ceux qui travaillent.",
        "3.1": "Travailler plus pour gagner plus : l'effort défiscalisé, l'assistanat borné, la retraite assurée par le travail.",
        "3.2": "La production se relocalise en allégeant impôts et normes, en défendant l'élevage et la montagne.",
        "3.3": "La dette se combat par la baisse des dépenses, jamais par l'impôt.",
        "3.4": "L'impôt doit cesser d'écraser les classes moyennes qui financent tout et ne reçoivent rien.",
        "3.5": "La technologie vaut par ses usages concrets pour les territoires et l'industrie.",
        "4.1": "Le carbone de la France est d'abord importé : taxer ce qui vient de loin plutôt que contraindre ceux d'ici.",
        "4.2": "Le développement durable ne doit jamais devenir la décroissance des campagnes.",
        "4.3": "Le nucléaire est l'atout maître ; l'éolien défigure les paysages pour rien.",
        "4.4": "L'eau se stocke, la terre se cultive : les ressources se gèrent avec les paysans, pas contre eux.",
        "4.5": "La nature vivante se défend par ceux qui l'habitent : chasseurs, éleveurs et montagnards en premier.",
        "5.1": "La réciprocité commerciale d'abord : taxer aux frontières ce qui ne respecte pas nos règles.",
        "5.2": "L'immigration de masse menace la civilisation européenne : réduction drastique et fin des automatismes.",
        "5.3": "L'Europe des nations, où le droit français a le dernier mot.",
        "5.4": "La défense reste nationale : la dissuasion ne se partage pas, l'effort se soutient.",
        "5.5": "La justice climatique commence aux frontières : faire payer le carbone importé plutôt que les Français."
      },
      forms: [
        { code: 9, name: "Hydrokier",
          stats: { "Attaque": 54, "Défense": 54, "Vision": 33, "Résilience": 51, "Cohérence": 35 } },
        { code: 21, name: "Loragan",
          stats: { "Attaque": 69, "Défense": 65, "Vision": 46, "Résilience": 62, "Cohérence": 55 } },
        { code: 33, name: "Vokieluge",
          stats: { "Attaque": 90, "Défense": 84, "Vision": 63, "Résilience": 76, "Cohérence": 65 } }
      ],
      dims: {
        individu:     "L'individu est celui qui se lève tôt et mérite de garder le fruit de ses efforts.",
        societe:      "La société est un enracinement : famille, commune, terroir, transmission.",
        economie:     "L'économie est faite pour ceux qui travaillent, pas pour ceux qui en profitent.",
        ecologie:     "La nature est un pays réel que défendent ceux qui y vivent.",
        geopolitique: "La France est une nation enracinée qui doit reprendre le contrôle de son destin."
      }
    },
    {
      id: 10, dresseur: "Marine Le Pen", parti: "RN", elements: ["Glace", "Acier"],
      /* Carte spéciale : se révèle quand les 3 Polimons de la lignée
         ont triomphé au combat. */
      speciale: {
        code: 110,
        title: "Ils sont dans nos campagnes !",
        image: "images/polimons/special/10.jpg"
      },
      statut: "Déclaré", intentions: "30-40%",
      bioReelle: "Finaliste 2017 et 2022, cheffe des députés RN",
      faits: "Condamnation avec inéligibilité en appel ; Bardella en plan B",
      bio: "Dresseuse des terres gelées, elle protège ses Polimons Glace et Acier derrière des frontières cristallines : pour elle, la communauté nationale passe avant tout le reste.",
      dimsDetail: {
        "1.1": "La laïcité est un bouclier de la civilisation française, à opposer d'abord aux idéologies islamistes.",
        "1.2": "La famille est le premier maillon de la nation : faire naître et élever des enfants en France mérite le soutien de l'État.",
        "1.3": "La santé est un dû de la nation à son peuple : l'hôpital de proximité doit vivre, la bureaucratie sanitaire disparaître.",
        "1.4": "L'école doit d'abord transmettre : les savoirs, la langue, l'histoire et l'autorité du maître.",
        "1.5": "Le peuple doit pouvoir trancher lui-même les grands choix, par le référendum plutôt que par les corps intermédiaires.",
        "2.1": "La culture doit transmettre l'identité et le patrimoine de la France plutôt que les modes idéologiques.",
        "2.2": "L'autorité de l'État doit redevenir totale : celui qui agresse les Français doit payer, et payer vite.",
        "2.3": "Le cadre de vie des Français - pavillon, voiture, ruralité - doit être protégé, pas culpabilisé.",
        "2.4": "L'État doit cesser d'être un fardeau bureaucratique et normatif pour redevenir le garant d'un cadre stable où la nation et ses entreprises prospèrent.",
        "2.5": "La protection des plus fragiles se vit au sein de la communauté nationale, par l'assimilation et non le communautarisme.",
        "3.1": "La retraite et l'emploi doivent se penser à partir du travail réellement fourni, partir tôt quand on a commencé tôt, et de la remontée du taux d'emploi, plutôt qu'à partir de la seule comptabilité.",
        "3.2": "La réindustrialisation est une priorité nationale absolue qui justifie de lever les freins normatifs et fonciers et d'orienter la commande publique vers ce qui est produit en France.",
        "3.3": "La dette doit être remboursée par des économies sur le train de vie de l'État, car elle menace directement la souveraineté du pays.",
        "3.4": "La fiscalité doit cesser de taxer la production, garantir la constance des règles et réserver ses avantages à ceux qui produisent durablement en France.",
        "3.5": "La technologie doit protéger les Français et les filières françaises, pas les livrer aux géants étrangers.",
        "4.1": "Le climat change, mais la réponse doit protéger le mode de vie des Français au lieu de le punir.",
        "4.2": "Le localisme est le vrai développement durable : produire, consommer et vivre au plus près.",
        "4.3": "Une énergie abondante et bon marché, héritage du nucléaire national, est un bien de première nécessité que l'État doit rendre aux ménages comme aux entreprises.",
        "4.4": "Les ressources du pays se protègent contre les pollutions importées et les normes absurdes, avec ceux qui vivent du territoire.",
        "4.5": "La biodiversité se défend avec les ruraux, les chasseurs et les paysans, pas contre eux.",
        "5.1": "Le commerce doit être un protectionnisme intelligent : la priorité aux produits et aux entreprises de France.",
        "5.2": "L'immigration pèse lourdement sur les comptes sociaux et sa réduction est un levier du redressement budgétaire.",
        "5.3": "L'Union européenne doit coûter moins et normer moins, la France n'ayant ni à surpayer sa contribution ni à surtransposer les règles communes.",
        "5.4": "La défense est strictement nationale : réarmement, dissuasion française, indépendance vis-à-vis du commandement de l'OTAN.",
        "5.5": "La solidarité climatique internationale passe après la priorité nationale : la France n'a pas à payer pour le monde."
      },
      forms: [
        { code: 10, name: "Marinej",
          stats: { "Attaque": 54, "Défense": 50, "Vision": 29, "Résilience": 62, "Cohérence": 28 } },
        { code: 22, name: "Lepolaire",
          stats: { "Attaque": 66, "Défense": 64, "Vision": 51, "Résilience": 71, "Cohérence": 48 } },
        { code: 34, name: "Blizaren",
          stats: { "Attaque": 77, "Défense": 79, "Vision": 61, "Résilience": 88, "Cohérence": 68 } }
      ],
      dims: {
        individu:     "L'individu est un être fier, défini, et protégé par ses racines (familiales, culturelles, historiques).",
        societe:      "La société est une communauté nationale unie par un destin commun, qui choisit qui elle accueille.",
        economie:     "L'économie est un moyen au service de la nation et de son peuple, contre la mondialisation.",
        ecologie:     "La nature est un patrimoine que l'on protège d'abord près de chez soi, sans culpabiliser.",
        geopolitique: "La France est une nation souveraine, seule maîtresse de son destin."
      }
    },
    {
      id: 11, dresseur: "Jordan Bardella", parti: "RN", elements: ["Glace", "Acier"],
      statut: "Non déclaré", intentions: "30-40%",
      bioReelle: "Président du RN, tête de liste européennes 2024 (31 %)",
      faits: "Candidat de substitution si l'inéligibilité de Le Pen est confirmée",
      bio: "Jeune dresseur de la lignée polaire, il modernise les techniques de la banquise : ses Polimons Glace et Acier avancent en formation serrée, portés par les réseaux et la relève.",
      dimsDetail: {
        "1.1": "La laïcité se défend là où elle recule concrètement - services publics, école, sport - sans guerre de religion généralisée.",
        "1.2": "La famille française mérite la priorité de la nation : aider ceux qui font naître l'avenir du pays.",
        "1.3": "La santé de proximité est un droit des territoires : arrêter de fermer, recommencer à soigner.",
        "1.4": "L'école doit rétablir l'autorité et la transmission : le mérite comme ascenseur, l'exigence comme respect.",
        "1.5": "Le peuple doit reprendre la parole par le référendum, à commencer par le sujet qu'on lui refuse : l'immigration.",
        "2.1": "La culture doit réapprendre la fierté française au lieu de s'excuser d'elle-même.",
        "2.2": "L'ensauvagement se combat par la certitude de la sanction, dès la minorité, et par l'expulsion des délinquants étrangers.",
        "2.3": "Le quotidien des Français - se loger, rouler, se chauffer - passe avant les dogmes des métropoles.",
        "2.4": "L'État doit être audité, allégé et recentré sur le régalien, avec un pouvoir capable de rassembler au-delà d'un parti.",
        "2.5": "La protection des femmes et des plus fragiles commence par la sécurité et l'assimilation, pas par le communautarisme.",
        "3.1": "Le travail doit payer mieux, avec le réalisme budgétaire qui permet aux promesses sociales de tenir.",
        "3.2": "La réindustrialisation passe par l'énergie bon marché, la commande publique française et des impôts de production allégés.",
        "3.3": "Les comptes publics s'assainissent en coupant les dépenses subies - fraude, immigration, bureaucratie - pas en taxant les Français.",
        "3.4": "L'impôt doit épargner les jeunes, le travail et la transmission familiale, et cesser d'étouffer les entreprises.",
        "3.5": "La France doit se doter d'une puissance technologique propre, nourrie par son énergie nucléaire.",
        "4.1": "L'écologie ne doit jamais punir : le climat se traite par le nucléaire et le progrès, pas par la contrainte.",
        "4.2": "Le localisme est l'écologie du réel : produire français, c'est déjà décarboner.",
        "4.3": "L'énergie est la mère de l'indépendance : le nucléaire massif, la fin des éoliennes subventionnées, un prix français.",
        "4.4": "Les normes ne doivent plus accabler ceux qui cultivent et produisent : protéger sans paralyser.",
        "4.5": "La ruralité, la chasse et l'élevage font partie de la nature française, à défendre contre l'écologie des villes.",
        "5.1": "Le commerce se protège aux frontières : ce qui ne respecte pas nos règles ne doit pas entrer chez nous.",
        "5.2": "L'immigration incontrôlée doit cesser : le peuple tranche par référendum, la loi expulse, la nationalité se mérite.",
        "5.3": "L'Europe doit redevenir une alliance de nations libres, lucide sur la menace russe sans se dissoudre dans le fédéralisme.",
        "5.4": "Le réarmement est national : une armée forte et une dissuasion française, sans armée européenne.",
        "5.5": "La France n'a ni leçons ni chèques climatiques à recevoir ou à donner : ses efforts se décident chez elle."
      },
      forms: [
        { code: 11, name: "Cryodane",
          stats: { "Attaque": 48, "Défense": 53, "Vision": 34, "Résilience": 54, "Cohérence": 34 } },
        { code: 23, name: "Vergladela",
          stats: { "Attaque": 67, "Défense": 65, "Vision": 55, "Résilience": 60, "Cohérence": 53 } },
        { code: 35, name: "Blizardela",
          stats: { "Attaque": 79, "Défense": 81, "Vision": 70, "Résilience": 82, "Cohérence": 62 } }
      ],
      dims: {
        individu:     "L'individu est un membre de la communauté nationale, qui s'élève par le mérite et la fidélité.",
        societe:      "La société est un héritage vivant, une appartenance qui se mérite et se défend.",
        economie:     "L'économie est une force à libérer, au service et sous la protection de la nation.",
        ecologie:     "La nature est un cadre de vie enraciné, à préserver sans punir personne.",
        geopolitique: "La France est un héritage de civilisation que la génération qui vient doit défendre."
      }
    },
    {
      id: 12, dresseur: "Éric Zemmour", parti: "Reconquête", elements: ["Glace", "Psy"],
      statut: "Non déclaré", intentions: "<5%",
      bioReelle: "Candidat 2022 (7 %), essayiste",
      faits: "Thème du « grand remplacement », concurrence du RN",
      bio: "Dresseur hypnotiseur, il fait miroiter à ses Polimons Glace et Psy le souvenir d'une civilisation idéalisée : illusions, mirages et batailles de mémoire sont son terrain de prédilection.",
      dimsDetail: {
        "1.1": "La France est de culture chrétienne : la laïcité sert à contenir l'islam, pas à effacer nos racines.",
        "1.2": "La famille est le berceau de la civilisation : faire naître des enfants français est le premier acte de survie du pays.",
        "1.3": "La santé passe par un État recentré : soigner les Français d'abord, sans bureaucratie ni guichets ouverts au monde.",
        "1.4": "L'école doit réapprendre la France : le roman national, la sélection et le maître qui a raison.",
        "1.5": "Le pouvoir doit être vertical et assumé : l'exécutif décide, le référendum tranche les grands sujets, pas la rue.",
        "2.1": "La culture doit servir la grandeur française : l'audiovisuel public militant n'a pas à vivre de l'argent des Français.",
        "2.2": "La force doit changer de camp : sanction maximale, prison massive, expulsion de tout étranger criminel.",
        "2.3": "Le pavillon, la voiture et le village sont la France réelle, à défendre contre l'urbanisme et l'écologie punitive.",
        "2.4": "L'État doit être recentralisé et débarrassé de ses bureaucraties pour ne servir que le régalien.",
        "2.5": "L'assimilation intégrale est la seule égalité qui vaille : devenir français jusque dans les prénoms.",
        "3.1": "Le travail se libère par la baisse des charges, pas par les hausses décrétées : travailler plus et garder son argent.",
        "3.2": "La production française renaît par l'offre : moins d'impôts, une énergie abondante, des usines rendues à la nation.",
        "3.3": "L'État doit dépenser moins, tout simplement : aucun impôt nouveau, jamais.",
        "3.4": "La transmission du patrimoine aux enfants est sacrée : l'impôt sur l'héritage est un impôt contre la famille.",
        "3.5": "La technologie est une chance à saisir sans les entraves de Bruxelles : l'IA et l'innovation servent la puissance.",
        "4.1": "Le catastrophisme climatique est une religion de substitution : la vraie urgence est la survie de la civilisation.",
        "4.2": "L'écologie véritable est celle des paysages et des terroirs, pas celle de la décroissance.",
        "4.3": "Le nucléaire à son maximum : l'énergie française abondante, sans une éolienne de plus.",
        "4.4": "Les ressources du pays se gèrent sans les normes qui étranglent ceux qui produisent.",
        "4.5": "Les traditions - chasse, corrida, terroirs - font partie de la nature française et ne se négocient pas.",
        "5.1": "Le patriotisme économique protège les producteurs français, face à la Chine comme aux dogmes de Bruxelles.",
        "5.2": "L'immigration doit tendre vers zéro et s'inverser : la remigration est la condition de la survie du peuple français.",
        "5.3": "La France s'allie aux nations qui lui ressemblent et parle à tous, Moscou compris : le droit français prime sur les cours européennes.",
        "5.4": "L'armée existe pour la France seule : dissuasion modernisée, sortie du commandement intégré, fin des guerres des autres.",
        "5.5": "Les grand-messes climatiques mondiales sont des gesticulations : la France ne doit rien au tribunal du Sud."
      },
      forms: [
        { code: 12, name: "Hypnerik",
          stats: { "Attaque": 58, "Défense": 31, "Vision": 38, "Résilience": 56, "Cohérence": 44 } },
        { code: 24, name: "Zemirage",
          stats: { "Attaque": 76, "Défense": 52, "Vision": 58, "Résilience": 67, "Cohérence": 48 } },
        { code: 36, name: "Zemystere",
          stats: { "Attaque": 86, "Défense": 65, "Vision": 73, "Résilience": 79, "Cohérence": 71 } }
      ],
      dims: {
        individu:     "L'individu est l'héritier d'une civilisation qui le précède, le dépasse et le définit.",
        societe:      "La société est un corps civilisationnel millénaire menacé d'effacement.",
        economie:     "L'économie est un instrument de puissance au service du redressement national.",
        ecologie:     "La nature est une inquiétude seconde : la vraie menace n'est pas la fin du monde, mais la fin de notre monde.",
        geopolitique: "La France est une civilisation assiégée qui n'a pas dit son dernier mot."
      }
    }
    ,{
      id: 13, dresseur: "Bruno Retailleau", parti: "LR", elements: ["Eau", "Acier"],
      statut: "Déclaré", intentions: "5-15%",
      bioReelle: "Ministre de l'Intérieur, ancien chef des sénateurs LR, vendéen",
      faits: "Ligne droite dure : sécurité, immigration, autorité",
      bio: "Dresseur vendéen à la ligne claire, il forge ses Polimons Eau et Acier dans la discipline : chez lui, l'ordre est la première des libertés et l'autorité le premier des remparts.",
      dimsDetail: {
        "1.1": "La laïcité doit gagner du terrain face à l'islamisme, et la vie humaine reste inviolable, de son début à sa fin.",
        "1.2": "La dénatalité est un choc silencieux qui engage l'avenir du pays, et la politique familiale doit récompenser concrètement le choix d'avoir des enfants.",
        "1.3": "La santé ne se sauvera pas par plus d'État : responsabiliser chacun et libérer les soignants de la bureaucratie.",
        "1.4": "L'école existe pour transmettre et pour exiger : l'autorité du maître et l'amour de la France ne se négocient pas.",
        "1.5": "Le peuple tranche les grandes questions par référendum ; le reste relève des institutions, pas de la démocratie d'assemblée.",
        "2.1": "La culture transmet une civilisation ; le pluralisme des médias vaut aussi pour les voix conservatrices.",
        "2.2": "La sanction fait l'autorité : des peines planchers exécutées dès le premier délit grave, une protection due aux honnêtes gens.",
        "2.3": "Le logement social doit bénéficier d'abord à ceux qui travaillent.",
        "2.4": "L'État obèse et bureaucratique est le premier problème du pays et doit être remis au service des forces vives par une rupture de système, pas par des réformettes.",
        "2.5": "La solidarité vraie passe par la famille et l'effort partagé, pas par l'extension indéfinie des droits et des guichets.",
        "3.1": "Le travail doit toujours rapporter nettement plus que l'assistance, ce qui suppose de détaxer l'effort supplémentaire, de rendre aux acteurs la liberté de leur temps de travail et d'assumer les décisions qui garantissent des retraites décentes.",
        "3.2": "La production se libère en supprimant les normes que la France s'inflige seule : ce qui est permis en Europe doit l'être en France.",
        "3.3": "Un pays au bord de la faillite ne s'en sort ni par l'annulation de la dette ni par l'impôt, mais par plus de travail dans l'économie et moins de dépense publique.",
        "3.4": "La surfiscalité est une punition qui asphyxie les entreprises : il faut restituer, garantir les règles dans la durée et cesser de taxer la transmission du fruit d'une vie de travail.",
        "3.5": "La technologie doit d'abord servir l'ordre et la souveraineté : l'État s'en saisit pour protéger, pas pour brider.",
        "4.1": "Le climat se combat par la science et le nucléaire, jamais par l'écototalitarisme qui punit les gens.",
        "4.2": "Le développement durable ne justifie pas la décroissance : la propriété, la croissance et les territoires d'abord.",
        "4.3": "La souveraineté et la compétitivité énergétiques reposent d'abord sur un nucléaire décarboné et bon marché, les renouvelables matures devant vivre sans subventions.",
        "4.4": "Stocker l'eau est une adaptation de bon sens qui évite des catastrophes humaines et agricoles.",
        "4.5": "La nature vivante appartient à ceux qui la connaissent : chasseurs, éleveurs et ruraux en sont les premiers gardiens, traditions comprises.",
        "5.1": "Le commerce exige la réciprocité : pas d'importations qui ne respectent pas les règles imposées à nos producteurs.",
        "5.2": "Être Français doit se mériter : réduction drastique des flux, fin du droit du sol automatique, primauté de notre droit sur les cours étrangères.",
        "5.3": "L'Europe doit rester une Europe des États, où le droit national a le dernier mot.",
        "5.4": "La défense est nationale ou n'est pas : l'effort budgétaire oui, la dilution européenne de la dissuasion jamais.",
        "5.5": "La justice climatique commence par exiger des autres ce qu'on impose aux nôtres, pas par payer pour la planète entière."
      },
      forms: [
        { code: 37, name: "Hameçono",
          stats: { "Attaque": 47, "Défense": 56, "Vision": 41, "Résilience": 50, "Cohérence": 32 } },
        { code: 38, name: "Harpono",
          stats: { "Attaque": 55, "Défense": 72, "Vision": 60, "Résilience": 60, "Cohérence": 53 } },
        { code: 39, name: "Torpilleau",
          stats: { "Attaque": 68, "Défense": 96, "Vision": 65, "Résilience": 84, "Cohérence": 65 } }
      ],
      dims: {
        individu:     "L'individu est un héritier : ce qu'il a reçu l'oblige envers ceux qui suivent.",
        societe:      "La société est un ordre qui se reçoit, s'entretient et se transmet.",
        economie:     "L'économie est la juste récompense de l'effort, que l'État doit garantir plutôt que confisquer.",
        ecologie:     "La nature est un héritage que l'on protège en agissant, par la science plutôt que par la punition.",
        geopolitique: "La France est une civilisation fière à défendre et à transmettre."
      }
    }
  ],

  /* ---------- LES CHAPITRES DE L'AVENTURE ----------
     status : "ok" = disponible, "soon" = à venir */
  chapters: [
    { num: "01", title: "RETOUR EN CLASSE",     desc: "Sachez découvre les Polimons auprès du Professeur Chen et choisit son compagnon.", status: "ok" },
    { num: "02", title: "LE DÎNER DE FAMILLE",  desc: "Chez Mamie Rose, ton compagnon croise Brumedo, l'idée que tonton Gérard nourrissait sans le savoir.", status: "ok" },
    { num: "03", title: "CONSÉCRATION",         desc: "Une évolution se prépare… Le chemin vers l'Élysée se dessine.", status: "soon" }
  ]
};
