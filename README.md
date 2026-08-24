# Polimon 2027 — Éduquez-vous tous !

Site éducatif du collectif DemZet sur la campagne présidentielle française de 2027, librement inspiré de l'univers Pokémon.

## Comment le site est organisé

```
polimon2027/
├── index.html          ← la structure des pages (l'histoire du chapitre 1 s'édite ici)
├── css/style.css       ← l'apparence (couleurs, polices, mise en page)
├── js/app.js           ← la logique (ne pas modifier en temps normal)
├── data/polimons.js    ← ★ LE CONTENU : c'est ici que tu modifies tout ★
├── images/
│   ├── polimons/       ← les images officielles des Polimons (2.png, 14.png, 26.png…)
│   ├── story/          ← les illustrations du chapitre 1
│   └── logo.png
└── fonts/              ← la police pixel « Press Start 2P »
```

Le principe : **le contenu est séparé du code**. Les fiches des 36 Polimons, les éléments, les dimensions, les chapitres… tout vit dans `data/polimons.js`. Le site lit ce fichier et se construit tout seul.

## Modifier le contenu

Ouvre `data/polimons.js` dans n'importe quel éditeur de texte (VS Code recommandé, gratuit). Le fichier est commenté en français : change un texte entre guillemets, enregistre, recharge la page — c'est tout.

**Exemples courants :**

- *Changer la description d'une lignée* : modifie le texte dans le bloc `dims` de la lignée.
- *Renommer un Polimon* : change le champ `name` de la forme concernée.
- *Marquer le chapitre 2 comme disponible* : dans `chapters`, passe son `status` de `"soon"` à `"ok"`.
- *Activer les statistiques de combat* : ajoute un bloc `stats` à une lignée, par exemple `stats: { "Attaque": 70, "Défense": 55 }`. Les barres s'affichent automatiquement.

## Ajouter les images des Polimons

Aucun code à modifier : dépose simplement l'image dans `images/polimons/` en la nommant par le **numéro du Polimon** :

- Ferousel = n°1 → `images/polimons/1.png`
- Ruflame = n°14 → `images/polimons/14.png`
- etc. (le numéro de chaque Polimon est dans `data/polimons.js` et affiché dans le Polidex, ex. #014)

Tant qu'une image manque, le site affiche un sprite pixel-art généré automatiquement — rien ne casse jamais.

Conseil : des PNG carrés (par ex. 512×512) à fond blanc ou transparent, si possible moins de 300 Ko chacun pour que le site reste rapide.

## Tester le site sur ton ordinateur

Double-clique sur `index.html` : il s'ouvre dans ton navigateur et fonctionne entièrement, sans serveur ni installation.

## Publier sur internet (GitHub Pages)

1. Crée un compte gratuit sur [github.com](https://github.com).
2. Clique sur **New repository** (bouton vert). Nomme-le `polimon2027`, laisse-le en **Public**, puis **Create repository**.
3. Sur la page du dépôt, clique sur **uploading an existing file**, glisse-dépose TOUT le contenu du dossier `polimon2027` (index.html, les dossiers css, js, data, images, fonts), puis **Commit changes**.
4. Va dans **Settings → Pages** (menu de gauche). Sous *Build and deployment* → *Source*, choisis **Deploy from a branch** ; sous *Branch*, choisis **main** et **/ (root)**, puis **Save**.
5. Attends 1 à 2 minutes, recharge la page : ton site est en ligne à l'adresse `https://TONPSEUDO.github.io/polimon2027/`.

### Mettre à jour le site en ligne

Deux façons :

- **Directement sur github.com** : ouvre `data/polimons.js` dans ton dépôt, clique sur le crayon ✏️, modifie, **Commit changes**. Le site se met à jour en ~1 minute. Pour ajouter une image : dossier `images/polimons` → **Add file → Upload files**.
- **Depuis ton ordinateur** (plus confortable à terme) : installe [GitHub Desktop](https://desktop.github.com), clone ton dépôt, modifie les fichiers localement, puis *Commit* + *Push*.

Chaque modification est historisée : tu peux toujours revenir en arrière depuis l'onglet *History* du dépôt.

## Crédits

Un projet éducatif du collectif **DemZet**. Aventure fantastique librement inspirée de l'univers Pokémon, sans affiliation.
