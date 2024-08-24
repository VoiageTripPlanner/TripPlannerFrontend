import { Component, Input, inject } from "@angular/core";
import {
  IFeedBackMessage,
  IFeedbackStatus,
} from "../../../interfaces/index.interface";
import { CommonModule } from "@angular/common";
import { FormsModule, NgForm } from "@angular/forms";
import { UserService } from "../../../services/user.service";
import { IUser } from "../../../interfaces/user.interface";

@Component({
  selector: "app-user-form",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./user-form.component.html",
  styleUrl: "./user-form.component.scss",
})
export class UserFormComponent {
  @Input() title!: string;
  @Input() user: IUser = {
    name: "",
    lastname: "",
    secondLastname: "",
    email: "",
    password: "",
    operational: true,
    createAt: "",
    updateAt: "",
  };
  @Input() action: string = "add";
  service = inject(UserService);
  feedbackMessage: IFeedBackMessage = {
    type: IFeedbackStatus.default,
    message: "",
  };

  handleAction(form: NgForm) {
    const { authorities, ...payload } = this.user;
    if (form.invalid) {
      Object.keys(form.controls).forEach((controlName) => {
        form.controls[controlName].markAsTouched();
      });
      return;
    } else {
      this.service[
        this.action == "add" ? "saveUserSignal" : "updateUserSignal"
      ](payload as IUser).subscribe({
        next: () => {
          this.feedbackMessage.type = IFeedbackStatus.success;
          this.feedbackMessage.message = `User successfully ${this.action == "add" ? "added" : "updated"}`;
        },
        error: (error: any) => {
          this.feedbackMessage.type = IFeedbackStatus.error;
          this.feedbackMessage.message = error.message;
        },
      });
    }
  }
}
