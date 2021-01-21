import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSignupComponent } from './account-signup.component';

describe('AccountSignupComponent', () => {
  let component: AccountSignupComponent;
  let fixture: ComponentFixture<AccountSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
