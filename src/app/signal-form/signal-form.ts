import {Component, OnInit, signal} from '@angular/core';
import {form, FormField, minLength, required, debounce} from '@angular/forms/signals';
import {InputText} from 'primeng/inputtext';
import {ButtonDirective} from 'primeng/button';
import {FormsModule} from '@angular/forms';

interface BoardGame {
  title: string,
  publisher: string,
  designer: string,
  artist: string,
  year?: number,
}

@Component({
  selector: 'app-signal-form',
  imports: [
    FormField,
    InputText,
    ButtonDirective,
    FormsModule
  ],
  providers: [],
  templateUrl: './signal-form.html',
  styleUrl: './signal-form.scss',
})
export class SignalForm implements OnInit {
  boardGameModel = signal<BoardGame>({
    title: '',
    publisher: '',
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
  });

  ngOnInit() {
    this.boardGameForm.title().value.set('Oath');
    this.boardGameForm.publisher().value.set('Leather Games');
    this.boardGameForm.designer().value.set('Cole Wehrle');
  }

  onSubmit(event: Event) {
    event.preventDefault();

    console.log(this.boardGameForm);
  }
}
