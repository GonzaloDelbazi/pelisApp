import { Component, OnInit } from '@angular/core';
import { PeliculasService, Persona } from 'src/app/services/peliculas.service';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-favs',
  templateUrl: './favs.component.html',
  styleUrls: ['./favs.component.css']
})
export class FavsComponent implements OnInit {
  public data$: Persona

  constructor(private pelisService: PeliculasService) {
    this.data$ = this.pelisService.sharingFavsData;
    console.log(this.data$)
  }

  ngOnInit(): void {
    
  }
  refresh() {
  }

}
