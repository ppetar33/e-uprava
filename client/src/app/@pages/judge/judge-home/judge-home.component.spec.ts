import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgeHomeComponent } from './judge-home.component';

describe('JudgeHomeComponent', () => {
  let component: JudgeHomeComponent;
  let fixture: ComponentFixture<JudgeHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JudgeHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JudgeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
