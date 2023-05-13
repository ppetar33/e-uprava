import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunalProblemmDetailsComponent } from './communal-problemm-details.component';

describe('CommunalProblemmDetailsComponent', () => {
  let component: CommunalProblemmDetailsComponent;
  let fixture: ComponentFixture<CommunalProblemmDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunalProblemmDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunalProblemmDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
