import { Component } from '@angular/core';

// import { Login } from './components/login/login';
// import { Dashboard } from './components/dashboard/dashboard';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  // imports: [Login, Dashboard, RouterOutlet],
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {

}
