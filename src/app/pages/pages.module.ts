import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PeliculaComponent } from './pelicula/pelicula.component';
import { BuscarComponent } from './buscar/buscar.component';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';
import { FavsComponent } from './favs/favs.component';
import { CoreModule } from '../services/core.module';

@NgModule({
  declarations: [HomeComponent, PeliculaComponent, BuscarComponent, FavsComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    PipesModule,
    CoreModule
  ]
})
export class PagesModule { }
