import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { IUser } from "../../constants/types";
import { TokenStorageService } from "../../services/token-storage.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  public user: IUser | undefined;

  constructor(private authService: AuthService,
              private tokenService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe(data => {
      console.log(data);
      this.user = data;
    })
  }

  onLogout() {
    this.authService.logoutUser().subscribe(() => {
      this.tokenService.logout();
      this.user = undefined;
    })
  }

}
