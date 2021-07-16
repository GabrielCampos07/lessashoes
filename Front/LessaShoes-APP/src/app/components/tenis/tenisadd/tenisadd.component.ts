import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Tenis } from 'src/app/Models/Tenis';
import { tenis } from 'src/app/services/tenis.service';

@Component({
  selector: 'app-tenisadd',
  templateUrl: './tenisadd.component.html',
  styleUrls: ['./tenisadd.component.scss'],
})
export class TenisaddComponent implements OnInit {
  constructor(
    private TenisService: tenis,
    private toastr: ToastrService,
    private router: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private formB: FormBuilder
  ) {}

  ngOnInit() {
    this.getTenis();
    this.validacao();
  }

  tenis = {} as Tenis;

  // Código do form

  public estadoSalvar = 'post';
  form = {} as FormGroup;
  public id = 0;

  get fb(): any {
    return this.form.controls;
  }

  public validacao(): void {
    this.form = this.formB.group({
      nomeTenis: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      marca: ['', [Validators.required]],
      tamanho: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(2)],
      ],
      qtdTenis: ['', [Validators.required, Validators.minLength(1)]],
      imagemURL: ['', [Validators.required]],
    });
  }

  public cancelarForm(): void {
    this.form.reset();
  }

  public salvarAlteracao(): void {
    this.spinner.show();

    if (this.form.valid) {
      if (this.estadoSalvar === 'post') {
        this.tenis = { ...this.form.value };
        this.TenisService.post(this.tenis).subscribe(
          () => this.toastr.success('Tênis salvo com sucesso'),
          (error: any) => {
            this.toastr.error('Erro ao salvar o tênis', 'Erro!'),
              this.spinner.hide();
          },
          () => this.spinner.hide()
        );
      } else {
        this.id =  this.tenis.tenisID;
        this.tenis = {...this.form.value };
        this.TenisService.put(+this.id, this.tenis).subscribe(
          () => this.toastr.success('Tênis salvo com sucesso'),
          (error: any) => {
            console.error(error);
            this.toastr.error('Erro ao salvar o tênis', 'Erro!'),
            this.spinner.hide();
          },
          () => this.spinner.hide()
        );
      }
    }
  }

  public getTenis(): void {
    const tenisIdParam = this.router.snapshot.paramMap.get('id');

    if (tenisIdParam !== null) {
      this.spinner.show();

      this.estadoSalvar = 'put';

      this.TenisService.getTenisById(+tenisIdParam)
        .subscribe(
          (tenis: Tenis) => {
            this.tenis = { ...tenis };
            this.form.patchValue(this.tenis);
          },
          (error: any) => {
            console.error(error);
          }
        )
        .add(() => this.spinner.hide());
    }
  }
}
