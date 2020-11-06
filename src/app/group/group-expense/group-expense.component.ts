import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpenseAC, ExpenseClient, GroupClient, PayeeAC, PayeeClient, PayerAC, PayerClient, UserAC } from 'src/app/data.service';

@Component({
  selector: 'app-group-expense',
  templateUrl: './group-expense.component.html',
  styleUrls: ['./group-expense.component.css']
})
export class GroupExpenseComponent implements OnInit {


  constructor(private expenseClient: ExpenseClient, private groupClient: GroupClient,
     private activatedRoute: ActivatedRoute, private payeeClient: PayeeClient, 
     private payerClient: PayerClient) { }

  expenses: ExpenseAC[];
  payers : PayerAC[];
  payees : PayeeAC[];
  groupId: number;
  showIds: number[] = [];
  groupName: string = "";
  showExpenseCard: boolean = false;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(e => {
      this.groupId = +e.get('id');
      this.getExpensesByGroupId(this.groupId);
      this.getGroupName(this.groupId);
    });

  }
  getExpensesByGroupId(id: number) {
    this.expenseClient.getexpensesByGroupId(id).subscribe(result => {
      this.expenses = result;
      console.log(this.expenses);
    },
      error => console.error(error));
  }
  showCard(id: number) {

    if (this.showIds.indexOf(id) != -1) {
      this.showIds.splice(this.showIds.indexOf(id), 1);
    }
    else {
      this.showIds.push(id);
    }
    this.payerClient.getPayersByExpenseId(id).subscribe(result => {
      this.payers=result;
    },
    error=>console.error(error));
    this.payeeClient.getPayeesByExpenseId(id).subscribe(result =>{
      this.payees=result;
    });
  }
  getGroupName(id: number) {
    this.groupClient.getGroup(id).subscribe(result => {
      this.groupName = result.groupName;
    },
      error => console.error(error));
  }
}
