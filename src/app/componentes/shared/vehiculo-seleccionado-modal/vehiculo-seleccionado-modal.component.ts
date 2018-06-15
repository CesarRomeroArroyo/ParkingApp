import { Component, OnInit, OnChanges, Input, Output, EventEmitter, AfterViewInit, SimpleChanges  } from '@angular/core';

import * as $ from 'jquery';
import * as $$ from 'materialize-css';
import { VehicleModel } from '../../../modelos/vehiclesModel';

declare var $: any;

@Component({
  selector: 'app-vehiculo-seleccionado-modal',
  templateUrl: './vehiculo-seleccionado-modal.component.html',
  styleUrls: ['./vehiculo-seleccionado-modal.component.css']
})
export class VehiculoSeleccionadoModalComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() vehiculos = new Array<VehicleModel>();
  @Output() vehiculeSeleted = new EventEmitter<string>();
  vehiculoSeleccionado: string;
  constructor() { }

  ngOnInit() {
    this.vehiculoSeleccionado = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngAfterViewInit(): void {
      $('#modalVehiculo').modal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        inDuration: 300, // Transition in duration
        outDuration: 200, // Transition out duration
        startingTop: '4%', // Starting top style attribute
        endingTop: '20%', // Ending top style attribute
        ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
        },
        complete: function() {  } // Callback for Modal close
      }
    );
  }

  seleccionarVehiculo() {
    this.vehiculeSeleted.emit(this.vehiculoSeleccionado);
    this.vehiculoSeleccionado = '';
  }
}
