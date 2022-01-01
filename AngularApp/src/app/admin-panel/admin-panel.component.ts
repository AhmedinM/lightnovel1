import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  token: any = [];
  msg = false;
  email = "";
  password = "";
  passwordConfirm = "";
  readonly baseUrl = 'http://localhost:3000';
  emailError = false;
  passwordError = false;

  passwordC = "";
  passwordConfirmC = "";
  passwordErrorC = false;
  passMsg = false;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.checkToken();
  }

  add(){
    if(this.email!="" && this.password!="" && this.passwordConfirm===this.password){
      this.passwordError = false;
      this.emailError = false;
      let fd = {email: this.email, password: this.password};
      this.http.post(this.baseUrl+'/admin/register',fd).subscribe((data: any)=>{
        alert("Uspješna registracija!");
        this.msg = true;
      },err=>{
        if(err.error.code==2){
          this.emailError = true;
        }else{
          this.emailError = false;
        }
      });
    }else{
      if(this.password !== this.passwordConfirm){
        this.passwordError = true;
      }else{
        this.passwordError = false;
      }
    }
  }

  newPassword(){
    if(this.passwordC!=""){
      let t = 0;
      if(this.passwordC !== this.passwordConfirmC){
        t = 1;
        this.passwordErrorC = true;
      }else{
        this.passwordErrorC = false;
      }
      if(t==0){
        let fd = {id: this.token.subject, password: this.passwordC};
        this.http.post(this.baseUrl+'/admin/password',fd).subscribe((data: any)=>{
          this.passMsg = true;
        },err=>{
          console.log(err);
        });
      }
    }else{
      console.log("ne");
    }
  }

  deactivate(aId: any){
    if(confirm("Jeste li sigurni da želite da obrišete nalog?")){
      this.http.delete(this.baseUrl+'/admin/delete',{params: {id: aId}}).subscribe(data=>{
        var c: any = data;
        if(c.code=="ok"){
          //this.msg = true;
          localStorage.removeItem('token');
          alert("Nalog je uklonjen.");
          this.router.navigate(["/admin-login"]);
        }
      },err=>{
        console.log(err);
      });
    }
  }

  checkToken(){
    if(!!localStorage.getItem('token')==true){
      this.token = localStorage.getItem('token');
      this.getTokenInfo();
    }else{
      this.router.navigate(["/admin-login"]);
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
    if(this.token.type != 'admin'){
      this.router.navigate(["/admin-login"]);
    }
  }

}
