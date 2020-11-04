import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { GroupAC, GroupClient, IGroupAC } from 'src/app/data.service';

@Component({
  selector: 'app-group-add',
  templateUrl: './group-add.component.html',
  styleUrls: ['./group-add.component.css']
})
export class GroupAddComponent implements OnInit {
  @Output() loadDataEvent = new EventEmitter<boolean>();
  mySubscription: any;
  group: GroupAC = new GroupAC();
  groupData: any = {
    groupId: 0,
    groupName: null,
    groupCreatorId: null,
    groupCreator: null
  };
  groupCreatorId: string = "ab9e1498-cf3a-4044-8e97-357d0df3d488";
  constructor(private groupClient: GroupClient, private router:Router) {
  }

  ngOnInit(): void {
  }
  add() {
    this.groupData.groupCreatorId = this.groupCreatorId;
    this.group.init(this.groupData);
    this.groupClient.groupPost(this.group).subscribe(result => {
      console.log(result);
      this.router.navigate(['/']);
    },
      error => console.error(error));
  }
}
