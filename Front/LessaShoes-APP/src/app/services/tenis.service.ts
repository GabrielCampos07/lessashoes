import { Tenis } from './../Models/Tenis'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()

export class tenis {
  BaseURL = environment.apiURL + 'api/tenis';
  tokenHeader = { } as HttpHeaders;

  constructor(private http: HttpClient) {
    this.tokenHeader = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('token')}`});
  }


  public getTenis() : Observable<Tenis[]>
  {
    return this.http.get<Tenis[]>(this.BaseURL, {headers: this.tokenHeader});
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
    .post<Tenis>(this.BaseURL, tenis, {headers: this.tokenHeader})
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

  public postUpload(tenisId: number, arquivo: File[]): Observable<Tenis> {
    const arquivoUpload = arquivo[0] as File;
    const formData = new FormData();

    formData.append('arquivo', arquivoUpload);

    return this.http
      .post<Tenis>(`${this.BaseURL}/upload/${tenisId}`, formData, {headers: this.tokenHeader})
      .pipe(take(1));
  }
}

