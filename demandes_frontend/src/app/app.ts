import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DemandesComponent } from './pages/demandes-component/demandes-component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DemandesComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('demandes_ui');
}
