import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponentComponent } from './dashboard-component/dashboard-component.component';
import { DetailsComponentComponent } from './details-component/details-component.component';
import { TodosListComponent } from './todos-list/todos-list.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponentComponent },
  // { path: 'detail/:id', component: DetailsComponentComponent },
  { path: 'todos', component: TodosListComponent },
  { path: 'todos-detail/:id', component: DetailsComponentComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
