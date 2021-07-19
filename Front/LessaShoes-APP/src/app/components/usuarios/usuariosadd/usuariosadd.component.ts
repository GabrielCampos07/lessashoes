import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/Models/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';
import { isThisTypeNode } from 'typescript';

@Component({
  selector: 'app-usuariosadd',
  templateUrl: './usuariosadd.component.html',
  styleUrls: ['./usuariosadd.component.scss'],
})
export class UsuariosaddComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private usuariosService: UsuarioService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private route: Router
  ) {}

  public form!: FormGroup;

  public arquivo: File[] = [];
  public idUsuario!: number;
  public id = 0;

  public Usuarios = {} as Usuario;

  public imagemURL = 'assets/thais2.png';

  ngOnInit(): void {
    this.validacao();
    this.carregarUsuarios();
  }

  private validacao(): void {
    this.form = this.fb.group({
      usuarioID: [''],
      nomeCompleto: ['', [Validators.required]],
      nomeUsuario: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      contato: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      imagemURL: [''],
    });
  }

  public carregarUsuarios(): void {
    const usuariosIdParam = this.router.snapshot.paramMap.get('id');

    if (usuariosIdParam !== null) {
      this.usuariosService
        .getUsuarioByID(+usuariosIdParam)
        .subscribe(
          (usuarios: Usuario) => {
            this.Usuarios = { ...usuarios };
            this.form.patchValue(this.Usuarios);
            if (this.Usuarios.imagemURL !== null) {
              this.imagemURL =
                environment.apiURL +
                'Recursos/imagens/' +
                this.Usuarios.imagemURL;
            }
          },
          (error: any) => {
            console.error(error);
          }
        )
        .add(() => this.spinner.hide());
    }
  }

  get f(): any {
    return this.form.controls;
  }

  public cssValidador(campo: FormControl): any {
    return { 'is-invalid': campo.errors && campo.touched };
  }

  public salvarAlteracao(): void {
    this.spinner.show();

    if (this.form.valid) {
      this.id = this.Usuarios.usuarioID;
      this.Usuarios = { ...this.form.value };
      this.usuariosService.put(+this.id, this.Usuarios).subscribe(
        (usuarioRetorno: Usuario) => {
          this.route.navigate([`usuarios/lista`]),
          this.toastr.success('Usuario salvo com sucesso');
        },
        (error: any) => {
          console.error(error);
          this.toastr.error('Erro ao salvar o usuario', 'Erro!'),
            this.spinner.hide();
        },
        () => this.spinner.hide()
      );
    }
  }

  public mudarImagem(ev: any) {
    const leitor = new FileReader();

    leitor.onload = (evento: any) => (this.imagemURL = evento.target.result);

    this.arquivo = ev.target.files;
    leitor.readAsDataURL(this.arquivo[0]);

    this.uploadImagem();
  }

  public uploadImagem(): void {
    this.idUsuario = this.Usuarios.usuarioID;
    this.spinner.show();
    this.usuariosService
      .postUpload(this.idUsuario, this.arquivo)
      .subscribe(
        () => {
          this.carregarUsuarios();
          this.toastr.success('Sucesso ao atualizar a imagem', 'Sucesso');
        },
        (error: any) => {
          console.error(error);
          this.toastr.error('Não foi possível atualizar a imagem', 'Erro!');
        }
      )
      .add(() => this.spinner.hide());
  }
}
