import { AuthService } from "./../../services/auth.service";
import { CommonModule } from "@angular/common";
import { Component, inject, Input, Output, ViewChild } from "@angular/core";
import { FormsModule, NgModel } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { ModalComponent } from "../../components/modal/modal.component";
import { IUser } from "../../interfaces/user.interface";

@Component({
  selector: "app-resetpassword",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ModalComponent],
  templateUrl: "./resetpassword.component.html",
  styleUrl: "./resetpassword.component.scss",
})
export class ResetpasswordComponent {
  handleFormAction($event: Event) {
    throw new Error("Method not implemented.");
  }

  public otpError!: string;

  @Output() user: IUser = {};

  constructor(private router: Router) {}

  public resetPasswordForm: { email: string } = {
    email: "",
  };

  public authService: AuthService = inject(AuthService);

  public handleResetPassword(event: Event) {
    this.authService.resetPassword(this.resetPasswordForm).subscribe({
      next: () => {
        this.router.navigateByUrl("/validate-otp");
      },
    });
  }
}
