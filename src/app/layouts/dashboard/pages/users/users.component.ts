import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UsersService } from '../../../../core/services/users.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { UserFormComponent } from './components/user-form/user-form.component';
import { userModel } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'cellPhone',
    'password',
    'role',
    'actions',
  ];

  users: userModel[] = [];

  constructor(
    private _snackBar: MatSnackBar,
    private usersService: UsersService,
    private loadingService: LoadingService,
    public dialog: MatDialog
  ) {
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      complete: () => {
        this.loadingService.setIsLoading(false);
      },
      error: () => {
        this._snackBar.open('Error al cargar los usuarios', 'cerrar', {
          duration: 2000,
        });
      },
    });
  }

  onCreateUser(): void {
    const token = uuidv4(); // Generate a random token using UUID
    this.dialog
      .open(UserFormComponent)
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            result.token = token;
            this.usersService.createUser(result).subscribe({
              next: (users) => {
                this.users = users;
                this._snackBar.open('Usuario creado correctamente', 'cerrar', {
                  duration: 2000,
                });
              },
            });
          }
        },
      });
  }

  onEditUser(user: userModel) {
    this.dialog
      .open(UserFormComponent, {
        data: user,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            this.usersService.updateUserById(user.id, result).subscribe({
              next: (users) => {
                this.users = users;
                this._snackBar.open(
                  'Usuario actualizado correctamente',
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

  onDeleteUser(id: number) {
    this.usersService.deleteUsersById(id).subscribe({
      next: (users) => {
        this.users = users;
        this._snackBar.open('Usuario eliminado correctamente', 'cerrar', {
          duration: 2000,
        });
      },
      error: () => {
        this._snackBar.open('Error al eliminar el usuario', 'cerrar', {
          duration: 2000,
        });
      },
    });
  }
}
function uuidv4() {
  var uuidPart = '';
  for (var i = 0; i < 8; i++) {
    uuidPart += Math.floor(Math.random() * 16).toString(16);
  }
  return uuidPart;
}
