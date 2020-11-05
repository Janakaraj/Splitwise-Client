import { Component, OnInit } from '@angular/core';
import { FriendClient, GroupAC, UserAC, UserGroupClient } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  groups: GroupAC[];
  friends: UserAC[];
  userid: string = "ab9e1498-cf3a-4044-8e97-357d0df3d488";
  constructor(private usergroupClient: UserGroupClient, private friendClient: FriendClient) { }
  ngOnInit(): void {
    this.getGroupsByUserId(this.userid);
    this.getFreindsByUserId(this.userid);
  }
  getGroupsByUserId(userid: string) {
    this.usergroupClient.getUserGroups(userid).subscribe(result => {
      this.groups = result;
      console.log(this.groups);
    },
      error => console.error(error));
  }
  getFreindsByUserId(userid: string){
    this.friendClient.getFriends(userid).subscribe(result=>{
      this.friends = result;
      console.log(this.friends);
    },
    error=>console.error(error));
  }
}
