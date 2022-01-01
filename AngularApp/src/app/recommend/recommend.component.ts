import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css']
})
export class RecommendComponent implements OnInit {
  recomms: any = [];
  readonly baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getNovels();
  }

  getNovels(){
    this.http.get(this.baseUrl+'/novels/random').subscribe(data=>{
      this.recomms = data;
      console.log("Rec:");
      console.log(data);
    },err=>{
      console.log(err);
    });
  }

}
