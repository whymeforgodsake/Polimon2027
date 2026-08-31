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
    { code: "3.5.3", label: "Protection des données", sujets: ["Surveillance de masse et fichiers de police", "Données de santé (hébergement souverain)", "Chiffrement (vie privée vs enquêtes)", "Identité numérique", "Transferts de données UE–USA", "Exploitation des données par les plateformes"] },
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
      id: 1, dresseur: "Fabien Roussel", parti: "PCF", elements: ["Acier", "Combat"],
      statut: "Non déclaré", intentions: "<5%",
      bioReelle: "Secrétaire national du PCF, candidat 2022 (2,3 %)",
      faits: "Communisme « du travail et de la fête », gauche populaire",
      bio: "Dresseur de la vieille forge, il élève ses Polimons Acier et Combat à la sueur du travail collectif : chez lui, une idée se trempe comme un métal, dans l'effort partagé et la fête populaire.",
      dimsDetail: {},
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
      id: 2, dresseur: "François Ruffin", parti: "Debout !", elements: ["Feu", "Vol"],
      statut: "Non déclaré", intentions: "<5%",
      bioReelle: "Député de la Somme, réalisateur de « Merci patron ! », ex-LFI",
      faits: "Gauche du travail, ancrage populaire, rupture avec Mélenchon",
      bio: "Dresseur de terrain, il entraîne sa lignée Feu et Vol loin des grandes arènes, au plus près des ateliers et des ronds-points. Ses Polimons s'embrasent pour la dignité du travail et prennent de la hauteur sans oublier d'où ils décollent.",
      dimsDetail: {},
      forms: [
        { code: 2,  name: "Francendre" },
        { code: 14, name: "Ruflame" },
        { code: 26, name: "Rufenix" }
      ],
      dims: {
        individu:     "L'individu est un travailleur dont la dignité exige reconnaissance.",
        societe:      "La société est une fraternité entre personnes interdependantes.",
        economie:     "L'économie est un outil politique soumis à la volonté populaire.",
        ecologie:     "La nature est la limite matérielle imposant sobriété.",
        geopolitique: "La France est une terre de production à protéger."
      }
    },
    {
      id: 3, dresseur: "Jean-Luc Mélenchon", parti: "LFI", elements: ["Feu", "Roche"],
      statut: "Déclaré", intentions: "10-20%",
      bioReelle: "Fondateur de LFI, 3e en 2022 avec ~22 %",
      faits: "Refuse la primaire de gauche ; ligne de rupture",
      bio: "Dresseur volcanique, il fait gronder ses Polimons Feu et Roche jusqu'à l'éruption : pour lui, c'est le peuple assemblé qui fait trembler la terre et redessine le paysage politique.",
      dimsDetail: {
        "1.3": "La prévention doit devenir le cœur de la politique de santé, car les maux évitables coûtent bien plus cher à la société que les normes qui les empêchent.",
        "1.4": "L'enseignement professionnel et technique, qui accueille la moitié de la jeunesse, doit offrir une voie d'excellence continue vers le travail qualifié.",
        "2.3": "Se loger dignement exige de rénover massivement l'habitat existant plutôt que de seulement construire du neuf.",
        "2.4": "L'État planificateur doit revenir au centre du jeu, la dépense publique étant une richesse redistribuée et non de l'argent gaspillé.",
        "3.1": "Le partage de la richesse par les salaires et un droit universel à une retraite précoce conditionnent à la fois la dignité des travailleurs et la demande qui fait tourner l'économie.",
        "3.2": "La réindustrialisation exige que la nation fixe elle-même ses objectifs productifs et protège son appareil industriel des logiques purement financières.",
        "3.3": "La monnaie et le crédit sont des outils publics à remettre au service de l'économie réelle, plutôt que de laisser la finance surveiller et étrangler l'activité.",
        "3.4": "La justice fiscale exige que tout le monde paie réellement et que chaque soutien public aux entreprises ait une contrepartie, les cadeaux fiscaux sans condition étant la vraie source du déficit.",
        "3.5": "La puissance technologique se conquiert par de grands objectifs nationaux assumés, non par le marché seul.",
        "4.1": "Le changement climatique est le choc majeur des années qui viennent et seule une planification écologique s'imposant à tous permet de s'y préparer.",
        "4.2": "L'économie circulaire doit devenir l'organisation normale de la production et de l'usage des ressources.",
        "4.3": "La politique énergétique doit partir du réel technique et climatique plutôt que de paris industriels hasardeux sur le nucléaire.",
        "4.4": "L'eau est une ressource sous contrainte climatique qui doit être gérée selon le réel, non accaparée.",
        "5.1": "Le libre-échange généralisé est une impasse : le commerce doit se négocier en échanges équilibrés, y compris avec la Chine, sans en faire un ennemi.",
        "5.3": "La souveraineté populaire prime sur les traités européens, qu'il faut renégocier et auxquels il faut savoir désobéir quand ils contredisent les intérêts des Français."
      },
      forms: [
        { code: 3,  name: "Melava" },
        { code: 15, name: "Magmelench" },
        { code: 27, name: "Volcanchon" }
      ],
      dims: {
        individu:     "L'individu est un etre libre seulement si l'essentiel lui est garanti : santé, école, logement, énergie.",
        societe:      "La société est un peuple varié, uni face à une minorité qui possède presque tout.",
        economie:     "L'économie doit être dirigée par l'intérêt général du peuple, pas par l'intérêt privé de la finance.",
        ecologie:     "La nature fixe les limites : on ne doit jamais lui prendre plus qu'elle ne peut refabriquer.",
        geopolitique: "La France doit rester indépendante et ne s'aligner sur aucune grande puissance."
      }
    },
    {
      id: 4, dresseur: "Olivier Faure", parti: "PS", elements: ["Sol", "Combat"],
      statut: "Non déclaré", intentions: "?",
      bioReelle: "Premier secrétaire du PS, député",
      faits: "Arbitre de la primaire socialiste, ligne d'union",
      bio: "Dresseur patient des terres de compromis, il fait pousser ses Polimons Sol et Combat sur un terrain d'entente : solidarité collective d'un côté, émancipation de chacun de l'autre.",
      dimsDetail: {},
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
      id: 5, dresseur: "Marine Tondelier", parti: "Les Écologistes", elements: ["Plante", "Fée"],
      statut: "Non déclaré", intentions: "<5%",
      bioReelle: "Secrétaire nationale des Écologistes",
      faits: "A porté la refondation d'EELV ; ligne unitaire à gauche",
      bio: "Dresseuse-jardinière, elle cultive ses Polimons Plante et Fée dans le respect du vivant : chaque idée est une pousse qui ne grandit bien que si tout l'écosystème autour d'elle prospère.",
      dimsDetail: {
        "1.3": "Un système de santé qui s'effondre ne se redresse pas par des économies aveugles, qui rendent les gens plus malades au lieu de prévenir.",
        "2.4": "La simplification administrative est légitime tant qu'elle ne sert pas d'alibi à la dérégulation environnementale, et le pays doit se gouverner avec ses corps intermédiaires plutôt que depuis l'Élysée seul.",
        "3.1": "Le travail doit protéger de la pauvreté comme de la mort au travail, faute de quoi la fracture sociale finira par rompre le pacte républicain.",
        "3.2": "L'industrie est un enjeu de souveraineté qu'il faut défendre et transformer écologiquement, en orientant l'argent public selon des critères écologiques et vers les petites entreprises.",
        "3.4": "La justice fiscale exige que les grandes entreprises et les héritiers contribuent au moins autant que les PME et les travailleurs, les baisses d'impôts non financées creusant le déficit.",
        "4.1": "L'écologie est la condition de la liberté : nier les limites planétaires rend vulnérable, et l'inaction climatique coûte bien plus cher que l'action.",
        "4.3": "C'est l'énergie chère, et non le coût du travail, qui mine la compétitivité, et les renouvelables sont une arme économique que nos concurrents déploient déjà massivement.",
        "5.1": "L'Europe doit assumer un protectionnisme écologique, par sa commande publique et ses frontières carbone, pour se battre à armes égales avec la Chine et les États-Unis.",
        "5.2": "L'économie française a durablement besoin des travailleurs étrangers, et l'immigration ne doit pas servir de bouc émissaire budgétaire.",
        "5.4": "La défense ne se limite pas aux armes : la guerre est aussi économique, industrielle et énergétique, et chaque dépendance est une vulnérabilité exploitée par les impérialismes."
      },
      forms: [
        { code: 5,  name: "Ecomar" },
        { code: 17, name: "Tondeliere" },
        { code: 29, name: "Tondeliane" }
      ],
      dims: {
        individu:     "L'individu est un noeud interdépendant du monde vivant.",
        societe:      "La société est une organisation horizontale rapprochant décision et impact territorial.",
        economie:     "L'économie doit cesser d'épuiser la planète : vivre mieux ne veut pas dire produire plus.",
        ecologie:     "La nature est la matrice supreme qui conditionne toute existence et guide toute decision.",
        geopolitique: "La France une unité coopérative dans une gouvernance écologique mondiale."
      }
    },
    {
      id: 6, dresseur: "Raphaël Glucksmann", parti: "Place Publique", elements: ["Électrik", "Sol"],
      statut: "Non déclaré", intentions: "5-15%",
      bioReelle: "Eurodéputé, tête de liste PS-PP aux européennes 2024 (~14 %)",
      faits: "Social-démocrate pro-européen, ligne anti-autoritaire",
      bio: "Dresseur sentinelle, il charge ses Polimons Électrik et Sol pour défendre les arènes démocratiques : vigilance permanente, règles communes et alliances par-delà les frontières.",
      dimsDetail: {
        "3.1": "Le travail doit redevenir le cœur du pacte social (mieux payé, mieux protégé, mieux représenté dans l'entreprise) avec des retraites fondées sur la pénibilité plutôt que sur un âge unique.",
        "3.2": "La dette est le prix de la désindustrialisation : il faut reproduire en France en choisissant des filières stratégiques, la révolution écologique étant la révolution industrielle du siècle.",
        "3.3": "Le redressement ne peut se financer ni par la dette ni par la casse du modèle social, car casser le modèle social, c'est casser la démocratie.",
        "3.4": "Une société qui taxe plus le travail que l'héritage devient une héritocratie : la fiscalité doit remettre le mérite au-dessus de la rente, dans un cadre stable.",
        "3.5": "L'Europe doit investir dans une filière IA souveraine pour rester technologiquement autonome, notamment des USA et de la Chine.",
        "4.1": "Investir massivement et immédiatement dans la transition écologique est la seule vraie économie, l'impréparation coûtant toujours plus cher que l'action.",
        "5.1": "Le temps du libre-échange naïf est terminé : l'Europe doit protéger ses producteurs par la préférence européenne, la réciprocité des normes et le refus des produits du dumping social.",
        "5.3": "La France doit user de son poids stratégique pour imposer à Bruxelles la réorientation industrielle et commerciale de l'Europe, dont la sortie serait en revanche un suicide économique."
      },
      forms: [
        { code: 6,  name: "Rafelec" },
        { code: 18, name: "Raforage" },
        { code: 30, name: "Rafoudre" }
      ],
      dims: {
        individu:     "L'individu est un porteur de droits universels transcendant toute frontière.",
        societe:      "La société doit récompenser ceux qui travaillent, pas ceux qui héritent.",
        economie:     "L'économie est un marché nécessitant la taxation des grandes fortunes pour alléger ceux qui travaillent.",
        ecologie:     "La nature est un bien commun mondial exigeant gouvernance contraignante internationale.",
        geopolitique: "La France est un acteur moral qui doit peser dans une Europe unie, face aux États-Unis, à la Chine et à la Russie."
      }
    },
    {
      id: 7, dresseur: "Gabriel Attal", parti: "Renaissance / bloc central", elements: ["Électrik", "Psy"],
      statut: "Déclaré", intentions: "10-20%",
      bioReelle: "Plus jeune Premier ministre de la Ve République (2024), patron de Renaissance",
      faits: "Incarne la relève macroniste ; méritocratie et innovation",
      bio: "Dresseur véloce, il entraîne ses Polimons Électrik et Psy à la vitesse de l'éclair : mérite, innovation et esprit de compétition sont ses techniques favorites.",
      dimsDetail: {
        "2.3": "Le logement est un secteur productif et le socle de la promesse d'ascension sociale : il faut libérer la construction et rouvrir l'accès à la propriété aux jeunes générations.",
        "2.4": "L'administration doit servir le mandat démocratique et la rapidité de décision, avec des règles simples et des délais garantis plutôt qu'une culture de l'empêchement.",
        "3.1": "Le travail doit payer davantage pour la classe moyenne qui bosse, et les grands équilibres sociaux se réforment en changeant de système plutôt qu'en ajustant sans fin les paramètres.",
        "3.2": "La simplification ne se décrète pas par des lois successives mais par un changement de méthode qui fait confiance au terrain et lève les blocages concrets.",
        "3.3": "Le retour à l'équilibre budgétaire exige d'assumer des économies d'abord sur la dépense sociale et de faire mieux avec moins grâce à l'innovation.",
        "3.4": "Une fiscalité plus basse, stable et prévisible rapporte davantage qu'une fiscalité punitive, car elle libère l'activité.",
        "3.5": "L'innovation et l'IA sont la bataille décisive du siècle et la seule source durable de productivité et de hausse des salaires.",
        "4.1": "L'écologie doit rester un moyen pragmatique de transition et non une fin en soi qui bascule dans la décroissance.",
        "4.4": "L'adaptation au climat relève du bon sens pratique, comme stocker l'eau quand elle abonde pour affronter les sécheresses.",
        "5.1": "La Chine mène une offensive délibérée pour couler notre industrie et appelle des réponses commerciales fermes plutôt que des débats."
      },
      forms: [
        { code: 7,  name: "Voltatal" },
        { code: 19, name: "Gabynamo" },
        { code: 31, name: "Gabitek" }
      ],
      dims: {
        individu:     "L'individu est un agent libre par son travail et responsable de son destin.",
        societe:      "La société est une arène méritocratique où le talent et l'effort déterminent le succès.",
        economie:     "L'économie doit grandir : quand le gâteau grossit, personne n'a besoin de la part du voisin.",
        ecologie:     "La nature est un ensemble de défis techniques, que l'innovation peut regler.",
        geopolitique: "La France est une grande puissance par sa technologie et par ses frontières."
      }
    },
    {
      id: 8, dresseur: "Édouard Philippe", parti: "Horizons", elements: ["Eau", "Vol"],
      statut: "Déclaré", intentions: "10-20%",
      bioReelle: "Premier ministre 2017-2020, maire du Havre, fondateur d'Horizons",
      faits: "Premier grand candidat déclaré ; droite modérée pragmatique",
      bio: "Dresseur du grand large, il navigue avec ses Polimons Eau et Vol dans la brume du Havre : cap pragmatique, autorité tranquille et manœuvres calculées.",
      dimsDetail: {
        "1.4": "La formation, l'éducation et l'apprentissage sont le socle de la compétitivité d'une nation et exigent la constance des politiques publiques.",
        "2.3": "Un pays prospère investit massivement dans ses infrastructures pour s'adapter à son époque, notamment climatique.",
        "2.4": "Une règle stable, même imparfaite, vaut mieux qu'une norme mouvante, et simplifier exige le courage de résister aux demandes qui en produisent sans cesse de nouvelles.",
        "3.1": "Préserver le modèle social et le pouvoir d'achat des classes moyennes, condition de survie de la démocratie, impose de travailler collectivement plus longtemps et d'élargir le financement de la protection sociale au-delà du seul travail.",
        "3.2": "La prospérité naît d'une politique de l'offre constante qui laisse les entreprises créer la richesse et soigne la compétitivité face à des concurrents d'abord européens.",
        "3.3": "Une nation tient parole sur sa dette et remet ses comptes en ordre par le travail plutôt que par l'impôt, sous peine de choc financier brutal ou d'étranglement lent.",
        "3.4": "La fiscalité ne doit frapper les entreprises que sur ce qu'elles ont réellement gagné, et toute baisse d'impôt doit être honnêtement financée.",
        "5.1": "Le commerce avec les grandes puissances doit reposer sur la réciprocité stricte : ce qui se vend chez nous doit se produire chez nous, comme elles nous l'ont imposé.",
        "5.3": "L'Europe doit assumer d'être une puissance qui achève son marché intérieur et parle d'égal à égal avec la Chine et les États-Unis."
      },
      forms: [
        { code: 8,  name: "Brumedo" },
        { code: 20, name: "Edether" },
        { code: 32, name: "Zefilipe" }
      ],
      dims: {
        individu:     "L'individu est un etre faconne par l'effort, le mérite et la liberté, à qui on doit dire la vérité même quand elle dérange.",
        societe:      "La société est un ordre hiérarchisé maintenu par l'autorité légitime de l'État.",
        economie:     "L'économie est une machine a créer de la richesse, qui ne se partage bien que quand on a produit suffisamment.",
        ecologie:     "La nature est un système adaptable par l'investissement et la technique, pas par les interdictions.",
        geopolitique: "La France est un acteur stratégique combinant indépendance et partenariats sélectifs."
      }
    },
    {
      id: 9, dresseur: "Laurent Wauquiez", parti: "LR", elements: ["Eau", "Combat"],
      statut: "Non déclaré", intentions: "?",
      bioReelle: "Président du groupe Droite Républicaine à l'Assemblée, ex-président d'AuRA",
      faits: "Battu pour la désignation LR ; garde ses ambitions",
      bio: "Dresseur des hauts plateaux, il endurcit ses Polimons Eau et Combat à la rude école de la montagne : travail, ordre et défense des intérêts vitaux du territoire.",
      dimsDetail: {},
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
      statut: "Déclaré", intentions: "30-40%",
      bioReelle: "Finaliste 2017 et 2022, cheffe des députés RN",
      faits: "Condamnation avec inéligibilité en appel ; Bardella en plan B",
      bio: "Dresseuse des terres gelées, elle protège ses Polimons Glace et Acier derrière des frontières cristallines : pour elle, la communauté nationale passe avant tout le reste.",
      dimsDetail: {
        "2.4": "L'État doit cesser d'être un fardeau bureaucratique et normatif pour redevenir le garant d'un cadre stable où la nation et ses entreprises prospèrent.",
        "3.1": "La retraite et l'emploi doivent se penser à partir du travail réellement fourni, partir tôt quand on a commencé tôt, et de la remontée du taux d'emploi, plutôt qu'à partir de la seule comptabilité.",
        "3.2": "La réindustrialisation est une priorité nationale absolue qui justifie de lever les freins normatifs et fonciers et d'orienter la commande publique vers ce qui est produit en France.",
        "3.3": "La dette doit être remboursée par des économies sur le train de vie de l'État, car elle menace directement la souveraineté du pays.",
        "3.4": "La fiscalité doit cesser de taxer la production, garantir la constance des règles et réserver ses avantages à ceux qui produisent durablement en France.",
        "4.3": "Une énergie abondante et bon marché, héritage du nucléaire national, est un bien de première nécessité que l'État doit rendre aux ménages comme aux entreprises.",
        "5.2": "L'immigration pèse lourdement sur les comptes sociaux et sa réduction est un levier du redressement budgétaire.",
        "5.3": "L'Union européenne doit coûter moins et normer moins, la France n'ayant ni à surpayer sa contribution ni à surtransposer les règles communes."
      },
      forms: [
        { code: 10, name: "Marinej" },
        { code: 22, name: "Lepolaire" },
        { code: 34, name: "Blizaren" }
      ],
      dims: {
        individu:     "L'individu se construit grâce à ses racines : sa famille, son pays, son histoire.",
        societe:      "La société est une communauté nationale qui protège d'abord les siens.",
        economie:     "L'économie doit servir les Français et être protégée de la concurrence mondiale.",
        ecologie:     "La nature se protège en produisant près de chez soi, pas en punissant les gens.",
        geopolitique: "La France doit décider seule de son destin, sans Bruxelles ni Washington."
      }
    },
    {
      id: 11, dresseur: "Jordan Bardella", parti: "RN", elements: ["Glace", "Acier"],
      statut: "Non déclaré", intentions: "30-40%",
      bioReelle: "Président du RN, tête de liste européennes 2024 (31 %)",
      faits: "Candidat de substitution si l'inéligibilité de Le Pen est confirmée",
      bio: "Jeune dresseur de la lignée polaire, il modernise les techniques de la banquise : ses Polimons Glace et Acier avancent en formation serrée, portés par les réseaux et la relève.",
      dimsDetail: {},
      forms: [
        { code: 11, name: "Cryodane" },
        { code: 23, name: "Vergladela" },
        { code: 35, name: "Blizardela" }
      ],
      dims: {
        individu:     "L'individu est un etre appartenant à une communauté nationale.",
        societe:      "La société est un organisme historique et culturel transmis par les générations.",
        economie:     "L'économie est organisée pour protéger et privilégier la communauté nationale.",
        ecologie:     "La nature est défendue par l'enracinement territorial et la souveraineté locale.",
        geopolitique: "La France est une civilisation délimitée ayant droit à l'autodétermination totale."
      }
    },
    {
      id: 12, dresseur: "Éric Zemmour", parti: "Reconquête", elements: ["Glace", "Psy"],
      statut: "Non déclaré", intentions: "<5%",
      bioReelle: "Candidat 2022 (7 %), essayiste",
      faits: "Thème du « grand remplacement », concurrence du RN",
      bio: "Dresseur hypnotiseur, il fait miroiter à ses Polimons Glace et Psy le souvenir d'une civilisation idéalisée : illusions, mirages et batailles de mémoire sont son terrain de prédilection.",
      dimsDetail: {},
      forms: [
        { code: 12, name: "Hypnerik" },
        { code: 24, name: "Zemirage" },
        { code: 36, name: "Zemystere" }
      ],
      dims: {
        individu:     "L'individu est un héritier d'une civilisation déterminant son essence.",
        societe:      "La société est un corps civilisationnel menacé d'effacement par substitution démographique.",
        economie:     "L'économie est un instrument de puissance nationale protégeant les intérêts français.",
        ecologie:     "La nature est un patrimoine culturel et des paysages à préserver.",
        geopolitique: "La France est une civilisation en guerre défensive contre déclin et remplacement."
      }
    }
    ,{
      id: 13, dresseur: "Bruno Retailleau", parti: "LR", elements: ["Eau", "Acier"],
      statut: "Déclaré", intentions: "5-15%",
      bioReelle: "Ministre de l'Intérieur, ancien chef des sénateurs LR, vendéen",
      faits: "Ligne droite dure : sécurité, immigration, autorité",
      bio: "Dresseur vendéen à la ligne claire, il forge ses Polimons Eau et Acier dans la discipline : chez lui, l'ordre est la première des libertés et l'autorité le premier des remparts.",
      dimsDetail: {
        "1.2": "La dénatalité est un choc silencieux qui engage l'avenir du pays, et la politique familiale doit récompenser concrètement le choix d'avoir des enfants.",
        "2.3": "Le logement social doit bénéficier d'abord à ceux qui travaillent.",
        "2.4": "L'État obèse et bureaucratique est le premier problème du pays et doit être remis au service des forces vives par une rupture de système, pas par des réformettes.",
        "3.1": "Le travail doit toujours rapporter nettement plus que l'assistance, ce qui suppose de détaxer l'effort supplémentaire, de rendre aux acteurs la liberté de leur temps de travail et d'assumer les décisions qui garantissent des retraites décentes.",
        "3.3": "Un pays au bord de la faillite ne s'en sort ni par l'annulation de la dette ni par l'impôt, mais par plus de travail dans l'économie et moins de dépense publique.",
        "3.4": "La surfiscalité est une punition qui asphyxie les entreprises : il faut restituer, garantir les règles dans la durée et cesser de taxer la transmission du fruit d'une vie de travail.",
        "4.3": "La souveraineté et la compétitivité énergétiques reposent d'abord sur un nucléaire décarboné et bon marché, les renouvelables matures devant vivre sans subventions.",
        "4.4": "Stocker l'eau est une adaptation de bon sens qui évite des catastrophes humaines et agricoles."
      },
      forms: [
        { code: 37, name: "Hameçono" },
        { code: 38, name: "Harpono" },
        { code: 39, name: "Torpilleau" }
      ],
      dims: {
        individu:     "L'individu est l'héritier d'une histoire et d'une culture : il a des devoirs avant d'avoir des droits.",
        societe:      "La société tient par l'autorité, la famille et ce qu'on transmet aux générations suivantes.",
        economie:     "L'économie doit récompenser ceux qui travaillent plus que ceux qui vivent des aides.",
        ecologie:     "La nature est un héritage à transmettre, qu'on protège par la technique et le bon sens.",
        geopolitique: "La France est une civilisation : pour en faire partie, il faut en adopter les règles."
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
