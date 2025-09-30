export interface Character {
  name: string;
  archetype: 'warrior' | 'mage' | 'engineer' | 'scout';
  level: number;
  xp: number;
  hp: number;
  strength: number;
  essence: number;
  mechanic: number;
  spirit: number;
  skills: string[];
  gold: number;
  inventory: string[];
}

/** Données minimales pour créer un perso (tout le reste sera mis par défaut) */
export type NewCharacterInput = Partial<Character> & Pick<Character, 'name'>;
