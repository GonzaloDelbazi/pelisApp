import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PeliculaComponent } from './pages/pelicula/pelicula.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { FavsComponent } from './pages/favs/favs.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'favorites', component: FavsComponent},
  {path: 'pelicula/:id', component: PeliculaComponent},
  {path: 'buscar/:texto', component: BuscarComponent},
  {path: '**', pathMatch:'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
