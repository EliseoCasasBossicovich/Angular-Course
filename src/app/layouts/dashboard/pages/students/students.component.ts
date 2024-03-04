import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { studentModel } from '../../../../shared/models/students.model';
import { StudentsService } from '../../../../core/services/students.service';
import { LoadingService } from '../../../../core/services/loading.service';

import { StudentFormComponent } from './components/student-form/student-form.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'age',
    'email',
    'cellPhone',
    'country',
    'action',
  ];

  students: studentModel[] = [];

  constructor(
    private _snackBar: MatSnackBar,
    private studentsService: StudentsService,
    private loadingService: LoadingService,
    public dialog: MatDialog
  ) {
    this.studentsService.getStudents().subscribe({
      next: (students) => {
        this.students = students;
      },
      complete: () => {
        this.loadingService.setIsLoading(false);
      },
      error: () => {
        this._snackBar.open('Error al cargar los estudiantes', 'cerrar', {
          duration: 2000,
        });
      },
    });
  }

  onCreateStudent(): void {
    this.dialog
      .open(StudentFormComponent)
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            this.studentsService.createStudent(result).subscribe({
              next: (students) => {
                this.students = students;
                this._snackBar.open(
                  'Estudiante creado correctamente',
                  'cerrar',
                  {
                    duration: 2000,
                  }
                );
              },
            });
          }
        },
      });
  }

  onEditStudent(student: studentModel) {
    this.dialog
      .open(StudentFormComponent, {
        data: student,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            this.studentsService
              .updateStudentById(student.id, result)
              .subscribe({
                next: (students) => {
                  this.students = students;
                  this._snackBar.open(
                    'Estudiante actualizado correctamente',
                    'cerrar',
                    {
                      duration: 2000,
                    }
                  );
                },
                error: () => {
                  this._snackBar.open(
                    'Error al actualizar el estudiante',
                    'cerrar',
                    {
                      duration: 2000,
                    }
                  );
                },
              });
          }
        },
      });
  }

  onDeleteStudent(id: number) {
    this.studentsService.deleteStudentById(id).subscribe({
      next: (students) => {
        this.students = students;
        this._snackBar.open('Estudiante eliminado correctamente', 'cerrar', {
          duration: 2000,
        });
      },
      error: () => {
        this._snackBar.open('Error al eliminar el estudiante', 'cerrar', {
          duration: 2000,
        });
      },
    });
  }
}
