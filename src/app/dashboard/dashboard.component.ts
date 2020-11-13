import { Component, OnInit } from '@angular/core';
import { ExpenseAC, PayeeAC, PayeeClient, PayerAC, PayerClient, SettlementAC, SettlementClient } from '../shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userId: string = localStorage.getItem("userId");
  payerDetails: PayerAC[];
  payeeDetails: PayeeAC[];
  balance: number = 0;
  totalLent: number = 0;
  totalAmountPaid: number = 0;
  totalOwed: number = 0;
  totalShare: number;
  nonGroupExpenseId:number[] =[];
  nonGroupExpenses: ExpenseAC[]=[];
  nonGroupSettlement:SettlementAC[]=[];
  constructor(private payerClient: PayerClient, private payeeClient: PayeeClient, private settlementClient: SettlementClient) { }

  ngOnInit(): void {
    this.getExpenseData();
  }
  getExpenseData() {
    this.payerClient.getExpensesByPayerId(this.userId).subscribe(result => {
      this.payerDetails = result;
      var totalPaid = 0;
      var totalShare = 0;
      for (let i = 0; i < this.payerDetails.length; i++) {
        totalPaid = totalPaid + Number(this.payerDetails[i].amountPaid);
        totalShare = totalShare + Number(this.payerDetails[i].payerShare);
      }
      this.totalShare = totalShare;
      this.totalAmountPaid = totalPaid;
      this.totalLent = this.totalAmountPaid-this.totalShare;
    },
    error=>console.error(error));
    this.payeeClient.getExpensesByPayeeId(this.userId).subscribe(result=>{
      this.payeeDetails = result;
      var totalOwed = 0;
      for(let j=0;j<this.payeeDetails.length;j++){
        totalOwed = totalOwed + Number(this.payeeDetails[j].payeeShare);
      }
      this.totalOwed = this.totalOwed + totalOwed;
      this.getNonGroupSettlements();
    },
    error=>console.error(error));
  }
  getNonGroupSettlements(){
    for(let i=0;i<this.payeeDetails.length;i++){
      if(this.payeeDetails[i].expense.expenseGroupId == null){
        //this.nonGroupExpenses.push(this.payeeDetails[i].expense);
        this.nonGroupExpenseId.push(this.payeeDetails[i].expenseId);
      }
    }
    for(let i=0;i<this.payerDetails.length;i++){
      if(this.payerDetails[i].expense.expenseGroupId == null){
        //this.nonGroupExpenses.push(this.payeeDetails[i].expense);
        this.nonGroupExpenseId.push(this.payerDetails[i].expenseId);
      }
    }
    
    for(let j=0;j<this.nonGroupExpenseId.length;j++){
      this.settlementClient.getSettlementsByExpenseId(Number(this.nonGroupExpenseId[j])).subscribe(result=>{
         this.nonGroupSettlement = result;
      },
      error=>console.error(error));
    }
  }
}
