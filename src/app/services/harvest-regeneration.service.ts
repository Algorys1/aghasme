import { Injectable } from '@angular/core';
import { HarvestResource } from '../models/items';

export interface DepletedResource {
  id: string;
  pos: { q: number; r: number };
  orb: 'natural' | 'bestial' | 'mechanic' | 'elemental';
  remainingSteps: number;
}

@Injectable({ providedIn: 'root' })
export class HarvestRegenerationService {
  private depleted: DepletedResource[] = [];

  constructor() {}

  addDepletedResource(res: HarvestResource, pos: { q: number; r: number }): void {
    const steps = this.getRespawnSteps(res.orb);
    const exists = this.depleted.find(
      d => d.id === res.id && d.pos.q === pos.q && d.pos.r === pos.r
    );

    if (exists) {
      exists.remainingSteps = steps;
    } else {
      this.depleted.push({
        id: res.id,
        pos,
        orb: res.orb,
        remainingSteps: steps,
      });
    }

    console.log(
      `🌾 Resource ${res.id} depleted at (${pos.q}, ${pos.r}) for ${steps} steps.`
    );
  }

  onPlayerMove(): void {
    if (!this.depleted.length) return;

    this.depleted.forEach(d => (d.remainingSteps -= 1));
    this.depleted = this.depleted.filter(d => d.remainingSteps > 0);

    console.log('🌱 Resources updated:', this.depleted);
  }

  isResourceDepleted(resId: string, pos: { q: number; r: number }): boolean {
    return this.depleted.some(
      d => d.id === resId && d.pos.q === pos.q && d.pos.r === pos.r
    );
  }

  hasDepletedResourcesAtTile(pos: { q: number; r: number }): boolean {
    return this.depleted.some(d => d.pos.q === pos.q && d.pos.r === pos.r);
  }

  getRemainingSteps(resId: string, pos: { q: number; r: number }): number | null {
    return (
      this.depleted.find(
        d => d.id === resId && d.pos.q === pos.q && d.pos.r === pos.r
      )?.remainingSteps ?? null
    );
  }

  private getRespawnSteps(orb: HarvestResource['orb']): number {
    switch (orb) {
      case 'natural': return 10;
      case 'bestial': return 15;
      case 'mechanic': return 20;
      case 'elemental': return 30;
      default: return 10;
    }
  }
}
