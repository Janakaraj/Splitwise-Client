import { Component, OnInit } from '@angular/core';
import { AddFriendAC, FriendClient, UserAC, UserClient } from 'src/app/shared/data.service';

@Component({
  selector: 'app-friend-add',
  templateUrl: './friend-add.component.html',
  styleUrls: ['./friend-add.component.css']
})
export class FriendAddComponent implements OnInit {
  userList: UserAC[];
  friendEmail:string='';
  userId:string = localStorage.getItem("userId");
  friend:AddFriendAC= new AddFriendAC();
  constructor(private userClient: UserClient, private friendClient: FriendClient) { }

  ngOnInit(): void {
    this.getUserList();
  }
  getUserList() {
    this.userClient.getUsers().subscribe(result => {
      this.userList = result;
    },
      error => console.error(error));
  }
add(){
let friendDetail={
  userId: this.userId,
  userFriendEmail: this.friendEmail
}
this.friend.init(friendDetail);
this.friendClient.addFriend(this.friend).subscribe(()=>{
window.location.reload();
},
error=>console.error(error));
}
}
