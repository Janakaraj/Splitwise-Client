import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenseEditComponent } from './expense/expense-edit/expense-edit.component';
import { ExpenseAddComponent } from './expense/expense-add/expense-add.component';
import { ExpenseListComponent } from './expense/expense-list/expense-list.component';
import { GroupAddComponent } from './group/group-add/group-add.component';
import { GroupEditComponent } from './group/group-edit/group-edit.component';
import { GroupListComponent } from './group/group-list/group-list.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { GroupExpenseComponent } from './group/group-expense/group-expense.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SettlementComponent } from './settlement/settlement.component';
import { SettlementListComponent } from './settlement-list/settlement-list.component';
import { FriendAddComponent } from './friend/friend-add/friend-add.component';
import { ExpenseIndividualAddComponent } from './expense/expense-individual-add/expense-individual-add.component';


const routes: Routes = [
  {
    path: 'home', component: HomeComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'editUser/:id', component: UserEditComponent },
      { path: 'addGroup', component: GroupAddComponent },
      { path: 'editGroup/:id', component: GroupEditComponent },
      { path: 'listGroup', component: GroupListComponent },
      { path: 'settlement', component: SettlementComponent },
      { path: 'settlementList/:id', component: SettlementListComponent },
      { path: 'addFriend', component: FriendAddComponent },
      { path: 'addExpense/:id', component: ExpenseAddComponent },
      { path: 'addIndiviualExpense', component: ExpenseIndividualAddComponent },
      { path: 'listExpense', component: ExpenseListComponent },
      { path: 'editExpense/:id', component: ExpenseEditComponent },
      { path: 'groupExpenses/:id', component: GroupExpenseComponent },
      { path: 'listUser/:id', component: UserListComponent, outlet: "right" },
      { path: 'welcome', component:WelcomeComponent, outlet:"right"}
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
