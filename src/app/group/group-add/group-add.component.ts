import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FriendClient, GroupAC, GroupClient, IGroupAC, UserAC, UserGroupClient, UserGroupMapping } from 'src/app/data.service';

@Component({
  selector: 'app-group-add',
  templateUrl: './group-add.component.html',
  styleUrls: ['./group-add.component.css']
})
export class GroupAddComponent implements OnInit {
  @Output() loadDataEvent = new EventEmitter<boolean>();
  mySubscription: any;
  group: GroupAC = new GroupAC();
  groupMembers:UserAC[]=[];
  friends:UserAC[];
  userGroupMapping:UserGroupMapping=new UserGroupMapping();
  userId:string = localStorage.getItem("userId");
  postedGroupId:number=0;
  groupData: any = {
    groupId: 0,
    groupName: null,
    groupCreatorId: null,
    groupCreator: null
  };
  groupCreatorId: string = localStorage.getItem("userId");
  constructor(private groupClient: GroupClient, private friendClient:FriendClient, private userGroupClient:UserGroupClient, private router:Router) {
  }

  ngOnInit(): void {
    this.friendClient.getFriends(this.userId).subscribe(result =>{
      this.friends = result;
    },
    error=>console.error(error));
  }
  add() {
    this.groupData.groupCreatorId = this.groupCreatorId;
    this.group.init(this.groupData);
    this.groupClient.postGroup(this.group).subscribe(result => {
      this.postedGroupId = result.groupId;
      if(this.groupMembers.length>0){
        for(let i=0;i<this.groupMembers.length;i++){
          var mappingData ={
            userId:this.groupMembers[i].id,
            groupId:this.postedGroupId
          }
          this.userGroupMapping.init(mappingData);
          this.userGroupClient.postUserGroup(this.userGroupMapping).subscribe(result=>{
            console.log(result);
          },
          error=>console.error(error));
        }
      }
      
      this.router.navigateByUrl(`/home/(groupExpenses/${this.postedGroupId}//right:listUser/${this.postedGroupId}`)
      .then(() => {
        window.location.reload();
      });
    },
      error => console.error(error));
  }
  isSelected(memeber:any) {
    return this.groupMembers.findIndex((item) => item.id == memeber.id) > -1 ? true : false;
   }
   selectSuggestion(member:any) {
    this.groupMembers.find((item) => item.id === member.id) ? 
    this.groupMembers = this.groupMembers.filter((item) => item.id !== member.id) :
    this.groupMembers.push(member);
  }
  deleteSelects(member:any) {
    this.groupMembers = this.groupMembers.filter((item) => item.id !== member.id);
    // this.assignToNgModel();
  }
}
