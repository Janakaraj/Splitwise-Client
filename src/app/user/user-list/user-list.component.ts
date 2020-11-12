import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PayeeAC, PayeeClient, PayerAC, PayerClient, UserAC, UserGroupClient } from 'src/app/shared/data.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  groupId: number = 0;
  groupMembers: UserAC[];
  allPayerExpenses: PayerAC[];
  allPayeeExpenses: PayeeAC[];
  usersBalance: any[] = [];
  usersOwes: any[] = [];
  constructor(private userGroupClient: UserGroupClient, private payerClient: PayerClient, private payeeClient: PayeeClient, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(e => {
      this.groupId = +e.get('id');
      this.getGroupMembers(this.groupId);
    });
  }
  getGroupMembers(id: number) {
    this.userGroupClient.getUsersInGroup(id).subscribe(result => {
      this.groupMembers = result;
      this.getGroupBalanceData();
    },
      error => console.error(error));
  }
  getGroupBalanceData() {
    this.usersBalance = [];
    this.usersOwes = [];
    for (let j = 0; j < this.groupMembers.length; j++) {
      this.allPayerExpenses=[];
      this.allPayeeExpenses=[];
      this.payerClient.getExpensesByPayerId(this.groupMembers[j].id).subscribe(result => {
        this.allPayerExpenses = result;
        var totalPaid = 0;
        var totalOwed = 0;
        var balance = 0;
        var id = "";
        var name = "";
        for (let i = 0; i < this.allPayerExpenses.length; i++) {
          if (this.allPayerExpenses[i].expense.expenseGroupId == this.groupId) {
            totalPaid = totalPaid + Number(this.allPayerExpenses[i].amountPaid);
            totalOwed = totalOwed + Number(this.allPayerExpenses[i].payerShare);
            id = this.allPayerExpenses[i].payerId;
            name = this.allPayerExpenses[i].payerUser.userName;
          }
        }
        balance = totalPaid - totalOwed;
        var userBalance = {
          id: id,
          balance: balance,
          userName: name
        }
        this.usersBalance.push(userBalance);
        this.payeeClient.getExpensesByPayeeId(this.groupMembers[j].id).subscribe(result => {
          this.allPayeeExpenses = result;
          var totalOwed = 0;
          var id = "";
          var name = "";
          for (let i = 0; i < this.allPayeeExpenses.length; i++) {
            if (this.allPayeeExpenses[i].expense.expenseGroupId == this.groupId) {
              totalOwed = totalOwed + Number(this.allPayeeExpenses[i].payeeShare);
              id = this.allPayeeExpenses[i].payeeId;
              name = this.allPayeeExpenses[i].payeeUser.userName;
            }
          }
          var userOwes = {
            id: id,
            totalOwed: totalOwed,
            userName: name
          }
          
          this.usersOwes.push(userOwes);
        },
          error => {
            console.error(error);
          });
      },
        error => {
          console.error(error);
        });
    }
  }
}
