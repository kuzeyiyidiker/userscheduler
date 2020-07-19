import { Component, OnInit } from '@angular/core';
import { EventStoreService } from '../services/event-store.service';
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  schedulerDate: Date;
  faChevronCircleLeft = faChevronCircleLeft;
  faChevronCircleRight = faChevronCircleRight;
  viewType;
  schedulerDateFormat = {
    daily: 'EEEE, dd/MM/yyyy',
    weekly: 'dd/MM/yyyy',
    monthly: 'MMM/yyyy'
  }
  constructor(private eventStore: EventStoreService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.eventStore.schedulerDate.subscribe(res => this.schedulerDate = res);
    const routeParam = this.activatedRoute.snapshot["_routerState"].url;
    this.viewType = routeParam.substr(1, routeParam.length);

    window.addEventListener("storage", (event) => {
      if(event.key == "token" && !event.newValue) {
        this.router.navigate(["/login"]);
      }
    });

  }

  setViewType(viewType) {
    this.viewType = viewType;
    this.router.navigate([`/${viewType}`]);
  }

  setSchedulerDate(step) {
    console.log(this.activatedRoute.snapshot)
    switch (this.viewType) {
      case 'daily': {
        let newSchedulerDate = new Date(this.schedulerDate.getFullYear(), this.schedulerDate.getMonth(), this.schedulerDate.getDate() + step);
        this.eventStore.updateSchedulerDate(newSchedulerDate);
        break;
      }
      case 'weekly': {
        let newSchedulerDate = new Date(this.schedulerDate.getFullYear(), this.schedulerDate.getMonth(), this.schedulerDate.getDate() + (step * 7));
        this.eventStore.updateSchedulerDate(newSchedulerDate);
        break;
      }
      case 'monthly': {
        let newSchedulerDate = new Date(this.schedulerDate.getFullYear(), this.schedulerDate.getMonth() + step, this.schedulerDate.getDate());
        this.eventStore.updateSchedulerDate(newSchedulerDate);
        break;
      }
    }
  }

}
