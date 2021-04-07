import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSttingsComponent } from './account-sttings.component';

describe('AccountSttingsComponent', () => {
  let component: AccountSttingsComponent;
  let fixture: ComponentFixture<AccountSttingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSttingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSttingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
