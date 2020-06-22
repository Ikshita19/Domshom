import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAuthVideosComponent } from './view-auth-videos.component';

describe('ViewAuthVideosComponent', () => {
  let component: ViewAuthVideosComponent;
  let fixture: ComponentFixture<ViewAuthVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAuthVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAuthVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
