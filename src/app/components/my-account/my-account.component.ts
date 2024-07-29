import { Component, OnInit, effect, inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { IUser } from "../../interfaces/user.interface";
import { UserService } from "../../services/user.service";
import { NgIf } from "@angular/common";
import { UserRole } from "../enums/role.enum";

@Component({
  selector: "app-my-account",
  standalone: true,
  imports: [NgIf],
  templateUrl: "./my-account.component.html",
})
export class MyAccountComponent implements OnInit {
  public userName!: string;
  private user: any;
  private service = inject(AuthService);
  public role!: string;

  constructor(public router: Router, private userService: UserService) {
    this.userService.getUserById(this.service.getUser()?.user_id!);
    effect(() => {
      this.user = this.userService.userSig();
      if (this.user.name) {
        this.userName = `${this.user.name} ${this.user.lastname}`;
        this.role = UserRole[this.user.roleId];
      }
    });
  }

  ngOnInit() {}

  logout() {
    this.service.logout();
    this.router.navigateByUrl('/login');
  }

  updateProfile() {
    this.router.navigateByUrl('/app/update-user');
  }

}
