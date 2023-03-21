import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicemanHomeComponent } from './policeman-home.component';

describe('PolicemanHomeComponent', () => {
  let component: PolicemanHomeComponent;
  let fixture: ComponentFixture<PolicemanHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicemanHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicemanHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
