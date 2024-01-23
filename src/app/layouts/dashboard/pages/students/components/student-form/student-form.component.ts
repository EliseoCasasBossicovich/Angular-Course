import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.scss',
})
export class StudentFormComponent {
  StudentForm: FormGroup;

  @Output()
  studentSubmitted = new EventEmitter();
  
  constructor(private fb: FormBuilder){
    this.StudentForm = this.fb.group({
      firstName: this.fb.control('', Validators.required),
      lastName: this.fb.control('', Validators.required),
      birthDate: this.fb.control('', Validators.required),
      course: this.fb.control('', Validators.required),
      email: this.fb.control('', Validators.required),
      country: this.fb.control('', Validators.required),
    })
  }
  
  onSubmit(): void{
    console.log(this.StudentForm.value);
    if(this.StudentForm.invalid){
      this.StudentForm.markAllAsTouched();
    }else{
      this.studentSubmitted.emit(this.StudentForm.value)
      this.StudentForm.reset();
    }    
  }
}
