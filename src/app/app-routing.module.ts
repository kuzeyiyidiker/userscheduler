import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { DayViewSchedulerComponent } from './day-view-scheduler/day-view-scheduler.component';
import { WeekViewSchedulerComponent } from './week-view-scheduler/week-view-scheduler.component';
import { MonthViewSchedulerComponent } from './month-view-scheduler/month-view-scheduler.component';
import { AuthenticationGuardService } from './services/authentication-guard.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'daily',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthenticationGuardService],
    children: [
      {
        path: 'daily',
        data: {
          viewType: 'daily'
        },
        component: DayViewSchedulerComponent
      },
      {
        path: 'weekly',
        component: WeekViewSchedulerComponent
      },
      {
        path: 'monthly',
        component: MonthViewSchedulerComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
