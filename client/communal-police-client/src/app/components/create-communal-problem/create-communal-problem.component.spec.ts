import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCommunalProblemComponent } from './create-communal-problem.component';

describe('CreateCommunalProblemComponent', () => {
  let component: CreateCommunalProblemComponent;
  let fixture: ComponentFixture<CreateCommunalProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCommunalProblemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCommunalProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
