import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-chapter-edit',
  templateUrl: './admin-chapter-edit.component.html',
  styleUrls: ['./admin-chapter-edit.component.css']
})
export class AdminChapterEditComponent implements OnInit {
  readonly baseUrl = 'http://localhost:3000';
  chapter: any;
  id: any;
  token: any;
  comments: any = [];
  msg = false;
  
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private title: Title) {}

  ngOnInit(): void {
    this.checkToken();
    this.id =this.route.snapshot.paramMap.get('chapId');
    this.getChapter();
    
    this.getComments();
  }

  getChapter(){
    this.http.get(this.baseUrl+'/chapters/one',{params: {id: this.id}}).subscribe(data=>{
      this.chapter = data;
      this.title.setTitle(this.chapter.title);
      console.log(data);
    },err=>{
      this.router.navigate(['admin/not-found']);
      console.log(err);
    });
  }

  getComments(){
    this.http.get(this.baseUrl+'/chapters/comments',{params: {id: this.id}}).subscribe(data=>{
      this.comments = data;
      console.log("Reviews: ");
      console.log(data);
    },err=>{
      console.log(err);
    });
  }

  deleteComment(cId: any){
    //console.log("id: "+id);
    this.http.delete(this.baseUrl+'/chapters/comment',{params: {id: cId}}).subscribe(data=>{
      var c: any = data;
      if(c.code=="ok"){
        this.msg = true;
        alert("Kometar je obrisan.");
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
