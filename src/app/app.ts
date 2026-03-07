import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignalForm } from './components/signal-form/signal-form';
import {CarFormComponent} from './components/car-form/car-form-component';
import {CarListComponent} from './components/car-list/car-list-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SignalForm, CarFormComponent, CarListComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('sandbox');
}
