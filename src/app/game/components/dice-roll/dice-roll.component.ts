import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Application, Sprite, Texture, Rectangle, Assets, Ticker } from 'pixi.js';
import { Haptics } from '@capacitor/haptics';
import { getOrbModifier } from '../../../character/models/character.model';

export type OrbType = 'bestial' | 'elemental' | 'natural' | 'mechanic';
export type DiceVerdict = 'criticalFail' | 'fail' | 'success' | 'criticalSuccess';
export interface DiceResult {
  orb: OrbType;
  value: number;
  verdict: DiceVerdict;
}

@Component({
  selector: 'app-dice-roll',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dice-roll.component.html',
  styleUrls: ['./dice-roll.component.scss']
})
export class DiceRollComponent {
  @ViewChild('diceCanvas', { static: true }) diceCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() orb: OrbType = 'natural';
  @Input() orbPower = 0;
  @Input() difficulty = 10;
  @Output() rolledResult = new EventEmitter<DiceResult>();

  visible = true;
  rolling = false;
  rolled = false;
  result = 0;
  modifier = 0;
  total = 0;
  verdict: DiceVerdict | null = null;

  private app?: Application;
  private sprite?: Sprite;
  private frameTextures: Texture[] = [];

  async roll() {
    if (this.rolling) return;
    this.rolling = true;

    if (this.app) {
      this.app.destroy(true, { children: true });
      this.app = undefined;
    }

    const canvas = this.diceCanvas.nativeElement;
    this.app = new Application();
    await this.app.init({
      canvas,
      backgroundAlpha: 0,
      width: 200,
      height: 200,
    });

    const base = await Assets.load<Texture>(`assets/ui/dices/dice-${this.orb}-sheet.png`);
    this.frameTextures = [];

    const cols = 5, rows = 4;
    const w = base.width / cols, h = base.height / rows;
    for (let i = 0; i < 20; i++) {
      const rect = new Rectangle((i % cols) * w, Math.floor(i / cols) * h, w, h);
      this.frameTextures.push(new Texture({ source: base.source, frame: rect }));
    }

    this.sprite = new Sprite(this.frameTextures[0]);
    this.sprite.anchor.set(0.5);
    this.sprite.x = 100;
    this.sprite.y = 100;
    this.sprite.scale.set(0.7);
    this.app.stage.addChild(this.sprite);

    const result = Math.floor(Math.random() * 20) + 1;
    this.result = result;
    this.animateRoll(result);
  }

  private animateRoll(finalResult: number) {
    if (!this.app) return;

    const sprite = this.sprite!;
    const baseScale = 0.7;
    const totalFrames = 20;
    const duration = 2000;
    const start = performance.now();

    let frame = 0;
    let lastChange = 0;

    const rollTicker = this.app.ticker;
    rollTicker.start();

    rollTicker.add(() => {
      const elapsed = performance.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const interval = 60 + 200 * Math.pow(progress, 2.2);

      sprite.rotation = Math.PI * 4 * progress;

      const scalePulse = baseScale + Math.sin(progress * Math.PI * 4) * 0.05 * (1 - progress);
      sprite.scale.set(scalePulse);

      if (elapsed - lastChange >= interval) {
        frame = (frame + 1) % totalFrames;
        sprite.texture = this.frameTextures[frame];
        lastChange = elapsed;
      }

      if (elapsed >= duration) {
        rollTicker.stop();

        const finalIndex = (finalResult - 1) % totalFrames;
        sprite.texture = this.frameTextures[finalIndex];

        const settleTicker = new Ticker();
        const settleStart = performance.now();
        const settleDuration = 400;

        settleTicker.add(() => {
          const t = Math.min((performance.now() - settleStart) / settleDuration, 1);
          const damping = Math.pow(1 - t, 2);
          sprite.rotation = Math.sin(t * 10) * 0.15 * damping;
          sprite.scale.set(baseScale + 0.04 * damping);

          if (t >= 1) {
            settleTicker.stop();
            sprite.rotation = 0;
            sprite.scale.set(baseScale);
            this.finishRoll(finalResult);
          }
        });

        settleTicker.start();
      }
    });
  }

  private async finishRoll(result: number) {
    try { await Haptics.vibrate({ duration: 100 }); } catch {}

    this.modifier = getOrbModifier(this.orbPower);
    this.total = result + this.modifier;

    if (result === 1) this.verdict = 'criticalFail';
    else if (result === 20) this.verdict = 'criticalSuccess';
    else this.verdict = this.total >= this.difficulty ? 'success' : 'fail';

    this.rolling = false;
    this.rolled = true;
  }

  emitResult() {
    this.rolledResult.emit({
      orb: this.orb,
      value: this.result,
      verdict: this.verdict!
    });
  }
}
