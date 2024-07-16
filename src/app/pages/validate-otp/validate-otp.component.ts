import { CommonModule } from '@angular/common';
import { Component, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../components/modal/modal.component';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces';
import { Router } from '@angular/router';

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

  
  @Output () user: IUser = {};


  constructor(
    private router: Router
  ) {}

  public validateOtpForm : {otp: string; password: string} = {
    otp: '',
    password: '',
  };

  public authService : AuthService = inject(AuthService);

  public handleOtp(event: Event) {
      this.authService.validateOtp(this.validateOtpForm).subscribe({
        next: () => {
          this.router.navigateByUrl('/login')
        }
      });
    

  
    
  }

}
