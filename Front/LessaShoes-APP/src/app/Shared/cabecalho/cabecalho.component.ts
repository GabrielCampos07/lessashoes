import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.scss']
})
export class CabecalhoComponent implements OnInit {

  @Input() titulo: string = "";
  @Input() iconeClasse = 'fas fa-user';
  @Input() mostrarBotao : boolean = false;
  @Input() subtitulo : string = "";

  public fundoPreto: string = 'black';
  public corBranca: string = 'white';
  public mostrarLista : boolean = true;


  constructor(private router: Router) { }

  ngOnInit() {
  }


  listar() : void
  {
    if (this.mostrarLista) {
      this.router.navigate([`/${this.titulo.toLocaleLowerCase()}/lista`]);
    }
    else {
      this.router.navigate([`/${this.titulo.toLocaleLowerCase()}`]);
  }
    this.mostrarLista = !this.mostrarLista;
}
}
