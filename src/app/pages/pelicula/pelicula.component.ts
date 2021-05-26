import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { MovieDetails } from '../../interfaces/movie-details';
import { Location } from '@angular/common';
import { CreditResponse } from 'src/app/interfaces/credits-response';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { subscribeOn } from 'rxjs/operators';
import { Movie } from '../../interfaces/cartelera-response';
import { Cast } from '../../interfaces/credits-response';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public pelicula: MovieDetails;
  public cast: Cast[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private peliculasService: PeliculasService,
              private location: Location,
              private router: Router) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.peliculasService.getPeliculaDetalle(id).subscribe(resp => {

      if (!resp){

        this.router.navigateByUrl('/home');
        return;
      }
      this.pelicula  = resp;
    });

    this.peliculasService.getCast(id).subscribe(resp => {
      console.log(resp);
      this.cast = resp;
    });

  }
  onRegresar(){

    this.location.back();
  }



}
