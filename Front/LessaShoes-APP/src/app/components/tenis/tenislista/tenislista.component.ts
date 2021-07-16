import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { Tenis } from 'src/app/Models/Tenis';
import { tenis } from 'src/app/services/tenis.service';

@Component({
  selector: 'app-tenislista',
  templateUrl: './tenislista.component.html',
  styleUrls: ['./tenislista.component.scss'],
})
export class TenislistaComponent implements OnInit {
  constructor(
    private TenisService: tenis,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  public tenisFiltrados: Tenis[] = [];
  public tenis: Tenis[] = [];
  public tenisID = 0;

  public margemImagem: number = 30;
  public larguraImagem: number = 30;
  public exibirImagem: boolean = true;

  public corBranca: string = 'white';
  public fundoPreto: string = 'black';
  public botaoPadrao: string[] = [
    'border-radius: 50px',
    'background: black',
    'color: white',
  ];

  private _filtroLista: string = '';

  public ngOnInit() {
    this.getTenis();
    this.spinner.show();
  }

  public get filtroLista(): string {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
  }

  public buscar(): Tenis[] {
    return (this.tenisFiltrados = this.filtroLista
      ? this.filtrarTenis(this.filtroLista)
      : this.tenis);
  }

  public filtrarTenis(filtrarPor: string): Tenis[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.tenis.filter(
      (tenis) => tenis.nomeTenis.toLocaleLowerCase().indexOf(filtrarPor) != -1
    );
  }

  public alternarImagem(): void {
    if (!this.exibirImagem) {
      this.corBranca = 'white';
      this.fundoPreto = 'black';
    } else {
      this.corBranca = 'black';
      this.fundoPreto = 'white';
    }

    this.exibirImagem = !this.exibirImagem;
  }

  public getTenis(): void {
    this.TenisService.getTenis()
      .subscribe(
        (_Tenis: Tenis[]) => {
          this.tenis = _Tenis;
          this.tenisFiltrados = this.tenis;
        },
        (error) => {
          this.toastr.error('Erro ao carregar os Tenis');
        }
      )
      .add(() => this.spinner.hide());
  }

  modalRef = {} as BsModalRef;

  public openModal(template: TemplateRef<any>, tenisID: number): void {
    this.tenisID = tenisID;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  public tenisAtulizar(id: number): void {
    this.router.navigate([`tenis/detalhe/${id}`]);
  }

  public confirm(): void {
    this.modalRef.hide();
    this.spinner.show();

    this.TenisService.delete(this.tenisID)
      .subscribe(
        (result: any) => {
          this.toastr.success('O tenis foi excluido.', 'Sucesso!');
          this.getTenis();
        },
        (error: any) => {
          console.error(error);
          this.toastr.error(
            `Erro ao tentar deletar o evento ${this.tenisID}`,
            'Erro'
          );
        }
      )
      .add(() => this.spinner.hide());
  }

  public decline(): void {
    this.modalRef.hide();
  }
}
