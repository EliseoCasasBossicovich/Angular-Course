import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { CoursesService } from '../../../../core/services/courses.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { Course } from '../../../../shared/models/courses.model';
import { CourseFormComponent } from './components/course-form/course-form.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})

export class CoursesComponent {
  displayedColumns: string[] = [
    'id',
    'courseName',
    'description',
    'startDate',
    'endDate',
    'actions',
  ];

  courses: Course[] = [];

  constructor(
    private _snackBar: MatSnackBar,
    private coursesService: CoursesService,
    private LoadingService: LoadingService,
    public dialog: MatDialog
  ) {
    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      complete: () => {
        this.LoadingService.setIsLoading(false);
      },
      error: () => {
        this._snackBar.open('Error al cargar los cursos', 'cerrar', {
          duration: 2000,
        });
      },
    });
  }

  onCreateCourse(): void {
    this.dialog
      .open(CourseFormComponent)
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            this.coursesService.createCourse(result).subscribe({
              next: (courses) => {
                this.courses = courses;
                this._snackBar.open('Curso creado correctamente', 'cerrar', {
                  duration: 2000,
                });
              },
            });
          }
        },
      });
  }

  onEditCourse(course: Course) {
    this.dialog
      .open(CourseFormComponent, {
        data: course,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            this.coursesService.updateCourseById(course.id, result).subscribe({
              next: (courses) => {
                this.courses = courses;
                this._snackBar.open(
                  'Curso actualizado correctamente',
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

  onDeleteCourse(id: number) {
    this.coursesService.deleteCourseById(id).subscribe({
      next: (courses) => {
        this.courses = courses;
        this._snackBar.open('Curso eliminado correctamente', 'cerrar', {
          duration: 2000,
        });
      },
      error: () => {
        this._snackBar.open('Error al eliminar el curso', 'cerrar', {
          duration: 2000,
        });
      },
    });
  }
}
