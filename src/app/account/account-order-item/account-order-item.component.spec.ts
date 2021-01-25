import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOrderItemComponent } from './account-order-item.component';

describe('AccountOrderItemComponent', () => {
  let component: AccountOrderItemComponent;
  let fixture: ComponentFixture<AccountOrderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountOrderItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
