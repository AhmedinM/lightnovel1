import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'insert-comment',
  templateUrl: './insert-comment.component.html',
  styleUrls: ['./insert-comment.component.css']
})
export class InsertCommentComponent implements OnInit {
  logged = false;
  text = "";
  token: any;
  id: any;
  msg = false;
  readonly baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.checkToken();
    //this.getTokenInfo();
    this.id =this.route.snapshot.paramMap.get('chapId');
  }

  insertComment(){
    if(this.text!="" && this.logged==true && this.token.type=="user"){
      let fd = {'text': this.text, 'chapter': this.id, 'user': this.token.subject, 'datetime': new Date()};
        this.http.post(this.baseUrl+'/chapters/comment',fd).subscribe((data: any)=>{
            this.msg = true;
            console.log(data.msg);
          },err=>{
            console.log("err: ");
            console.log(err.error);
          });
    }else{
      alert("Pogrešan token");
      alert(this.logged);
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
