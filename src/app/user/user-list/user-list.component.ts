import { Component, OnInit } from '@angular/core';
import { UserAC, UserGroupClient } from 'src/app/data.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: UserAC[];

  constructor(usergroupClient : UserGroupClient) { 
    usergroupClient.userbygroupid(2).subscribe(result => {
      this.users = result;
      console.log(this.users);
    },
    error => console.error(error));
  }
  ngOnInit(): void {
  }
}
