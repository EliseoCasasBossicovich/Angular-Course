import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'loadingValidationErrors',
})
export class LoginValidationErrorsPipe implements PipeTransform {
  transform(errors?: ValidationErrors | null, ...args: unknown[]): unknown {
    if (!!errors) {
      let messages = [];
      if (errors['required']) messages.push('Este campo es requerido');
      if (errors['email']) messages.push('El email no es válido');
      if (errors['maxlength'])
        messages.push(
          `No puede tener más de ${errors['maxlength']?.requiredLength} caracteres`
        );
      if (errors['minlength'])
        messages.push(
          `Debe tener más de ${errors['minlength']?.requiredLength} caracteres`
        );

      return messages.join('. ') + '.';
    }

    return null;
  }
}
