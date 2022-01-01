import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username = "";
  email = "";
  password = "";
  passwordConfirm = "";
  picture: any;
  readonly baseUrl = 'http://localhost:3000';
  usernameError = false;
  emailError = false;
  passwordError = false;
  pictureError = false;
  token: any;

  constructor(private router: Router, private http: HttpClient, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Registracija');
    this.checkToken();
  }

  selected(event: any){
    this.picture = <File>event.target.files[0];
    this.passwordError = false;
  }

  register(){
    if(this.picture==null){
      this.pictureError = true;
    }else{
      this.pictureError = false;
    }
    if(this.username!="" && this.email!="" && this.password!="" && this.passwordConfirm!=null){
      let t = 0;
      if(this.password !== this.passwordConfirm){
        t = 1;
        this.passwordError = true;
      }else{
        this.passwordError = false;
      }
      if(t==0){
        let fd = new FormData();
        fd.append('username', this.username);
        fd.append('email', this.email);
        fd.append('password', this.password);
        fd.append('file', this.picture, this.picture.name);
        console.log(fd);
        this.http.post(this.baseUrl+'/users/register',fd).subscribe((data: any)=>{
            //this.novel = data;
            console.log(data);
            if(!!localStorage.getItem('token')==true){
              localStorage.removeItem('token');
            }
            localStorage.setItem("token", data.token);
            alert("Uspješna registracija!");
            this.router.navigate(["/"]);
            window.location.reload();
          },err=>{
            console.log("err: ");
            console.log(err.error.code);
            if(err.error.code==1){
              this.usernameError = true;
              this.emailError = false;
            }else if(err.error.code==2){
              this.usernameError = false;
              this.emailError = true;
            }else{
              this.usernameError = false;
              this.emailError = false;
            }
          });
        }
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
    if(this.token.type == 'user'){
      this.router.navigate(['/']);
    }
  }

}
