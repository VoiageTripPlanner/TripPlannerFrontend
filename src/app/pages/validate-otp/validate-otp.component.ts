import { CommonModule } from '@angular/common';
import { Component, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../components/modal/modal.component';
import { AuthService } from '../../services/auth.service';

import { Router } from '@angular/router';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-validate-otp',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalComponent
  ],
  templateUrl: './validate-otp.component.html',
  styleUrl: './validate-otp.component.scss'
})
export class ValidateOTPComponent {

  public validaOTPError!: String;
  @Output () user: IUser = {};


  constructor(
    private router: Router
  ) {}

  public validateOtpForm : {otp: string; password: string; password2:string} = {
    otp: '',
    password: '',
    password2: ''
  };

  public authService : AuthService = inject(AuthService);

  public handleOtp(event: Event) {
    event.preventDefault();
    if (this.validateOtpForm.password == this.validateOtpForm.password2) {
      this.authService.validateOtp(this.validateOtpForm).subscribe({
        next: () => 
          this.router.navigateByUrl('/login'),
          error: (err: any) => (this.validaOTPError = err.description),
      });
    }
  }

}
