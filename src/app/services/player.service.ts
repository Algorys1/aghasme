import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  hp = 100;
  xp = 0;
  actions = ['Attaquer', 'Explorer', 'Inventaire'];

  gainXP(amount: number) {
    this.xp += amount;
  }

  takeDamage(amount: number) {
    this.hp = Math.max(0, this.hp - amount);
  }
}
