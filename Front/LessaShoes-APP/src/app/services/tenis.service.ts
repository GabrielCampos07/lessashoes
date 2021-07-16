import { Tenis } from './../Models/Tenis'
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()

export class tenis {
  BaseURL = 'https://localhost:5001/api/tenis';

  constructor(private http: HttpClient) {}


  public getTenis() : Observable<Tenis[]>
  {
    return this.http.get<Tenis[]>(this.BaseURL);
  }

  public getTenisByNome(nome: string) : Observable<Tenis[]>
  {
    return this.http.get<Tenis[]>(`${this.BaseURL}/${nome}/nome`);
  }

  public getTenisById(id: number) : Observable<Tenis>
  {
    return this.http.get<Tenis>(`${this.BaseURL}/${id}`);
  }

  public post(tenis: Tenis) : Observable<Tenis>
  {
    return this.http
    .post<Tenis>(this.BaseURL, tenis)
    .pipe(take(1));
  }

  public put(id: number, tenis: Tenis) : Observable<Tenis>
  {
    return this.http
    .put<Tenis>(`${this.BaseURL}/${id}`, tenis)
    .pipe(take(1));
  }

  public delete(id: number) : Observable<any>
  {
    return this.http
    .delete(`${this.BaseURL}/${id}`)
    .pipe(take(1));
  }
}

