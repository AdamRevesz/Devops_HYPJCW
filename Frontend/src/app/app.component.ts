import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RPSComponent } from "./rps/rps.component";

@Component({
  selector: 'app-root',
  imports: [RPSComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'Devops_Frontend';
}
