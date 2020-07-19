import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventStoreService {


  private eventIdentifierIndex = 1;
  private _schedulerDate: BehaviorSubject<any> = new BehaviorSubject(new Date());
  private _eventAction: BehaviorSubject<any> = new BehaviorSubject([]);
  private _events: BehaviorSubject<any[]> = new BehaviorSubject(([]));
  public readonly events = this._events.getValue();
  public readonly schedulerDate = this._schedulerDate.asObservable();
  public readonly eventAction = this._eventAction.asObservable();

  constructor() {
  }

  markAsCompleted(_event) {
    const event = this._events.getValue().find(item => item.id == _event.id);
    event["isCompleted"] = true;
    this._eventAction.next({type: 'EVENT_COMPLETE'});
  }


  updateSchedulerDate(newDate) {
    this._schedulerDate.next(newDate);
  }

  addEvent(event: any) {
    event["id"] = this.eventIdentifierIndex++;
    this._events.getValue().push(event);
    this._events.next(this._events.getValue());
    this._eventAction.next({type: 'EVENT_ADD', payload: this._events.getValue()});
  }

  updateEvent(event) {
    let tempIndex = this._events.getValue().findIndex(item => item.id == event.id);
    this._events.getValue()[tempIndex]= event;
    this._events.next(this._events.getValue());
    this._eventAction.next({type: 'EVENT_UPDATE'});
  }
  
  completeEvent(event) {
    let temp = this._events.getValue().find(item => item.id == event.id);
    temp["completed"] = true;
    this._events.next(this._events.getValue());
  }
  removeEvent(event) {
    let tempIndex = this._events.getValue().findIndex(item => item.id == event.id);
    this._events.getValue().splice(tempIndex, 1);
    this._events.next(this._events.getValue());
    this._eventAction.next({type: 'EVENT_REMOVE'});

  }
}
