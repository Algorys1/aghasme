export const PREFIX_TABLE: Record<string, Record<string, string[]>> = {
  "plain": {
    "small": ["Prés", "Clairière", "Prairie"],
    "medium": ["Plaines", "Étendues", "Hautes-Prés"],
    "large": ["Grandes Plaines", "Hautes-Étendues", "Savane"],
    "huge": ["Mer d'Herbe", "Étendues sans Fin", "Horizon Vert"]
  },

  "forest": {
    "small": ["Bosquet", "Fourré", "Arbretier"],
    "medium": ["Bois", "Sylve", "Lisière"],
    "large": ["Forêt", "Grande Sylve", "Haut-Bois"],
    "huge": ["Grande Forêt", "Sombrebois", "Sylve-Mère"]
  },

  "desert": {
    "small": ["Dune", "Rochers Sablés", "Creux"],
    "medium": ["Dunes", "Étendues Sèches", "Lisière du Désert"],
    "large": ["Désert", "Grands Sables", "Hautes Dunes"],
    "huge": ["Mer Sable", "Désert Rouge", "Étendues Arides"]
  },

  "mountain": {
    "small": ["Roc", "Pic", "Rocher"],
    "medium": ["Monts", "Crêtes", "Éperons"],
    "large": ["Massif", "Cordillère", "Hautes-Chaînes"],
    "huge": ["Chaîne", "Grande Chaîne", "Échine"]
  },

  "volcano": {
    "small": ["Cratère", "Pierres Rougies", "Faille"],
    "medium": ["Terres Calcinées", "Laves", "Rifts"],
    "large": ["Terres Brûlantes", "Massif Enflammé", "Roches Ardentes"],
    "huge": ["La Fournaise", "Le Grand Brasier", "Les Écumes Feu"]
  },

  "sea": {
    "small": ["Étang", "Bassin", "Trou Bleu"],
    "medium": ["Lac", "Eaux", "Baie"],
    "large": ["Grand Lac", "Bras d'Eau", "Mer Intérieure"],
    "huge": ["Grandes Eaux", "La Mer Calme", "L'Océan Intérieur"]
  },

  "jungle": {
    "small": ["Fourré Tropical", "Bosquet Verdoyant", "Lierre"],
    "medium": ["Jungle", "Bois Tropicaux", "Épaisse Forêt"],
    "large": ["Grande Jungle", "Sylve Tropicale", "Jungles Ombreuses"],
    "huge": ["Jungle Primaire", "Mer Verdure", "Forêt Ancestrale"]
  },

  "swamp": {
    "small": ["Fange", "Trou d'Eau", "Gouilles"],
    "medium": ["Tourbière", "Marécage", "Basses-Terres"],
    "large": ["Grand Marais", "Grands Replats", "Fanges"],
    "huge": ["Marais Sans Fin", "Fanges Maudites", "Mer Boue"]
  }
}
