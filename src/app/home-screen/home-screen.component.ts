import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent {
  constructor(private router: Router) {}

startGame() {
  this.router.navigate(['/start']);
}
}
