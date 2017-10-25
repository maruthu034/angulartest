import { Component, OnInit } from '@angular/core';
import { Userinformation } from '../interfaces/carddetails';
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
  _userArray: Userinformation[];
  selectedUser: Userinformation;

  constructor(private apiSerivce: ApiService, private router: Router) {
  }

  getPosts(): void {
    this.apiSerivce.getUserInformation()
      .subscribe(
      resultArray => this._userArray = resultArray,
      error => console.log('Error :: ' + error)
      );
  }

  ngOnInit(): void {
    this.getPosts();
  }
  onSelect(user: Userinformation): void {
    this.router.navigateByUrl('/todos');
    // this.selectedUser = user;
    // console.log('maruthu:', this.selectedUser);
  }
}
