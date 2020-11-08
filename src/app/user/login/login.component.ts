import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUserAC, UserClient } from 'src/app/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: number;

  constructor(private userClient: UserClient, private route:Router) { }
  loginData: LoginUserAC= new LoginUserAC();
  loginDetails: any = {
    userEmail: null,
    userPassword: null
  };
  ngOnInit(): void {
  }
  login() {
  this.loginData.init(this.loginDetails);
  console.log(this.loginData);
  this.userClient.login(this.loginData).subscribe(
    result=>{
      localStorage.setItem("auth_token",result.token);
      let jwtData = result.token.split('.')[1];
      let decodedJwtJsonData = JSON.parse(window.atob(jwtData));
      localStorage.setItem('userName', decodedJwtJsonData.name);
      localStorage.setItem('userId', decodedJwtJsonData.userid);
      localStorage.setItem('userFullName', decodedJwtJsonData.userFullname);
      console.log("Login successfull.");
        this.route.navigate(['/home'])
          .then(() => {
            window.location.reload();
          });
    },
    error=> {
      this.error = +error.status;
      if (this.error == 400) {
        alert("Email address formate is invalid");
      }
      if (this.error == 401) {
        alert("Incorrect email address or password");
      }
      console.log(error);
    }
  );
  }

}
