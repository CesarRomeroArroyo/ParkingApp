import { FirebaseService } from '../../servicios/firebase.service';
import {LocastorageService} from '../../servicios/locastorage.service';

import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { UserModel } from './../../modelos/userModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() logIn = new EventEmitter<void>();
  user: UserModel;
  constructor( private service: FirebaseService, private local: LocastorageService) {
    this.user = new UserModel();
   }

  ngOnInit() {
    if (this.local.obtener('PARKING_USER')) {
      this.logIn.emit();
    }
  }

  onLogin() {
    this.service.obtenerDatosLogin(this.user.userEmail, this.user.userPassword).subscribe(
      data => {
        if (data.length > 0) {
          this.local.agregar('PARKING_USER', JSON.stringify(data));
        } else {
          Swal('Oops...', 'Usuario no registrado', 'error');
        }
      }
    );
  }
}
