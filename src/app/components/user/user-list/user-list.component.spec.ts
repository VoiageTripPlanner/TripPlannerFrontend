import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../../../services/auth.service';
import { of } from 'rxjs';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { UserListComponent } from './user-list.component';
import { ModalComponent } from '../../modal/modal.component';
import { UserFormComponent } from '../user-from/user-form.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { NotifyService } from '../../../shared/notify/notify.service';
import { UserService } from '../../../services/user.service';
import { signal } from '@angular/core';
import { IUser } from '../../../interfaces/user.interface';

describe('UserListComponent', () => {
    let component: UserListComponent;
    let fixture: ComponentFixture<UserListComponent>;
    let notifyService: NotifyService;
    let userService: UserService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterModule, FormsModule, HttpClientTestingModule, ModalComponent, UserFormComponent, MatSnackBarModule],
            providers: [AuthService, NotifyService,UserService]
        }).compileComponents();
    });

    beforeEach(() => {


        fixture = TestBed.createComponent(UserListComponent);
        component = fixture.componentInstance;
        notifyService = TestBed.inject(NotifyService);
        userService = TestBed.inject(UserService);


        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call the delete method after confirming SweetAlert', async () => {
 
        const deleteSpy=jest.spyOn(component['service'],'deleteUserSignal').mockReturnValue(of({}));
        const onSuccessSpy=jest.spyOn(component['notifyService'],'onSuccess');
        const userToDelete=component.userList[0];

        component.deleteUser(userToDelete);

        expect(deleteSpy).toHaveBeenCalledWith(userToDelete);
        expect(onSuccessSpy).toHaveBeenCalled();


    });

    
    const userListStub:IUser[]=[
        {
            id: 1,
            name: 'User',
            lastname: 'One',
            secondLastname: 'Last',
            email: 'user1@example.com',
            roleId: 1,
            countryId: '1',
            createAt: '2021-01-01',
            updateAt: '2021-01-02',
            authorities: [{ authority: '' }],
            operational: true
        },
        {
            id: 2,
            name: 'User',
            lastname: 'Two',
            secondLastname: 'Last',
            email: 'user2@example.com',
            roleId: 1,
            countryId: '1',
            createAt: '2021-01-01',
            updateAt: '2021-01-02',
            authorities: [{ authority: '' }],
            operational: true
        }
    ]

});
