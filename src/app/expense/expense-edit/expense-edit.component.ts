import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpenseAC, ExpenseClient } from 'src/app/data.service';

@Component({
  selector: 'app-expense-edit',
  templateUrl: './expense-edit.component.html',
  styleUrls: ['./expense-edit.component.css']
})
export class ExpenseEditComponent implements OnInit {
expenseId:number = 0;
expenseToUpdate:ExpenseAC = new ExpenseAC();
expense:any={
  expenseId: this.expenseId,
  expenseName: "string",
  expenseTotalAmount: 0,
  expenseGroupId: 0,
  expenseSplitBy: "string",
  expenseDescription: "string",
  expenseCurrency: "string",
  expenseAdderId: "string",
};
  constructor(private expenseClient: ExpenseClient, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(e => {
    this.expenseId = +e.get('id');
    });
    this.expenseClient.getExpense(this.expenseId).subscribe(result => {
      this.expense = result;
      console.log(this.expense);
    },
    error => console.error(error));
    //this.expenseClient.putExpense().subscribe();
  }
update(){
this.expenseToUpdate.init(this.expense);
this.expenseClient.putExpense(this.expenseId,this.expenseToUpdate).subscribe(result => {
  console.log(result);
},
error => console.error(error));
}
}
