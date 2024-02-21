import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { LoadingService } from './core/services/loading.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let loadingService: LoadingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [LoadingService],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    loadingService = TestBed.inject(LoadingService);
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Web-Institucional'`, () => {
    expect(app.title).toEqual('Web-Institucional');
  });

  it('should initialize isLoading to false', () => {
    expect(app.isLoading).toBeFalse();
  });

  it('should update isLoading correctly', () => {
    loadingService.setIsLoading(true);
    fixture.detectChanges();
    expect(app.isLoading).toBeFalse();
  });
});
