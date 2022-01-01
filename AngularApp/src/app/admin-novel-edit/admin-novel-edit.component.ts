import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-novel-edit',
  templateUrl: './admin-novel-edit.component.html',
  styleUrls: ['./admin-novel-edit.component.css']
})
export class AdminNovelEditComponent implements OnInit {
  readonly baseUrl = 'http://localhost:3000';
  novel: any;
  id: any;
  token: any;
  chapters: any = [];
  reviews: any = [];
  msgR = false;
  msgC = false;
  cMsg = false;
  
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private title: Title) {}

  ngOnInit(): void {
    this.checkToken();
    this.id =this.route.snapshot.paramMap.get('id');
    this.getNovel();
    //this.title.setTitle("Podaci romana")
    
    this.getChapters();
    this.getReviews();
  }

  getNovel(){
    this.http.get(this.baseUrl+'/novels/one',{params: {id: this.id}}).subscribe(data=>{
      this.novel = data;
      this.title.setTitle(this.novel.title);
      console.log(data);
    },err=>{
      this.router.navigate(['admin/not-found']);
      console.log(err);
    });
  }

  getChapters(){
    this.http.get(this.baseUrl+'/novels/chapters',{params: {id: this.id}}).subscribe(data=>{
      this.chapters = data;
      console.log(data);
    },err=>{
      console.log(err);
    });
  }

  getReviews(){
    this.http.get(this.baseUrl+'/novels/reviews',{params: {id: this.id}}).subscribe(data=>{
      this.reviews = data;
      console.log("Reviews: ");
      console.log(data);
    },err=>{
      console.log(err);
    });
  }

  deleteReview(cId: any){
    //console.log("id: "+id);
    this.http.delete(this.baseUrl+'/novels/review',{params: {id: cId}}).subscribe(data=>{
      var c: any = data;
      if(c.code=="ok"){
        this.msgR = true;
        alert("Recenzija je obrisana.");
      }
    },err=>{
      console.log(err);
    });
  }

  deleteChapter(cId: any){
    this.http.delete(this.baseUrl+'/chapters/delete',{params: {id: cId}}).subscribe(data=>{
      var c: any = data;
      if(c.code=="ok"){
        this.msgC = true;
        alert("Poglavlje je obrisano.");
      }
    },err=>{
      console.log(err);
    });
  }

  check(nId: any){
    this.http.post(this.baseUrl+'/novels/check', {id: nId}).subscribe((data: any)=>{
      this.cMsg = true;
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
