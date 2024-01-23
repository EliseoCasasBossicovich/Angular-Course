import { Pipe, PipeTransform } from '@angular/core';
import { studentModel } from '../models/students.model';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(value: studentModel, ...args: unknown[]): unknown {
    return value.firstName +' '+ value.lastName;
  }
}