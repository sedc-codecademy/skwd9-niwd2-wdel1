import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EMPTY, Observable } from 'rxjs';
import { ILoginUserRequest, IRegisterUserRequest, IUser, IUserMetadataResponse } from "../constants/types";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private SERVER_URL: string = environment.serverUrl;

  constructor(private http: HttpClient) { }

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
    return this.http.post(`${this.SERVER_URL}/users/logout`, {});
  }
}
