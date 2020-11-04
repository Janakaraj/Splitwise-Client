import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpenseAC, ExpenseClient } from 'src/app/data.service';

@Component({
  selector: 'app-group-expense',
  templateUrl: './group-expense.component.html',
  styleUrls: ['./group-expense.component.css']
})
export class GroupExpenseComponent implements OnInit {

  constructor(private expenseClient:ExpenseClient, private activatedRoute: ActivatedRoute) { }
expenses:ExpenseAC[];
groupId: number;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(e => {
      this.groupId = +e.get('id');
      this.getExpensesByGroupId(this.groupId);
    });
    
  }
  getExpensesByGroupId(id:number){
    this.expenseClient.getexpensesbygroupid(id).subscribe(result => {
      this.expenses = result;
      console.log(this.expenses);
    },
    error => console.error(error));
  }

}
