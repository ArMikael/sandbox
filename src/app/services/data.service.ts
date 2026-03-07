import {inject, Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService<T extends { id: string }> {
  private http = inject(HttpClient);

  getData(id: string): Observable<T> {
    return this.http.get<T>(`/api/resource/${id}`);
  }
}
