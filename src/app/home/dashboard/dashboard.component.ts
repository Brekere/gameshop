import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from 'src/app/services/games/games.service';

import IGame from 'src/app/interfaces/games/game.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  games: IGame[] = [];
  filteredGames: IGame[] = [];
  loading: boolean = false;
  error: Error | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private gamesService: GamesService
  ) {
    this.gamesService.getState.subscribe((state) => {
      this.games = state.data;
      this.loading = state.loading;
      this.error = state.error;
    });
  }

  async ngOnInit(): Promise<void> {
    await this.gamesService.loadList();
    const path = this.route.snapshot.routeConfig?.path;
    console.log(path);
    switch (path) {
      case 'dashboard/popular':
        this.filterByPopular();
        break;
      case 'dashboard/most_downloads':
        this.filterByMostDowloaded();
        break;
      case 'dashboard/comming_soon':
        this.filterByComingSoon();
        break;
      default:
        this.filteredGames = this.games;
        break;
    }
  }

  filterByPopular() {
    const f = this.games.filter((g) => g.rating >= 4);
    this.filteredGames = f;
    console.log(f)
  }

  filterByMostDowloaded() {
    const f = this.games.filter((g) => g.downloads > 100);
    this.filteredGames = f;
    console.log(f)
  }

  filterByComingSoon() {
    const f = this.games.filter((g) => g.comingSoon == true);
    this.filteredGames = f;
    console.log(f)
  }

  onBuy(event: IGame) {
    console.log('Comprar: ', event);
  }
}
