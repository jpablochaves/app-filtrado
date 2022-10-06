import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FilterComponent } from './filter/filter.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { InternalFilterComponent } from './internal-filter/internal-filter.component';


const routes: Routes = [
  {
    path: 'filter',
    component: FilterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'internal-filter',
    component: InternalFilterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: '/login', pathMatch: 'full'
  },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
