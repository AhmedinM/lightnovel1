import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {
  readonly baseUrl = 'http://localhost:3000';
  users: any = [];
  token: any;
  msg = false;

  constructor(private router: Router, private http: HttpClient, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Lista korisnika');
    this.checkToken();

    this.getUsers();
  }

  getUsers(){
    this.http.get(this.baseUrl+'/users/all').subscribe(data=>{
      this.users = data;
      console.log(data);
    },err=>{
      console.log(err);
    });
  }

  deleteUser(uId: any){
    this.http.delete(this.baseUrl+'/users/delete',{params: {id: uId}}).subscribe(data=>{
      var c: any = data;
      if(c.code=="ok"){
        this.msg = true;
        alert("Korisnik je obrisan.");
      }
    },err=>{
      console.log(err);
    });
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
