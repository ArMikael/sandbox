import {Component, OnInit, signal} from '@angular/core';
import {form, FormField, minLength, required, debounce, min} from '@angular/forms/signals';

interface BoardGame {
  title: string,
  publisher: string,
  designer: string,
  artist: string,
  year: number,
}

@Component({
  selector: 'app-signal-form',
  imports: [
    FormField
  ],
  templateUrl: './signal-form.html',
  styleUrl: './signal-form.scss',
})
export class SignalForm implements OnInit {
  boardGameModel = signal<BoardGame>({
    title: '',
    publisher: '',
    year: 0,
    designer: '',
    artist: ''
  });

  boardGameForm = form(this.boardGameModel, (path) => {
    required(path.title);
    minLength(path.title, 3);
    debounce(path.title, 500);

    required(path.publisher);
    minLength(path.publisher, 2);

    required(path.designer);
    minLength(path.designer, 2);

    required(path.year);
    min(path.year, 4);
  });

  ngOnInit() {
    this.boardGameForm.title().value.set('Oath');
    this.boardGameForm.designer().value.set('Cole Wehrle');
  }

  onSubmit(event: Event) {
    event.preventDefault();

    console.log(this.boardGameForm);
  }
}
