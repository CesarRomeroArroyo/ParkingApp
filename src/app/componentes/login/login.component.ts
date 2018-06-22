import { FirebaseService } from '../../servicios/firebase.service';
import {LocastorageService} from '../../servicios/locastorage.service';
import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { UserModel } from './../../modelos/userModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: UserModel;
  constructor( private service: FirebaseService, private local: LocastorageService, private router: Router) {
    this.user = new UserModel();
   }

  ngOnInit() {
    if (this.local.obtener('PARKING_USER')) {
      this.router.navigate(['/inicio']);
    }
  }

  onLogin() {
    this.service.obtenerDatosLogin(this.user.userEmail, this.user.userPassword).subscribe(
      data => {
        if (data.length > 0) {
          this.local.agregar('PARKING_USER', JSON.stringify(data));
          this.router.navigate(['/inicio']);
        } else {
          Swal('Oops...', 'Usuario no registrado', 'error');
        }
      }
    );
  }
}
