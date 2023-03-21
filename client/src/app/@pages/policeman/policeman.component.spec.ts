import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicemanComponent } from './policeman.component';

describe('PolicemanComponent', () => {
  let component: PolicemanComponent;
  let fixture: ComponentFixture<PolicemanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicemanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicemanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
