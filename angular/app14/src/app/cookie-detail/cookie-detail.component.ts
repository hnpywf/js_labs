import { Component, OnInit, Input } from '@angular/core';
import { Cookie } from '../cookie';

@Component({
  selector: 'app-cookie-detail',
  templateUrl: './cookie-detail.component.html',
  styleUrls: ['./cookie-detail.component.css']
})
export class CookieDetailComponent implements OnInit {


  @Input() cookie: Cookie;

  constructor() { }

  ngOnInit() {
  }

}
