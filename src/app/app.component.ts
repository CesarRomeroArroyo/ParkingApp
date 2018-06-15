import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLogged: boolean;

  constructor() {
    this.isLogged = false;
  }
  onLogIn ($event) {
    this.isLogged = true;
  }

  onLogOut ($event) {
    this.isLogged = false;
  }
}
