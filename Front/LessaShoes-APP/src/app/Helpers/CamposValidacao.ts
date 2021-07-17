import { group } from '@angular/animations';
import { AbstractControl, FormGroup } from '@angular/forms';

export class CamposValidacao {
  static ConfirmarCampo(senha: string, confirmacaoSenha: string): any {
    return (group: AbstractControl) => {
      const formGroup = group as FormGroup;
      const primeiraSenha = formGroup.controls[senha];
      const confirmarSenha = formGroup.controls[confirmacaoSenha];

      if (confirmarSenha.errors && !confirmarSenha.errors.mustMatch) {
        return null;
      }

      if (primeiraSenha.value !== confirmarSenha.value) {
        confirmarSenha.setErrors({ mustMatch: true });
      } else {
        confirmarSenha.setErrors(null);
      }

      return null;
    };
  }
}
