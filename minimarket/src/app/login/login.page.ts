import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string= '';
  password: string= '';

  constructor(private router: Router) {}

  ngOnInit() {
  }
  signup(){
    this.router.navigate(['signup']);
  }
  
  login(){
    this.router.navigate(['home']);
  }

}

