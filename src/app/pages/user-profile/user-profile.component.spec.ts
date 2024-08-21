import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { CountriesInterestComponent } from '../../components/countries-interest/countries-interest.component';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideNativeDateAdapter } from '@angular/material/core';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserProfileComponent, 
        HttpClientTestingModule, 
        MatExpansionModule,
        MatIconModule,
        UpdateUserComponent,
        CountriesInterestComponent,
        NgIf,
        NoopAnimationsModule
      ],
      providers: [provideNativeDateAdapter()]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
