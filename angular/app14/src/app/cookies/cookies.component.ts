import { Component, OnInit, Input } from '@angular/core';
import { CookieService } from '../cookie.service';
import { Cookie } from '../cookie';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.css']
})
export class CookiesComponent implements OnInit {

  
  
  cookies: Cookie[];

  selectedCookie: Cookie;
  
  onSelect(cookie: Cookie): void{
  this.selectedCookie = cookie;
  }


  getCookies(): void{
  this.cookieService.getCookies()
   .subscribe(cookies=>this.cookies=cookies)
  }



  constructor(private cookieService: CookieService) { }

  ngOnInit() {
  this.getCookies();
  }

  
}
