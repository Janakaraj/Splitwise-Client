import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseAC, ExpenseClient, GroupAC, PayeeClient, PayerClient, SettlementAC, SettlementClient, UserAC, UserGroupClient } from '../shared/data.service';

@Component({
  selector: 'app-settlement',
  templateUrl: './settlement.component.html',
  styleUrls: ['./settlement.component.css']
})
export class SettlementComponent implements OnInit {
  showExpenses: boolean = false;

  constructor(private userGroupClient: UserGroupClient, private expenseClient: ExpenseClient,
    private payerClient: PayerClient, private payeeClient: PayeeClient,
    private settlementClient: SettlementClient, private router: Router) { }
  groupMembers: UserAC[] = [];
  userGroups: GroupAC[];
  groupExpenses: ExpenseAC[]=[];
  settlementAC: SettlementAC = new SettlementAC();
  payTo: string = '';
  paidBy: string = '';
  amount: number = 0;
  groupId: number = 0;
  expenseId: number = 0;
  userId: string = localStorage.getItem("userId");
  showUsers: boolean = false;
  isNonGroupSettlement: boolean = false;
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
    if (this.groupId == -1) {
      console.log("this is a non group settlement");
      this.payerClient.getExpensesByPayerId(this.userId).subscribe(result=>{
        for(let i=0;i<result.length;i++){
          if(result[i].expense.expenseGroupId == null){
            this.groupExpenses.push(result[i].expense);
          }
        }
        this.showExpenses = true;
      });
    } else {
    this.expenseClient.getexpensesByGroupId(this.groupId).subscribe(result => {
      this.groupExpenses = result;
      this.showExpenses = true;

    });
  }
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
    if(this.groupId == -1){
      settlementData.settlementGroupId = null;
    }
    this.settlementAC.init(settlementData);
    this.settlementClient.postSettlement(this.settlementAC).subscribe(() => {
      if(this.groupId == -1){
        this.router.navigateByUrl(`/home/(listExpense//right:welcome)`)
        .then(() => {
          window.location.reload();
        });
      }else{
        this.router.navigateByUrl(`/home/(settlementList/${this.groupId}//right:listUser/${this.groupId})`)
        .then(() => {
          window.location.reload();
        });
      }
      
    },
      error => console.error(error));
  }
}
