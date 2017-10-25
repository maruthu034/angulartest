import { Component, OnInit } from '@angular/core';
import { Todosinformation } from '../interfaces/todosdetails';
import { ApiServiceTodos } from '../services/apiservices-todos';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css'],
  providers: [ApiServiceTodos]
})
export class TodosListComponent implements OnInit {
  title = ' todos-list ';
  usertodos: Todosinformation[];
  selectedtodos: Todosinformation;

  constructor(private apiSerivceTodos: ApiServiceTodos, private location: Location, private router: Router, private route: ActivatedRoute) {
  }

  getPosts(): void {
    this.apiSerivceTodos.gettodosInformation()
      .subscribe(
      resultArray => this.usertodos = resultArray.slice(0, 199),
      error => console.log('Error :: ' + error)
      );
  }

  ngOnInit(): void {
    this.getPosts();
  }
  onSelect(todos: Todosinformation): void {
    this.selectedtodos = todos;
    console.log('maruthutodos:', this.selectedtodos);
  }
}
