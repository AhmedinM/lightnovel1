import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Title, ɵELEMENT_PROBE_PROVIDERS__POST_R3__ } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
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

  userMsg = false;
  passMsg = false;
  imgMsg = false;

  user: any = [];
  token: any = [];
  id: any = [];

  msg = false;
  follows: any = [];
  por = false;

  constructor(private http: HttpClient, private router: Router, private title: Title) { }

  ngOnInit(): void {
    this.checkToken();
    this.getTokenInfo();
    this.getUser();
    this.getFollows();
  }

  selected(event: any){
    this.picture = <File>event.target.files[0];
    this.passwordError = false;
  }

  update(){
    if(this.username!="" && this.email!=""){
      let t = 0;
      if(t==0){
        let fd = {id: this.id, username: this.username, email: this.email};
        console.log(fd);
        this.http.post(this.baseUrl+'/users/update',fd).subscribe((data: any)=>{
            this.userMsg = true;
          },err=>{
            console.log(err);
        });
      }
    }
  }

  upload(){
    if(this.picture==null){
      this.pictureError = true;
    }else{
      this.pictureError = false;
      let fd = new FormData();
      fd.append('id', this.id);
      fd.append('file', this.picture, this.picture.name);
      this.http.post(this.baseUrl+'/users/upload',fd).subscribe((data: any)=>{
        this.imgMsg = true;
      },err=>{
        console.log(err);
    });
    }
  }

  deactivate(uId: any){
    if(confirm("Jeste li sigurni da zelite da obrisete nalog?")){
      this.http.delete(this.baseUrl+'/users/delete',{params: {id: uId}}).subscribe(data=>{
        var c: any = data;
        if(c.code=="ok"){
          //this.msg = true;
          localStorage.removeItem('token');
          alert("Nalog je uklonjen.");
          this.router.navigate(["/login"]);
        }
      },err=>{
        console.log(err);
      });
    }
  }
  
  getFollows(){
    this.http.get(this.baseUrl+'/novels/follows',{params: {user: this.id}}).subscribe(data=>{
      this.follows = data;
      if(!this.follows.length){
        this.por = true;
      }
    },err=>{
      console.log(err);
    });
  }

  deleteFollow(fId: any){
    this.http.delete(this.baseUrl+'/users/follow',{params: {id: fId}}).subscribe(data=>{
      var c: any = data;
      if(c.code=="ok"){
        this.msg = true;
      }
    },err=>{
      console.log(err);
    });
  }

  checkToken(){
    if(!localStorage.getItem('token')==true){
      this.router.navigate(["/"]);
    }else{
      this.token = localStorage.getItem('token');
    }
  }

  getUser(){
    this.http.get(this.baseUrl+'/users/one',{params: {id: this.id}}).subscribe(data=>{
      this.user = data;
      this.title.setTitle(this.user.username);
      console.log(data);
      this.username = this.user.username;
      this.email = this.user.email;
    },err=>{
      this.router.navigate(['/not-found']);
      console.log(err);
    });
  }

  getTokenInfo(){
    this.id = localStorage.getItem('token');
    var base64Url = this.id.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    this.id = JSON.parse(jsonPayload);
    if(this.id.type != 'user'){
      this.router.navigate(["/"]);
    }
    this.id = this.id.subject;
  }

  newPassword(){
    if(this.password!=""){
      let t = 0;
      if(this.password !== this.passwordConfirm){
        t = 1;
        this.passwordError = true;
      }else{
        this.passwordError = false;
      }
      if(t==0){
        let fd = {id: this.id, password: this.password};
        this.http.post(this.baseUrl+'/users/password',fd).subscribe((data: any)=>{
          this.passMsg = true;
        },err=>{
          console.log(err);
        });
      }
    }
  }

}
