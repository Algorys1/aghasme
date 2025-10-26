import { Injectable } from '@angular/core';
import { DiceRollComponent } from '../dice-roll/dice-roll.component';

export type OrbType = 'bestial' | 'elemental' | 'natural' | 'mechanic';
export type DiceVerdict = 'criticalFail' | 'fail' | 'success' | 'criticalSuccess';

export interface DiceResult {
  orb: OrbType;
  value: number;
  verdict: DiceVerdict;
}

@Injectable({ providedIn: 'root' })
export class DiceService {
  private diceComponent?: DiceRollComponent;

  /**
   * 🔧 Appelé une fois dans GameComponent pour enregistrer le composant
   */
  registerComponent(component: DiceRollComponent) {
    this.diceComponent = component;
  }

  /**
   * 🎲 Lancer de dé interactif :
   * affiche la fenêtre, attend le clic sur Roll, puis renvoie le résultat.
   * @param orb L’orbe concernée (bestial, elemental, natural, mechanic)
   * @param orbPower La valeur de puissance du joueur pour cette orbe
   */
  async askPlayerRoll(orb: OrbType, orbPower: number): Promise<DiceResult> {
    if (!this.diceComponent) {
      console.warn('⚠️ DiceRollComponent non initialisé, roll simulé.');
      return this.simulate(orb, orbPower);
    }

    // Affiche la fenêtre de dé avec le bon orbPower
    this.diceComponent.open(orb, orbPower);

    // Attend la fin du lancer (le composant gère l’animation et le verdict)
    return new Promise<DiceResult>((resolve) => {
      const comp = this.diceComponent!;
      const interval = setInterval(() => {
        if (comp.rolled) {
          clearInterval(interval);
          resolve({
            orb,
            value: comp.result,
            verdict: comp.verdict!,
          });
        }
      }, 150);
    });
  }

  /**
   * 🧮 Fallback sans composant (utile pour tests ou environnement sans UI)
   */
  private simulate(orb: OrbType, orbPower: number): DiceResult {
    const value = Math.floor(Math.random() * 20) + 1;
    let verdict: DiceVerdict;

    if (value === 1) verdict = 'criticalFail';
    else if (value === 20) verdict = 'criticalSuccess';
    else if (value >= orbPower) verdict = 'success';
    else verdict = 'fail';

    return { orb, value, verdict };
  }
}
