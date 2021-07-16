import {
  AbstractControlOptions,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Component, OnInit } from '@angular/core';

import { CamposValidacao } from 'src/app/Helpers/CamposValidacao';
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/Models/Usuario';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
})
export class RegistrarComponent implements OnInit {
  constructor(
    private formB: FormBuilder,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.validacao();
  }

  usuario = {} as Usuario;
  form = {} as FormGroup;

  get fb(): any {
    return this.form.controls;
  }

  public cssValidador(campo: FormControl): any {
    return { 'is-invalid': campo.errors && campo.touched };
  }

  public salvarUsuario() {

    if (this.form.valid) {
      this.usuario = { ...this.form.value };
      this.usuarioService.post(this.usuario).subscribe(
        () => this.toastr.success('Usuário salvo com sucesso', 'Sucesso!'),
        (error: any) => {this.toastr.error('Erro ao salvar o usuário', 'Erro!'),
        console.error(error)}
      ).add(() => this.spinner.hide());
    }
  }

  public validacao(): void {
    const formOptions: AbstractControlOptions = {
      validators: CamposValidacao.ConfirmarCampo('senha', 'confirmarSenha'),
    };

    this.form = this.formB.group(
      {
        nomeCompleto: ['', [Validators.required]],
        nomeUsuario: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required, Validators.minLength(8)]],
        confirmarSenha: ['', [Validators.required, Validators.minLength(8)]],
        cargo:['',[Validators.required]],
        contato: ['',[Validators.required]]
      },
      formOptions
    );
  }
}
