import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { IPatchUser, IUser } from "../../constants/types";
import { TokenStorageService } from "../../services/token-storage.service";
import { Router } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  public user$ = this.authService.user$;
  public shouldShowForm = false;
  updateUserForm: FormGroup | undefined;
  file!: File;

  constructor(private authService: AuthService,
              private tokenService: TokenStorageService,
              private readonly router: Router,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.initForm();
    this.authService.getUser().subscribe(data => {
      console.log(data);
      let path = undefined;
      if (data.avatar) {
        path = this.sanitizer.bypassSecurityTrustResourceUrl(
          `data:image/png;base64,${data.avatar}`
        );
      }
      this.user$.next({...data, avatar: path})
      this.updateUserForm?.patchValue({
        name: data.name,
        email: data.email,
      })
    });

  }

  onLogout() {
    this.authService.logoutUser().subscribe(() => {
      this.tokenService.logout();
      this.user$.next(undefined);
      this.router.navigate(['/login']);
    })
  }

  onSubmit() {
    const payload = this.updateUserForm?.value as IPatchUser;
    this.authService.updateUser(payload).subscribe(data => {
      console.log(data);
    })
  }

  private initForm() {
    this.updateUserForm = new FormGroup({
      name: new FormControl(null),
      email: new FormControl(null),
      password: new FormControl(null),
    })
  }

  toggleShow() {
    this.shouldShowForm = !this.shouldShowForm;
  }

  fileChange(event: any) {
    console.log(event)
    this.file = event.target.files[0];
    console.log(this.file);
  }

  onUpload() {
    if (this.file) {
      const formData = new FormData();
      formData.append('avatar', this.file, this.file.name);
      this.authService.addAvatar(formData).subscribe((data: any) => {
        console.log(data);
        const path = this.sanitizer.bypassSecurityTrustResourceUrl(
          `data:image/png;base64,${data.buffer}`
        );
        this.user$.next({...this.user$.value, avatar: path});
      })
    }
  }

}
