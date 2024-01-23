import { Component } from '@angular/core';
import { studentModel } from '../../../../shared/models/students.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})

export class StudentsComponent {  
  
  displayedColumns: string[] = ['uuid','fullName', 'age', 'email', 'course', 'country', 'action'];
  dataSource: studentModel[] =[
    {
      uuid: "4c6a1be1-9a27-4371-435e-eba0dae7bbdc",
      firstName: 'Juan Cruz',
      lastName: 'Gomez',
      birthDate: '2000-06-23',
      email: 'jxg@gmail.com',
      course: 'Angular',
      country: 'Argentina',
    },
    {
      uuid: "22229ab5-14b9-488e-9105-a0aca00dde3c",
      firstName: 'Viecente',
      lastName: 'Torrez',
      birthDate: '2002-01-10',
      email: 'vt@gmail.com',
      course: 'React',
      country: 'Argentina',
    },
    {
      uuid: "95347731-7f94-1be3-af93-2acac36658e0",
      firstName: 'Maria',
      lastName: 'Durango',
      birthDate: '1998-12-5',
      email: 'midurango@gmail.com',
      course: 'Vue',
      country: 'Uruguay',
    }
  ];

  editingStudent: studentModel | null = null;
  studentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      course: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required]
    });
  };

  onStudentModify(student : studentModel) {
    this.editingStudent = student;
    this.studentForm.setValue({
      firstName: student.firstName,
      lastName: student.lastName,
      birthDate: student.birthDate,
      course: student.course,
      email: student.email,
      country: student.country,
    })
  }

  onCancelEdit() {
    this.editingStudent = null;
    this.studentForm.reset();
  };

  onSaveEdit() {
    if (this.editingStudent && this.studentForm.valid) {
      this.dataSource = this.dataSource.map(student => 
        student.uuid === this.editingStudent!.uuid ? { ...this.editingStudent, ...this.studentForm.value } : student
      )   
      this.editingStudent = null;
      this.studentForm.reset();
    }
   }
  
  onStudentSubmitted(ev: studentModel): void{
    this.dataSource = [...this.dataSource, {...ev, uuid: crypto.randomUUID()}]
  }

  onStudentDelete(student: studentModel) {
    const confirmDelete = confirm('¿Confirma que desea eliminar el estudiante: ' + student.firstName + ' ' +student.lastName  +' ?' );
    if (confirmDelete) {
      this.dataSource = this.dataSource.filter(u => u.uuid !== student.uuid);
    }
  }
};