import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Tenis } from 'src/app/Models/Tenis';
import { tenis } from 'src/app/services/tenis.service';

@Component({
  selector: 'app-tenisatt',
  templateUrl: './tenisatt.component.html',
  styleUrls: ['./tenisatt.component.scss']
})
export class TenisattComponent implements OnInit {

  constructor(private TenisService: tenis,
    private toastr: ToastrService,
    private formB : FormBuilder) { }

  ngOnInit() {
    this.validacao();
  }

  public tenis: Tenis[] = [];

  form = {} as FormGroup;

  get fb(): any {
    return this.form.controls;
  }

  public validacao() : void{
    this.form = this.formB.group({
      nome: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      quantidade:['',[Validators.required, Validators.minLength(1)]]
    })
  }

  public cancelarForm() : void {
    this.form.reset();
  }

}
