import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthViewSchedulerComponent } from './month-view-scheduler.component';

describe('MonthViewSchedulerComponent', () => {
  let component: MonthViewSchedulerComponent;
  let fixture: ComponentFixture<MonthViewSchedulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthViewSchedulerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthViewSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
