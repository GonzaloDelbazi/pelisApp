import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  id: string;
  peliculas: Movie[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private peliculaService: PeliculasService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log(params.texto);
      this.id = params.texto;

      //Llamar servicio
      this.peliculaService.buscarPeliculas(params.texto).subscribe(movies => {
        console.log(movies);
        this.peliculas = movies;
      });
    });
  }

}
