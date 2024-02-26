import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentFormComponent } from './student-form.component';
import { StudentsMock } from '../../../../../../shared/mocks/students.mock';

describe('StudentFormComponent', () => {
  let component: StudentFormComponent;
  let fixture: ComponentFixture<StudentFormComponent>;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentFormComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [MatSnackBar]
    });

    fixture = TestBed.createComponent(StudentFormComponent);
    component = fixture.componentInstance;
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate form with student data when inputs is set', () => {
    const studentData = StudentsMock[0];
    component.inputs = { passEdit: studentData };
    component.ngOnChanges({ inputs: {
      currentValue: component.inputs,
      previousValue: undefined,
      firstChange: false,
      isFirstChange:() => false,
    } });
    expect(component.studentsForm.value).toEqual(studentData);
  });

  it('should emit student data when form is submitted with valid data', () => {
    spyOn(component.studentSubmitted, 'emit');
    const studentData = StudentsMock[0];
    component.studentsForm.setValue(studentData);
    component.onSubmit();
    expect(component.studentSubmitted.emit).toHaveBeenCalledWith(studentData);
  });

  it('should emit cancel event and reset form when cancel button is pressed', () => {
    spyOn(component.cancel, 'emit');
    component.onPressCancel();
    expect(component.cancel.emit).toHaveBeenCalled();
    expect(component.buttonPress).toBeTrue();
    expect(component.studentsForm.value).toEqual({
      firstName: '',
      lastName: '',
      birthDate: '',
      cellPhone: '',
      email: '',
      country: '',
      role: '',
      password: ''
    });
  });

  it('should show alert message when showAlert is called', () => {
    spyOn(snackBar, 'open');
    component.showAlert('Test Message', 'Test Action');
    expect(snackBar.open).toHaveBeenCalledWith('Test Message', 'Test Action', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000
    });
  });
});
