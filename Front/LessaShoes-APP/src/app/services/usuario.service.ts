import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../Models/Usuario';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  baseURL = 'https://localhost:5001/api/usuarios'

constructor(private http : HttpClient) { }

  public getUsuario() : Observable<Usuario[]>
  {
    return this.http.get<Usuario[]>(this.baseURL);
  }

  public getUsuarioByID(id : number) : Observable<Usuario>
  {
    return this.http.get<Usuario>(`${this.baseURL}/${id}`);
  }

  public getUsuarioByName(nome : string) : Observable<Usuario[]>
  {
    return this.http.get<Usuario[]>(`${this.baseURL}/${nome}`)
  }
}
