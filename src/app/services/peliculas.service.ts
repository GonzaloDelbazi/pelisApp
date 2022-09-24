import { Injectable, EventEmitter, Output, Pipe } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, pipe } from 'rxjs';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import {catchError, map, tap} from 'rxjs/operators';
import { MovieDetails } from '../interfaces/movie-details';
import { CreditResponse } from '../interfaces/credits-response';


export interface Persona {
  nombre: string;
}
@Injectable({providedIn: 'root'})

export class PeliculasService {
  @Output() fav: EventEmitter<Movie> = new EventEmitter()
  // https://api.themoviedb.org/3/search/movie?api_key=37fbad42bc36e5a22302a1d4b9322e35&language=es-ES&page=1&include_adult=false
  private baseUrl = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando = false;

  private favoriteMovies = new BehaviorSubject<Movie[]>([]);
  favoriteMovies$ = this.favoriteMovies.asObservable();

  favoriteCount$: Observable<number> = this.favoriteMovies$.pipe(map(items => items.length))

  addFavoriteMovie(data: Movie) {
    this.favoriteMovies.next([...this.favoriteMovies.value, data]);
  }

  deleteFavoriteMovie(movie: Movie) {
    this.favoriteMovies.next(this.favoriteMovies.value.filter(currentMovie => currentMovie !== movie));
  }

  constructor(private http: HttpClient) { }

  get params() {
    return {
      api_key: '37fbad42bc36e5a22302a1d4b9322e35',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    };
  }

  resetCarteleraPage(){
    this.carteleraPage = 1;
  }

  getCartelera(): Observable<Movie[]> {

    if (this.cargando){
      return of([]);
    }
    this.cargando = true;
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing?`,
    {params: this.params}).pipe(
      map(resp => {
        resp.results.map((movie: Movie) => movie.fav = false)
        return resp.results
      }),
      tap(() => {
        this.carteleraPage += 1;
        this.cargando = false;
      })
    );
  }

  buscarPeliculas(movieName: string): Observable<Movie[]>{

    const params = {...this.params, page: '1', query: movieName};

    return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie?`, {
      params}).pipe(map ( resp => resp.results));

  }

  getPeliculaDetalle(id: string){
    return this.http.get<MovieDetails>(`${this.baseUrl}/movie/${id}`, {params: this.params})
    .pipe(catchError( err => of(null))
    );
  }

  getCast(id: string){
    return this.http.get<CreditResponse>(`${this.baseUrl}/movie/${id}/credits?`, {params: this.params})
    .pipe(map(resp => resp.cast));
  }


}
