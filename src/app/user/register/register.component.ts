import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: any = {
    id: 0,
    email: null,
    username: null,
    fullname: null,
    password: null,
    contactNumber: null
  };
  constructor(private route: Router) { }

  ngOnInit(): void {
  }
  add(): void {
  //   this.employeeService.addEmployee(this.employee);
  //    this.route.navigate(['/employee']).then(() => {
  //      window.location.reload();
  //   });
   }
}
