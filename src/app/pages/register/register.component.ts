import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { IRegisterUserRequest, IUser } from "../../constants/types";
import { EMPTY } from "rxjs";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { catchError } from "rxjs/operators";
import { TokenStorageService } from "../../services/token-storage.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userRegisterForm: FormGroup | undefined;
  public user: IUser | undefined;
  public userRegisterError = false;
  @ViewChild('f') registerForm: NgForm | undefined;

  constructor(private authService: AuthService,
              private tokenService: TokenStorageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.authService.getAllUsers()
      .subscribe((data) => {
        console.log('Users = ', data);
      });
    this.initForm();
  }

  onSubmit() {
    const payload = this.userRegisterForm?.value as IRegisterUserRequest;
    this.authService.registerUser(payload)
      .pipe(
        catchError(e => {
          this.userRegisterError = true;
          return EMPTY;
        }))
      .subscribe(data => {
        this.user = data.user;
        this.tokenService.saveToken(data.token);
        this.tokenService.saveUser(data.user);
        this.router.navigate(['/user']);
      });
  }

  onClear() {
    this.registerForm?.reset();
  }

  private initForm() {
    this.userRegisterForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      age: new FormControl(null, Validators.required),
    })
  }
}
