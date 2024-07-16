import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../../services/auth.service';
import { of} from 'rxjs';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule, FormsModule, HttpClientTestingModule],
      providers: [AuthService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle login', () => {
    const navigateByUrlSpy = jest.spyOn(component['router'], 'navigateByUrl');
    const loginSpy = jest.spyOn(authService, 'login').mockReturnValue(
        of({email: "test@example.com", password: "password", 
            accessToken: "token", expiresIn: 1234567890}));
    jest.spyOn(component['emailModel'], 'valid', 'get').mockReturnValue(true);
    jest.spyOn(component['passwordModel'], 'valid', 'get').mockReturnValue(true);
    component.loginForm.email = 'test@example.com';
    component.loginForm.password = 'password';
    fixture.detectChanges();

    component.handleLogin(new Event('click'));

    expect(loginSpy).toHaveBeenCalledWith(component.loginForm);
    expect(navigateByUrlSpy).toHaveBeenCalledWith('/app/dashboard');
  });
});