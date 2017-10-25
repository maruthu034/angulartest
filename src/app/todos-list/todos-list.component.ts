import { Component, OnInit } from '@angular/core';
import { Todosinformation } from '../services/todosdetails';
import { ApiServiceTodos } from '../services/apiservices-todos';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { fade } from 'clarity-angular';


@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css'],
  providers: [ApiServiceTodos]
})
export class TodosListComponent implements OnInit {
  getData: string;
  titlehead = ' todos-list';
  processValidation = false;
  usertodos: Todosinformation[];
  errorMessage: String;
  statusCode: number;
  todoIdToUpdate = null;
  complete = [
    { status: '' },
    { status: 'true' },
    { status: 'false' }
  ];
  // Create form
  TodoForm = new FormGroup({
    // userId: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(2)]),
    // title: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(150)]),
    userId: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    completed: new FormControl(this.complete[0].status, Validators.required),
  });

  constructor(private apiSerivceTodos: ApiServiceTodos, private location: Location, private router: Router, private route: ActivatedRoute) {
  }

  getAllTodos(): void {
    this.apiSerivceTodos.gettodosInformation()
      .subscribe(
      resultArray => this.usertodos = resultArray,

      error => console.log('Error :: ' + error)
      );
  }

  ngOnInit(): void {
    this.getAllTodos();

  }

  onTodoFormSubmit() {
    // this.processValidation = false;
    if (this.TodoForm.invalid) {
      return;
    }
    this.processValidation = true;
    const todosinformation = this.TodoForm.value;

    console.log('Todoformvalue:', todosinformation);
    if (this.todoIdToUpdate === null) {
      this.apiSerivceTodos.gettodosInformation()
        .subscribe(todo => {
          // Generate todosinformation id
          const maxIndex = todo.length - 1;
          const todoWithMaxIndex = todo[maxIndex];
          const todoId = todoWithMaxIndex.id + 1;
          todosinformation.id = todoId;
          // Create todosinformation
          this.apiSerivceTodos.createTodo(todosinformation)
            .subscribe(result => {
              this.getAllTodos();
              this.backToCreateTodo();
            },
            errorCode => this.statusCode = errorCode
            );
        });
    } else {
      // Handle update article
      todosinformation.id = this.todoIdToUpdate;
      console.log('todosinformation:', todosinformation.id);
      this.apiSerivceTodos.updateArticle(todosinformation)
        .subscribe(successCode => {
          console.log('todosinformationinsideform:', todosinformation);
          this.statusCode = successCode;
          this.getAllTodos();
          this.backToCreateTodo();
        },
        errorCode => this.statusCode = errorCode);
    }
  }

  // Load article by id to edit
  editTodoUser(todoId: string) {
    console.log('todoId:', todoId);
    this.apiSerivceTodos.getTodoById(todoId)
      .subscribe(todosinformation => {
        this.todoIdToUpdate = todosinformation.id;
        this.TodoForm.setValue({
          userId: todosinformation.userId, title: todosinformation.title,
          completed: todosinformation.completed
        });
      },
      errorCode => this.statusCode = errorCode);
  }

  // Delete todosinformation
  deleteTodoUser(todoId: string) {
    this.preProcessConfigurations();
    console.log('todoId:', todoId);
    this.apiSerivceTodos.deleteTodoById(todoId)
      .subscribe(data => {
        this.getAllTodos();
        this.backToCreateTodo();
      },
      errorCode => this.statusCode = errorCode);
  }

  preProcessConfigurations() {
    this.statusCode = null;
  }
  // form todosinformation
  backToCreateTodo() {
    this.todoIdToUpdate = null;
    this.TodoForm.reset();
    this.processValidation = false;
  }
  get userId() {
    return this.TodoForm.get('userId');
  }
  get title() {
    return this.TodoForm.get('title');
  }
  get completed() {
    return this.TodoForm.get('completed');
  }

}
