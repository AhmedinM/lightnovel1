import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-genre',
  templateUrl: './admin-genre.component.html',
  styleUrls: ['./admin-genre.component.css']
})
export class AdminGenreComponent implements OnInit {
  readonly baseUrl = 'http://localhost:3000';
  genres: any = [];
  token: any;
  msg = false;
  msg2 = false;
  name = "";
  nameError = false;

  constructor(private router: Router, private http: HttpClient, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Žanrovi');
    this.checkToken();

    this.getGenres();
  }

  getGenres(){
    this.http.get(this.baseUrl+'/novels/all-genres').subscribe(data=>{
      this.genres = data;
      console.log(data);
    },err=>{
      console.log(err);
    });
  }

  deleteGenre(gId: any){
    this.http.delete(this.baseUrl+'/novels/genre',{params: {id: gId}}).subscribe(data=>{
      var c: any = data;
      if(c.code=="ok"){
        this.msg = true;
        alert("Žanr je obrisan.");
      }
    },err=>{
      console.log(err);
    });
  }

  insertGenre(){
    if(this.name!=""){
      this.nameError = false;
      let fd = {name: this.name};
      this.http.post(this.baseUrl+'/novels/genre',fd).subscribe((data: any)=>{
        alert("Žanr je dodat!");
        this.msg2 = true;
      },err=>{
        if(err.error.code==2){
          this.nameError = true;
        }else{
          this.nameError = false;
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
    if(this.token.type != 'admin'){
      this.router.navigate(["/admin-login"]);
    }
  }

}
