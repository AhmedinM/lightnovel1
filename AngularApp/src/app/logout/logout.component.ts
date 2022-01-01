import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(!!localStorage.getItem('token')==false){
      this.router.navigate(['/login']);
    }else{
      localStorage.removeItem('token');
      alert("Uspješno odjavljivanje!");
      this.router.navigate(['/']);
      window.location.reload();
    }
  }

}
