import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartGame } from './start-game.component';

describe('StartGame', () => {
  let component: StartGame;
  let fixture: ComponentFixture<StartGame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartGame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartGame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
