import { Component, OnInit } from '@angular/core';
import { faCalendarAlt, faStickyNote, faClock, faCheckCircle, faTrash, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { EventStoreService } from '../services/event-store.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventInfoModalComponent } from '../event-info-modal/event-info-modal.component';

@Component({
  selector: 'app-week-view-scheduler',
  templateUrl: './week-view-scheduler.component.html',
  styleUrls: ['./week-view-scheduler.component.scss']
})
export class WeekViewSchedulerComponent implements OnInit {

  faCalendar = faCalendarAlt;
  faStickyNote = faStickyNote;
  faClock = faClock;
  faCheckCircle = faCheckCircle;
  faTrash = faTrash;
  faExclamationCircle= faExclamationCircle;
  
  selectedDate = new Date();
  today = new Date();
  weekDays;
  showEmptyAlert = true;

  constructor(private eventStoreService: EventStoreService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.today.setHours(0, 0, 0, 0);
    this.eventStoreService.schedulerDate.subscribe(res => {
      this.selectedDate = res;
      this.selectedDate.setHours(0, 0, 0, 0);
      this.weekDays = this.getWeekDays(this.selectedDate);

      this.eventStoreService.events.forEach(event => {
        this.setDayEvent(event);
      });
    });

    this.eventStoreService.eventAction.subscribe(res => {
      if (res) {
        this.weekDays = this.getWeekDays(this.selectedDate);
        this.eventStoreService.events.forEach(event => {
          this.setDayEvent(event);
        });
      }
    })
  }

  setDayEvent(event) {
    this.weekDays.forEach(dateItem => {
      if (dateItem.date >= event.startDate && dateItem.date <= event.endDate) {
        dateItem["events"].push(event);
      this.showEmptyAlert = false;

      }
    })
  }
  getWeekDays(refDate) {
    var week = new Array();
    let current = new Date(refDate);
    current.setDate((current.getDate() - current.getDay()));
    for (var i = 0; i < 7; i++) {
      let tempDate = new Date(current);
      tempDate.setHours(0, 0, 0, 0);
      week.push(
        {
          date: tempDate, events: []
        }
      );
      current.setDate(current.getDate() + 1);
    }
    return week;
  }

  markAsCompleted(event) {
    event.isCompleted = true;
    this.eventStoreService.markAsCompleted(event);
  }

  removeEvent(event) {
    this.eventStoreService.removeEvent(event);
  }

  onEventClick(event) {
    let ref = this.modalService.open(EventInfoModalComponent, {size: 'sm'});
    ref.componentInstance.userEvent = {...event};
  }

}
