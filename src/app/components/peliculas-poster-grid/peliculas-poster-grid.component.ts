import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { PeliculasService, Persona } from 'src/app/services/peliculas.service';
import { Observable } from 'rxjs'
import { Movie } from 'src/app/interfaces/cartelera-response';

@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.css']
})
export class PeliculasPosterGridComponent implements OnInit {
  public data$: Persona
  
  @Input() movies: Movie;
  @Output() fav: EventEmitter<Movie> = new EventEmitter()

  constructor(private router: Router, private pelisService: PeliculasService) { }

  ngOnInit(): void {
     console.log(this.movies);
  }
  
  onMovieClick(movie: Movie) {
    this.router.navigate(['/pelicula', movie.id ]);
  }

  saveFav(movie: Movie) {
    this.fav.emit(movie)
    // console.log('hola')
    // this.pelisService.SharingFavsPrivate = movie
    // this.data$ = this.pelisService.sharingFavsData
    // console.log(this.data$)
  }

}
