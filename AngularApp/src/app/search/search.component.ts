import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { ListComponent } from './../list/list.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  readonly baseUrl = 'http://localhost:3000';
  novels: any = [];
  chapters: any = [];
  text = "";
  novelErr = false;
  chapterErr = false;
  error = true;
  again = true;
  i = 0;
  j = 0

  constructor(private http: HttpClient, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle("Pretraga");
  }

  search(){
    if(this.text!=""){
      this.i++;
      this.error = false;
      this.again = false;
      var el = document.getElementsByClassName("bg-dark mb-2")
      for(let i=0;i<el.length;i++){
        el[i].remove();
      }
      this.again = true;
      this.getNovels();
      this.getChapters();
      this.j++;
    }
  }

  getNovels(){
    this.http.get(this.baseUrl+'/novels/search').subscribe(data=>{
      let array: any = [];
      array = data;
      let src = this.text.toLowerCase();
      for(let i=0;i<array.length;i++){
        let src2 = array[i].title.toLowerCase();
        if(src2.indexOf(src)>-1){
          this.novels.push(array[i]);
        }
      }
      if(!this.novels.length){
        this.novelErr = true;
      }
    },err=>{
      console.log(err);
    });
  }

  getChapters(){
    this.http.get(this.baseUrl+'/novels/chapter-search').subscribe(data=>{
      let array: any = [];
      array = data;
      let src = this.text.toLowerCase();
      for(let i=0;i<array.length;i++){
        let src2 = array[i].title.toLowerCase();
        if(src2.indexOf(src)>-1){
          this.chapters.push(array[i]);
        }
      }
      if(!this.chapters.length){
        this.chapterErr = true;
      }
    },err=>{
      console.log(err);
    });
  }

}
