import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../../../../../../core/services/students.service';
import { LoadingService } from '../../../../../../core/services/loading.service';
import { studentModel } from '../../../../../../shared/models/students.model';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss'],
})
export class StudentDetailComponent implements OnInit {
  student: studentModel | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentsService: StudentsService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.setIsLoading(true);
    this.loadStudentDetails();
  }

  private loadStudentDetails(): void {
    const studentId = this.route.snapshot.params['id'];
    this.studentsService.getStudentsById(studentId).subscribe({
      next: (foundedStudent) => {
        this.student = foundedStudent;
      },
      error: (error) => {
        this.router.navigate(['dashboard/404']);
      },
      complete: () => {
        this.loadingService.setIsLoading(false);
      },
    });
  }
}
