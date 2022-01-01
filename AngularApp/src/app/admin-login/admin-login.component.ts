import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  email = "";
  password = "";
  readonly baseUrl = 'http://localhost:3000';
  emailError = false;
  passwordError = false;
  token: any;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.checkToken();
  }

  login(){
    if(this.email!="" && this.password!=""){
        let fd = {'email': this.email, 'password': this.password};
        this.http.post(this.baseUrl+'/admin/login',fd).subscribe((data: any)=>{
            if(!!localStorage.getItem('token')==true){
              localStorage.removeItem('token');
            }
            localStorage.setItem("token", data.token);
            alert("Uspješna prijava!");
            this.router.navigate(["/admin"]);
          },err=>{
            console.log("err: ");
            console.log(err.error.code);
            if(err.error.code==1){
              this.emailError = true;
              this.passwordError = false;
            }else if(err.error.code==2){
              this.emailError = false;
              this.passwordError = true;
            }else{
              this.emailError = false;
              this.passwordError = false;
            }
          });
      }
  }

  checkToken(){
    if(!!localStorage.getItem('token')==true){
      this.token = localStorage.getItem('token');
      this.getTokenInfo();
    }
  }

  getTokenInfo(){
    this.token = localStorage.getItem('token');
    var base64Url = this.token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    this.token = JSON.parse(jsonPayload);
    if(this.token.type == 'admin'){
      this.router.navigate(["/admin"]);
    }
  }
}
