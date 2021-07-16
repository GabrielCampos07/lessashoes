import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/Models/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuarioslista',
  templateUrl: './usuarioslista.component.html',
  styleUrls: ['./usuarioslista.component.scss'],
})
export class UsuarioslistaComponent implements OnInit {
  constructor(
    private usuarioService: UsuarioService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private router: Router
  ) {}

  public usuario = {} as Usuario;
  public usuarios: Usuario[] = [];
  public usuariosListados: Usuario[] = [];
  private _filtroLista: string = '';
  public usuarioID = 0;

  ngOnInit(): void {
    this.getUsuario();
    this.spinner.show();
  }

  public get filtroLista(): string {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
  }

  public filtrarUsuario(filtrarPor: string) {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.usuarios.filter(
      (usuarios) =>
        usuarios.nomeCompleto.toLocaleLowerCase().indexOf(filtrarPor) != -1
    );
  }

  public Buscar(): Usuario[] {
    return (this.usuariosListados = this.filtroLista
      ? this.filtrarUsuario(this.filtroLista)
      : this.usuarios);
  }

  public detalheID(id:number)
  {
    this.router.navigate([`usuarios/detalhe/${id}`]);
  }

  public getUsuario(): void {
    this.usuarioService
      .getUsuario()
      .subscribe(
        (_Usuarios: Usuario[]) => {
          this.usuarios = _Usuarios;
          this.usuariosListados = this.usuarios;
        },
        (error: any) => {
          this.toastr.error('Erro ao carregar os usuarios');
        }
      )
      .add(() => this.spinner.hide());
  }

  modalRef = {} as BsModalRef;

  openModal(template: TemplateRef<any>, usuarioID: number): void {
    this.usuarioID = usuarioID;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef.hide();

    this.usuarioService
      .delete(this.usuarioID)
      .subscribe(
        (result: any) => {
          this.toastr.success('O usuario foi excluido.', 'Sucesso!');
          this.getUsuario();
        },
        (error: any) => {
          console.error(error);
          this.toastr.error(
            `Erro ao tentar deletar o usuario ${this.usuarioID}`,
            'Erro'
          );
        }
      )
      .add(() => this.spinner.hide());
  }

  decline(): void {
    this.modalRef.hide();
  }
}
