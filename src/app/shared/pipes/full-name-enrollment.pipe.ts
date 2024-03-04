import { Pipe, PipeTransform } from '@angular/core';
import { Inscriptions } from '../models/inscriptions.model';

@Pipe({
  name: 'fullNameInscriptions',
})
export class FullNameInscriptionsPipe implements PipeTransform {
  transform(value: Inscriptions, ...args: unknown[]): unknown {
    console.log(value);
    return value.student?.firstName + ' ' + value.student?.lastName;
  }
}
