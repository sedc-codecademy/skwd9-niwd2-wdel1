import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TodosService } from "../../services/todos.service";
import { ICreateTodo } from "../../constants/types";
import { take } from "rxjs/operators";
import { Router } from "@angular/router";
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent implements OnInit {
  createTodoForm: FormGroup | undefined;
  constructor(private readonly todosService: TodosService,
              private readonly router: Router,
              private readonly notifier: NotifierService) { }

  ngOnInit(): void {
    this.initForm();
  }

  public onSubmit() {
    const payload = this.createTodoForm?.value as ICreateTodo;
    this.todosService.createTodo(payload).pipe(
      take(1)
    ).subscribe(data => {
      this.notifier.notify('success', `${payload.name} created!`)
      this.router.navigate(['/todos'])
      console.log(data);
    })
  }


  private initForm() {
    this.createTodoForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    })
  }
}
