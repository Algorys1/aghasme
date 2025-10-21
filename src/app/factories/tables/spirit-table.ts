import { ActionType } from '../../models/actions';
import { OverlayTemplate } from '../../models/overlays.model';

export const SPIRIT_TABLE: OverlayTemplate[] = [
  {
    name: 'Wandering Soul',
    description: 'A pale silhouette drifts through the fog, murmuring words you can’t understand.',
    icon: 'assets/overlays/spirit.png',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Veil of Mist',
        description: 'The fog thickens, coiling around your feet. A faint figure flickers in and out of sight.',
        actions: [ActionType.Observe, ActionType.Talk],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You squint through the mist, the figure seems to mimic your breathing.',
          },
          [ActionType.Talk]: {
            description: 'You whisper: “Who are you?” The voice answers from everywhere and nowhere.',
            check: { orb: 'elemental', difficulty: 9 },
            onSuccess: {
              description: 'The voice calms. “Thank you for hearing me.” The fog begins to clear.',
              effects: [{ stat: 'xp', value: +6 }],
            },
            onFailure: {
              description: 'The mist darkens, the whisper turns to wailing.',
              next: 'floor_2',
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'Echo of Sorrow',
        description: 'The shape condenses, eyes of light stare into yours, pleading for release.',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 0.8,
          enemies: ['lost-soul', 'ghost'],
          random: true,
        },
      },
    },
  },
  {
    name: 'Guardian Spirit',
    description: 'You sense reverence and authority here, the lingering echo of a protector bound to duty.',
    icon: 'assets/overlays/spirit.png',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Silent Temple',
        description: 'Broken pillars stand solemnly under a faint blue light. A faint figure kneels before an altar.',
        actions: [ActionType.Observe, ActionType.Pray],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You recognize faint glyphs of protection etched into the stones.',
          },
          [ActionType.Pray]: {
            description: 'You offer a prayer of respect.',
            check: { orb: 'elemental', difficulty: 10 },
            onSuccess: {
              description: 'A soft wind circles you, the presence acknowledges your gesture.',
              effects: [{ stat: 'xp', value: +5 }],
            },
            onFailure: {
              description: 'The silence deepens, pressing against your chest.',
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'Trial of Faith',
        description: 'The spirit rises, a ghostly warrior, half-human, half-memory.',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['temple-guardian'],
        },
      },
      floor_3: {
        title: 'Lingering Blessing',
        description: 'The temple glows faintly, and the guardian’s form bows before fading into light.',
        actions: [ActionType.Rest],
        actionPassive: {
          [ActionType.Rest]: {
            description: 'You rest among the ruins, warmth filling your limbs.',
            effects: [{ stat: 'hp', value: +6 }],
          },
        },
      },
    },
  },
  {
    name: 'Bound Wraith',
    description: 'Chains rattle faintly, yet there is no wind. The air stinks of rust and regret.',
    icon: 'assets/overlays/spirit.png',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Chamber of Chains',
        description: 'Rusty links cover the walls. A body sits upright, still bound, its shadow moves independently.',
        actions: [ActionType.Observe, ActionType.Interact],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'The chains hum faintly. They’re made of silver and fear.',
          },
          [ActionType.Interact]: {
            description: 'You touch one of the bindings.',
            check: { orb: 'mechanic', difficulty: 11 },
            onSuccess: {
              description: 'The chain breaks, releasing a faint sigh of relief.',
              effects: [{ stat: 'xp', value: +7 }],
            },
            onFailure: {
              description: 'The links sear your hand, the spirit stirs angrily.',
              next: 'floor_2',
              effects: [{ stat: 'hp', value: -4 }],
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'Vengeance Awakened',
        description: 'The body stands, hollow eyes aflame, voice dripping with sorrow and fury.',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['zombie', 'ghost'],
          random: true,
        },
      },
      floor_3: {
        title: 'Peace Restored',
        description: 'The chains crumble to dust. The air feels lighter, almost thankful.',
        actions: [ActionType.Observe],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You feel a hand brush your shoulder, then nothing.',
          },
        },
      },
    },
  },
  {
    name: 'Forgotten Ancestor',
    description: 'An ancient burial mound whispers with old voices. The wind carries songs of a family long lost.',
    icon: 'assets/overlays/spirit.png',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'The Mound',
        description: 'Carved stones lie half-buried. One bears a name you can barely read.',
        actions: [ActionType.Observe, ActionType.Pray],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You brush away the dirt. The letters glow faintly beneath your hand.',
          },
          [ActionType.Pray]: {
            description: 'You whisper the name aloud, offering peace to whoever remains.',
            check: { orb: 'elemental', difficulty: 9 },
            onSuccess: {
              description: 'The air warms, you hear a faint sigh of gratitude.',
              effects: [{ stat: 'xp', value: +5 }],
            },
            onFailure: {
              description: 'Your voice echoes back distorted, another name answers instead.',
              next: 'floor_2',
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'The Other Name',
        description: 'A second presence rises, forgotten, furious to have been ignored.',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['lost-soul'],
        },
      },
      floor_3: {
        title: 'Grateful Silence',
        description: 'The mound settles, and the wind carries a final blessing before fading away.',
        actions: [ActionType.Observe],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'A flower grows where you stood. You take that as a sign.',
          },
        },
      },
    },
  },
  {
    name: 'Whispering Shade',
    description: 'A chill runs through you, the shadows whisper names you’ve never heard before.',
    icon: 'assets/overlays/spirit.png',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Hall of Whispers',
        description: 'Every shadow on the wall moves with a different rhythm. The air tastes metallic.',
        actions: [ActionType.Observe, ActionType.Interact],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You realize some whispers are begging, others warning.',
          },
          [ActionType.Interact]: {
            description: 'You step closer, hand outstretched.',
            check: { orb: 'elemental', difficulty: 10 },
            onSuccess: {
              description: 'A cool touch brushes your hand, one shadow steadies and bows.',
              effects: [{ stat: 'xp', value: +6 }],
            },
            onFailure: {
              description: 'The wall ripples, a scream bursts from the darkness!',
              next: 'floor_2',
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'The Broken One',
        description: 'A single shadow detaches from the wall, trembling uncontrollably.',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['disciple', 'ghost'],
          random: true,
        },
      },
      floor_3: {
        title: 'Stillness Returns',
        description: 'The shadows no longer move. A single whisper remains: “Thank you.”',
        actions: [ActionType.Rest],
        actionPassive: {
          [ActionType.Rest]: {
            description: 'You sit quietly until the chill fades from your bones.',
            effects: [{ stat: 'hp', value: +4 }],
          },
        },
      },
    },
  },
];
