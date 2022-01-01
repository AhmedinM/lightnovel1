import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-chapter-insert',
  templateUrl: './admin-chapter-insert.component.html',
  styleUrls: ['./admin-chapter-insert.component.css']
})
export class AdminChapterInsertComponent implements OnInit {
  title = "";
  number = 1;
  text = "";
  readonly baseUrl = 'http://localhost:3000';
  msg = false;
  token: any;
  id: any;

  constructor(private router: Router, private http: HttpClient, private pageTitle: Title, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //this.pageTitle.setTitle("Dodavanje romana");
    this.id =this.route.snapshot.paramMap.get('id');
    this.checkToken();
  }

  insertChapter(){
    if(this.title!="" && this.text!=""){
      //let t = this.number.toString();
      let date = new Date();
      this.text.replace(new RegExp('\r?\n','g'), '<br />');
      let fd = {'title': this.title, 'number': this.number, 'text': this.text, 'views': 0, 'novel': this.id, 'datetime': date}
      this.http.post(this.baseUrl+'/chapters/insert',fd).subscribe((data: any)=>{
        alert("Poglavlje je dodato!");
        this.msg = true;
      },err=>{
        console.log(err);
      });
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
