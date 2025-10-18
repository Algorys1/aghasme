import { ActionType } from '../../models/actions';
import { OverlayTemplate } from '../../models/overlays.model';

export const TOWER_TABLE: OverlayTemplate[] = [
  {
    name: 'Mage\'s Spire',
    description: 'The Mage\'s Spire pierces the clouds, its summit crackling with arcane energy and whispered secrets.',
    icon: 'assets/overlays/tower.png',
    actions: [ActionType.Explore, ActionType.Rest, ActionType.Avoid],
  },
  {
    name: 'Wizard\'s Keep',
    description: 'Wizard\'s Keep looms in eerie silence, its halls echoing with the remnants of long-forgotten spells.',
    icon: 'assets/overlays/tower.png',
    actions: [ActionType.Explore, ActionType.Avoid],
  },
  {
    name: 'Arcane Tower',
    description: 'The Arcane Tower hums with unseen power, its runes glowing faintly in the twilight.',
    icon: 'assets/overlays/tower.png',
    actions: [ActionType.Explore, ActionType.Avoid],
  },
  {
    name: 'Sorcerer\'s Pinnacle',
    description: 'Sorcerer\'s Pinnacle rises like a shard of crystal, pulsing with the lifeblood of ancient magic.',
    icon: 'assets/overlays/tower.png',
    actions: [ActionType.Explore, ActionType.Avoid],
  },
  {
    name: 'Enchantress\'s Clock',
    description: 'The Enchantress\'s Clock ticks with otherworldly rhythm, marking moments that belong to no mortal time.',
    icon: 'assets/overlays/tower.png',
    actions: [ActionType.Explore, ActionType.Avoid],
  },
  {
    name: 'Enchantress\'s Clock',
    description: 'A mysterious tower crowned by a colossal clock whose hands move in strange, uneven patterns. It is said that time flows differently within its walls.',
    icon: 'assets/overlays/clock.png',
    actions: [ActionType.Inspect, ActionType.Avoid],
    eventChain: {
      floor_1: {
        title: 'Clock Tower: Entrance Hall',
        description: 'Dust dances in the air as the rhythmic ticking echoes through the stone chamber. Gears the size of doors turn slowly, powered by some unseen force. A staircase spirals upward into shadow.',
        actions: [ActionType.Explore, ActionType.Avoid],
        next: 'floor_2',
      },
      floor_2: {
        title: 'Clock Tower: Mechanism Core',
        description: 'You reach the heart of the tower, where enormous cogs interlock with impossible precision. A faint glow pulses from the center, where a crystal pendulum swings in defiance of gravity. Whispers echo, urging you to touch it.',
        actions: [ActionType.Interact, ActionType.Observe, ActionType.Avoid],
        next: 'floor_3',
      },
      floor_3: {
        title: 'Clock Tower: The Enchantress\'s Chamber',
        description: 'At the top stands a grand clock face that seems to open onto the night sky. The Enchantress herself lingers here, frozen between seconds — or perhaps watching from beyond time. The ticking grows louder… and then stops.',
        actions: [ActionType.Fight, ActionType.Explore, ActionType.Avoid]
      },
    },
  }
]