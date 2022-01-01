import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  readonly baseUrl = 'http://localhost:3000';
  reviews: any = [];
  id: any;
  userId: any;
  msg = false;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUser();

    this.getReviews();
  }

  getReviews(){
    this.id =this.route.snapshot.paramMap.get('id');

    this.http.get(this.baseUrl+'/novels/reviews',{params: {id: this.id}}).subscribe(data=>{
      this.reviews = data;
      console.log("Reviews: ");
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

  deleteReview(cId: any){
    //console.log("id: "+id);
    this.http.delete(this.baseUrl+'/novels/review',{params: {id: cId}}).subscribe(data=>{
      var c: any = data;
      if(c.code=="ok"){
        this.msg = true;
        alert("Recenzija je obrisana.");
      }
    },err=>{
      console.log(err);
    });
  }

}
