import { Component, OnInit } from '@angular/core';
import { Userinformation } from '../services/carddetails';
import { ApiService } from '../services/apiservices';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard-component.component.html',
  styleUrls: ['./dashboard-component.component.css'],
  providers: [ApiService]
})
export class DashboardComponentComponent implements OnInit {
  title = 'Dashboard';
  userArray: Userinformation[];

  constructor(private apiSerivce: ApiService, private router: Router) {
  }

  getPosts(): void {
    this.apiSerivce.getUserInformation()
      .subscribe(
      resultArray => this.userArray = resultArray,
      error => console.log('Error :: ' + error)
      );
  }

  ngOnInit(): void {
    this.getPosts();
  }
  onSelect(): void {
    this.router.navigateByUrl('/todos');
  }
}
