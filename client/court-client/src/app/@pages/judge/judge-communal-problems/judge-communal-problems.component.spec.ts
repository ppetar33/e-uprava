import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgeCommunalProblemsComponent } from './judge-communal-problems.component';

describe('JudgeCommunalProblemsComponent', () => {
  let component: JudgeCommunalProblemsComponent;
  let fixture: ComponentFixture<JudgeCommunalProblemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JudgeCommunalProblemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JudgeCommunalProblemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
