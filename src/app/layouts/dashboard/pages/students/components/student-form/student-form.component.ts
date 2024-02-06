import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.scss',
})
export class StudentFormComponent implements OnChanges{
  studentsForm: FormGroup;
  buttonAccion:string="Guardar";
  buttonPress: any;

  @Input()  passEdit: any;
  @Input()  button: any
  @Input()  alumnoAdd: any;

  @Output()
  studentSubmitted = new EventEmitter();

  @Output()
  cancel: EventEmitter<any> = new EventEmitter();
  
  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar){
    this.studentsForm = this.fb.group({
      firstName: this.fb.control('', Validators.required),
      lastName: this.fb.control('', Validators.required),
      birthDate: this.fb.control('', Validators.required),
      cellPhone: this.fb.control('', Validators.required),
      email: this.fb.control('', Validators.required),
      country: this.fb.control('', Validators.required),
      role: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
    })
  }
  
  ngOnChanges(): void { 
    if(this.passEdit==undefined){
      this.studentsForm = this.fb.group({
        firstName: this.fb.control('', Validators.required),
        lastName: this.fb.control('', Validators.required),
        birthDate: this.fb.control('', Validators.required),
        cellPhone: this.fb.control('', Validators.required),
        email: this.fb.control('', Validators.required),
        country: this.fb.control('', Validators.required),
        role: this.fb.control('', Validators.required),
        password: this.fb.control('', Validators.required),
      })
    }else{
      this.studentsForm = this.fb.group({
        firstName: this.fb.control(this.passEdit.firstName, Validators.required),
        lastName: this.fb.control(this.passEdit.lastName, Validators.required),
        birthDate: this.fb.control(this.passEdit.birthDate, Validators.required),
        cellPhone: this.fb.control(this.passEdit.cellPhone, Validators.required),
        email: this.fb.control(this.passEdit.email, Validators.required),
        country: this.fb.control(this.passEdit.country, Validators.required),
        role: this.fb.control(this.passEdit.role, Validators.required),
        password: this.fb.control(this.passEdit.password, Validators.required),
      })
    } 

  }

  onSubmit(): void{
    
    if(this.buttonPress==true){
      this.cancel.emit(this.buttonPress);
      this.studentsForm.reset();
      this.showAlert("Atención","Se cancelo la operacion");
    }else{
      if(this.studentsForm.invalid){
        this.studentsForm.markAllAsTouched();
      }else if(this.studentsForm.value.id == '0'){
        this.studentSubmitted.emit(this.studentsForm.value);        
        this.studentsForm.reset();
        this.showAlert("Atención","Se agrego el estudiante");
      }else{
        this.studentSubmitted.emit(this.studentsForm.value);
        this.studentsForm.reset();
        this.showAlert("Atención","Se edito el estudiante");
      }
    }
  }

  onPressCancel(cancel1:boolean){
    this.buttonPress=true;
  }

  showAlert(msg: string, accion: string) {
    this._snackBar.open(msg, accion,{
      horizontalPosition:"center",
      verticalPosition:"top",
      duration: 2000
    });
  }
  
}
