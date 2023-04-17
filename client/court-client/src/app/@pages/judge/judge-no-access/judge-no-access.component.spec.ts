import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgeNoAccessComponent } from './judge-no-access.component';

describe('JudgeNoAccessComponent', () => {
  let component: JudgeNoAccessComponent;
  let fixture: ComponentFixture<JudgeNoAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JudgeNoAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JudgeNoAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
