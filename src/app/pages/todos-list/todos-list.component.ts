import { Component, OnInit } from '@angular/core';
import { TodosService } from "../../services/todos.service";
import { ITodo } from "../../constants/types";
import { take } from "rxjs/operators";
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss']
})
export class TodosListComponent implements OnInit {
  public allTodos: ITodo[] | undefined;
  public completedTodos: ITodo[] | undefined;
  public activeTodos: ITodo[] | undefined;
  constructor(private readonly todosService: TodosService,
              private readonly notifier: NotifierService) { }

  ngOnInit(): void {
    this.todosService.getAllTodos().subscribe(data => {
      this.allTodos = data;
      if (data && data.length > 0) {
        this.completedTodos = data.filter(todo => todo.completed);
        this.activeTodos = data.filter(todo => !todo.completed);
      } else {
        this.completedTodos = [];
        this.activeTodos = [];
      }
      console.log('Todos = ', data);
    });
  }

  onComplete(todo: ITodo) {
    this.todosService.completeTodo(todo._id)
      .pipe(
        take(1)
      )
      .subscribe(data => {
        // const idx = this.activeTodos?.indexOf(todo);
        // this.activeTodos?.splice(idx!, 1);
        // this.completedTodos?.push(todo);
        this.notifier.notify('success', `Completed ${todo.name}`);
        this.activeTodos = this.activeTodos?.filter(found => found._id !== todo._id);
        this.completedTodos = [...this.completedTodos!, todo];
      })
  }

}
