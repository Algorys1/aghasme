import { ActionType } from '../models/actions';
import { OverlayTemplate } from '../models/overlays.model';

export const SPIRIT_TABLE: OverlayTemplate[] = [
  {
    name: 'Wandering Soul',
    description: 'A pale silhouette drifts through the fog, murmuring words you can\'t understand.',
    icon: 'assets/overlays/spirit.png',
    id: 'wandering-soul',
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
            description: 'You whisper: "Who are you?" The voice answers from everywhere and nowhere.',
            check: { orb: 'elemental', difficulty: 9 },
            onSuccess: {
              description: 'The voice calms. "Thank you for hearing me." The fog begins to clear.',
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
    id: 'guardian-spirit',
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
        description: 'The temple glows faintly, and the guardian\'s form bows before fading into light.',
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
    id: 'bound-wraith',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Chamber of Chains',
        description: 'Rusty links cover the walls. A body sits upright, still bound, its shadow moves independently.',
        actions: [ActionType.Observe, ActionType.Interact],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'The chains hum faintly. They\'re made of silver and fear.',
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
    id: 'forgotten-ancestror',
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
    description: 'A chill runs through you, the shadows whisper names you\'ve never heard before.',
    icon: 'assets/overlays/spirit.png',
    id: 'whispering-shade',
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
        description: 'The shadows no longer move. A single whisper remains: "Thank you."',
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
  {
    name: 'The Weeping Saint',
    description: 'In the ruins of a chapel, a marble statue weeps endless tears of light. The air hums with grief.',
    icon: 'assets/overlays/spirit.png',
    id: 'weeping-saint',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'Chapel of Echoes',
        description: 'Candles flicker though no one tends them. The statue\'s eyes glow faintly, watching your every step.',
        actions: [ActionType.Observe, ActionType.Pray],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You see offerings, flowers, bones, coins, all perfectly preserved.',
          },
          [ActionType.Pray]: {
            description: 'You kneel and whisper comfort to the unseen soul here.',
            check: { orb: 'elemental', difficulty: 9 },
            onSuccess: {
              description: 'The light from the candles brightens softly.',
              effects: [{ stat: 'xp', value: +5 }],
            },
            onFailure: {
              description: 'A cold wind passes, the statue\'s tears freeze midair.',
              effects: [{ stat: 'hp', value: -2 }],
            },
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'The Voice Behind the Marble',
        description: 'A whisper fills the hall: "Why did they abandon me?" The sound seems to come from within your chest.',
        actions: [ActionType.Talk, ActionType.Observe],
        actionPassive: {
          [ActionType.Talk]: {
            description: 'You answer honestly, even if you don\'t understand her question.',
            check: { orb: 'natural', difficulty: 11 },
            onSuccess: {
              description: 'The voice softens: "Then listen to my sorrow."',
              effects: [{ stat: 'xp', value: +6 }],
            },
            onFailure: {
              description: 'The whisper turns to a sob that shakes the floor.',
            },
          },
          [ActionType.Observe]: {
            description: 'The tears fall upward now, reversing time.',
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'The Memory of Faith',
        description: 'Visions bloom, a crowd praying, fire, screams, and a single woman standing amid the ash.',
        actions: [ActionType.Inspect, ActionType.Pray],
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'You realize you are standing where she burned.',
          },
          [ActionType.Pray]: {
            description: 'You speak her name, though you don\'t know how you know it.',
            check: { orb: 'elemental', difficulty: 12 },
            onSuccess: {
              description: 'The vision clears, the saint looks at peace for the first time.',
              effects: [{ stat: 'xp', value: +10 }],
            },
            onFailure: {
              description: 'The flames rise again, and the ghostly form turns toward you.',
              next: 'floor_4',
            },
          },
        },
        next: 'floor_4',
      },
      floor_4: {
        title: 'The Saint\'s Wrath',
        description: 'The spirit manifests fully, radiant, terrible, crying fire instead of tears.',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['priest', 'lost-soul'],
          random: true,
        },
        next: 'floor_5',
      },
      floor_5: {
        title: 'Blessing of the Redeemed',
        description: 'The chapel grows still. The tears turn to starlight and vanish. A soft warmth fills your heart.',
        actions: [ActionType.Observe, ActionType.Rest],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You feel absolved of guilt you didn\'t know you carried.',
            effects: [{ stat: 'xp', value: +18 }, { stat: 'mp', value: +10 }],
          },
          [ActionType.Rest]: {
            description: 'You rest by the silent statue, her face now smiles faintly.',
            effects: [{ stat: 'hp', value: +8 }],
          },
        },
      },
    },
  },
  {
    name: 'The Lantern Bearer',
    description: 'A pale figure drifts along the marsh path, holding a lantern whose flame never flickers.',
    icon: 'assets/overlays/spirit.png',
    id: 'lantern-bearer',
    actions: [],
    eventChain: {
      floor_1: {
        title: 'The Dim Path',
        description: 'Fog thickens around you. The lantern\'s glow pierces only a few steps ahead.',
        actions: [ActionType.Observe, ActionType.Talk],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'Every step behind you vanishes from memory, you only exist where the light touches.',
          },
          [ActionType.Talk]: {
            description: 'You call out to the figure. It stops, the lantern raises slightly.',
          },
        },
        next: 'floor_2',
      },
      floor_2: {
        title: 'The Keeper\'s Question',
        description: '"Do you walk among the living or the lost?" the figure asks. Its voice is like rain on stone.',
        actions: [ActionType.Talk, ActionType.Pray],
        actionPassive: {
          [ActionType.Talk]: {
            description: '"I walk to remember," you reply. The lantern brightens slightly.',
            effects: [{ stat: 'xp', value: +5 }],
          },
          [ActionType.Pray]: {
            description: 'You bow your head, unsure which answer is true.',
            check: { orb: 'elemental', difficulty: 10 },
            onSuccess: {
              description: 'The fog parts, revealing a bridge ahead.',
              effects: [{ stat: 'xp', value: +6 }],
            },
            onFailure: {
              description: 'The light dims, the path behind you disappears completely.',
              effects: [{ stat: 'hp', value: -3 }],
            },
          },
        },
        next: 'floor_3',
      },
      floor_3: {
        title: 'Bridge of Reflections',
        description: 'The bridge spans a river of light. Faces drift in the current, some you recognize.',
        actions: [ActionType.Inspect, ActionType.Observe],
        actionPassive: {
          [ActionType.Inspect]: {
            description: 'Each reflection whispers a secret you once knew.',
            effects: [{ stat: 'xp', value: +4 }],
          },
          [ActionType.Observe]: {
            description: 'The Lantern Bearer stands mid-bridge, waiting.',
          },
        },
        next: 'floor_4',
      },
      floor_4: {
        title: 'The Toll of Passage',
        description: '"To cross," says the spirit, "you must offer what you cannot carry."',
        actions: [ActionType.Interact, ActionType.Pray],
        actionPassive: {
          [ActionType.Interact]: {
            description: 'You reach for your pack. The spirit shakes its head, "No, something deeper."',
          },
          [ActionType.Pray]: {
            description: 'You close your eyes and let go of a memory, one you loved.',
            effects: [{ stat: 'xp', value: +8 }, { stat: 'mp', value: +6 }],
          },
        },
        next: 'floor_5',
      },
      floor_5: {
        title: 'The River\'s Judgment',
        description: 'The water churns. One of the faces rises, furious, screaming soundlessly.',
        actions: [ActionType.Fight, ActionType.Flee],
        uniqueChoice: true,
        encounter: {
          chance: 1,
          enemies: ['ghost', 'lost-soul'],
          random: true,
        },
        next: 'floor_6',
      },
      floor_6: {
        title: 'The Dimming Light',
        description: 'The Lantern Bearer bows. "You have crossed. May your path stay bright." Then, he fades into the fog.',
        actions: [ActionType.Observe, ActionType.Rest],
        actionPassive: {
          [ActionType.Observe]: {
            description: 'You look down, your reflection in the river now holds the lantern.',
            effects: [{ stat: 'xp', value: +20 }],
          },
          [ActionType.Rest]: {
            description: 'You sit by the bank, feeling lighter, though unsure what you\'ve forgotten.',
            effects: [{ stat: 'hp', value: +6 }],
          },
        },
      },
    },
  },
];
