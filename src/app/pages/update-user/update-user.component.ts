import { CommonModule } from '@angular/common';
import { Component, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ModalComponent } from '../../components/modal/modal.component';
import { ICountry, IUser } from '../../interfaces';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ModalComponent
  ],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent {

  handleFormAction($event: Event) {
    throw new Error('Method not implemented.');
}

public userError!: string;

@Output () user: IUser = {};

constructor(
  private router: Router
) {}

public updateUserForm : {name: string; last_name:string; second_last_name:string;} = {
  name: '',
  last_name: '',
  second_last_name: '',
};

public userService : UserService = inject(UserService);

public handleUpdate(event: Event) {
    this.userService.updateUserSignal(this.updateUserForm).subscribe({
      next: () => {
        this.router.navigateByUrl('/dashboard')
      }
    });


}
}
