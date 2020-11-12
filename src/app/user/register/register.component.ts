import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterUserAC, UserAC, UserClient } from 'src/app/shared/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userDetails: RegisterUserAC = new RegisterUserAC();
  user: any = {
    userEmail: null,
    userName: null,
    userFullName: null,
    userPassword: null
  };
  fieldTextType: boolean;
  confirmPassword: string;
  constructor(private route: Router, private userClient: UserClient) { }

  ngOnInit(): void {
  }
  add(): void {
    if (this.confirmPassword == this.user.userPassword) {
      this.userDetails.init(this.user);
      console.log(this.userDetails);
      this.userClient.register(this.userDetails).subscribe(result => {
        console.log("User registered successfully");
        this.route.navigate(['/login']);
      },
        error => console.error(error));
    }
    else {
      alert("Password and Confirm Password do not match");
    }
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
