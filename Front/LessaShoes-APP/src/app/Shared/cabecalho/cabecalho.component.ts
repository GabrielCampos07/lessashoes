import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.scss']
})
export class CabecalhoComponent implements OnInit {

  @Input() titulo: any;
  @Input() iconeClasse = 'fas fa-user';

  public fundoPreto: string = 'black';

  constructor() { }

  ngOnInit() {
  }

}
