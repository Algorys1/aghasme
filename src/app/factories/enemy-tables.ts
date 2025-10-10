import { Terrain } from './tile.factory';
import { EnemyTemplate } from './enemy.factory';

export const EnemyTables: Record<Terrain, EnemyTemplate[]> = {
  plain: [
    { name: 'Wolf', desc: 'A lone wolf growls nearby.', icon: 'assets/monsters/wolf.png', category: 'beast', terrains: ['plain'], minLevel: 1, maxLevel: 5 },
    { name: 'Wild Boar', desc: 'A furious wild boar charges at you!', icon: 'assets/monsters/wild-boar.png', category: 'beast', terrains: ['plain'], minLevel: 1, maxLevel: 5 },
    { name: 'Bandit', desc: 'These roads aren\'t safe, you knew that. You\'re face to face with a highwayman.', icon: 'assets/monsters/bandit.png', category: 'monster', terrains: ['plain'], minLevel: 2, maxLevel: 6 },
    { name: 'Goblin Warrior', desc: 'A sneaky goblin jumps right in front of you and challenges you', icon: 'assets/monsters/goblin-warrior.png', category: 'monster', terrains: ['plain'], minLevel: 2, maxLevel: 5 },
  ],

  forest: [
    { name: 'Wolf', desc: 'A lone wolf growls nearby.', icon: 'assets/monsters/wolf.png', category: 'beast', terrains: ['forest'], minLevel: 1, maxLevel: 5 },
    { name: 'Bear', desc: 'A large bear blocks your way.', icon: 'assets/monsters/bear.png', category: 'beast', terrains: ['forest'], minLevel: 3, maxLevel: 8 },
    { name: 'Spider', desc: 'A monstrous spider is heading towards you at high speed.', icon: 'assets/monsters/spider.png', category: 'beast', terrains: ['forest'], minLevel: 2, maxLevel: 6 },
    { name: 'Goblin Archer', desc: 'Perched on a rock, a goblin stares at you, ready to fire his arrow.', icon: 'assets/monsters/goblin-archer.png', category: 'monster', terrains: ['forest'], minLevel: 2, maxLevel: 5 },
    { name: 'Goblin Shaman', desc: 'A goblin shaman is looking at you maliciously, probably preparing to cast a dark spell...', icon: 'assets/monsters/goblin-shaman.png', category: 'monster', terrains: ['forest'], minLevel: 3, maxLevel: 6 },
    { name: 'Zombie', desc: 'The undead rise, a dark age is fast approaching! If you kill him, that will always be one less!', icon: 'assets/monsters/zombie.png', category: 'monster', terrains: ['forest'], minLevel: 3, maxLevel: 7 },
  ],

  desert: [
    { name: 'Snake', desc: 'A huge snake stands before you, its mouth open, ready to bite.', icon: 'assets/monsters/snake.png', category: 'beast', terrains: ['desert'], minLevel: 1, maxLevel: 5 },
    { name: 'Mechaninic Orb', desc: 'What you thought was a pile of inert scrap metal suddenly finds itself flying around you. That glowing eye doesn\'t bode well for you...', icon: 'assets/monsters/orb-mechanic.png', category: 'monster', terrains: ['desert'], minLevel: 6, maxLevel: 10 },
    { name: 'Bandit', desc: 'These roads aren\'t safe, you knew that. You\'re face to face with a highwayman.', icon: 'assets/monsters/bandit.png', category: 'monster', terrains: ['desert'], minLevel: 2, maxLevel: 6 },
  ],

  mountain: [
    { name: 'Bear', desc: 'A large bear blocks your way.', icon: 'assets/monsters/bear.png', category: 'beast', terrains: ['mountain'], minLevel: 3, maxLevel: 8 },
    { name: 'Goblin Warrior', desc: 'A sneaky goblin jumps right in front of you and challenges you', icon: 'assets/monsters/goblin-warrior.png', category: 'monster', terrains: ['mountain'], minLevel: 3, maxLevel: 6 },
    { name: 'Skeleton', desc: 'A previously inert skeleton rises up and attacks you!', icon: 'assets/monsters/skeleton.png', category: 'monster', terrains: ['mountain'], minLevel: 4, maxLevel: 8 },
    { name: 'Mechanic Spider', desc: 'This monstrosity from a forgotten era is going to give you a hard time. You\'re going to have to hit hard!', icon: 'assets/monsters/spider-mechanic.png', category: 'monster', terrains: ['mountain'], minLevel: 6, maxLevel: 10 },
  ],

  swamp: [
    { name: 'Rats', desc: 'A massive rat prowls in the darkness.', icon: 'assets/monsters/rats.png', category: 'beast', terrains: ['swamp'], minLevel: 1, maxLevel: 5 },
    { name: 'Spider', desc: 'A monstrous spider is heading towards you at high speed.', icon: 'assets/monsters/spider.png', category: 'beast', terrains: ['swamp'], minLevel: 2, maxLevel: 6 },
    { name: 'Zombie', desc: 'The undead rise, a dark age is fast approaching! If you kill him, that will always be one less!', icon: 'assets/monsters/zombie.png', category: 'monster', terrains: ['swamp'], minLevel: 3, maxLevel: 8 },
    { name: 'Ghost', desc: 'A vaporous mass forms in front of you, it\'s definitely a creature from the beyond: a ghost!', icon: 'assets/monsters/goblin-warrior.png', category: 'monster', terrains: ['swamp'], minLevel: 4, maxLevel: 9 },
  ],

  jungle: [
    { name: 'Spider', desc: 'A monstrous spider is heading towards you at high speed.', icon: 'assets/monsters/spider.png', category: 'beast', terrains: ['jungle'], minLevel: 2, maxLevel: 6 },
    { name: 'Snake', desc: 'A huge snake stands before you, its mouth open, ready to bite.', icon: 'assets/monsters/snake.png', category: 'beast', terrains: ['jungle'], minLevel: 1, maxLevel: 5 },
    { name: 'Goblin Shaman', desc: 'A goblin shaman is looking at you maliciously, probably preparing to cast a dark spell...', icon: 'assets/monsters/goblin-shaman.png', category: 'monster', terrains: ['jungle'], minLevel: 3, maxLevel: 6 },
  ],

  volcano: [
    { name: 'Mechanic Spider', desc: 'This monstrosity from a forgotten era is going to give you a hard time. You\'re going to have to hit hard!', icon: 'assets/monsters/spider-mechanic.png', category: 'monster', terrains: ['volcano'], minLevel: 6, maxLevel: 10 },
    { name: 'Priest', desc: 'This hooded person is chanting incomprehensible words... Better to shut him up before he\'s finished.', icon: 'assets/monsters/priest.png', category: 'monster', terrains: ['volcano'], minLevel: 8, maxLevel: 12 },
  ],

  water: [
    { name: 'Rats', desc: 'A massive rat prowls in the darkness.', icon: 'assets/monsters/rats.png', category: 'beast', terrains: ['water'], minLevel: 1, maxLevel: 4 },
    { name: 'Ghost', desc: 'A vaporous mass forms in front of you, it\'s definitely a creature from the beyond: a ghost!', icon: 'assets/monsters/goblin-warrior.png', category: 'monster', terrains: ['water'], minLevel: 4, maxLevel: 8 },
  ],
};
