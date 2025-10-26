import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Application, Sprite, Texture, Rectangle, Assets } from 'pixi.js';
import { Haptics } from '@capacitor/haptics';

type OrbType = 'bestial' | 'elemental' | 'natural' | 'mechanic';
type DiceVerdict = 'criticalFail' | 'fail' | 'success' | 'criticalSuccess';

@Component({
  selector: 'app-dice-roll',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dice-roll.component.html',
  styleUrls: ['./dice-roll.component.scss']
})
export class DiceRollComponent {
  @ViewChild('diceCanvas', { static: false }) diceCanvas!: ElementRef<HTMLCanvasElement>;

  visible = false;
  rolling = false;
  rolled = false;

  orb: OrbType = 'natural';
  orbPower = 0;
  result = 0;
  verdict: DiceVerdict | null = null;

  private app?: Application;
  private sprite?: Sprite;
  private frameTextures: Texture[] = [];

  open(orb: OrbType, orbPower: number) {
    this.orb = orb;
    this.orbPower = orbPower;
    this.result = 0;
    this.verdict = null;
    this.visible = true;
    this.rolling = false;
    this.rolled = false;
  }

  async roll() {
    if (this.rolling) return;
    this.rolling = true;

    await new Promise(r => setTimeout(r));

    const canvas = this.diceCanvas.nativeElement;

    this.app = new Application();
    await this.app.init({
      canvas,
      backgroundAlpha: 0,
      width: 200,
      height: 200,
    });

    const base = await Assets.load<Texture>(`assets/ui/dice/dice-${this.orb}-d20.png`);
    this.frameTextures = [];

    const frameCols = 4;
    const frameRows = 4;
    const frameWidth = Math.floor(base.width / frameCols);
    const frameHeight = Math.floor(base.height / frameRows);
    const safePad = 1;

    for (let i = 0; i < 20; i++) {
      const col = i % frameCols;
      const row = Math.floor(i / frameCols);

      const x = col * frameWidth + safePad;
      const y = row * frameHeight + safePad;
      const w = frameWidth - safePad * 2;
      const h = frameHeight - safePad * 2;

      const rect = new Rectangle(x, y, w, h);
      this.frameTextures.push(new Texture({ source: base.source, frame: rect }));
    }

    this.sprite = new Sprite(this.frameTextures[0]);
    this.sprite.anchor.set(0.5);
    this.sprite.x = this.app.renderer.width / 2;
    this.sprite.y = this.app.renderer.height / 2;
    this.sprite.scale.set(0.7);
    this.app.stage.addChild(this.sprite);

    const result = Math.floor(Math.random() * 20) + 1;
    this.result = result;
    this.animateRoll(result);
  }


  private animateRoll(finalResult: number) {
    if (!this.app) return;
    let frame = 0;
    const start = performance.now();
    const duration = 2500;

    const ticker = this.app.ticker;
    ticker.add(() => {
      const elapsed = performance.now() - start;
      const progress = elapsed / duration;
      const interval = Math.max(40, 200 * progress);

      if (elapsed % interval < 20) {
        frame = (frame + 1) % 20;
        this.sprite!.texture = this.frameTextures[frame];
      }

      if (elapsed >= duration) {
        ticker.stop();
        const finalIndex = (finalResult - 1) % 20;
        this.sprite!.texture = this.frameTextures[finalIndex];
        this.onRollComplete(finalResult);
      }
    });
  }

  private async onRollComplete(result: number) {
    try { await Haptics.vibrate({ duration: 100 }); } catch {}

    if (result === 1) this.verdict = 'criticalFail';
    else if (result === 20) this.verdict = 'criticalSuccess';
    else if (result >= this.orbPower) this.verdict = 'success';
    else this.verdict = 'fail';

    this.rolling = false;
    this.rolled = true;
  }

  close() {
    if (this.app) {
      this.app.destroy(true, { children: true });
      this.app = undefined;
    }
    this.visible = false;
    this.rolled = false;
  }
}
