import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../servicios/firebase.service';
import { LocastorageService } from '../../servicios/locastorage.service';
import { UserModel } from 'src/app/modelos/userModel';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  user: UserModel;
  constructor(private service: FirebaseService, private local: LocastorageService, private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(this.local.obtener('PARKING_USER'))[0];
    console.log(this.user);
  }

  cerrarSesion() {
    Swal({
      title: '',
      text: 'Esta seguro de cerrar sesion?',
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.local.eliminar('PARKING_USER');
        this.router.navigate(['/login']);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

}
