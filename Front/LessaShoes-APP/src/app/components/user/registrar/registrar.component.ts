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
import { Usuario } from 'src/app/Models/Usuario';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { Router } from '@angular/router';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';
import { Element } from '@angular/compiler';
import { elementAt } from 'rxjs/operators';
import { error } from '@angular/compiler/src/util';
import { NgElement } from '@angular/elements';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
})
export class RegistrarComponent implements OnInit {
  constructor(
    private formB: FormBuilder,
    private toastr: ToastrService,
    private authService: AutenticacaoService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.validacao();
  }

  imagem = 'assets/thais2.png';
  usuario = {} as Usuario;
  form = {} as FormGroup;

  get fb(): any {
    return this.form.controls;
  }

  public cadastrarUsuario() {
    if (this.form.valid) {
      this.usuario = Object.assign(
        { Password: this.form.get('password.password')?.value },
        this.form.value
      );
      this.authService
        .registrar(this.usuario)
        .subscribe(
          () => {
            this.spinner.show();
            this.router.navigate(['/user/login']);
            this.toastr.success('Cadastro realizado com sucesso', 'sucesso');
          },
          (error: any) => {
            this.toastr.error('Erro ao criar o usuário', 'Erro');
          }
        )
        .add(() => this.spinner.hide());
    }
  }

  public cssValidador(campo: FormControl): any {
    return { 'is-invalid': campo?.errors && campo?.touched };
  }

  public validacao(): void {
    const formOptions: AbstractControlOptions = {
      validators: CamposValidacao.ConfirmarCampo('Password', 'ConfirmPassword'),
    };

    this.form = this.formB.group(
      {
        NomeCompleto: ['', [Validators.required]],
        UserName: ['', [Validators.required]],
        Email: ['', [Validators.required, Validators.email]],
        Password: ['', [Validators.required, Validators.minLength(8)]],
        ConfirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      formOptions
    );
  }
}
