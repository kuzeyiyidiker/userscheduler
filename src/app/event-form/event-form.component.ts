import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { EventStoreService } from '../services/event-store.service';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

  faCalendarAlt = faCalendarAlt;

  @Input()
  userEvent = new UserEvent();

  @Output()
  onSubmitSuccess: EventEmitter<any> = new EventEmitter();

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  displayMonths = 1;
  navigation = 'select';
  showWeekNumbers = false;
  outsideDays = 'visible';
  public timeStart = {
    hour: 13,
    minute: 10,
  };
  public timeEnd = {
    hour: 15,
    minute: 10,
  };

  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private eventService: EventStoreService) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getToday();
  }

  ngOnInit() {
    this.timeStart.hour = this.userEvent.startHour ? Number(this.userEvent.startHour.substr(0,2)) : 13; 
    this.timeStart.minute = this.userEvent.startHour ? Number(this.userEvent.startHour.substr(3,2)) : 30; 

    this.timeEnd.hour = this.userEvent.endHour ? Number(this.userEvent.endHour.substr(0,2)) : 15; 
    this.timeEnd.minute = this.userEvent.endHour ? Number(this.userEvent.endHour.substr(3,2)) : 30; 
  }

  onSaveClick() {
    const startDate = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day);
    const endDate = new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day);
    this.userEvent.startDate = startDate;
    this.userEvent.startHour = `${this.timeStart.hour}:${this.timeStart.minute}`;
    this.userEvent.endHour = `${this.timeEnd.hour}:${this.timeEnd.minute}`;
    this.userEvent.endDate = endDate;
    if (this.userEvent.id) {
      this.eventService.updateEvent(this.userEvent);
    } else {
      this.eventService.addEvent(this.userEvent);
    }
    this.onSubmitSuccess.emit();
    this.userEvent = new UserEvent();
  }

  onDeleteClick() {
    this.eventService.removeEvent(this.userEvent);
    this.onSubmitSuccess.emit();

  }
  onMarkAsCompleted() {
    this.eventService.markAsCompleted(this.userEvent);
    this.onSubmitSuccess.emit();
  }
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.toDate = date;
    } else if (this.fromDate && !this.toDate && date) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

}

export class UserEvent {
  id: number;
  name = "Unnamed";
  startDate;
  endDate;
  startHour = "13:10";
  endHour = "15:10";
  note = "";

}
