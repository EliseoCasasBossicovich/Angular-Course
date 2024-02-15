import { Component, OnInit } from '@angular/core';
import { studentModel } from '../../../../shared/models/students.model';
import { StudentsService } from '../../../../core/services/students.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fullName', 'age', 'email', 'cellPhone', 'country', 'role', 'action',];
  roles: string[] = [];

  dataSource: studentModel[] = [];
  totalItems = 0;
  pageSize = 5;
  currentPage = 1;

  constructor(
    private studentsService: StudentsService,
    private LoadingService: LoadingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getPageData();
  }

  getPageData(): void {
    this.LoadingService.setIsLoading(true);
    forkJoin([
      this.studentsService.getRoles(),
      this.studentsService.paginate(this.currentPage),
    ]).subscribe({
      next: (value) => {
        this.roles = value[0];

        const paginationResult = value[1];
        this.totalItems = paginationResult.items;
        this.dataSource = paginationResult.data;
      },
      complete: () => {
        this.LoadingService.setIsLoading(false);
      },
      
    });
  }

  onPage(ev: PageEvent) {
    this.currentPage = ev.pageIndex + 1;
    this.studentsService.paginate(this.currentPage, ev.pageSize).subscribe({
      next: (paginateResult) => {
        this.totalItems = paginateResult.items;
        this.dataSource = paginateResult.data;
        this.pageSize = ev.pageSize;
      },
    });
  }

  onDeleteStudent(ev: studentModel): void {
    this.LoadingService.setIsLoading(true);
    this.studentsService.deleteStudent(ev.id).subscribe({
      next: (students) => {
        this.dataSource = [...students];
      },
      complete: () => {
        this.LoadingService.setIsLoading(false);
      },
    });
  }

  onStudentSubmitted(ev: studentModel): void {
    this.LoadingService.setIsLoading(true);
    this.studentsService.createStudents(ev).subscribe({
      next: (student) => {
        this.dataSource = [...student];
      },
      complete: () => {
        this.LoadingService.setIsLoading(false);
      },
    });
  }
}
