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
import { Usuario } from 'src/app/Models/Usuario';
import { Router } from '@angular/router';

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
    private router: Router
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

  public cadastrarUsuario()
  {
    if(this.form.valid)
    {
      this.usuario = Object.assign({Password: this.form.get('password.password')?.value},
      this.form.value);
      console.log(this.usuario)
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
