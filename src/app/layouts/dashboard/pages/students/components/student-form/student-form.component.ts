import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'iga-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnChanges {
  @Input() inputs: any;
  @Output() studentSubmitted = new EventEmitter();
  @Output() cancel = new EventEmitter<boolean>();

  studentsForm!: FormGroup;
  buttonAction: string = "Guardar";
  buttonPress = false;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar) {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['inputs'] && changes['inputs'].currentValue) {
      this.patchForm(changes['inputs'].currentValue['passEdit']);
    } else {
      this.resetForm();
    }
  }

  createForm(): void {
    this.studentsForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      cellPhone: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator()]],
    });
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.value;
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\d{3})^.{8,}$/.test(password) ? null : { 'invalidPassword': true };
    };
  }

  resetForm(): void {
    this.studentsForm.reset();
  }

  patchForm(data: any): void {
    this.studentsForm.patchValue(data);
  }

  onSubmit(): void {
    if (this.buttonPress) {
      this.onCancel();
    } else {
      if (this.studentsForm.invalid) {
        this.studentsForm.markAllAsTouched();
        this.showAlert("Atención", "Por favor complete todos los campos requeridos");
      } else {
        this.onAddStudent();
      }
    }
  }

  onCancel(): void {
    this.cancel.emit(true);
    this.resetForm();
    this.showAlert("Atención", "Se canceló la operación");
  }

  onAddStudent(): void {
    this.studentSubmitted.emit(this.studentsForm.value);
    this.resetForm();
    this.showAlert("Atención", "Se agregó el estudiante");
  }

  onPressCancel(): void {
    this.buttonPress = true;
  }

  showAlert(msg: string, action: string): void {
    this._snackBar.open(msg, action, {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 2000
    });
  }
}
