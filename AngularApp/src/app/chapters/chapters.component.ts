import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.css']
})
export class ChaptersComponent implements OnInit {
  readonly baseUrl = 'http://localhost:3000';
  chapter: any = [];
  novel: any = [];
  id: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private title: Title) { }

  ngOnInit(): void {
    this.getChapter();
    this.getNovel();
    this.updateViews();
  }

  getChapter(){
    this.id =this.route.snapshot.paramMap.get('chapId');

    this.http.get(this.baseUrl+'/chapters/one',{params: {id: this.id}}).subscribe(data=>{
      this.chapter = data;
      this.title.setTitle(this.chapter.title);
      console.log(data);
    },err=>{
      console.log(err);
      this.router.navigate(['/not-found']);
    });
  }

  getNovel(){
    this.id =this.route.snapshot.paramMap.get('id');

    this.http.get(this.baseUrl+'/novels/one',{params: {id: this.id}}).subscribe(data=>{
      this.novel = data;
      console.log(data);
    },err=>{
      this.router.navigate(['/not-found']);
      console.log(err);
    });
  }

  updateViews(){
    this.id =this.route.snapshot.paramMap.get('chapId');

    let fd = {'id': this.id};
    this.http.post(this.baseUrl+'/chapters/view',fd).subscribe((data: any)=>{
      console.log(data.msg);
    },err=>{
      console.log(err.error);
    });
  }

}
