import {
  Component, EventEmitter, Input, Output,
  OnChanges, SimpleChanges, OnInit, OnDestroy,
  ViewChild, ElementRef, NgZone
} from '@angular/core';
import { OverlayKind, OverlayInstance } from '../models/overlays.model';
import { ActionType } from '../models/actions';
import { Subscription, take } from 'rxjs';
import { ActionService } from '../services/action.service';
import {RestWindowComponent} from '../rest-window/rest-window.component';

@Component({
  selector: 'app-overlay-window',
  templateUrl: './overlay-window.component.html',
  imports: [
    RestWindowComponent
  ],
  styleUrls: ['./overlay-window.component.scss']
})
export class OverlayWindowComponent implements OnChanges, OnInit, OnDestroy {
  @Input() kind!: OverlayKind;
  @Input() data!: OverlayInstance;

  @Output() close = new EventEmitter<void>();
  @Output() actionSelected = new EventEmitter<ActionType>();

  @ViewChild('bodyContainer') bodyContainer!: ElementRef<HTMLDivElement>;

  mainTitle = '';
  displayedTitle = '';
  displayedDescription = '';

  private titleIndex = 0;
  private descIndex = 0;

  public writingTitle = false;
  public writingDesc = false;

  private subs: Subscription[] = [];

  private titleInterval?: ReturnType<typeof setInterval>;
  private descInterval?: ReturnType<typeof setInterval>;
  private passiveInterval?: ReturnType<typeof setInterval>;

  private lastOverlayId?: string;
  disabledActions = new Set<ActionType>();
  disableQuit = true;

  showRestWindow = false;

  constructor(private actionService: ActionService, private zone: NgZone) {}

  ngOnInit() {
    this.subs.push(
      this.actionService.passiveText$.subscribe(msg => this.appendPassiveText(msg)),
      this.actionService.enableQuit$.subscribe(() => this.disableQuit = false),
      this.actionService.restRequested$.subscribe(() => this.showRestWindow = true)
    );
  }

  ngOnDestroy() {
    this.clearAllIntervals();
    this.subs.forEach(s => s.unsubscribe());
  }

  ngOnChanges(changes: SimpleChanges) {
    const newData = changes['data']?.currentValue as OverlayInstance | undefined;
    if (!newData) return;

    if (this.lastOverlayId === newData.id && this.data?.currentFloor === newData.currentFloor) {
      return;
    }
    this.lastOverlayId = newData.id;

    const hasEventChain = !!newData.eventChain && Object.keys(newData.eventChain).length > 0;
    const hasBaseDescription = !!newData.description?.trim();

    if (hasEventChain || hasBaseDescription) {
      this.resetTyping();
      this.startTypingAnimation();
    }
  }

  isNarrativeType(): boolean {
    return ![OverlayKind.City, OverlayKind.Village, OverlayKind.Farm, OverlayKind.Forest, OverlayKind.Mine, OverlayKind.Portal].includes(this.kind);
  }

  isActionDisabled(action: ActionType): boolean {
    return (
      this.writingTitle ||
      this.writingDesc ||
      this.disabledActions.has(action) ||
      this.data?.disabledActions?.includes(action) ||
      false
    );
  }

  disableContinue(): boolean {
    if(this.data.eventChain?.[this.data.currentFloor ?? '']?.uniqueChoice)
      return this.disabledActions.size === 0;
    return false;
  }

  private resetTyping() {
    this.clearAllIntervals();
    this.displayedTitle = '';
    this.displayedDescription = '';
    this.titleIndex = 0;
    this.descIndex = 0;
    this.writingTitle = false;
    this.writingDesc = false;
    this.disabledActions.clear();
    this.data.disabledActions = [];
    this.disableQuit = this.isNarrativeType();
  }

  private startTypingAnimation() {
    if (!this.mainTitle) this.mainTitle = this.data.name;

    const current = this.data.eventChain?.[this.data.currentFloor ?? ''];
    const title = current?.title || this.data.name;
    const desc = current?.description || this.data.description || '';

    if (!desc.trim() || this.writingTitle || this.writingDesc) return;

    this.clearActiveTypingIntervals();
    this.displayedTitle = '';
    this.displayedDescription = '';
    this.titleIndex = 0;
    this.descIndex = 0;
    this.writingTitle = true;
    this.writingDesc = false;

    this.titleInterval = setInterval(() => {
      if (this.titleIndex < title.length) {
        this.displayedTitle += title[this.titleIndex++];
      } else {
        this.stopTyping('title');
        this.typeDescription(desc);
      }
    }, 45);
  }

  private typeDescription(desc: string) {
    this.stopTyping('desc'); // sécurité
    this.writingDesc = true;
    this.descInterval = setInterval(() => {
      if (this.descIndex < desc.length) {
        this.displayedDescription += desc[this.descIndex++];
        this.scrollToBottom();
      } else {
        this.stopTyping('desc');
        this.animateActionButtons();
      }
    }, 50);
  }

  private animateActionButtons() {
    const buttons = document.querySelectorAll('.action-btn');
    buttons.forEach(btn => {
      btn.classList.add('reactivated');
      setTimeout(() => btn.classList.remove('reactivated'), 500);
    });
  }

  onSkipText() {
    if (this.writingTitle) {
      const fullTitle = this.data.eventChain?.[this.data.currentFloor ?? '']?.title || this.data.name;
      this.displayedTitle += this.getRemainingText(this.displayedTitle, fullTitle);
      this.stopTyping('title');

      const desc = this.data.eventChain?.[this.data.currentFloor ?? '']?.description || this.data.description || '';
      this.typeDescription(desc);
    } else if (this.writingDesc) {
      const fullDesc = this.data.eventChain?.[this.data.currentFloor ?? '']?.description || this.data.description || '';
      this.displayedDescription += this.getRemainingText(this.displayedDescription, fullDesc);
      this.stopTyping('desc');
    }
  }

  private getRemainingText(current: string, full: string): string {
    return full.slice(current.length);
  }

  private appendPassiveText(msg: string) {
    const targetId = this.lastOverlayId;

    const addText = () => {
      if (this.lastOverlayId !== targetId) return;
      const textToAdd = `\n\n${msg}`;
      let i = 0;
      this.passiveInterval = setInterval(() => {
        if (this.lastOverlayId !== targetId) {
          clearInterval(this.passiveInterval);
          return;
        }
        if (i < textToAdd.length) {
          this.displayedDescription += textToAdd[i++];
          this.scrollToBottom();
        } else {
          this.stopTyping('passive');
        }
      }, 50);
    };

    if (this.writingDesc) {
      const wait = setInterval(() => {
        if (!this.writingDesc) {
          clearInterval(wait);
          addText();
        }
      }, 100);
    } else {
      addText();
    }
  }

  private scrollToBottom() {
    const el = this.bodyContainer?.nativeElement;
    if (el) {
      this.zone.onStable.pipe(take(1)).subscribe(() => {
        el.scrollTop = el.scrollHeight;
      });
    }
  }

  private stopTyping(type: 'title' | 'desc' | 'passive') {
    switch (type) {
      case 'title': clearInterval(this.titleInterval); this.writingTitle = false; break;
      case 'desc': clearInterval(this.descInterval); this.writingDesc = false; break;
      case 'passive': clearInterval(this.passiveInterval); break;
    }
  }

  private clearActiveTypingIntervals() {
    clearInterval(this.titleInterval);
    clearInterval(this.descInterval);
  }

  private clearAllIntervals() {
    this.clearActiveTypingIntervals();
    clearInterval(this.passiveInterval);
  }

  onAction(action: ActionType) {
    if (this.disabledActions.has(action)) return;
    this.disabledActions.add(action);
    this.actionSelected.emit(action);
  }

  continue() {
    this.clearAllIntervals();
    this.onAction(ActionType.Continue);
  }

  quit() {
    this.clearAllIntervals();
    this.onAction(ActionType.Quit);
  }

  trackByAction(_index: number, action: string) {
    return action;
  }

  getConsequence(action: string): string {
    switch (action.toLowerCase()) {
      case 'fight': return 'Engage in combat.';
      case 'flee': return 'Try to escape the danger.';
      case 'trade': return 'Open a shop interface.';
      case 'rest': return 'Recover HP and MP.';
      case 'pray': return 'Seek blessings or favors.';
      case 'talk': return 'Engage in conversation.';
      case 'harvest': return 'Gather resources.';
      case 'interact': return 'Interact with the environment.';
      case 'inspect': return 'Examine closely.';
      case 'observe': return 'Observe quietly';
      default: return 'Take this action.';
    }
  }
}
