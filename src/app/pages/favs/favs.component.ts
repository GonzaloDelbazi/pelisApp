import { Component, OnInit } from '@angular/core';
import { PeliculasService, Persona } from 'src/app/services/peliculas.service';
import { Observable } from 'rxjs'
import { Movie } from 'src/app/interfaces/cartelera-response';

@Component({
  selector: 'app-favs',
  templateUrl: './favs.component.html',
  styleUrls: ['./favs.component.css']
})
export class FavsComponent implements OnInit {
  public data$: Observable<Movie[]>;

  constructor(private pelisService: PeliculasService) {
    this.data$ = this.pelisService.favoriteMovies$;
    console.log(this.data$)
  }

  ngOnInit(): void {

  }
  refresh() {
  }

}
