import { Tenis } from './../Models/Tenis'
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
}

