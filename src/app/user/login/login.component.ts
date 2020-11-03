import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  loginDetails: any = {
    email: null,
    password: null,
    rememberMe: false
  };
  ngOnInit(): void {
  }
  login() {
    //this.loginService.sendUserDetails(this.loginDetails);
  }

}
