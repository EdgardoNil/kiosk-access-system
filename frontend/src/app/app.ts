import { Component } from '@angular/core';

// Componente principal del kiosco
import { Kiosk } from './components/kiosk/kiosk';

@Component({
  selector: 'app-root',

  // Componentes usados en la aplicación
  imports: [Kiosk],

  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}