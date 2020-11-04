import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupExpenseComponent } from './group-expense.component';

describe('GroupExpenseComponent', () => {
  let component: GroupExpenseComponent;
  let fixture: ComponentFixture<GroupExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupExpenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
