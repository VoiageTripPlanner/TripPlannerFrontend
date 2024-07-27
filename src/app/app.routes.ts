import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { SigUpComponent } from './pages/auth/sign-up/signup.component';
import { UsersComponent } from './pages/users/users.component';
import { AuthGuard } from './guards/auth.guard';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { AdminRoleGuard } from './guards/admin-role.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GuestGuard } from './guards/guest.guard';
import { IRole } from './interfaces/role.interface';
import { LodgeComponent } from './pages/lodge/lodge.component';
import { ResetpasswordComponent } from './pages/resetpassword/resetpassword.component';
import { ValidateOTPComponent } from './pages/validate-otp/validate-otp.component';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { FoodComponent } from './pages/food/food.component';
import { FlightsComponent } from './pages/flights/flights.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'signup',
    component: SigUpComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'reset-password',
    component: ResetpasswordComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'validate-otp',
    component: ValidateOTPComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'app',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'app',
        redirectTo: 'users',
        pathMatch: 'full',
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate:[AdminRoleGuard],
        data: { 
          authorities: [
            IRole.admin, 
          ],
          name: 'Users',
          icon:'bi bi-people-fill'
        }
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { 
          authorities: [
            IRole.admin, 
            IRole.user
          ],
          name: 'Dashboard',
          icon:'bi bi-duffle-fill'
        }
      },
      {
        path: 'lodge',
        component: LodgeComponent,
        data: { 
          authorities: [
            IRole.admin, 
            IRole.user
          ],
          name: 'Lodge',
          icon:'bi bi-duffle-fill'
        }
      },
      {
        path: 'food',
        component: FoodComponent,
        data: { 
          authorities: [
            IRole.admin, 
            IRole.user
          ],
          name: 'Food',
          icon:'bi bi-duffle-fill'
        }
      },
      {
        path: 'flight',
        component: FlightsComponent,
        data: { 
          authorities: [
            IRole.admin, 
            IRole.user
          ],
          name: 'Flight',
          icon:'bi bi-duffle-fill'
        }
      },   

    ],
  },
];
