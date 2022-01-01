import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Title, ɵELEMENT_PROBE_PROVIDERS__POST_R3__ } from '@angular/platform-browser';

@Component({
  selector: 'app-novels',
  templateUrl: './novels.component.html',
  styleUrls: ['./novels.component.css']
})
export class NovelsComponent implements OnInit {
  novel: any = [];
  genres: any = [];
  readonly baseUrl = 'http://localhost:3000';
  logged = false;
  id: any;
  imagePath: string = "";
  token: any = null;
  follow = false;
  fMsg = false;
  
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private title: Title) {
    //this.title.setTitle(this.novel.title);
  }

  ngOnInit(): void {
    this.checkToken();
    console.log('Token je: ');
    console.log(this.logged);

    this.id =this.route.snapshot.paramMap.get('id');
    this.getFollow();
    
    this.getNovel();    
    this.getGenres();
  }

  getNovel(){
    this.http.get(this.baseUrl+'/novels/one',{params: {id: this.id}}).subscribe(data=>{
      this.novel = data;
      this.imagePath = this.novel.picture;
      this.title.setTitle(this.novel.title);
      console.log("Image: "+this.imagePath);
      console.log(data);
    },err=>{
      this.router.navigate(['/not-found']);
      console.log(err);
    });
  }

  getGenres(){
    this.http.get(this.baseUrl+'/novels/genres',{params: {id: this.id}}).subscribe(dataG=>{
      this.genres = dataG;
      //this.genres = JSON.stringify(dataG);
      console.log("Genres:");
      console.log(dataG);
    },errG=>{
      console.log(errG);
    });
  }

  getFollow(){
    if(this.token!=null){
      this.http.get(this.baseUrl+'/users/onefollow',{params: {user: this.token.subject, novel: this.id}}).subscribe(dataO=>{
        if(dataO==null){
          this.follow = false;
        }else{
          this.follow = true;
        }
      },errG=>{
        this.follow = false;
        console.log(errG);
      });
    }
  }

  followNovel(){
    console.log(this.token.subject);
    let fd = {user: this.token.subject, novel: this.id};
    this.http.post(this.baseUrl+'/users/one-follow', fd).subscribe(dataO=>{
      this.follow = true;
    },errG=>{
      console.log(errG);
    });
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
      this.logged = true;
    }
  }

  checkToken(){
    if(!!localStorage.getItem('token')==true){
      //this.logged = true;
      this.getTokenInfo();
    }
  }

}