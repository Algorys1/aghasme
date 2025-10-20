import { Terrain } from './tile.factory';
import { EnemyTemplate } from './enemy.factory';
import { Effect } from '../models/effect.model';

// TODO Add other monsters
export const EnemyTables: Record<Terrain, EnemyTemplate[]> = {
  plain: [
    { name: 'Rats', desc: 'A massive rat prowls in the darkness.', icon: 'assets/monsters/rats.png', category: 'beast', terrains: ['plain'], minLevel: 1, maxLevel: 5 },
    { name: 'Wolf', desc: 'A lone wolf growls nearby.', icon: 'assets/monsters/wolf.png', category: 'beast', terrains: ['plain'], minLevel: 1, maxLevel: 5 },
    { name: 'Wild Boar', desc: 'A furious wild boar charges at you!', icon: 'assets/monsters/wild-boar.png', category: 'beast', terrains: ['plain'], minLevel: 1, maxLevel: 5 },
    { name: 'Bandit', desc: 'These roads aren\'t safe, you knew that. You\'re face to face with a highwayman.', icon: 'assets/monsters/bandit.png', category: 'monster', terrains: ['plain'], minLevel: 2, maxLevel: 6 },
    { name: 'Goblin Warrior', desc: 'A sneaky goblin jumps right in front of you and challenges you', icon: 'assets/monsters/goblin-warrior.png', category: 'monster', terrains: ['plain'], minLevel: 2, maxLevel: 5 },
    { name: 'Corrupt Sorcerer', desc: 'This hooded man is nothing more than a Dark Wizard. It\'s time to offer him some light!', icon: 'assets/monsters/corrupt-sorcerer.png', category: 'monster', terrains: ['plain'], minLevel: 2, maxLevel: 10 },
    { name: 'Skeleton Warrior', desc: 'Everything was so calm... But then a previously inert skeleton had to rise up and attack you!', icon: 'assets/monsters/skeleton-warrior.png', category: 'monster', terrains: ['plain'], minLevel: 4, maxLevel: 8 },
    { name: 'Young Griffin', desc: 'What you thought was a large eagle is actually a young griffin. The problem is, this young griffin is coming at you at full speed!', icon: 'assets/monsters/griffin-young.png', category: 'beast', terrains: ['plain'], minLevel: 4, maxLevel: 8 },
    { name: 'Mossy Spider', desc: 'No, it\'s not moss peeling off this tree, but a spider and its mandibles getting closer.', icon: 'assets/monsters/spider-mossy.png', category: 'monster', terrains: ['plain'], minLevel: 5, maxLevel: 15 },
  ],

  forest: [
    { name: 'Wolf', desc: 'A lone wolf growls nearby.', icon: 'assets/monsters/wolf.png', category: 'beast', terrains: ['forest'], minLevel: 1, maxLevel: 5 },
    { name: 'Bear', desc: 'A large bear blocks your way.', icon: 'assets/monsters/bear.png', category: 'beast', terrains: ['forest'], minLevel: 3, maxLevel: 8 },
    { name: 'Spider', desc: 'A monstrous spider is heading towards you at high speed.', icon: 'assets/monsters/spider.png', category: 'beast', terrains: ['forest'], minLevel: 1, maxLevel: 6 },
    { name: 'Goblin Archer', desc: 'Perched on a rock, a goblin stares at you, ready to fire his arrow.', icon: 'assets/monsters/goblin-archer.png', category: 'monster', terrains: ['forest'], minLevel: 1, maxLevel: 5 },
    { name: 'Goblin Shaman', desc: 'A goblin shaman is looking at you maliciously, probably preparing to cast a dark spell...', icon: 'assets/monsters/goblin-shaman.png', category: 'monster', terrains: ['forest'], minLevel: 3, maxLevel: 6 },
    { name: 'Zombie', desc: 'The undead rise, a dark age is fast approaching! If you kill him, that will always be one less!', icon: 'assets/monsters/zombie.png', category: 'monster', terrains: ['forest'], minLevel: 3, maxLevel: 7 },
    { name: 'Corrupt Sorcerer', desc: 'This hooded man is nothing more than a Dark Wizard. It\'s time to offer him some light!', icon: 'assets/monsters/corrupt-sorcerer.png', category: 'monster', terrains: ['forest'], minLevel: 2, maxLevel: 15 },
    { name: 'Disciple', desc: 'You don\'t know what this person is mumbling, but it\'s definitely not poetry. Better to shut him up!', icon: 'assets/monsters/disciple.png', category: 'monster', terrains: ['forest'], minLevel: 2, maxLevel: 10 },
    { name: 'Harpy', desc: 'The scream that creature just made deafened you, a little more and you would have fallen. You will have to defend yourself.', icon: 'assets/monsters/harpy.png', category: 'beast', terrains: ['forest'], minLevel: 5, maxLevel: 15 },
    { name: 'Giant Bat', desc: 'You thought it was a bird that was circling around you all this time, but no, it\'s definitely a bat!', icon: 'assets/monsters/bat-giant.png', category: 'beast', terrains: ['forest'], minLevel: 2, maxLevel: 10 },
    { name: 'Mossy Spider', desc: 'No, it\'s not moss peeling off this tree, but a spider and its mandibles getting closer.', icon: 'assets/monsters/spider-mossy.png', category: 'monster', terrains: ['forest'], minLevel: 5, maxLevel: 15 },
  ],

  desert: [
    { name: 'Snake', desc: 'A huge snake stands before you, its mouth open, ready to bite.', icon: 'assets/monsters/snake.png', category: 'beast', terrains: ['desert'], minLevel: 1, maxLevel: 5 },
    { name: 'Mechanical Orb', desc: 'What you thought was a pile of inert scrap metal suddenly finds itself flying around you. That glowing eye doesn\'t bode well for you...', icon: 'assets/monsters/orb-mechanic.png', category: 'monster', terrains: ['desert'], minLevel: 6, maxLevel: 10 },
    { name: 'Bandit', desc: 'These roads aren\'t safe, you knew that. You\'re face to face with a highwayman.', icon: 'assets/monsters/bandit.png', category: 'monster', terrains: ['desert'], minLevel: 2, maxLevel: 6 },
    { name: 'Sand Beetle', desc: 'Suddenly you see the sand moving in front of you. A creature with a golden shell seems to emerge from time.', icon: 'assets/monsters/beetle-sand.png', category: 'beast', terrains: ['desert'], minLevel: 2, maxLevel: 10 },
    { name: 'Dark Knight', desc: 'A towering black knight stands before you. His armor gleams with evil colors, but at this moment, you don\'t have time to admire him.', icon: 'assets/monsters/dark-knight.png', category: 'monster', terrains: ['desert'], minLevel: 10, maxLevel: 20 },
    { name: 'Disciple', desc: 'You don\'t know what this person is mumbling, but it\'s definitely not poetry. Better to shut him up!', icon: 'assets/monsters/disciple.png', category: 'monster', terrains: ['desert'], minLevel: 1, maxLevel: 10 },
    { name: 'Sand Worm', desc: 'The air trembles beneath your feet and you fall backward as you see a sandworm rising into the sky. Get up, you must fight for your life!', icon: 'assets/monsters/worm-sand.png', category: 'beast', terrains: ['desert'], minLevel: 10, maxLevel: 20 },
    { name: '3-Eyed Crow', desc: 'This crow doesn\'t look like he\'s going to be joking around, he\'s definitely going to try to peck your head off.', icon: 'assets/monsters/3-eyed-crow.png', category: 'beast', terrains: ['desert'], minLevel: 1, maxLevel: 10 },
    { name: 'Mummy', desc: 'The thing about mummies is, we don\'t want them to touch us. And this one is no exception!', icon: 'assets/monsters/mummy.png', category: 'beast', terrains: ['desert'], minLevel: 1, maxLevel: 15 },
    { name: 'Royal Mummy', desc: 'The thing about mummies is, we don\'t want them to touch us. And this one is no exception!', icon: 'assets/monsters/mummy-royal.png', category: 'beast', terrains: ['desert'], minLevel: 1, maxLevel: 15 },
  ],

  mountain: [
    { name: 'Bear', desc: 'A large bear blocks your way.', icon: 'assets/monsters/bear.png', category: 'beast', terrains: ['mountain'], minLevel: 3, maxLevel: 8 },
    { name: 'Goblin Warrior', desc: 'A sneaky goblin jumps right in front of you and challenges you', icon: 'assets/monsters/goblin-warrior.png', category: 'monster', terrains: ['mountain'], minLevel: 1, maxLevel: 8 },
    { name: 'Skeleton Warrior', desc: 'Everything was so calm... But then a previously inert skeleton had to rise up and attack you!', icon: 'assets/monsters/skeleton-warrior.png', category: 'monster', terrains: ['mountain'], minLevel: 1, maxLevel: 8 },
    { name: 'Skeleton Archer', desc: 'Given the age of his arrows, it\'s better not to get them in your body!', icon: 'assets/monsters/skeleton-archer.png', category: 'monster', terrains: ['mountain'], minLevel: 1, maxLevel: 8 },
    { name: 'Mechanical Spider', desc: 'This monstrosity from a forgotten era is going to give you a hard time. You\'re going to have to hit hard!', icon: 'assets/monsters/spider-mechanic.png', category: 'monster', terrains: ['mountain'], minLevel: 6, maxLevel: 10 },
    { name: 'Lava Beetle', desc: 'You don\'t know why, but you think it\'s going to get hot... This beetle seems pretty tough!', icon: 'assets/monsters/beetle-lava.png', category: 'monster', terrains: ['mountain'], minLevel: 6, maxLevel: 15},
    { name: 'Dark Knight', desc: 'A towering black knight stands before you. His armor gleams with evil colors, but at this moment, you don\'t have time to admire him.', icon: 'assets/monsters/dark-knight.png', category: 'monster', terrains: ['mountain'], minLevel: 10, maxLevel: 20 },
    { name: 'Mechanical Golem', desc: 'The slowly rising metal mass looks like it came straight out of a foundry of evil. It\'s not going to be the easiest of opponents...', icon: 'assets/monsters/golem-mechanic.png', category: 'monster', terrains: ['mountain'], minLevel: 10, maxLevel: 20 },
    { name: 'Snake Crystal', desc: 'The noise this snake makes when it coils is most unpleasant. This deafening din must be stopped.', icon: 'assets/monsters/snake-crystal.png', category: 'monster', terrains: ['mountain'], minLevel: 5, maxLevel: 20 },
    { name: 'Mechanical Wolf', desc: 'What you thought was a real wolf turns out to be a complex machine, and that machine is about to crush you!', icon: 'assets/monsters/wolf-mechanic.png', category: 'monster', terrains: ['mountain'], minLevel: 5, maxLevel: 15 },
    { name: 'Drake of Ashes', desc: 'The bright red this drake is sporting is truly magnificent... the problem is, it burns.', icon: 'assets/monsters/drake-ash.png', category: 'monster', terrains: ['mountain'], minLevel: 10, maxLevel: 20 },
    { name: 'Demon of Ashes', desc: 'Those red eyes, those horns, that impossible smile, there\'s no doubt he\'s a demon, and a big one at that.', icon: 'assets/monsters/demon-ash.png', category: 'monster', terrains: ['mountain'], minLevel: 10, maxLevel: 30 },
  ],

  swamp: [
    { name: 'Rats', desc: 'A massive rat prowls in the darkness.', icon: 'assets/monsters/rats.png', category: 'beast', terrains: ['swamp'], minLevel: 1, maxLevel: 5 },
    { name: 'Spider', desc: 'A monstrous spider is heading towards you at high speed.', icon: 'assets/monsters/spider.png', category: 'beast', terrains: ['swamp'], minLevel: 2, maxLevel: 6 },
    { name: 'Zombie', desc: 'The undead rise, a dark age is fast approaching! If you kill him, that will always be one less!', icon: 'assets/monsters/zombie.png', category: 'monster', terrains: ['swamp'], minLevel: 3, maxLevel: 8 },
    { name: 'Ghost', desc: 'A vaporous mass forms in front of you, it\'s definitely a creature from the beyond: a ghost!', icon: 'assets/monsters/ghost.png', category: 'monster', terrains: ['swamp'], minLevel: 4, maxLevel: 9 },
    { name: 'Disciple', desc: 'You don\'t know what this person is mumbling, but it\'s definitely not poetry. Better to shut him up!', icon: 'assets/monsters/disciple.png', category: 'monster', terrains: ['swamp'], minLevel: 2, maxLevel: 10 },
    { name: 'Giant Toad', desc: 'The size of this toad is impressive. You wonder if it would be able to swallow you. Better not to check...', icon: 'assets/monsters/toad.png', category: 'monster', terrains: ['swamp'], minLevel: 2, maxLevel: 10 },
    { name: 'Mossy Spider', desc: 'No, it\'s not moss peeling off this tree, but a spider and its mandibles getting closer.', icon: 'assets/monsters/spider-mossy.png', category: 'monster', terrains: ['swamp'], minLevel: 5, maxLevel: 15 },
    { name: 'Giant Lizard', desc: 'Considering the size of this lizard, you might be surprised if it only eats flies!', icon: 'assets/monsters/lizard-giant.png', category: 'monster', terrains: ['swamp'], minLevel: 10, maxLevel: 20 },
  ],

  jungle: [
    { name: 'Spider', desc: 'A monstrous spider is heading towards you at high speed.', icon: 'assets/monsters/spider.png', category: 'beast', terrains: ['jungle'], minLevel: 2, maxLevel: 6 },
    { name: 'Snake', desc: 'A huge snake stands before you, its mouth open, ready to bite.', icon: 'assets/monsters/snake.png', category: 'beast', terrains: ['jungle'], minLevel: 1, maxLevel: 5 },
    { name: 'Goblin Shaman', desc: 'A goblin shaman is looking at you maliciously, probably preparing to cast a dark spell...', icon: 'assets/monsters/goblin-shaman.png', category: 'monster', terrains: ['jungle'], minLevel: 3, maxLevel: 6 },
    { name: 'Disciple', desc: 'You don\'t know what this person is mumbling, but it\'s definitely not poetry. Better to shut him up!', icon: 'assets/monsters/disciple.png', category: 'monster', terrains: ['jungle'], minLevel: 2, maxLevel: 10 },
    { name: 'Giant Toad', desc: 'The size of this toad is impressive. You wonder if it would be able to swallow you. Better not to check...', icon: 'assets/monsters/toad.png', category: 'beast', terrains: ['jungle'], minLevel: 2, maxLevel: 10 },
    { name: 'Giant Bat', desc: 'You thought it was a bird that was circling around you all this time, but no, it\'s definitely a bat!', icon: 'assets/monsters/bat-giant.png', category: 'beast', terrains: ['jungle'], minLevel: 2, maxLevel: 10 },
    { name: 'Mossy Spider', desc: 'No, it\'s not moss peeling off this tree, but a spider and its mandibles getting closer.', icon: 'assets/monsters/spider-mossy.png', category: 'monster', terrains: ['jungle'], minLevel: 5, maxLevel: 15 },
    { name: 'Giant Lizard', desc: 'Considering the size of this lizard, you might be surprised if it only eats flies!', icon: 'assets/monsters/lizard-giant.png', category: 'monster', terrains: ['jungle'], minLevel: 10, maxLevel: 20 },
  ],

  volcano: [
    { name: 'Mechanical Spider', desc: 'This monstrosity from a forgotten era is going to give you a hard time. You\'re going to have to hit hard!', icon: 'assets/monsters/spider-mechanic.png', category: 'monster', terrains: ['volcano'], minLevel: 6, maxLevel: 10 },
    { name: 'Priest', desc: 'This hooded person is chanting incomprehensible words... Better to shut him up before he\'s finished.', icon: 'assets/monsters/priest.png', category: 'monster', terrains: ['volcano'], minLevel: 8, maxLevel: 12 },
    { name: 'Corrupt Sorcerer', desc: 'This hooded man is nothing more than a Dark Wizard. It\'s time to offer him some light!', icon: 'assets/monsters/corrupt-sorcerer.png', category: 'monster', terrains: ['volcano'], minLevel: 1, maxLevel: 10 },
    { name: 'Lava Beetle', desc: 'You don\'t know why, but you think it\'s going to get hot... This beetle seems pretty tough!', icon: 'assets/monsters/beetle-lava.png', category: 'monster', terrains: ['volcano'], minLevel: 4, maxLevel: 15},
    { name: 'Dark Knight', desc: 'A towering black knight stands before you. His armor gleams with evil colors, but at this moment, you don\'t have time to admire him.', icon: 'assets/monsters/dark-knight.png', category: 'monster', terrains: ['volcano'], minLevel: 10, maxLevel: 20 },
    { name: 'Mechanical Golem', desc: 'The slowly rising metal mass looks like it came straight out of a foundry of evil. It\'s not going to be the easiest of opponents...', icon: 'assets/monsters/golem-mechanic.png', category: 'monster', terrains: ['volcano'], minLevel: 10, maxLevel: 20 },
    { name: 'Mechanical Wolf', desc: 'What you thought was a real wolf turns out to be a complex machine, and that machine is about to crush you!', icon: 'assets/monsters/wolf-mechanic.png', category: 'monster', terrains: ['volcano'], minLevel: 10, maxLevel: 20 },
    { name: 'Drake of Ashes', desc: 'The bright red this drake is sporting is truly magnificent... the problem is, it burns.', icon: 'assets/monsters/drake-ash.png', category: 'monster', terrains: ['volcano'], minLevel: 10, maxLevel: 30 },
    { name: 'Demon of Ashes', desc: 'Those red eyes, those horns, that impossible smile, there\'s no doubt he\'s a demon, and a big one at that.', icon: 'assets/monsters/demon-ash.png', category: 'monster', terrains: ['volcano'], minLevel: 20, maxLevel: 40 },
  ],

  sea: [
    { name: 'Rats', desc: 'A massive rat prowls in the darkness.', icon: 'assets/monsters/rats.png', category: 'beast', terrains: ['sea'], minLevel: 1, maxLevel: 4 },
    { name: 'Ghost', desc: 'A vaporous mass forms in front of you, it\'s definitely a creature from the beyond: a ghost!', icon: 'assets/monsters/goblin-warrior.png', category: 'monster', terrains: ['sea'], minLevel: 4, maxLevel: 8 },
    { name: 'Harpy', desc: 'The scream that creature just made deafened you, a little more and you would have fallen. You will have to defend yourself.', icon: 'assets/monsters/harpy.png', category: 'beast', terrains: ['sea'], minLevel: 5, maxLevel: 15 },
    { name: 'Young Griffin', desc: 'What you thought was a large eagle is actually a young griffin. The problem is, this young griffin is coming at you at full speed!', icon: 'assets/monsters/griffin-young.png', category: 'beast', terrains: ['sea'], minLevel: 4, maxLevel: 8 },
    { name: 'Young Kraken', desc: 'Your ship was sailing peacefully when suddenly a shock was felt beneath the hull. Numerous tentacles assaulted the deck.', icon: 'assets/monsters/kraken-young.png', category: 'beast', terrains: ['sea'], minLevel: 10, maxLevel: 20 },
    { name: 'Snake Water', desc: 'You see the water begin to simmer and bubble. What is this creature that is bothering you?', icon: 'assets/monsters/snake-water.png', category: 'beast', terrains: ['sea'], minLevel: 1, maxLevel: 8 },
    { name: 'Cursed Tentacle', desc: 'This tentacle is all alone, but it can do a lot of damage.', icon: 'assets/monsters/tentacle-cursed.png', category: 'beast', terrains: ['sea'], minLevel: 4, maxLevel: 15 },
  ],
};
