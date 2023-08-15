import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { sleep } from 'src/lib/utils';

import IGame from 'src/app/interfaces/games/game.interface';

interface GamesServiceState {
  data: IGame[]
  loading: boolean
  error: Error | undefined
}

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private state = new BehaviorSubject<GamesServiceState>({
    data: [],
    loading: false,
    error: undefined
  });

  constructor() { }

  // Get state
  getState = this.state.asObservable();
  // Setters
  private setList = (v: IGame[]) => this.state.next({ ...this.state.value, data: v });
  private setLoading = (v: boolean) => this.state.next({ ...this.state.value, loading: v });
  private setError = (v: Error | undefined) => this.state.next({ ...this.state.value, error: v });

  async loadList() {
    this.setLoading(true);
    try {
      await sleep(3000);
      if (this.state.value.data.length === 0) {
        this.setList([
          {
            title: 'Juego 1',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, et delectus? Quos rem minus, numquam architecto esse, quia, impedit velit facilis eaque voluptatibus nobis nostrum asperiores! Quisquam laborum dolorem a!',
            releaseDate: '01/01/2023',
            image: '../../../assets/images/games/juego1.jpg',
            rating: 5,
            downloads: 200, 
            comingSoon: false
          },
          {
            title: 'Juego 2',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, et delectus? Quos rem minus, numquam architecto esse, quia, impedit velit facilis eaque voluptatibus nobis nostrum asperiores! Quisquam laborum dolorem a!',
            releaseDate: '02/02/2023',
            image: '../../../assets/images/games/juego2.jpg',
            rating: 4,
            downloads: 150,
            comingSoon: true
          },
          {
            title: 'Juego 3',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, et delectus? Quos rem minus, numquam architecto esse, quia, impedit velit facilis eaque voluptatibus nobis nostrum asperiores! Quisquam laborum dolorem a!',
            releaseDate: '03/03/2023',
            image: '../../../assets/images/games/juego3.jpg',
            rating: 3,
            downloads: 100,
            comingSoon: true
          },
          {
            title: 'Juego 4',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, et delectus? Quos rem minus, numquam architecto esse, quia, impedit velit facilis eaque voluptatibus nobis nostrum asperiores! Quisquam laborum dolorem a!',
            releaseDate: '04/04/2023',
            image: '../../../assets/images/games/juego4.jpg',
            rating: 2,
            downloads: 50,
            comingSoon: true
          },
        ]);
      }
    } catch (e) {
      this.setError(new Error('Ocurrio un error al obtener la lista de productos.'));
    } finally {
      this.setLoading(false);
    }
  }

  async addGameToList(game: IGame) {
    this.setLoading(true);
    try {
      await sleep(1500);
      this.setList([...this.state.value.data, game]);
    } catch {
      this.setError(new Error('Ocurrio un error al tratar de agregar el producto.'));
    } finally {
      this.setLoading(false);
    }
  }
}
