import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn = false;
  constructor() { }

  ngOnInit(): void {
    if(!!localStorage.getItem('token')==true){
      this.loggedIn = true;
    }
  }

}
