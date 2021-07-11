import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  public validacao() {
    this.form = this.formB.group({
      nomeCompleto: ['', [Validators.required,]],
      nomeUsuario: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      confirmarSenha: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
}
