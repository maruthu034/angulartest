import { Component, OnInit, Input } from '@angular/core';
import { Userinformation } from '../interfaces/carddetails';
import { Location } from '@angular/common';
import { ApiService } from '../services/apiservices';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ApiServiceTodos } from '../services/apiservices-todos';
import { Todosinformation } from '../interfaces/todosdetails';

@Component({
  selector: 'app-details-component',
  templateUrl: './details-component.component.html',
  styleUrls: ['./details-component.component.css'],
  providers: [ApiServiceTodos]
})
export class DetailsComponentComponent implements OnInit {
  // @Input() userinformation: Userinformation;
  @Input() todosinformation: Todosinformation;

  constructor(private location: Location, private apiServiceTodos: ApiServiceTodos,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // this.getuserid();
    this.getTodosid();
  }



  getTodosid(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.apiServiceTodos.gettodosInformations(+params.get('id')))
      .subscribe(todosid => this.todosinformation = todosid);
  }

  goBack(): void {
    this.location.back();
  }
   // getuserid(): void {
  //   this.route.paramMap
  //     .switchMap((params: ParamMap) => this.apiSerivce.getUserInformations(+params.get('id')))
  //     .subscribe(userid => this.userinformation = userid);
  // }

  // goBack(): void {
  //   this.location.back();
  // }

}
