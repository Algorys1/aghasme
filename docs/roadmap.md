# Aghasme — TODO Liste BETA

## Ennemis

Revoir la définition des Orbes pour tous les ennemis. Trouver un moyen simple de définir les orbes, peut-être juste faire un système de bonus qui s'ajoutera à une définition de base (base: 8 ou 10 ?).

Ajuster leurs statistiques et capacités pour assurer la cohérence globale. A voir peut-être une fois qu'une liste de compétences sera définies ?

---

## Objets & Effets

Séparer les effets de base et les effets magiques :

Ajouter un champ onUse pour les effets de base.

Garder effects uniquement pour les effets permanents/magiques.

Exemples :

Potion de soin → onUse: +10HP, effects: undefined.

Armure de cuir rare → onUse: +1 defense, effects: [+5% resist feu, +5 maxHP].

---

## Temps & Date

Ajouter le système de jours / mois / années.

Afficher la date dans le HUD.

---

## Level Up

Implémenter la montée de niveau :

* Gain de stats.

* Bonus de classe / background.

* Logique d'évolution du personnage.

---

## Création de Partie / Personnage

Définir les secondaryStats complètes dans le modèle de Character. Fichier actuel :

```ts
  baseStats?: {
    attack: number;
    defense: number;
    maxHp: number;
    maxMp: number;
  };

  secondaryStats?: {
    mv: number
  }
```

Revoir les backgrounds, ne plus donner de bonus pour les orbes via les backgrounds mais plus sur les secondaryStats.

Afficher un résumé global avant de choisir le nom.

Ajouter un bouton Generate Random Name.

---

## Pion Joueur

Tester un pion joueur plus gros pour améliorer la lisibilité.

---

## Régions & Clusters

Définir les régions sur la carte :

Une ville impose une région autour d’elle.

Définir les clans associés si nécessaire.

Détecter les clusters de tuiles :

≥ 3 tuiles identiques → nom de région (ex : Forêt des Oiseaux).

≤ 2 tuiles → description générique.

---

## HUD Bas

Ajouter les bannières des régions de ville.

Améliorer les descriptions de tuiles en utilisant les clusters.

---

## Combat

Ajouter les textures du board (tuiles carrées).

Gérer les obstacles.

Gérer les attaques avec lancer de dé + bonus/malus.

Utiliser les stats réelles du joueur.

Gérer le loot en cas de victoire.

Gérer la mort d'un personnage.

---

## Overlays

Ajouter de nouveaux overlays narratifs (Tour, Spirit, Treasure, Caravan…).

Revoir les overlays existants.

Ajouter une description associée à chaque action.

Permettre plusieurs choix de textes pour l’action Talk. Peut-être voir pour un arbre de choix ? Associés à des jets d'Orbes ?

---

## Sauvegardes

Voir si une synchronisation des sauvegardes via Google Play est possible.

Charger 2 parties différentes et voir si les data sont bien séparées.

---

## Son & Musique

Ajouter une musique de base.

Ajouter quelques effets sonores, surtout en combat. On peut partir sur des effets génériques pour certaines choses comme l'utilisation d'objets, les attaques, etc.

---

## Quêtes

### Visuel

* Ce sera des overlays tout simplement
* Un pion quête (déjà fait) sera mis sur les tuiles correspondantes.
* Il faudra un journal de quête à rajouter dans le camp.

### La Quête des Quatres Orbes

Définir la quête principale (rassembler les 4 Orbes et fermer les portails).

Quelques idées en vrac :

* Le joueur devra jouer 4 set d'overlays de quêtes, pour chaque clans.
* Le début de la Quête sera une simple légende à propos des 4 portails réouverts. Le plus dangereux sera le Mécanique, le moins dangereux le Sylvaris.
* Il faudra trouver 4 artefacts, 1 par clan.
* Il faudra amener chacun des artefatcs au portail correspondant.
* Il faudra jouer l'overlays des Portails pour finir la quête du clan.

### Quêtes secondaires

Ajouter quelques quêtes secondaires. J'aimerais sortir des sentiers battus et ne pas proposer la fameuse attaque de rats dans une cave (bien que ce serait un joli brin d'humour) ou la dangereuse meute de loup qui embête le village.

A voir si on étends le système d'overlays pour donner la possibilité de le jouer une quête sur plusieurs endroits.

Exemple :

* Début de la quête dans Villerive, avec du blabla, on accepte ou on refuse la quête
* Puis si acceptée, deuxième étape sur une tuile "mountain" précise pour récupérer un objet en résolvant une énigme par exemple
* Puis retour à Villerive pour ramener l'objet ou bien aller détruire l'objet sur une tuile volcano.

---

## Codex

Ajouter :

* Les livres trouvés.
* Les cartes découvertes.
* Les ennemis rencontrés.
* Les informations de lore débloquées.
