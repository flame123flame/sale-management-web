import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { CustomerFormComponent } from './pages/customer-form/customer-form.component';

const routes: Routes = [
  { path: '', component: CustomerListComponent },
    // add: /users/add
    { path: 'add', component: CustomerFormComponent, data: { mode: 'add' } },
  
    // edit: /users/:id/edit
    { path: ':id/edit', component: CustomerFormComponent, data: { mode: 'edit' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule {}
