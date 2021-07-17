import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../Models/Usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  baseURL = environment.apiURL + 'api/usuarios';

  constructor(private http: HttpClient) {}

  public getUsuario(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseURL);
  }

  public getUsuarioByID(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseURL}/${id}`);
  }

  public getUsuarioByName(nome: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseURL}/${nome}`);
  }

  public post(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.baseURL, usuario).pipe(take(1));
  }

  public put(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http
      .put<Usuario>(`${this.baseURL}/${id}`, usuario)
      .pipe(take(1));
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`).pipe(take(1));
  }

  public postUpload(usuarioId: number, arquivo: File[]): Observable<Usuario> {
    const arquivoUpload = arquivo[0] as File;
    const formData = new FormData();

    formData.append('arquivo', arquivoUpload);

    return this.http
      .post<Usuario>(`${this.baseURL}/upload/${usuarioId}`, formData)
      .pipe(take(1));
  }
}
