import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekViewSchedulerComponent } from './week-view-scheduler.component';

describe('WeekViewSchedulerComponent', () => {
  let component: WeekViewSchedulerComponent;
  let fixture: ComponentFixture<WeekViewSchedulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekViewSchedulerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekViewSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
