import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipalityCommunalProblemsComponent } from './municipality-communal-problems.component';

describe('MunicipalityCommunalProblemsComponent', () => {
  let component: MunicipalityCommunalProblemsComponent;
  let fixture: ComponentFixture<MunicipalityCommunalProblemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MunicipalityCommunalProblemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MunicipalityCommunalProblemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
