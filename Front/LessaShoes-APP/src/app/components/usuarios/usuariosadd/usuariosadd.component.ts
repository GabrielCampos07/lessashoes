import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuariosadd',
  templateUrl: './usuariosadd.component.html',
  styleUrls: ['./usuariosadd.component.scss']
})
export class UsuariosaddComponent implements OnInit {

  public estadoSalvar = 'post';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public carregarTenis(): void{
  }

}
