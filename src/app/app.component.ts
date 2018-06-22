import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  isLogged: boolean;

  constructor(private router: Router) {
    this.isLogged = false;
  }

  onLogIn () {
    this.isLogged = true;
  }

  onLogOut () {
    this.isLogged = false;
  }

  ngAfterViewInit(): void {
    document.addEventListener('backbutton', function(e) {
      if (document.getElementById('#homepage')) {
          e.preventDefault();
      }
   }, false);
  }
}
