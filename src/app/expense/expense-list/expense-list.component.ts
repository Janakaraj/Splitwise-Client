import { Component, OnInit } from '@angular/core';
import { ExpenseAC, PayeeAC, PayeeClient, PayerAC, PayerClient } from 'src/app/data.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {
  userId: string = localStorage.getItem("userId");
  payerList: PayerAC[] = [];
  payeeList: PayeeAC[] = [];
  constructor(private payeeClient: PayeeClient, private payerClient: PayerClient) { }

  ngOnInit(): void {
    this.getUserExpenses();
  }
  getUserExpenses() {
    this.payeeClient.getExpensesByPayeeId(this.userId).subscribe(result => {
      console.log(result);
      this.payeeList = result;
    },
      error => console.error(error));
    this.payerClient.getExpensesByPayerId(this.userId).subscribe(result => {
      this.payerList = result;
    },
      error => console.error(error));
  }

}
