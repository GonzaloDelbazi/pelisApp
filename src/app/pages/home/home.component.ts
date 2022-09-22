import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public movies: Movie[] = [];
  public moviesSlideShow: Movie[] = [];

  constructor(private peliculaService: PeliculasService) {
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(){

    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if (pos > max) {

      if (this.peliculaService.cargando) { return; }

      this.peliculaService.getCartelera().subscribe(movies => {

        this.movies.push(...movies);
      });

    }
  }


  ngOnDestroy(){
    this.peliculaService.resetCarteleraPage();
  }

  ngOnInit(): void {
    this.peliculaService.getCartelera().subscribe(movies => {
      this.movies = movies;
      this.moviesSlideShow = movies;
    });
  }

  newFavorite(movie: Movie) {
    console.log(movie)
  }
}
