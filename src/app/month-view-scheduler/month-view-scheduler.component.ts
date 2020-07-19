import { Component, OnInit, Input } from '@angular/core';
import { EventStoreService } from '../services/event-store.service';
import { faCalendarAlt, faStickyNote, faClock } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventInfoModalComponent } from '../event-info-modal/event-info-modal.component';

@Component({
  selector: 'app-month-view-scheduler',
  templateUrl: './month-view-scheduler.component.html',
  styleUrls: ['./month-view-scheduler.component.scss']
})
export class MonthViewSchedulerComponent implements OnInit {

  selectedDate;
  today = new Date();
  calendarDays;
  showEmptyAlert = true;

  events = [];
  faCalendar = faCalendarAlt;
  faStickyNote = faStickyNote;
  faClock = faClock;

  constructor(private eventService: EventStoreService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.today.setHours(0, 0, 0, 0);

    this.eventService.schedulerDate.subscribe(res => {
      this.selectedDate = res;
      this.selectedDate.setHours(0, 0, 0, 0);
      this.calendarDays = this.updateCalendarDays(this.selectedDate.getMonth(), this.selectedDate.getFullYear());
      this.eventService.events.forEach(element => {
        this.setDayEvent(element);
      });
    });

    this.eventService.eventAction.subscribe(res => {
      if(res) {
        this.calendarDays = this.updateCalendarDays(this.selectedDate.getMonth(), this.selectedDate.getFullYear());
        this.eventService.events.forEach(element => {
          this.setDayEvent(element);
        });
      }
    })  
  }

  onEventClick(event) {
    let ref = this.modalService.open(EventInfoModalComponent, {size: 'sm'});
    ref.componentInstance.userEvent = {...event};
  }

  setDayEvent(event) {
    Object.keys(this.calendarDays).forEach(key => {
      let daysOfWeek = this.calendarDays[key];
      daysOfWeek.forEach(day => {
        if (day.date >= event.startDate && day.date <= event.endDate) {
          if (!day.events)
            day.events = [];
          day.events.push(event);
          day.events.sort((a, b) => a.startHour < b.startHour ? 1 : -1);
          this.showEmptyAlert = false;
        }
      });
    });
  }
  showEvent(popover, event) {
    popover.open({
      event
    })
  }

  hideEvent(popover) {
    popover.close();
  }


  updateCalendarDays(month, year) {

    let date = new Date(year, month, 1);
    let daysInMonth = new Date(year, month, 0).getDate();
    let monthRows = {};
    let rowIndex = -1;

    while (date.getDate() < daysInMonth && month == date.getMonth()) {
      rowIndex++;
      monthRows[rowIndex] = [];
      // Generate dates
      for (let j = 0; j < 7; j++) {

        let cell = {};
        if (j == date.getDay() && month == date.getMonth()) {
          if (date.getDate() === this.today.getDate()
            && year === this.today.getFullYear()
            && month === this.today.getMonth()) {
            cell["isActive"] = true;
          }
          cell["text"] = date.getDate();
          cell["date"] = new Date(date);
          monthRows[rowIndex].push(cell)
          date.setDate(date.getDate() + 1);

        } else {
          cell["text"] = "";
          cell["date"] = new Date(date);
          monthRows[rowIndex].push(cell);


        }
      }
    }
    return monthRows;
  }
}
