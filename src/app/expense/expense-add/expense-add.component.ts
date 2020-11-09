import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseAC, ExpenseClient, PayeeAC, PayeeClient, PayerAC, PayerClient, UserAC, UserGroupClient, UserGroupMapping } from 'src/app/data.service';

@Component({
  selector: 'app-expense-add',
  templateUrl: './expense-add.component.html',
  styleUrls: ['./expense-add.component.css']
})
export class ExpenseAddComponent implements OnInit {
  groupId:number = 0;
  expenseAdderId: string = "ab9e1498-cf3a-4044-8e97-357d0df3d488";
  expenseToUpdate:ExpenseAC = new ExpenseAC();
  participents:UserAC[]=[];
  groupMembers:UserAC[];
  payer:PayerAC = new PayerAC();
  payee:PayeeAC = new PayeeAC();
  paidBy:UserAC;
  paidById:string;
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
  postedExpenseId: any;
  constructor(private expenseClient: ExpenseClient,private usergroupClient:UserGroupClient, private payeeClient: PayeeClient, private payerClient: PayerClient, private activatedRoute: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(e => {
      this.groupId = +e.get('id');
      console.log(this.groupId);
    });
    this.usergroupClient.getUsersInGroup(this.groupId).subscribe(result=>{
      this.groupMembers = result;
    },
    error=>console.error(error));
  }
  add(){
    this.expense.expenseGroupId = this.groupId;
    var date = new Date();
    this.expense.expenseAddTimeStamp = date.getTime().toString();
    this.expenseToUpdate.init(this.expense);
    this.expenseClient.postExpense(this.expenseToUpdate).subscribe(
      result =>{
        this.postedExpenseId = result.expenseId;
        console.log("Expennse Added");
        if(result.expenseSplitBy=="equal"){
          let length = this.participents.length;
          let individualShare = this.expense.expenseTotalAmount/length;
          this.postPayers(individualShare);
          for(var i =0; i<this.participents.length;i++){
            if(this.participents[i].id != this.paidById){
              this.postPayees(individualShare, this.participents[i].id);
            }
          }
        }
        var id = this.groupId.toString();
        this.router.navigateByUrl(`/home/(groupExpenses/${id}//right:listUser/${id})`);
      },
      error=>console.error(error)
    );
  }
  postPayers(individualShare:any){
    let payerDetail={
      id:0,
      amountPaid:this.expense.expenseTotalAmount,
      expenseId:this.postedExpenseId,
      expense:null,
      payerId:this.paidById,
      payerUser:null,
      payerShare: individualShare
    }
    this.payer.init(payerDetail);
    console.log(this.payer);
    this.payerClient.postPayer(this.payer).subscribe(result=>{
      console.log(result)
    },
    error=>console.error(error));
  }
  postPayees(individualShare:any, payeeId:string){
    let payeeDetail={
      id:0,
      expenseId:this.postedExpenseId,
      expense:null,
      payeeId:payeeId,
      payeeUser:null,
      payeeShare: individualShare
    }
    this.payee.init(payeeDetail);
    console.log(this.payee);
    this.payeeClient.postPayee(this.payee).subscribe(result=>{
      console.log(result)
    },
    error=>console.error(error));
  }
  isSelected(memeber:any) {
    return this.participents.findIndex((item) => item.id == memeber.id) > -1 ? true : false;
   }
   selectSuggestion(member:any) {
    this.participents.find((item) => item.id === member.id) ? 
    this.participents = this.participents.filter((item) => item.id !== member.id) :
    this.participents.push(member);
  }
  deleteSelects(member:any) {
    this.participents = this.participents.filter((item) => item.id !== member.id);
    // this.assignToNgModel();
  }
}
