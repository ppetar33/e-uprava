import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgeCommunalProblemsHearingDialogComponent } from './judge-communal-problems-hearing-dialog.component';

describe('JudgeCommunalProblemsHearingDialogComponent', () => {
  let component: JudgeCommunalProblemsHearingDialogComponent;
  let fixture: ComponentFixture<JudgeCommunalProblemsHearingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JudgeCommunalProblemsHearingDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JudgeCommunalProblemsHearingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
