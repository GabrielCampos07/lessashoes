import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  BaseURL = environment.apiURL + 'api/usuario';
  ajudaJwt = new JwtHelperService();
  tokenDeco: any;

  constructor(private http: HttpClient) { }

  login(model: any)
  {
    return this.http.post(`${this.BaseURL}login`, model).pipe(
      map((Response: any) =>
      {
        const usuario = Response;
        if(usuario)
        {
          localStorage.setItem('token', usuario.token);
          this.tokenDeco = this.ajudaJwt.decodeToken(usuario.token);

        }
      })
    )
  }

  register(model: any)
  {
    return this.http.post(`${this.BaseURL}login`, model);
  }

  logado()
  {
    const token = JSON.parse(localStorage.getItem('token')!);

    return this.ajudaJwt.isTokenExpired(token);
  }
}
