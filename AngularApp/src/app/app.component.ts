import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public constructor(private router: Router){}
  title = 'LightNovel';
  loggedIn = false;
  ngOnInit(){
    //this.router.navigate(["/"]);
    if(!!localStorage.getItem('token')==true){
      this.loggedIn = true;
    }
  }
}
