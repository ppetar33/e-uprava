import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunalProblemsComponent } from './communal-problems.component';

describe('CommunalProblemsComponent', () => {
  let component: CommunalProblemsComponent;
  let fixture: ComponentFixture<CommunalProblemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunalProblemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunalProblemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
