import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ICreateTodo, ITodo } from "../constants/types";

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private SERVER_URL: string = environment.serverUrl;

  constructor(private readonly http: HttpClient) { }

  public getAllTodos(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(`${this.SERVER_URL}/todos`);
  }

  public createTodo(body: ICreateTodo): Observable<ITodo> {
    return this.http.post<ITodo>(`${this.SERVER_URL}/todos`, body);
  }

  public completeTodo(id: string): Observable<ITodo> {
    return this.http.patch<ITodo>(`${this.SERVER_URL}/todos/${id}`, { completed: true });
  }
}
