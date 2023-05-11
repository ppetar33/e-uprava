import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgeCommunalProblemsDeclineComponent } from './judge-communal-problems-decline.component';

describe('JudgeCommunalProblemsDeclineComponent', () => {
  let component: JudgeCommunalProblemsDeclineComponent;
  let fixture: ComponentFixture<JudgeCommunalProblemsDeclineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JudgeCommunalProblemsDeclineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JudgeCommunalProblemsDeclineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
