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
}
