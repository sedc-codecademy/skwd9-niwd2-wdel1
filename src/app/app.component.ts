import { Component, OnInit } from '@angular/core';
import { AuthService } from "./services/auth.service";
import { TokenStorageService } from "./services/token-storage.service";
import { filter, take, tap } from "rxjs/operators";
import { NavigationEnd, Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { IUser } from "./constants/types";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public readonly user$ = this.authService.user$;
  public pageTitle = 'login';
  public loading = false;
  constructor(private readonly authService: AuthService,
              private readonly tokenService: TokenStorageService,
              private readonly router: Router) {
  }

  ngOnInit() {
    if (!!this.tokenService.getToken()) {
      this.user$.next(this.tokenService.getUser());
    }

    this.router.events.pipe(
      tap(() => {
        this.loading = true;
      }),
      filter((evt: any) => evt instanceof NavigationEnd)
    ).subscribe((evt: any) => {
      setTimeout(() => {
        this.loading = false;
      }, 2000);
      console.log(evt);
      this.pageTitle = evt.url.split('/')[1].toUpperCase();
    });
  }

  logout() {
    this.authService.logoutUser().pipe(
      take(1)
    ).subscribe(() => {
      this.tokenService.logout();
      this.router.navigate(['/login'])
    });
  }

  name = 'Filip';
  shouldShowName = true;
  someValues = [1, 2, 3, 4];
}
