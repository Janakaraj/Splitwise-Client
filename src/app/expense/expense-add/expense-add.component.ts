import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseAC, ExpenseClient, PayeeAC, PayeeClient, PayerAC, PayerClient, UserAC, UserGroupClient, UserGroupMapping } from 'src/app/data.service';

@Component({
  selector: 'app-expense-add',
  templateUrl: './expense-add.component.html',
  styleUrls: ['./expense-add.component.css']
})
export class ExpenseAddComponent implements OnInit {
  groupId: number = 0;
  expenseAdderId: string = localStorage.getItem("userId");
  expenseToUpdate: ExpenseAC = new ExpenseAC();
  participents: UserAC[] = [];
  groupMembers: UserAC[];
  payer: PayerAC = new PayerAC();
  payee: PayeeAC = new PayeeAC();
  payingUsers: any = [];
  participentShare: any = [];
  expense: any = {
    expenseId: 0,
    expenseName: null,
    expenseTotalAmount: 0,
    expenseGroupId: this.groupId,
    expenseSplitBy: null,
    expenseDescription: null,
    expenseCurrency: null,
    expenseAddTimeStamp: null,
    expenseAdderId: this.expenseAdderId,
  };
  postedExpenseId: any;
  constructor(private expenseClient: ExpenseClient, private usergroupClient: UserGroupClient, private payeeClient: PayeeClient, private payerClient: PayerClient, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(e => {
      this.groupId = +e.get('id');
    });
    this.usergroupClient.getUsersInGroup(this.groupId).subscribe(result => {
      this.groupMembers = result;
    },
      error => console.error(error));
  }
  add() {
    this.expense.expenseGroupId = this.groupId;
    var date = new Date();
    this.expense.expenseAddTimeStamp = date.getTime().toString();
    this.expenseToUpdate.init(this.expense);
    this.expenseClient.postExpense(this.expenseToUpdate).subscribe(
      result => {
        this.postedExpenseId = result.expenseId;
        console.log("Expennse Added");
        if (result.expenseSplitBy == "equal") {
          let length = this.participents.length;
          let individualShare = this.expense.expenseTotalAmount / length;
          for (let i = 0; i < this.payingUsers.length; i++) {
            if (Number(this.payingUsers[i].paid) > 0) {
              this.postPayers(Number(this.payingUsers[i].paid), Number(individualShare), this.payingUsers[i].id);
            }
            else {
              this.postPayees(Number(individualShare), this.payingUsers[i].id);
            }
          }
        }
        if (result.expenseSplitBy == "manual") {
          for (let i = 0; i < this.participentShare.length; i++) {
            for (let j = 0; j < this.payingUsers.length; j++) {
              if (Number(this.payingUsers[j].paid) > 0 && this.participentShare[i].id == this.payingUsers[j].id) {
                this.postPayers(Number(this.payingUsers[j].paid), Number(this.participentShare[i].share), this.payingUsers[j].id);
              }
            }
            if (this.payingUsers[i].paid <= 0) {
              this.postPayees(Number(this.participentShare[i].share), this.participentShare[i].id);
            }
          }
        }
        if (result.expenseSplitBy == "percentage") {
          for (let i = 0; i < this.participentShare.length; i++) {
            for (let j = 0; j < this.payingUsers.length; j++) {
              if (Number(this.payingUsers[j].paid) > 0 && this.participentShare[i].id == this.payingUsers[j].id) {
                this.postPayers(Number(this.payingUsers[j].paid), (Number(this.participentShare[i].share)) / 100 * this.expense.expenseTotalAmount, this.payingUsers[j].id);
              }
            }
            if (this.payingUsers[i].paid <= 0) {
              this.postPayees((Number(this.participentShare[i].share)) / 100 * this.expense.expenseTotalAmount, this.participentShare[i].id);
            }
          }
        }
        var id = this.groupId.toString();
        this.router.navigateByUrl(`/home/(groupExpenses/${id}//right:listUser/${id})`);
      },
      error => console.error(error)
    );
  }
  postPayers(amountpaid: any, individualShare: any, payerId: string) {
    let payerDetail = {
      id: 0,
      amountPaid: amountpaid,
      expenseId: this.postedExpenseId,
      expense: null,
      payerId: payerId,
      payerUser: null,
      payerShare: individualShare
    }
    this.payer.init(payerDetail);
    console.log(this.payer);
    this.payerClient.postPayer(this.payer).subscribe(result => {
      console.log(result)
    },
      error => console.error(error));
  }
  postPayees(individualShare: any, payeeId: string) {
    let payeeDetail = {
      id: 0,
      expenseId: this.postedExpenseId,
      expense: null,
      payeeId: payeeId,
      payeeUser: null,
      payeeShare: individualShare
    }
    this.payee.init(payeeDetail);
    console.log(this.payee);
    this.payeeClient.postPayee(this.payee).subscribe(result => {
      console.log(result)
    },
      error => console.error(error));
  }
  isSelected(memeber: any) {
    return this.participents.findIndex((item) => item.id == memeber.id) > -1 ? true : false;
  }
  selectSuggestion(member: any) {
    this.participents.find((item) => item.id === member.id) ?
      this.participents = this.participents.filter((item) => item.id !== member.id) :
      this.participents.push(member);
    this.participentShare = [];
    this.payingUsers = [];
    for (let i = 0; i < this.participents.length; i++) {
      let x = {
        id: this.participents[i].id,
        share: 0
      }
      let y = {
        id: this.participents[i].id,
        paid: 0
      }
      this.participentShare.push(x);
      this.payingUsers.push(y);
    }
  }
  deleteSelects(member: any) {
    this.participents = this.participents.filter((item) => item.id !== member.id);
    this.participentShare = [];
    this.payingUsers = [];
    for (let i = 0; i < this.participents.length; i++) {
      let x = {
        id: this.participents[i].id,
        share: 0
      }
      let y = {
        id: this.participents[i].id,
        paid: 0
      }
      this.participentShare.push(x);
      this.payingUsers.push(y);
    }
  }
}
