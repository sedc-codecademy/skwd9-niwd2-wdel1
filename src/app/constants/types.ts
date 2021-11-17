import { SafeResourceUrl } from "@angular/platform-browser";

export interface IRegisterUserRequest {
  name: string;
  email: string;
  password: string;
  age: number;
}

export interface IUserMetadataResponse {
  user: IUser;
  token: string;
}

export interface ILoginUserRequest {
  email: string;
  password: string;
}

export interface IUser {
  age: number;
  email: string;
  name: string;
  '__v': number;
  '_id': string;
  avatar?: SafeResourceUrl | string;
}

export interface IPatchUser {
  name?: string;
  email?: string;
  password?: string;
}

export interface ITodo {
  _id: string;
  name: string;
  description: string;
  completed: boolean;
  owner: string;
}

export interface ICreateTodo {
  name: string;
  description: string;
}
