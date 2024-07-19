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
import { IUser } from '../../../interfaces/user';

fdescribe('UserListComponent', () => {
    let component: UserListComponent;
    let fixture: ComponentFixture<UserListComponent>;
    let authService: AuthService;
    let notifyService: NotifyService;
    let userService: UserService;
    let myServiceMock: any;

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
            user_id: 1,
            name: 'User',
            last_name: 'One',
            second_last_name: 'Last',
            email: 'user1@example.com',
            role: {
                role_id: 1,
                role_name: 'Admin',
                abbreviation: 'ADM',
                operational: true,
                creation_datetime: new Date('2021-01-01'),
                creation_responsible: 1,
                last_update_datetime: new Date('2021-01-02'),
                update_responsible: 2
            },
            country: {
                country_id: 1,
                country_name: 'Country1',
                country_code: 'C1',
                operational: true
            },
            creation_datetime: new Date('2021-01-01'),
            creation_responsible: 1,
            last_update_datetime: new Date('2021-01-02'),
            update_responsible: 2,
            authorities: [{ authority: '' }],
            operational: true
        },
        {
            user_id: 2,
            name: 'User',
            last_name: 'Two',
            second_last_name: 'Last',
            email: 'user2@example.com',
            role: {
                role_id: 1,
                role_name: 'Admin',
                abbreviation: 'ADM',
                operational: true,
                creation_datetime: new Date('2021-01-01'),
                creation_responsible: 1,
                last_update_datetime: new Date('2021-01-02'),
                update_responsible: 2
            },
            country: {
                country_id: 2,
                country_name: 'Country2',
                country_code: 'C2',
                operational: true
            },
            creation_datetime: new Date('2021-01-01'),
            creation_responsible: 1,
            last_update_datetime: new Date('2021-01-02'),
            update_responsible: 2,
            authorities: [{ authority: '' }],
            operational: true
        }
    ]

});
