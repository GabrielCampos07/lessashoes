import { Component, OnInit } from '@angular/core';

import { Usuario } from 'src/app/Models/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  public usuarios : Usuario [] = []

  constructor(private usuarioService : UsuarioService) { }

  ngOnInit(): void {
  }

  public getUsuario() : void
  {
    this.usuarioService.getUsuario().subscribe(
      (_usuarios : Usuario[]) => {
        this.usuarios;
      },

      (error) => {
        "Não foi possível carregar o erro"
      }
    );
  }

}
