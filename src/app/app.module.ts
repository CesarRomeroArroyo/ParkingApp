import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { environment } from '../environments/environment';
import { LoginComponent } from './componentes/login/login.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { VehiculoSeleccionadoModalComponent } from './componentes/shared/vehiculo-seleccionado-modal/vehiculo-seleccionado-modal.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';

import { APP_ROUTING } from './app.routes';
import { AppSettings } from './app.settings';
import { ParkingappComponent } from './componentes/parkingapp/parkingapp.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    VehiculoSeleccionadoModalComponent,
    UsuarioComponent,
    ParkingappComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [
    AppSettings
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
