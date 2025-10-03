// src/app/models/skills.model.ts

export enum OrbType {
  Bestial = 'Bestial',
  Elemental = 'Elemental',
  Natural = 'Natural',
  Mechanical = 'Mechanical',
}

export interface Skill {
  key: string;          // identifiant unique interne (ex: "ferocity")
  name: string;         // nom affiché
  description: string;  // petit texte pour UI
  orb: OrbType;         // orbe associée
  advanced: boolean;    // false = de base, true = avancée (débloquée si orbe augmente)
}

// 🐺 Orbe Bestial
export const BESTIAL_SKILLS: Skill[] = [
  { key: 'ferocity', name: 'Ferocity', description: 'Bonus to physical attacks.', orb: OrbType.Bestial, advanced: false },
  { key: 'predator_sense', name: 'Predator’s Sense', description: 'Detect enemies and traps more easily.', orb: OrbType.Bestial, advanced: false },
  { key: 'survival', name: 'Survival', description: 'Improved exploration in forests and mountains.', orb: OrbType.Bestial, advanced: false },
  { key: 'berserk', name: 'Berserk', description: 'Chance to deal critical strikes in combat.', orb: OrbType.Bestial, advanced: false },
  { key: 'huntmaster', name: 'Huntmaster', description: 'Bonus against beasts and animals.', orb: OrbType.Bestial, advanced: false },
  { key: 'endurance', name: 'Endurance', description: 'Greater resistance to fatigue and injuries.', orb: OrbType.Bestial, advanced: false },
  { key: 'skinning', name: 'Skinning', description: 'Harvest more resources from animals.', orb: OrbType.Bestial, advanced: false },

  { key: 'beast_form', name: 'Beast Form', description: 'Transform partially into a beast to gain temporary strength and speed.', orb: OrbType.Bestial, advanced: true },
  { key: 'alpha_presence', name: 'Alpha’s Presence', description: 'Intimidate enemies and wild creatures.', orb: OrbType.Bestial, advanced: true },
  { key: 'primal_rage', name: 'Primal Rage', description: 'Unleash a devastating area physical attack.', orb: OrbType.Bestial, advanced: true },
];

// 🔥🌊🌪️ Orbe Élémentaire
export const ELEMENTAL_SKILLS: Skill[] = [
  { key: 'flame_burst', name: 'Flame Burst', description: 'Unleash a burst of fire in combat.', orb: OrbType.Elemental, advanced: false },
  { key: 'water_flow', name: 'Water Flow', description: 'Cross rivers and gain water-related bonuses.', orb: OrbType.Elemental, advanced: false },
  { key: 'stone_skin', name: 'Stone Skin', description: 'Increase defense with hardened skin.', orb: OrbType.Elemental, advanced: false },
  { key: 'spark', name: 'Spark', description: 'Shock enemies with electricity, stunning briefly.', orb: OrbType.Elemental, advanced: false },
  { key: 'frost_touch', name: 'Frost Touch', description: 'Slow down enemies with frost.', orb: OrbType.Elemental, advanced: false },
  { key: 'elemental_affinity', name: 'Elemental Affinity', description: 'Gain bonuses in elemental environments (volcanoes, swamps…).', orb: OrbType.Elemental, advanced: false },
  { key: 'smelting', name: 'Smelting', description: 'Improve smelting of ores into metal alloys.', orb: OrbType.Elemental, advanced: false },

  { key: 'inferno', name: 'Inferno', description: 'Massive fire area attack.', orb: OrbType.Elemental, advanced: true },
  { key: 'thunderstorm', name: 'Thunderstorm', description: 'Call forth a temporary storm.', orb: OrbType.Elemental, advanced: true },
  { key: 'earthquake', name: 'Earthquake', description: 'Shake the earth, affecting terrain and enemies.', orb: OrbType.Elemental, advanced: true },
];

// 🌿 Orbe Naturelle
export const NATURAL_SKILLS: Skill[] = [
  { key: 'healing_touch', name: 'Healing Touch', description: 'Restore health points to yourself or allies.', orb: OrbType.Natural, advanced: false },
  { key: 'venom_strike', name: 'Venom Strike', description: 'Attack imbued with poison.', orb: OrbType.Natural, advanced: false },
  { key: 'animal_bond', name: 'Animal Bond', description: 'Form stronger connections with wild creatures.', orb: OrbType.Natural, advanced: false },
  { key: 'herbalism', name: 'Herbalism', description: 'Gather plants to craft potions and remedies.', orb: OrbType.Natural, advanced: false },
  { key: 'regrowth', name: 'Regrowth', description: 'Regenerate health while out of combat.', orb: OrbType.Natural, advanced: false },
  { key: 'camouflage', name: 'Camouflage', description: 'Hide more effectively in natural environments.', orb: OrbType.Natural, advanced: false },
  { key: 'woodcutting', name: 'Woodcutting', description: 'Harvest wood more efficiently, with chances of rare wood.', orb: OrbType.Natural, advanced: false },

  { key: 'wild_summon', name: 'Wild Summon', description: 'Summon a wild creature to fight alongside you.', orb: OrbType.Natural, advanced: true },
  { key: 'toxic_bloom', name: 'Toxic Bloom', description: 'Spread poisonous spores over an area.', orb: OrbType.Natural, advanced: true },
  { key: 'rebirth', name: 'Rebirth', description: 'Revive once after death (very rare).', orb: OrbType.Natural, advanced: true },
];

// ⚙️ Orbe Mécanique
export const MECHANICAL_SKILLS: Skill[] = [
  { key: 'trap_mastery', name: 'Trap Mastery', description: 'Set traps more effectively.', orb: OrbType.Mechanical, advanced: false },
  { key: 'tinker', name: 'Tinker', description: 'Repair or enhance equipment.', orb: OrbType.Mechanical, advanced: false },
  { key: 'clockwork_reflex', name: 'Clockwork Reflex', description: 'React faster and dodge attacks.', orb: OrbType.Mechanical, advanced: false },
  { key: 'engineer_insight', name: 'Engineer’s Insight', description: 'Spot hidden mechanisms or constructs.', orb: OrbType.Mechanical, advanced: false },
  { key: 'armor_craft', name: 'Armor Craft', description: 'Craft or upgrade lightweight armor.', orb: OrbType.Mechanical, advanced: false },
  { key: 'explosive_charge', name: 'Explosive Charge', description: 'Use basic explosives in combat or exploration.', orb: OrbType.Mechanical, advanced: false },
  { key: 'mining', name: 'Mining', description: 'Extract ores with increased efficiency and chance of rare minerals.', orb: OrbType.Mechanical, advanced: false },

  { key: 'automaton', name: 'Automaton', description: 'Summon a mechanical golem ally.', orb: OrbType.Mechanical, advanced: true },
  { key: 'overclock', name: 'Overclock', description: 'Temporarily boost your stats with machinery.', orb: OrbType.Mechanical, advanced: true },
  { key: 'clockwork_barrage', name: 'Clockwork Barrage', description: 'Perform a flurry of mechanical strikes.', orb: OrbType.Mechanical, advanced: true },
];

// ✅ Regroupement global si besoin
export const ALL_SKILLS: Skill[] = [
  ...BESTIAL_SKILLS,
  ...ELEMENTAL_SKILLS,
  ...NATURAL_SKILLS,
  ...MECHANICAL_SKILLS,
];
