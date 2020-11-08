import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Splitwise-Client';
  userName=localStorage.getItem("userFullName");
  loggedIn: boolean =false;
  constructor(private route:Router){}
  ngOnInit():void{
    if(localStorage.getItem("auth_token")){
      this.loggedIn = true;
    }
    else{
      this.loggedIn = false;
    }
  }
  logout() {
    localStorage.clear();
    console.log("Logout successFull.");
    this.route.navigate(['/login']).then(() => {
      window.location.reload();
    });

  }
}
