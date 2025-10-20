import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, OnInit, OnDestroy, ViewChild, ElementRef, NgZone } from '@angular/core';
import { OVERLAY_BACKGROUNDS, OverlayKind, OverlayInstance } from '../models/overlays.model';
import {ActionType} from '../models/actions';
import { Subscription, take } from 'rxjs';
import { ActionService } from '../services/action.service';

@Component({
  selector: 'app-overlay-window',
  templateUrl: './overlay-window.component.html',
  styleUrls: ['./overlay-window.component.scss']
})
export class OverlayWindowComponent implements OnChanges, OnInit, OnDestroy {
  @Input() kind!: OverlayKind;
  @Input() data!: OverlayInstance;

  @Output() close = new EventEmitter<void>();
  @Output() actionSelected = new EventEmitter<ActionType>();

  @ViewChild('bodyContainer') bodyContainer!: ElementRef<HTMLDivElement>;

  mainTitle: string = '';
  displayedTitle: string = '';
  displayedDescription: string = '';
  private titleIndex = 0;
  private descIndex = 0;
  public writingTitle = false;
  public writingDesc = false;
  private subs: Subscription[] = [];

  constructor(private actionService: ActionService, private zone: NgZone) {}

  ngOnInit() {
    this.subs.push(
      this.actionService.passiveText$.subscribe(msg => {
        this.appendPassiveText(msg);
      })
    );
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.data) {
      this.startTypingAnimation();
    }
  }

  get backgroundUrl(): string {
    return OVERLAY_BACKGROUNDS[this.kind] ?? 'assets/overlays/backgrounds/default.png';
  }

  onAction(action: ActionType) {
    this.actionSelected.emit(action);
  }

  continue() {
    this.onAction(ActionType.Explore)
  }

  quit() {
    this.onAction(ActionType.Avoid)
  }

  private startTypingAnimation() {
    if(!this.mainTitle) this.mainTitle = this.data.name;
    const title = this.data.eventChain?.[this.data.currentFloor!]?.title || this.data.name;
    const desc = this.data.eventChain?.[this.data.currentFloor!]?.description || this.data.description;

    this.displayedTitle = '';
    this.displayedDescription = '';
    this.titleIndex = 0;
    this.descIndex = 0;

    this.writingTitle = true;
    this.writingDesc = false;

    const titleInterval = setInterval(() => {
      if (this.titleIndex < title.length) {
        this.displayedTitle += title[this.titleIndex++];
      } else {
        clearInterval(titleInterval);
        this.writingTitle = false;
        this.writingDesc = true;
        setTimeout(() => this.typeDescription(desc), 400);
      }
    }, 60);
  }

  private typeDescription(desc: string) {
    const descInterval = setInterval(() => {
      if (this.descIndex < desc.length) {
        this.displayedDescription += desc[this.descIndex++];
        this.scrollToBottom();
      } else {
        clearInterval(descInterval);
        this.writingDesc = false;
      }
    }, 60);
  }

  private appendPassiveText(msg: string) {
    const textToAdd = `\n\n${msg}`;
    let i = 0;

    const interval = setInterval(() => {
      if (i < textToAdd.length) {
        this.displayedDescription += textToAdd[i++];
        this.scrollToBottom();
      } else {
        clearInterval(interval);
      }
    }, 60);
  }

  private scrollToBottom() {
    const el = this.bodyContainer?.nativeElement;
    if (el) {
      this.zone.onStable.pipe(take(1)).subscribe(() => {
        el.scrollTop = el.scrollHeight;
      });
    }
  }

  trackByAction(index: number, action: string) {
    return action; // la valeur sert d'identifiant unique
  }

  getConsequence(action: string): string {
    switch (action.toLowerCase()) {
      case 'fight': return 'Engage in combat.';
      case 'flee': return 'Try to escape the danger.';
      case 'trade': return 'Open a shop interface.';
      case 'rest': return 'Recover HP and MP.';
      default: return 'Take this action.';
    }
  }
}
