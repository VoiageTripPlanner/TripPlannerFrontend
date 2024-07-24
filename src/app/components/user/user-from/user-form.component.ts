import { Component, Input, inject } from '@angular/core';
import { IFeedBackMessage, IFeedbackStatus} from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { IUser } from '../../../interfaces/user';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  @Input() title!: string;
  @Input() user: IUser = {
    name: '',
    last_name: '',
    second_last_name: '',
    country:{},
    email: '',
    password: '',
    operational:true,
    creation_datetime: new Date(),
    last_update_datetime: new Date(),
  };
  @Input() action: string = 'add'
  service = inject(UserService);
  feedbackMessage: IFeedBackMessage = {type: IFeedbackStatus.default, message: ''};

  handleAction (form: NgForm) {
    if (form.invalid) {
      Object.keys(form.controls).forEach(controlName => {
        form.controls[controlName].markAsTouched();
      });
      return;
    } else {
      this.service[ this.action == 'add' ? 'saveUserSignal': 'updateUserSignal'](this.user).subscribe({
        next: () => {
          this.feedbackMessage.type = IFeedbackStatus.success;
          this.feedbackMessage.message = `User successfully ${this.action == 'add' ? 'added': 'updated'}`
        },
        error: (error: any) => {
          this.feedbackMessage.type = IFeedbackStatus.error;
          this.feedbackMessage.message = error.message;
        }
      })
    }
  }
}
