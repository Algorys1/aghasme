---

# Aghasme — TODO Liste BETA

1. Ennemis

Revoir la définition des Orbes pour tous les ennemis.

Ajuster leurs statistiques et capacités pour assurer la cohérence globale.

---

2. Objets & Effets

Séparer les effets de base et les effets magiques :

Ajouter un champ onUse pour les effets de base.

Garder effects uniquement pour les effets permanents/magiques.

Exemples :

Potion de soin → onUse: +10HP, effects: undefined.

Armure de cuir rare → onUse: +1 defense, effects: [+5% resist feu, +5 maxHP].

---

3. Temps & Date

Ajouter le système de jours / mois / années.

Afficher la date dans le HUD.

---

4. Level Up

Implémenter la montée de niveau :

Gain de stats.

Bonus de classe / background.

Logique d'évolution du personnage.


---

5. Création de Partie / Personnage

Revoir les backgrounds.

Afficher un résumé global avant de choisir le nom.

Ajouter un bouton Generate Random Name.

---

6. Pion Joueur

Tester un pion joueur plus gros pour améliorer la lisibilité.

---

7. Régions & Clusters

Définir les régions sur la carte :

Une ville impose une région autour d’elle.

Définir les clans associés si nécessaire.

Détecter les clusters de tuiles :

≥ 3 tuiles identiques → nom de région (ex : Forêt des Oiseaux).

≤ 2 tuiles → description générique.

---

8. HUD Bas

Ajouter les bannières des régions de ville.

Améliorer les descriptions de tuiles en utilisant les clusters.

---

9. Combat

Ajouter les textures du board (tuiles carrées).

Gérer les obstacles.

Gérer les attaques avec lancer de dé + bonus/malus.

Utiliser les stats réelles du joueur.

Gérer le loot en cas de victoire.

Gérer la mort d'un personnage.

---

10. Overlays

Ajouter de nouveaux overlays narratifs (Tour, Spirit, Treasure, Caravan…).

Revoir les overlays existants.

Ajouter une description associée à chaque action.

Permettre plusieurs textes pour l’action Talk.

---

11. Sauvegardes

Voir si une synchronisation des sauvegardes via Google Play est possible.

---

12. Son & Musique

Ajouter une musique de base.

Ajouter quelques effets sonores.

---

13. Quêtes

Définir la quête principale (rassembler les 4 Orbes et fermer les portails).

Ajouter quelques quêtes secondaires.

---

14. Codex

Ajouter :

Les livres trouvés.

Les cartes découvertes.

Les ennemis rencontrés.

Les informations de lore débloquées.