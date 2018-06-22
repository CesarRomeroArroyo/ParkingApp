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
  parkingsSearch: ParkingModel[];
  pakingSelect: ParkingModel;
  user: UserModel;
  vehiculos: VehicleModel[];
  getParking: boolean;
  parkingKey: number;
  constructor(private service: FirebaseService, private local: LocastorageService) { }

  ngOnInit() {
    this.getParking = false;
    this.user = JSON.parse(this.local.obtener('PARKING_USER'))[0];
    this.service.obtenerParqueaderos().subscribe(
      data => {
        this.parkings = data;
        this.parkingsSearch = this.parkings;
      }
    );
    $('.button-collapse').sideNav({
        menuWidth: 270,
        edge: 'left',
        closeOnClick: true,
        draggable: true,
        onOpen: function(el) { },
        onClose: function(el) { }
      }
    );
  }

  tomarParqueadero(parking) {
    Swal({
      title: '',
      text: 'Esta seguro de tomar el parqueadero?',
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        parking.userInParking = this.user;
        parking.parkingState = false;
        this.vehiculos = parking.userInParking.userVehicles;
        this.pakingSelect = parking;
        $('#modalVehiculo').modal('open');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  guardarParqueaderoTomado($event) {
    console.log('guardar parking ' , $event);
    this.pakingSelect.userVehicle = $event;
    this.getParking = true;
    this.service.actualizarDatos('parking', this.pakingSelect, this.pakingSelect.id);
  }

  desocuparParqueadero(parking) {
    Swal({
      title: '',
      text: 'Esta seguro de desocupar el parqueadero?',
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        parking.parkingState = true;
        parking.userInParking = '';
        parking.userVehicle = '';
        this.getParking = false;
        this.service.actualizarDatos('parking', parking, parking.id);
        Swal('', 'Has liberado el parqueadero', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  validarBotonDesocupar(parking) {
    if (!parking.userInParking) {
      return false;
    }
    const retorno = (this.user.id === parking.userInParking.id && !parking.parkingState);
    return retorno;
  }

  validarBotonMensaje(parking) {
    const retorno = (this.user.id !== parking.userInParking.id && !parking.parkingState);
    return retorno;
  }

  validarBotonTomar(parking) {
    if (this.validarOcupado()) {
      return false;
    }
    const retorno = this.validarBotonDesocupar(parking) === false && this.validarBotonMensaje(parking) === false;
    return retorno;
  }

  validarOcupado() {
    for (const park of this.parkings) {
      if (park.userInParking.id === this.user.id && !park.parkingState) {
        return true;
      }
    }
    return false;
  }

  buscarParqueadero() {

  }

}
