import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { GroupListComponent } from './group/group-list/group-list.component';
import { GroupAddComponent } from './group/group-add/group-add.component';
import { GroupEditComponent } from './group/group-edit/group-edit.component';
import { ExpenseListComponent } from './expense/expense-list/expense-list.component';
import { ExpenseAddComponent } from './expense/expense-add/expense-add.component';
import { ExpenseEditComponent } from './expense/expense-edit/expense-edit.component';
import { GroupExpenseComponent } from './group/group-expense/group-expense.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AbsolutePipe } from './absolute.pipe';
import { SettlementComponent } from './settlement/settlement.component';
import { SettlementListComponent } from './settlement-list/settlement-list.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserListComponent,
    UserAddComponent,
    UserEditComponent,
    GroupListComponent,
    GroupAddComponent,
    GroupEditComponent,
    ExpenseListComponent,
    ExpenseAddComponent,
    ExpenseEditComponent,
    GroupExpenseComponent,
    WelcomeComponent,
    AbsolutePipe,
    SettlementComponent,
    SettlementListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
