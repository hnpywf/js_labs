import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieDetailComponent } from './cookie-detail.component';

describe('CookieDetailComponent', () => {
  let component: CookieDetailComponent;
  let fixture: ComponentFixture<CookieDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookieDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
