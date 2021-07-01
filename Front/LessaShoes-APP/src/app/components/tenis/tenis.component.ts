import { style } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Tenis } from 'src/app/Models/Tenis';
import { tenis } from 'src/app/services/tenis.service';

@Component({
  selector: 'app-tenis',
  templateUrl: './tenis.component.html',
  styleUrls: ['./tenis.component.css'],
})
export class TenisComponent implements OnInit {
  constructor(private TenisService: tenis) {}

  public tenisFiltrados: Tenis[] = [];
  public tenis: Tenis[] = [];


  public margemImagem: number = 30;
  public larguraImagem: number = 30;
  public exibirImagem: boolean = true;
  public titulo = "Busca de Tenis";
  public color: string = 'white';
  public bgBlack: string = 'black';

  private _filtroLista = '';


  public get filtroLista(): string {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.tenisFiltrados = this.filtroLista
      ? this.filtrarTenis(this.filtroLista)
      : this.tenis;
  }

  public filtrarTenis(filtrarPor: string): Tenis[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.tenis.filter(
      (tenis) => tenis.nomeTenis.toLocaleLowerCase().indexOf(filtrarPor) != -1
    );
  }
  public alternarImagem() : void {
    if (!this.exibirImagem) {
      this.color = 'white';
      this.bgBlack = 'black';
    } else {
      this.color = 'black';
      this.bgBlack = 'white';
    }

    this.exibirImagem = !this.exibirImagem;
  }

  public ngOnInit() {
    this.getTenis();
  }

  public getTenis(): void {
    this.TenisService.getTenis().subscribe(
      (_Tenis: Tenis[]) => {
        this.tenis = _Tenis;
        this.tenisFiltrados = this.tenis;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
