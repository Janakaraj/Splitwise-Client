import { Component, OnInit } from '@angular/core';
import { PayeeAC, PayeeClient, PayerAC, PayerClient } from '../data.service';

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
  constructor(private payerClient: PayerClient, private payeeClient: PayeeClient) { }

  ngOnInit(): void {
    this.getExpenseData();
  }
  getExpenseData() {
    this.payerClient.getExpensesByPayerId(this.userId).subscribe(result => {
      this.payerDetails = result;
      var totalPaid = 0;
      var totalOwed = 0;
      for (let i = 0; i < this.payerDetails.length; i++) {
        totalPaid = totalPaid + Number(this.payerDetails[i].amountPaid);
        totalOwed = totalOwed + Number(this.payerDetails[i].payerShare);
      }
      this.totalOwed = totalOwed;
      this.totalAmountPaid = totalPaid;
      this.payeeClient.getExpensesByPayeeId(this.userId).subscribe(result=>{
        this.payeeDetails = result;
        var totalSumOwed = 0;
        for(let j=0;j<this.payeeDetails.length;j++){
          totalSumOwed = totalSumOwed + Number(this.payeeDetails[j].payeeShare);
        }
        this.totalOwed = this.totalOwed + totalSumOwed;
        this.totalLent = this.totalAmountPaid - this.totalOwed;
      })
    },
    error=>console.error(error));
  }
}
