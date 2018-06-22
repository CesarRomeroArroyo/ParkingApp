import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocastorageService } from '../../servicios/locastorage.service';

@Component({
  selector: 'app-parkingapp',
  templateUrl: './parkingapp.component.html',
  styleUrls: ['./parkingapp.component.css']
})
export class ParkingappComponent implements OnInit {

  constructor(private router: Router, private local: LocastorageService) { }

  ngOnInit() {
    if (!this.local.obtener('PARKING_USER')) {
      // this.router.navigate(['/login']);
    }
  }

}
