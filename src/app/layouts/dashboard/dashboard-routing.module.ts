import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { StudentsComponent } from './pages/students/students.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { StudentDetailComponent } from './pages/students/pages/student-detail/student-detail.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'students',
    component: StudentsComponent,
  },
  {
    path: 'students/:id',
    component: StudentDetailComponent,
  },
  {
    path: 'courses',
    component: CoursesComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {}