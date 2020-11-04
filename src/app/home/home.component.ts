import { Component, OnInit } from '@angular/core';
import { GroupAC, UserGroupClient } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  groups: GroupAC[];
  userid: string = "ab9e1498-cf3a-4044-8e97-357d0df3d488";
  constructor(private usergroupClient: UserGroupClient) { }
  ngOnInit(): void {
    this.getGroupsByUserId(this.userid);
  }
  getGroupsByUserId(userid: string) {
    this.usergroupClient.groupbyuserid(userid).subscribe(result => {
      this.groups = result;
      console.log(this.groups);
    },
      error => console.error(error));
  }
}
