import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FriendClient, GroupAC, GroupClient, UserAC, UserGroupClient } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  groups: GroupAC[];
  friends: UserAC[];
  userid: string = localStorage.getItem("userId");
  constructor(private usergroupClient: UserGroupClient, private friendClient: FriendClient,
     private groupClient: GroupClient, private router:Router) { }
  ngOnInit(): void {
    this.getGroupsByUserId(this.userid);
    this.getFreindsByUserId(this.userid);
  }
  getGroupsByUserId(userid: string) {
    this.usergroupClient.getUserGroups(userid).subscribe(result => {
      this.groups = result;
    },
      error => console.error(error));
  }
  getFreindsByUserId(userid: string) {
    this.friendClient.getFriends(userid).subscribe(result => {
      this.friends = result;
    },
      error => console.error(error));
  }
  deleteGroup(groupId: number) {
    if (confirm("Are you sure to delete this group")) {
      this.groupClient.deleteGroup(groupId).subscribe(() => {
        this.router.navigateByUrl(`/home/(dashboard//right:welcome)`)
      .then(() => {
        window.location.reload();
      });
      },
        error => console.error(error));
    }
  }
}
