import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'novel-lists',
  templateUrl: './novel-lists.component.html',
  styleUrls: ['./novel-lists.component.css']
})
export class NovelListsComponent implements OnInit {
  public novels: any = [];
  readonly baseUrl = 'http://localhost:3000';
  randoms: any = [];
  news: any = [];
  bests: any = [];
  populars: any = [];

  constructor(private http: HttpClient, private router: Router, private title: Title) {
    this.title.setTitle('Početna');
  }
  
  ngOnInit(): void {
    this.getRandom();
    this.getNew();
    this.getBest();
    this.getPopular();
  }

  getRandom(){
    this.http.get(this.baseUrl+'/novels/random').subscribe(data=>{
      this.randoms = data;
      console.log("Random:");
      console.log(data);
    },err=>{
      console.log(err);
    });
  }

  getNew(){
    this.http.get(this.baseUrl+'/novels/new').subscribe(data=>{
      this.news = data;
      console.log("New:");
      console.log(data);
    },err=>{
      console.log(err);
    });
  }

  getBest(){
    this.http.get(this.baseUrl+'/novels/best').subscribe(data=>{
      console.log("Best:");
      this.bests = data;
      console.log(data);
    },err=>{
      console.log(err);
    });
  }

  getPopular(){
    this.http.get(this.baseUrl+'/novels/popular').subscribe(data=>{
      this.populars = data;
      console.log("Popular:");
      console.log(data);
    },err=>{
      console.log(err);
    });
  }

}
