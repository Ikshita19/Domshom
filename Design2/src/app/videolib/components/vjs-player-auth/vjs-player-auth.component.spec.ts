import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VjsPlayerAuthComponent } from './vjs-player-auth.component';

describe('VjsPlayerAuthComponent', () => {
  let component: VjsPlayerAuthComponent;
  let fixture: ComponentFixture<VjsPlayerAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VjsPlayerAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VjsPlayerAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
