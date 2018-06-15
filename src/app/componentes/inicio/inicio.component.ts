import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirebaseService } from '../../servicios/firebase.service';
import { LocastorageService } from '../../servicios/locastorage.service';

import { ParkingModel } from './../../modelos/parkingModel';
import { UserModel } from '../../modelos/userModel';
import { VehicleModel } from '../../modelos/vehiclesModel';


import Swal from 'sweetalert2';
import * as $ from 'jquery';
import * as $$ from 'materialize-css';

declare var $: any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  parkings: ParkingModel[];
  pakingSelect: ParkingModel;
  user: UserModel;
  vehiculos: VehicleModel[];
  getParking: boolean;
  constructor(private service: FirebaseService, private local: LocastorageService) { }

  ngOnInit() {
    this.getParking = false;
    this.user = JSON.parse(this.local.obtener('PARKING_USER'))[0];
    this.service.obtenerParqueaderos().subscribe(
      data => {
        this.parkings = data;
      }
    );
  }

  tomarParqueadero(parking) {
    parking.userInParking = this.user;
    parking.parkingState = false;
    this.vehiculos = parking.userInParking.userVehicles;
    this.pakingSelect = parking;
    $('#modalVehiculo').modal('open');
  }

  guardarParqueaderoTomado($event) {
    console.log('guardar parking ' , $event);
    this.pakingSelect.userVehicle = $event;
    this.getParking = true;
    this.service.actualizarDatos('parking', this.pakingSelect, this.pakingSelect.id);
  }

  desocuparParqueadero(parking) {
    parking.parkingState = true;
    parking.userInParking = '';
    this.getParking = false;
    this.service.actualizarDatos('parking', parking, parking.id);
    Swal('', 'Has liberado el parqueadero', 'success');
  }



  validarBotonDesocupar(parking) {
    if (!parking.userInParking) {
      return false;
    }
    return (this.user.id === parking.userInParking.id && !parking.parkingState);
  }

  validarBotonMensaje(parking) {
    return (this.user.id !== parking.userInParking.id && parking.parkingState && this.getParking);
  }

}
