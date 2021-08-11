import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDisplayComponent } from './popup-display.component';

describe('PopupDisplayComponent', () => {
  let component: PopupDisplayComponent;
  let fixture: ComponentFixture<PopupDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
