import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  readonly baseUrl = 'http://localhost:3000';
  comments: any = [];
  id: any;
  userId: any;
  msg = false;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUser();
    this.getComments();
  }

  getComments(){
    this.id =this.route.snapshot.paramMap.get('chapId');

    this.http.get(this.baseUrl+'/chapters/comments',{params: {id: this.id}}).subscribe(data=>{
      this.comments = data;
      console.log("Comments: ");
      console.log(data);
    },err=>{
      console.log(err);
    });
  }

  getUser(){
    if(!!localStorage.getItem('token')==true){
      var token: any;
      token = localStorage.getItem('token');
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      var p = JSON.parse(jsonPayload);
      console.log("token");
      console.log(p);
      this.userId = p.subject;
    }
  }

  deleteComment(cId: any){
    //console.log("id: "+id);
    this.http.delete(this.baseUrl+'/chapters/comment',{params: {id: cId}}).subscribe(data=>{
      var c: any = data;
      if(c.code=="ok"){
        this.msg = true;
        alert("Komentar je obrisan.");
      }
    },err=>{
      console.log(err);
    });
  }

}
