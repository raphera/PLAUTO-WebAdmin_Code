import { Routes } from '@angular/router';
import { HomeComponent } from './inicio/inicio.component';
import { NewUserComponent } from './novo-usuario/novo-usuario.component';
import { EditUserComponent } from './editar-usuario/editar-usuario.component';
import { EditUserResolver } from './editar-usuario/editar-usuario.resolver';

export const rootRouterConfig: Routes = [
  { path: '', component: HomeComponent },
  { path: 'inicio', component: HomeComponent },
  { path: 'novo-usuario', component: NewUserComponent },
  { path: 'editar/:id', component: EditUserComponent, resolve:{data : EditUserResolver} }
];
