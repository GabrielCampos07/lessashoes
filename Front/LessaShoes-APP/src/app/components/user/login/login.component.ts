import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private formB: FormBuilder) { }

  ngOnInit(): void {
    this.validacao();
  }

  form = {} as FormGroup;

  get fb(){
    return this.form.controls;
  }

  public validacao(){
    this.form = this.formB.group({
    usuario: ['', [Validators.required]],
    senha: ['',[Validators.required]]
    })
  }
}
