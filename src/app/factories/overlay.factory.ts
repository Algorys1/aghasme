import { OverlayKind, OverlayInfo, OVERLAY_MANIFEST } from '../models/overlays';

export interface OverlayInstance extends OverlayInfo {
  id: string;
  level?: number;
  nextEvent?: string;
  kind: OverlayKind; 
}

export class OverlayFactory {
  static create(kind: OverlayKind): OverlayInstance {
    const base = { ...OVERLAY_MANIFEST[kind] };
    const id = `${kind}-${crypto.randomUUID().slice(0, 8)}`;

    switch (kind) {
      case OverlayKind.Beast:
        return this.createBeast(base, id, kind);
      case OverlayKind.Monster:
        return this.createMonster(base, id, kind);
      case OverlayKind.City:
        return this.createCity(base, id, kind);
      default:
        return { ...base, id, kind };
    }
  }

  // ----------------------------------------------------------
  // 🐾 BEASTS
  // ----------------------------------------------------------
  private static createBeast(base: OverlayInfo, id: string, kind: OverlayKind): OverlayInstance {
    const beasts = [
      { name: 'Wolf', desc: 'A lone wolf growls nearby.', icon: 'assets/monsters/wolf.png' },
      { name: 'Wild Boar', desc: 'A furious wild boar charges at you!', icon: 'assets/monsters/wild-boar.png' },
      { name: 'Rats', desc: 'A massive rat prowls in the darkness.', icon: 'assets/monsters/rats.png' },
      { name: 'Bear', desc: 'A large bear blocks your way.', icon: 'assets/monsters/bear.png' },
      { name: 'Spider', desc: 'A monstrous spider is heading towards you at high speed.', icon: 'assets/monsters/spider.png' },
      { name: 'Snake', desc: 'A huge snake stands before you, its mouth open, ready to bite.', icon: 'assets/monsters/snake.png' },
    ];
    const choice = beasts[Math.floor(Math.random() * beasts.length)];

    return {
      ...base,
      id,
      kind,
      name: choice.name,
      description: choice.desc,
      icon: choice.icon,
      actions: ['Fight', 'Flee', 'Observe'],
      level: Math.ceil(Math.random() * 3),
    };
  }

  // ----------------------------------------------------------
  // 👹 MONSTERS
  // ----------------------------------------------------------
  private static createMonster(base: OverlayInfo, id: string, kind: OverlayKind): OverlayInstance {
    const monsters = [
      { name: 'Goblin', desc: 'A sneaky goblin is rummaging through the ruins.', icon: 'assets/monsters/goblin.png' },
      { name: 'Disciple', desc: 'A dark disciple mutters forbidden incantations.', icon: 'assets/monsters/disciple.png' },
      { name: 'Skeleton', desc: 'A previously inert skeleton rises up and attacks you!', icon: 'assets/monsters/skeleton.png' },
    ];
    const choice = monsters[Math.floor(Math.random() * monsters.length)];

    return {
      ...base,
      id,
      kind,
      name: choice.name,
      description: choice.desc,
      icon: choice.icon,
      actions: ['Fight', 'Negotiate', 'Flee'],
      level: Math.ceil(Math.random() * 5),
    };
  }

  // ----------------------------------------------------------
  // 🏙️ CITIES
  // ----------------------------------------------------------
  private static createCity(base: OverlayInfo, id: string, kind: OverlayKind): OverlayInstance {
    const names = ['Rivertown', 'Eldergate', 'Stormhold', 'Ironvale', 'Highwall'];
    const name = names[Math.floor(Math.random() * names.length)];

    return {
      ...base,
      id,
      kind,
      name,
      description: `You arrive at the gates of ${name}. The streets bustle with life and opportunity.`,
      actions: ['Enter', 'Trade', 'Rest', 'Quests'],
    };
  }

  // ----------------------------------------------------------
  // 🏰 (TODO)
  // ----------------------------------------------------------
  // private static createTower(...) { ... }
  // private static createVillage(...) { ... }
  // private static createEvent(...) { ... }
}
