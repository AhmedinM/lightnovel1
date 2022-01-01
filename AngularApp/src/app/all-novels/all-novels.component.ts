import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'all-novels',
  templateUrl: './all-novels.component.html',
  styleUrls: ['./all-novels.component.css']
})
export class AllNovelsComponent implements OnInit {
  readonly baseUrl = 'http://localhost:3000';
  novels: any = [];
  
  isLoadingResults = true;
  totalRecords: number = 0;
  p: number = 1;
  max = 3;
  bool = true;

  constructor(private http: HttpClient, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Sve');
    this.getAll();
  }

  getAll(){
    this.http.get(this.baseUrl+'/novels/all').subscribe(data=>{
      this.novels = data;
      this.totalRecords = this.novels.length;
      console.log(data);
    },err=>{
      console.log(err);
    });
  }

}
