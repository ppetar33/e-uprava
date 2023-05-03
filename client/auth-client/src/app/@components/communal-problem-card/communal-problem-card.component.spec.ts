import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunalProblemCardComponent } from './communal-problem-card.component';

describe('CommunalProblemCardComponent', () => {
  let component: CommunalProblemCardComponent;
  let fixture: ComponentFixture<CommunalProblemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunalProblemCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunalProblemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
