import { Component, OnInit } from '@angular/core';
import { EventStoreService } from '../services/event-store.service';
import { faCalendarAlt, faStickyNote, faClock,faCheckCircle,faTrash, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { EventInfoModalComponent } from '../event-info-modal/event-info-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-day-view-scheduler',
  templateUrl: './day-view-scheduler.component.html',
  styleUrls: ['./day-view-scheduler.component.scss']
})
export class DayViewSchedulerComponent implements OnInit {
  faCalendar = faCalendarAlt;
  faStickyNote = faStickyNote;
  faClock = faClock;
  faCheckCircle = faCheckCircle;
  faTrash = faTrash;
  faExclamationCircle=faExclamationCircle;
  
  today = new Date();
  selectedDate = new Date();
  events = [];


  constructor(public eventStoreService: EventStoreService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.today.setHours(0,0,0,0);
    this.eventStoreService.schedulerDate.subscribe(res => {
      this.selectedDate = res;
      this.selectedDate.setHours(0, 0, 0, 0);
      this.events = this.eventStoreService.events.filter(userEvent => this.selectedDate >= userEvent.startDate && this.selectedDate <= userEvent.endDate)
    });

    this.eventStoreService.eventAction.subscribe(res => {
      if(res) {
        this.events = this.eventStoreService.events.filter(userEvent => this.selectedDate >= userEvent.startDate && this.selectedDate <= userEvent.endDate)
        this.events.sort((a,b) => a.startHour < b.startHour ? -1 : 1)
      }
    })

  }

  markAsCompleted(event) {
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
