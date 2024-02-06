import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { StudentsService } from '../../../../core/services/students.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { studentModel } from '../../../../shared/models/students.model';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {
  passEdit: any;
  show = false;
  studentAdd: studentModel | undefined;
  button: any;

  displayedColumns: string[] = [
    'id',
    'fullName',
    'age',
    'email',
    'cellPhone',
    'country',
    'action',
  ];
  dataSource: studentModel[] = [];

  constructor(
    private _snackBar: MatSnackBar,
    private studentsService: StudentsService,
    private LoadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.LoadingService.setIsLoading(true);
    this.studentsService.gestStudents().subscribe({
      next: (students) => {
      this.dataSource = students;
      },
      complete: () => {
        this.LoadingService.setIsLoading(false);
      }      
    });
  }

  onStudentSubmitted(ev: studentModel): void{
    if(ev.id===undefined){
      this.dataSource = [...this.dataSource, {...ev, 
        id: crypto.randomUUID()}];
        this.show=false;
    }else{
      this.dataSource = this.updateStudent(ev);
      this.updateList();
      this.show=false;
    }
  }

  onPressStudentAdd(){
    this.show=true;
    this.passEdit=this.studentAdd;
    this.button="Agregar";
  }

  updateList() {
    console.log("UPDATELIST")
    this.dataSource = [...this.getAllStudents()]
    
  }

  getAllStudents() {
    return this.dataSource
  }

  deleteStudent(id: number): studentModel[] {
    console.log(this.dataSource)
    const dataSourceFiltered = this.dataSource.filter(el   => el.id != id.toString());
    this.dataSource = [...dataSourceFiltered];
    return this.dataSource
  }

  onStudentDelete(id: number): void {
    this.deleteStudent(id);
    this.updateList()
    this.mostrarAlerta("Alumno fue eliminado con exito","Bien!");
  }

  updateStudent(students: studentModel) {
    const index = this.dataSource.findIndex(el => el.id == students.id)     
    this.dataSource[index] = students;      
    return this.dataSource
  }

  onPressStudentEdit(students:studentModel) {
    this.passEdit = students;
    this.show=true;      
    this.button = 'Actualizar';      
  }

  recibirCancelar(can:boolean): void{    
    this.show=false;
  }

  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion,{
      horizontalPosition:"center",
      verticalPosition:"top",
      duration: 2000
    });
  }
 
}
