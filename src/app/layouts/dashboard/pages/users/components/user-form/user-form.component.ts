import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { userModel } from '../../../../../../shared/models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) private editingUser?: userModel
  ) {
    this.userForm = this.fb.group({
      firstName: this.fb.control(''),
      lastName: this.fb.control(''),
      email: this.fb.control(''),
      cellPhone: this.fb.control(''),
      password: this.fb.control(''),
      role: this.fb.control(''),
    });

    if (editingUser) {
      this.userForm.patchValue(editingUser);
    }
  }

  onSaveUser(): void {
    this.dialogRef.close(this.userForm.value);
  }
}
