import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicemanCommunalProblemsComponent } from './policeman-communal-problems.component';

describe('PolicemanCommunalProblemsComponent', () => {
  let component: PolicemanCommunalProblemsComponent;
  let fixture: ComponentFixture<PolicemanCommunalProblemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicemanCommunalProblemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicemanCommunalProblemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
