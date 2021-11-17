import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { ILoginUserRequest } from "../../constants/types";
import { Router } from "@angular/router";
import { TokenStorageService } from "../../services/token-storage.service";
import { catchError, take } from "rxjs/operators";
import { EMPTY } from "rxjs";
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public readonly user$ = this.authService.user$;
  loginUserForm: FormGroup | undefined;
  loginError: string | undefined;
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly tokenService: TokenStorageService,
    private readonly notifier: NotifierService) { }

  ngOnInit(): void {
    this.initForm();
  }

  public onSubmit() {
    const payload = this.loginUserForm?.value as ILoginUserRequest;
    this.notifier.notify('info', 'Logging in...');
    console.log(payload);
    this.authService.loginUser(payload).pipe(
      take(1),
      catchError((e) => {
        this.loginError = e.error.message;
        this.notifier.notify('error', `${e.error.message}`)
        console.log(e);
        return EMPTY;
      })
    ).subscribe((data) => {
      this.notifier.notify('success', `Logged in as ${data.user.email}`)
      this.router.navigate(['/user']);
      this.tokenService.saveToken(data.token);
      this.tokenService.saveUser(data.user);
      this.user$.next(data.user);
    })
  }

  private initForm() {
    this.loginUserForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(7)])
    });
  }
}
