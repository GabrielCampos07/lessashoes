import { style } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tenis',
  templateUrl: './tenis.component.html',
  styleUrls: ['./tenis.component.css'],
})
export class TenisComponent implements OnInit {
  constructor(private http: HttpClient) {}

  margemImagem: number = 30;
  larguraImagem: number = 30;
  exibirImagem: boolean = true;
  _filtroLista = '';
  tenisFiltrados: any = [];
  tenis: any = [];
  color: string = 'white';
  bgBlack: string = 'black';

  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.tenisFiltrados = this.filtroLista
      ? this.filtrarTenis(this._filtroLista)
      : this.tenis;
  }

  filtrarTenis(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.tenis.filter(
      (tenis: { nome: string }) =>
        tenis.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }
  alternarImagem() {
    if(!this.exibirImagem)
    {
      this.color = 'white'
      this.bgBlack = 'black'
    }
    else
    {
      this.color = 'black'
      this.bgBlack = 'white'
    }

    this.exibirImagem = !this.exibirImagem;
  }

  ngOnInit() {
    this.getTenis();
  }

  getTenis() {
    this.http.get('https://localhost:5001/api').subscribe(
      (Response) => {
        this.tenis = Response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
