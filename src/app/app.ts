import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarFormComponent } from './components/car-form/car-form-component';
import { CarListComponent } from './components/car-list/car-list-component';
import { MenubarModule } from 'primeng/menubar';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CarFormComponent, CarListComponent, MenubarModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('sandbox');

  menuList = [
    {
      label: 'Board Games',
      url: '/board-games'
    },
    {
      label: 'Cars',
      url: '/cars'
    },
  ];
}
