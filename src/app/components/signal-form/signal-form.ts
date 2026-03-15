import { Component, OnInit, signal } from '@angular/core';
import {form, FormField, minLength, required, debounce, Schema, schema, apply} from '@angular/forms/signals';
import { InputText } from 'primeng/inputtext';
import { ButtonDirective } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { BoardGame } from '../../models/interfaces';


// We can define all validators and messages as a schema to apply it on multiple fields at the same time.
const textInputSchema: Schema<string> = schema<string>((path) => {
  required(path, { message: 'This field is required!' });
  minLength(path, 3, { message: 'The value is too short!' });
});


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
    artist: '',
    url: ''
  });

  boardGameForm = form(this.boardGameModel, (path) => {
    required(path.title);
    minLength(path.title, 3);
    debounce(path.title, 500);

    required(path.publisher, { message: 'Publisher is a required field.' });
    minLength(path.publisher, 2, { message: 'Publisher length should be at least 2 characters.' });

    apply(path.designer, textInputSchema);
    apply(path.artist, textInputSchema);
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
