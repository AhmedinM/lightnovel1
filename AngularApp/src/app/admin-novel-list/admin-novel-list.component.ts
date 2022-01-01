import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-novel-list',
  templateUrl: './admin-novel-list.component.html',
  styleUrls: ['./admin-novel-list.component.css']
})
export class AdminNovelListComponent implements OnInit {
  readonly baseUrl = 'http://localhost:3000';
  novels: any = [];
  token: any;
  msg = false;

  constructor(private router: Router, private http: HttpClient, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Lista romana');
    this.checkToken();

    this.getNovels();
  }

  getNovels(){
    this.http.get(this.baseUrl+'/novels/all').subscribe(data=>{
      this.novels = data;
      console.log(data);
    },err=>{
      console.log(err);
    });
  }

  deleteNovel(nId: any){
    this.http.delete(this.baseUrl+'/novels/delete',{params: {id: nId}}).subscribe(data=>{
      var c: any = data;
      if(c.code=="ok"){
        this.msg = true;
        alert("Roman je obrisan.");
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
