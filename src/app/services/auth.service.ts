import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, EMPTY, Observable, ReplaySubject, Subject } from 'rxjs';
import { ILoginUserRequest, IPatchUser, IRegisterUserRequest, IUser, IUserMetadataResponse } from "../constants/types";
import { catchError } from "rxjs/operators";
import { NotifierService } from "angular-notifier";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private SERVER_URL: string = environment.serverUrl;
  public user$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  constructor(private http: HttpClient, private notifier: NotifierService) { }

  public getAllUsers(): Observable<any> {
    return this.http.get(`${this.SERVER_URL}/users`);
  }

  public registerUser(body: IRegisterUserRequest): Observable<IUserMetadataResponse> {
    return this.http.post<IUserMetadataResponse>(`${this.SERVER_URL}/users`, body);
  }

  public loginUser(body: ILoginUserRequest): Observable<IUserMetadataResponse> {
    return this.http.post<IUserMetadataResponse>(`${this.SERVER_URL}/users/login`, body);
  }

  public getUser(): Observable<IUser> {
    return this.http.get<IUser>(`${this.SERVER_URL}/users/me`);
  }

  public logoutUser(): Observable<any> {
    this.notifier.notify('info', 'Logging out...');
    return this.http.post(`${this.SERVER_URL}/users/logout`, {});
  }

  public updateUser(body: IPatchUser) {
    return this.http.patch(`${this.SERVER_URL}/users/me`, body);
  }

  public addAvatar(formData: FormData) {
    return this.http.post(`${this.SERVER_URL}/users/me/avatar`, formData)
  }
}
