import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import IGame from '../../interfaces/games/game.interface';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent {
  @Input() game?: IGame;
  @Output() buyEvent: EventEmitter<IGame> = new EventEmitter<IGame>();

  constructor() { }

  onBuy() {
    this.buyEvent.emit(this.game);
  }

}
