import { HttpClient } from '@angular/common/http';
import { NodeWithI18n } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ɵELEMENT_PROBE_PROVIDERS__POST_R3__ } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'insert-review',
  templateUrl: './insert-review.component.html',
  styleUrls: ['./insert-review.component.css']
})
export class InsertReviewComponent implements OnInit {
  token: any;
  id: any;
  readonly baseUrl = 'http://localhost:3000';
  logged = false;
  title = "";
  text = "";
  mark = 5;
  msg = false;
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.checkToken();
    //this.getTokenInfo();
    this.id =this.route.snapshot.paramMap.get('id');
  }

  saveReview(){
    if(this.title!="" && this.text!="" && this.logged==true && this.token.type=="user"){
      let fd = {'title': this.title, 'text': this.text, 'mark': this.mark, 'novel': this.id, 'user': this.token.subject, 'datetime': new Date()};
        this.http.post(this.baseUrl+'/novels/review',fd).subscribe((data: any)=>{
            this.msg = true;
            console.log(data.msg);
            //console.log("fjsdf");
            //window.location.reload();
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
      //this.router.navigate(["/"]);
      //this.logged = true;
      this.getTokenInfo();
    }
  }

}
