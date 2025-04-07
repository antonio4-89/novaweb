import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './services/auth.guard';
import { homeRouter } from './router/home.routes';

const routes: Routes = [
  { 
    path: '', 
    component: DashboardComponent,
    children: homeRouter,
    // canActivate: [AuthGuard]
  },
  
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
