import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicemanNotFoundComponent } from './policeman-not-found.component';

describe('PolicemanNotFoundComponent', () => {
  let component: PolicemanNotFoundComponent;
  let fixture: ComponentFixture<PolicemanNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicemanNotFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicemanNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
