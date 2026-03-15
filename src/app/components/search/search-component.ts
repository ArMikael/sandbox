import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-search',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './search-component.html',
  styleUrl: './search-component.scss',
})
export class SearchComponent implements OnInit {
  http = inject(HttpClient);
  searchField = new FormControl();
  searchValue = signal<string>('');

  ngOnInit() {
    this.searchField.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(searchValue => {
        return this.http.get(`/api/search?q=${searchValue}`)
            .pipe(
              catchError(error => {
                console.error(error);
                return of([]);
              })
            )
        }),
      takeUntilDestroyed()
    ).subscribe(response => {
      console.log(response);
    })
  }
}
