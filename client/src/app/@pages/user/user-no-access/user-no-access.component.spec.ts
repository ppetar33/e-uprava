import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNoAccessComponent } from './user-no-access.component';

describe('UserNoAccessComponent', () => {
  let component: UserNoAccessComponent;
  let fixture: ComponentFixture<UserNoAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserNoAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNoAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
