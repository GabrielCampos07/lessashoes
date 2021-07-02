import { style } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from "ngx-spinner";


import { Tenis } from 'src/app/Models/Tenis';
import { tenis } from 'src/app/services/tenis.service';

@Component({
  selector: 'app-tenis',
  templateUrl: './tenis.component.html',
  styleUrls: [
  './tenis.component.css',],
})
export class TenisComponent implements OnInit {


  constructor(private TenisService: tenis,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService) {}

  public tenisFiltrados: Tenis[] = [];
  public tenis: Tenis[] = [];


  public margemImagem: number = 30;
  public larguraImagem: number = 30;
  public exibirImagem: boolean = true;
  public titulo = "Busca de Tenis";
  public color: string = 'white';
  public bgBlack: string = 'black';
  public botaoPadrao : string []= [
    'background: black',
    'color: white'
  ]

  private _filtroLista = '';

  public ngOnInit() {
    this.getTenis();
    this.spinner.show();
  }

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


  public getTenis(): void {
    this.TenisService.getTenis().subscribe(
      (_Tenis: Tenis[]) => {
        this.tenis = _Tenis;
        this.tenisFiltrados = this.tenis;
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        this.toastr.error("Erro ao carregar os Tenis")
      },

    );
  }

  modalRef = {} as BsModalRef;
  openModal(template: TemplateRef<any>) : void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.toastr.success('O tenis foi excluido.', 'Sucesso!');
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }
}

