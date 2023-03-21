import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicemanNoAccessComponent } from './policeman-no-access.component';

describe('PolicemanNoAccessComponent', () => {
  let component: PolicemanNoAccessComponent;
  let fixture: ComponentFixture<PolicemanNoAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicemanNoAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicemanNoAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
