import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserAC, UserGroupClient } from 'src/app/data.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  groupId: number = 0;
  groupMembers: UserAC[];
  constructor(private userGroupClient: UserGroupClient, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(e => {
      this.groupId = +e.get('id');
      this.getGroupMembers(this.groupId);
    });
  }
  getGroupMembers(id: number) {
    this.userGroupClient.getUsersInGroup(id).subscribe(result => {
      this.groupMembers = result;
    },
      error => console.error(error));
  }
}
