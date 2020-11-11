import { Component, OnInit } from '@angular/core';
import { ExpenseAC, ExpenseClient, GroupAC, PayeeClient, PayerClient, SettlementAC, SettlementClient, UserAC, UserGroupClient } from '../data.service';

@Component({
  selector: 'app-settlement',
  templateUrl: './settlement.component.html',
  styleUrls: ['./settlement.component.css']
})
export class SettlementComponent implements OnInit {
  showExpenses: boolean = false;

  constructor(private userGroupClient: UserGroupClient, private expenseClient: ExpenseClient, private payerClient: PayerClient, private payeeClient: PayeeClient, private settlementClient: SettlementClient) { }
  groupMembers: UserAC[] = [];
  userGroups: GroupAC[];
  groupExpenses: ExpenseAC[];
  settlementAC: SettlementAC = new SettlementAC();
  payTo: string = '';
  paidBy: string = '';
  amount: number = 0;
  groupId: number = 0;
  expenseId: number = 0;
  userId: string = localStorage.getItem("userId");
  showUsers: boolean = false;
  ngOnInit(): void {
    this.getUserGroups();
  }
  getGroupMemebers() {
    this.groupMembers = [];
    this.payerClient.getPayersByExpenseId(this.expenseId).subscribe(result => {
      for (let i = 0; i < result.length; i++) {
        this.groupMembers.push(result[i].payerUser);
      }
      this.payeeClient.getPayeesByExpenseId(this.expenseId).subscribe(result => {
        for (let i = 0; i < result.length; i++) {
          this.groupMembers.push(result[i].payeeUser);
        }
      },
        error => console.error(error));
      this.showUsers = true;
    },
      error => console.error(error));
  }
  getUserGroups() {
    this.userGroupClient.getUserGroups(this.userId).subscribe(result => {
      this.userGroups = result;
    });
  }
  getGroupExpenses() {
    this.expenseClient.getexpensesByGroupId(this.groupId).subscribe(result => {
      this.groupExpenses = result;
      this.showExpenses = true;

    });
  }
  add() {
    let settlementData = {
      settlementId: 0,
      settlementGroupId: this.groupId,
      group: null,
      userPayingId: this.paidBy,
      userPaying: null,
      userRecievingId: this.payTo,
      userRecieving: null,
      settlementExpenseId!: this.expenseId,
      settlementExpense: null,
      transactionAmount: this.amount
    }
    this.settlementAC.init(settlementData);
    this.settlementClient.postSettlement(this.settlementAC).subscribe(()=>{
      console.log("settlement added");
    },
    error=>console.error(error));
  }
}
