import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { GamesService } from 'src/app/services/games/games.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  loading: boolean = false;
  actionError: string | undefined;

  constructor(
    private gamesService: GamesService,
    private router: Router
  ) {
    this.gamesService.getState.subscribe((state) => {
      this.loading = state.loading;
      this.actionError = state.error?.message;
    });
  }

  ngOnInit(): void {
    this.gamesService.loadList();
  }

  addgameform = new FormGroup({
    title: new FormControl('', { 
      nonNullable: true, 
      validators: [Validators.required] 
    }),
    description: new FormControl('', { 
      nonNullable: true, 
      validators: [Validators.required] 
    }),
    releaseDate: new FormControl('', { 
      nonNullable: true, 
      validators: [Validators.required] 
    }),
    image: new FormControl('', {
      nonNullable: true, 
      validators: [Validators.required] 
    }),
    rating: new FormControl('', {
      nonNullable: true, 
      validators: [Validators.required] 
    }),
    downloads: new FormControl('', {
      nonNullable: true, 
      validators: [Validators.required] 
    }),
    comingSoon: new FormControl('', {
      nonNullable: true, 
      validators: [Validators.required] 
    }),
  });

  async onAdd() {
    if (!this.addgameform.valid) {
      this.addgameform.markAllAsTouched();
      this.actionError = 'Ingrese todos los campos';
      return;
    }

    const title = this.addgameform.get('title')!.value;
    const description = this.addgameform.get('description')!.value;
    const image = this.addgameform.get('image')!.value;
    const rating = Number(this.addgameform.get('rating')!.value);
    const downloads = Number(this.addgameform.get('downloads')!.value);
    const releaseDate = this.addgameform.get('releaseDate')!.value;
    const comingSoon = this.addgameform.get('comingSoon')!.value === 'true';

    try {
      await this.gamesService.addGameToList({
        title,
        description,
        image,
        rating,
        downloads,
        releaseDate,
        comingSoon
      });
      this.onBack();
    } catch (err: any) {
      this.addgameform.markAllAsTouched();
      this.actionError = err?.message;
    }
  }

  onBack = () => this.router.navigate(['/','module-home', 'home', 'dashboard']);

}
