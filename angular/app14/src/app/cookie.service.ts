import { Injectable } from '@angular/core';
import { Cookie } from './cookie';
import { COOKIES } from './all-cookies';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
 
@Injectable({
  providedIn: 'root'
})
export class CookieService {

  

  constructor(private messageService: MessageService) { }

  getCookies(): Observable<Cookie[]>{
  // TODO: send the message _after_ fetching the cookie
  this.messageService.add('CookieService: fetched cookies');
  return of(COOKIES);
  }
}
