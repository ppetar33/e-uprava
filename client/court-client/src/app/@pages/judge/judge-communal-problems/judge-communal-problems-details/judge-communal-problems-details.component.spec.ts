import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgeCommunalProblemsDetailsComponent } from './judge-communal-problems-details.component';

describe('JudgeCommunalProblemsDetailsComponent', () => {
  let component: JudgeCommunalProblemsDetailsComponent;
  let fixture: ComponentFixture<JudgeCommunalProblemsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JudgeCommunalProblemsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JudgeCommunalProblemsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
