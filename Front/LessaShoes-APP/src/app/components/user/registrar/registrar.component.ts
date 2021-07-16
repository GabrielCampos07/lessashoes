import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Component, OnInit } from '@angular/core';

import { CamposValidacao } from 'src/app/Helpers/CamposValidacao';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
})
export class RegistrarComponent implements OnInit {
  constructor(private formB: FormBuilder) {}

  ngOnInit(): void {
    this.validacao();
  }

  form = {} as FormGroup;

  get fb(): any {
    return this.form.controls;
  }

  public cssValidador(campo: FormControl): any {
    return {'is-invalid': campo.errors && campo.touched};
  }

  public validacao() : void {

    const formOptions: AbstractControlOptions = {
      validators : CamposValidacao.ConfirmarCampo('senha', 'confirmarSenha')
    };

    this.form = this.formB.group({
      nomeCompleto: ['', [Validators.required,]],
      nomeUsuario: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      confirmarSenha: ['', [Validators.required, Validators.minLength(8)]],
    },formOptions);
  }
}
