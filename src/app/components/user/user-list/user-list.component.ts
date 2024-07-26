import { Component, effect, inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../modal/modal.component';
import { UserFormComponent } from '../user-from/user-form.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { IUser } from '../../../interfaces/user.interface';
import { CountryService } from '../../../services/country.service';
import { ICountry } from '../../../interfaces/country.interface';
import Swal from 'sweetalert2';
import { NotifyService } from '../../../shared/notify/notify.service';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalComponent,
    UserFormComponent,
    MatSnackBarModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  public search: String = '';
  public userList: IUser[] = [];
  private service = inject(UserService);
  private snackBar = inject(MatSnackBar);
  private notifyService = inject(NotifyService);
  public currentUser: IUser = {

    name: '',
    last_name: '',
    second_last_name: '',
    country: {},
    email: '',
    password: '',
    operational: true,
    creation_datetime: new Date(),
    last_update_datetime: new Date(),

    //TODO: Debemos hacer una funcion o metodo que me extraiga el id de la persona que esta en la sesion para poner ese id si crea un usuario o lo actualiza
  };

  constructor() {
    this.loadData();
  };

  loadData () {
    this.service.getAllSignal();
    effect(() => {
      this.userList = this.service.users$();
    });
  };

  showDetail(user: IUser, modal: any) {
    this.currentUser = { ...user };
    modal.show();
  };

  onDeleteUser = (user: IUser) => {
    this.notifyService.onDeleteConfirmation().then((result) => {
      if (result.isConfirmed) {
        this.deleteUser(user)
      }
    })
  };

  deleteUser(user: IUser) {
    this.service.deleteUserSignal(user).subscribe({
      next: () => {
        this.notifyService.onSuccess()
        this.loadData();
      },
      error: (error: any) => {
        this.notifyService.onError();
      }
    })
  };

};
