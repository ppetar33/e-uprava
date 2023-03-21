import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgeNotFoundComponent } from './judge-not-found.component';

describe('JudgeNotFoundComponent', () => {
  let component: JudgeNotFoundComponent;
  let fixture: ComponentFixture<JudgeNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JudgeNotFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JudgeNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
