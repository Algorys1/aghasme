import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type OrbType = 'bestial' | 'elemental' | 'natural' | 'mechanic';
export type DiceVerdict = 'criticalFail' | 'fail' | 'success' | 'criticalSuccess';
export interface DiceResult {
  orb: OrbType;
  value: number;
  verdict: DiceVerdict;
}

@Injectable({ providedIn: 'root' })
export class DiceService {
  private request$ = new Subject<{
    orb: OrbType;
    orbPower: number;
    resolve: (r: DiceResult) => void;
  }>();

  get onRequest() {
    return this.request$.asObservable();
  }

  askPlayerRoll(orb: OrbType, orbPower: number, difficulty: number): Promise<DiceResult> {
    return new Promise((resolve) => {
      this.request$.next({ orb, orbPower, resolve });
    });
  }
}
