import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DayViewSchedulerComponent } from './day-view-scheduler/day-view-scheduler.component';
import { WeekViewSchedulerComponent } from './week-view-scheduler/week-view-scheduler.component';
import { MonthViewSchedulerComponent } from './month-view-scheduler/month-view-scheduler.component';
import {FormsModule} from "@angular/forms";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EventInfoModalComponent } from './event-info-modal/event-info-modal.component';
import { EventFormComponent } from './event-form/event-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LayoutComponent,
    LoginComponent,
    DayViewSchedulerComponent,
    WeekViewSchedulerComponent,
    MonthViewSchedulerComponent,
    EventInfoModalComponent,
    EventFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgbModalModule,
    FontAwesomeModule
  ],
  providers: [],
  entryComponents: [EventInfoModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
