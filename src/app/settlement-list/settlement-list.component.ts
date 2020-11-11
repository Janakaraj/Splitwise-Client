import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SettlementAC, SettlementClient } from '../data.service';

@Component({
  selector: 'app-settlement-list',
  templateUrl: './settlement-list.component.html',
  styleUrls: ['./settlement-list.component.css']
})
export class SettlementListComponent implements OnInit {
  settlementAC:SettlementAC[];
  groupId:number=0;
  constructor(private settlementClient:SettlementClient, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(e => {
      this.groupId = +e.get('id');
    },
    error=>console.error(error));
    this.settlementClient.getSettlementsByGroupId(this.groupId).subscribe(result=>{
      this.settlementAC = result;
    },
    error=>console.error(error));
  }

}
