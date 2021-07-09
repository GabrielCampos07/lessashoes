import { Component, OnInit, TemplateRef } from '@angular/core';
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
    private spinner: NgxSpinnerService
  ) {}

  public tenisFiltrados: Tenis[] = [];
  public tenis: Tenis[] = [];

  public margemImagem: number = 30;
  public larguraImagem: number = 30;
  public exibirImagem: boolean = true;

  public titulo = 'Busca de Tenis';

  public corBranca: string = 'white';
  public fundoPreto: string = 'black';
  public botaoPadrao: string[] = [
    'border-radius: 50px',
    'background: black',
    'color: white',
  ];

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
    this.TenisService.getTenis().subscribe(
      (_Tenis: Tenis[]) => {
        this.tenis = _Tenis;
        this.tenisFiltrados = this.tenis;
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar os Tenis');
      }
    );
  }

  modalRef = {} as BsModalRef;
  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.toastr.success('O tenis foi excluido.', 'Sucesso!');
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }
}
