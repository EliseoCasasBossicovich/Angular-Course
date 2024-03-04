import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../../../core/services/auth.service';
import { MockAuthService } from '../../../../shared/mocks/auth-mock.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: MockAuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        FormBuilder,
        { provide: AuthService, useClass: MockAuthService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as MockAuthService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Validation', () => {
    it('should initialize login form with empty values', () => {
      const emailControl = component.loginForm.get('email');
      const passwordControl = component.loginForm.get('password');
      expect(emailControl?.value).toEqual('');
      expect(passwordControl?.value).toEqual('');
    });

    it('should mark form as touched if submitted with invalid data', () => {
      spyOn(component.loginForm, 'markAllAsTouched');
      component.onSubmit();
      expect(component.loginForm.markAllAsTouched).toHaveBeenCalled();
    });

    it('should call authService.login() with form value if form is valid', () => {
      const mockFormData = {
        email: 'testing@gmail.com',
        password: '123233',
      };
      component.loginForm.setValue(mockFormData);
      spyOn(authService, 'login');
      component.onSubmit();
      expect(authService.login).toHaveBeenCalledWith(mockFormData);
    });
  });
});
