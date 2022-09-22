import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeliculasService } from './peliculas.service';



@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    PeliculasService
  ]
})
export class CoreModule { }
