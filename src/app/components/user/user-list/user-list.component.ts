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
import { UserRole } from '../../enums/role.enum';


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
    lastname: '',
    secondLastname: '',
    countryId: '',
    email: '',
    password: '',
    operational: true,
    createAt: '',
    updateAt: '',

    //TODO: Debemos hacer una funcion o metodo que me extraiga el id de la persona que esta en la sesion para poner ese id si crea un usuario o lo actualiza
  };

  constructor(private countryService: CountryService) {
    this.loadData();
    this.countryService.getAllSignal();
  };

  loadData () {
    const userIdString = localStorage.getItem('userId');
    const userId = userIdString ? parseInt(userIdString, 10) : null;
    this.service.getAllSignal(userId);
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

  public getRole(roleId: UserRole|undefined): string {
    if (roleId) {
      return UserRole[roleId];
    }
    return '---';
  }

  public getCountry(countryId: string|undefined): string {
    if (countryId) {
      return this.countryService.countriesSig().find(country => country.id === countryId)?.name ?? '---';
    }
    return '---';
  }

  public getDate(value: any): Date|null {
    if (value) {
      return new Date(value);
    }
    return null;
  }

};
