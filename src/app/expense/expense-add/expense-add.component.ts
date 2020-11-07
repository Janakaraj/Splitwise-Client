import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseAC, ExpenseClient } from 'src/app/data.service';

@Component({
  selector: 'app-expense-add',
  templateUrl: './expense-add.component.html',
  styleUrls: ['./expense-add.component.css']
})
export class ExpenseAddComponent implements OnInit {
  groupId:number = 0;
  expenseAdderId: string = "ab9e1498-cf3a-4044-8e97-357d0df3d488";
  expenseToUpdate:ExpenseAC = new ExpenseAC();
  expense:any={
    expenseId: 0,
    expenseName: null,
    expenseTotalAmount: 0,
    expenseGroupId: this.groupId,
    expenseSplitBy: null,
    expenseDescription: null,
    expenseCurrency: null,
    expenseAddTimeStamp:null,
    expenseAdderId: this.expenseAdderId,
  };
  constructor(private expenseClient: ExpenseClient, private activatedRoute: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(e => {
      this.groupId = +e.get('id');
      console.log(this.groupId);
    });
  }
  add(){
    this.expense.expenseGroupId = this.groupId;
    var date = new Date();
    this.expense.expenseAddTimeStamp = date.getTime().toString();
    this.expenseToUpdate.init(this.expense);
    this.expenseClient.postExpense(this.expenseToUpdate).subscribe(
      result =>{
        console.log("Expennse Added");
        var id = this.groupId.toString();
        this.router.navigate([`/home/groupExpenses/${id}`]);
      },
      error=>console.error(error)
    );
  }

}
