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
import { FoodComponent } from './pages/food/food.component';
import { FlightsComponent } from './pages/flights/flights.component';
import { TripFormComponent } from './pages/trip-form/trip-form.component';
import { ActivitiesNearbyComponent } from './pages/activities-nearby/activities-nearby.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { TripSummaryComponent } from './pages/trip-summary/trip-summary.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

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
    path: 'landing',
    component: LandingPageComponent,
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
    path: 'lodge',
    component: LodgeComponent,
    data: { 
      authorities: [
        IRole.admin, 
        IRole.user
      ],
      name: 'Lodge',
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
    }
  },
  {
    path: 'activitiesNearby',
    component: ActivitiesNearbyComponent,
    data: { 
      authorities: [
        IRole.admin, 
        IRole.user
      ],
      name: 'Activities Nearby',
      icon:'bi bi-duffle-fill'
    }
  },
  {
    path: 'planning',
    component: StepperComponent,
    data: { 
      authorities: [
        IRole.admin, 
        IRole.user
      ],
      name: 'Stepper',
      icon:'bi bi-duffle-fill'
    }
  },   
  {
    path: 'summary',
    component: TripSummaryComponent,
    data: { 
      authorities: [
        IRole.admin, 
        IRole.user
      ],
      name: 'Summary',
      icon:'bi bi-duffle-fill'
    }
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
        path: 'update-user',
        component: UserProfileComponent,
        data: { 
          authorities: [],
          name: 'Update User',
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
          icon:'fa-solid fa-gauge'
        }
      },
      {
        path: 'trip-form',
        component: TripFormComponent,
        data: { 
          authorities: [
            IRole.admin, 
            IRole.user
          ],
          name: 'Trip Form',
          icon:'bi bi-luggage-fill'
        }
      },
      {
        path: 'calendar',
        component: CalendarComponent,
        data: { 
          authorities: [
            IRole.admin, 
            IRole.user
          ],
          name: 'Calendar',
          icon:'fa-solid fa-calendar'
        }
      },
    ],
  },
];