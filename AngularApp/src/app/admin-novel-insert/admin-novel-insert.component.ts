import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-novel-insert',
  templateUrl: './admin-novel-insert.component.html',
  styleUrls: ['./admin-novel-insert.component.css']
})
export class AdminNovelInsertComponent implements OnInit {
  title = "";
  author = "";
  description = "";
  picture: any;
  readonly baseUrl = 'http://localhost:3000';
  titleError = false;
  msg = false;
  token: any;
  genres: any = [];
  genValues: any = [];

  constructor(private router: Router, private http: HttpClient, private pageTitle: Title) { }

  ngOnInit(): void {
    this.pageTitle.setTitle("Dodavanje romana");
    this.checkToken();
    this.getGenres();
  }

  selected(event: any){
    this.picture = <File>event.target.files[0];
  }

  insertNovel(){
    if(this.title!="" && this.author!="" && this.description!="" && this.picture!=null){
      let t = "0";
      let fd = new FormData();
      fd.append('title', this.title);
      fd.append('author', this.author);
      fd.append('description', this.description);
      fd.append('status', t);
      fd.append('file', this.picture, this.picture.name);
      let date = new Date();
      fd.append('datetime', date.toDateString());
      fd.append('genres', this.genValues);
      console.log("GENRE");
      console.log(this.genValues);
      this.http.post(this.baseUrl+'/novels/insert',fd).subscribe((data: any)=>{
        alert("Roman je dodat!");
        this.msg = true;
      },err=>{
        if(err.error.code==1){
          this.titleError = true;
        }else{
          this.titleError = false;
        }
      });
    }
  }

  getGenres(){
    this.http.get(this.baseUrl+'/novels/all-genres').subscribe(data=>{
      this.genres = data;
    },err=>{
      console.log(err);
    });
  }

  addGenre(gId: any){
    let index = this.genValues.indexOf(gId);
    if(index > -1){
      this.genValues.splice(index, 1);
    }else{
      this.genValues.push(gId);
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
