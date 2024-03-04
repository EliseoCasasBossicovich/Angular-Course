import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Course } from '../../../../../../shared/models/courses.model';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss',
})
export class CourseFormComponent {
  courseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialoRef: MatDialogRef<CourseFormComponent>,
    @Inject(MAT_DIALOG_DATA) private editingCourse?: Course
  ) {
    this.courseForm = this.fb.group({
      courseName: this.fb.control(''),
      description: this.fb.control(''),
      startDate: this.fb.control(''),
      endDate: this.fb.control(''),
    });

    if (editingCourse) {
      this.courseForm.patchValue(editingCourse);
    }
  }

  onSaveCourse(): void {
    this.dialoRef.close(this.courseForm.value);
  }
}
