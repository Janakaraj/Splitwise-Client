import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseIndividualAddComponent } from './expense-individual-add.component';

describe('ExpenseIndividualAddComponent', () => {
  let component: ExpenseIndividualAddComponent;
  let fixture: ComponentFixture<ExpenseIndividualAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseIndividualAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseIndividualAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
