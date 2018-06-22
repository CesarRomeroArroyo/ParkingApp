import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { LoginComponent } from './componentes/login/login.component';

const APP_ROUTES: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: '**', pathMatch: 'full', redirectTo: ''}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});
