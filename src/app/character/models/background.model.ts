import { Effect } from "./effect.model";


export interface CharacterBackground {
  id: string;
  name: string;
  description: string;
  flavor?: string;
  effects?: Effect[];
  startingItemIds?: string[];
}

export const BACKGROUNDS: CharacterBackground[] = [
  {
    id: 'wanderer',
    name: 'Wanderer',
    description: 'You’ve traveled far, learning to adapt to anything.',
    flavor: 'The road taught you to survive where others would fall.',
    effects: [
      { stat: 'maxHp', value: 10 },
      { stat: 'orbs.natural', value: 1 }
    ]
  },
  {
    id: 'scholar',
    name: 'Scholar',
    description: 'Years of study sharpened your mind and magic.',
    flavor: 'Knowledge is your true weapon.',
    effects: [
      { stat: 'maxMp', value: 5 },
      { stat: 'orbs.elemental', value: 1 }
    ]
  },
  {
    id: 'mercenary',
    name: 'Mercenary',
    description: 'You’ve survived through battle and cunning.',
    flavor: 'Coin and blood, both flow freely in your past.',
    effects: [
      { stat: 'attack', value: 1 },
      { stat: 'orbs.bestial', value: 1 }
    ]
  },
  {
    id: 'tinkerer',
    name: 'Tinkerer',
    description: 'You’ve always loved creating and fixing things.',
    flavor: 'You see the world as parts to be improved.',
    effects: [{ stat: 'orbs.mechanic', value: 1 }],
    startingItemIds: ['rusty-sword']
  },
  {
    id: 'hermit',
    name: 'Hermit',
    description: 'Isolation taught you patience and endurance.',
    flavor: 'Solitude has made you stronger… and a bit strange.',
    effects: [{ stat: 'defense', value: 1 }],
    startingItemIds: ['healing-potion']
  }
];
