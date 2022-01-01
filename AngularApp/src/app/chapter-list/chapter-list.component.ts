import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'chapter-list',
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.css']
})
export class ChapterListComponent implements OnInit {
  readonly baseUrl = 'http://localhost:3000';
  chapters:any = [];
  id: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id =this.route.snapshot.paramMap.get('id');
    this.getChapters();
  }

  getChapters(){
    this.http.get(this.baseUrl+'/novels/chapters',{params: {id: this.id}}).subscribe(data=>{
      this.chapters = data;
      console.log(data);
    },err=>{
      console.log(err);
    });
  }

}
