import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { UserFormComponent } from './pages/user-form/user-form.component';

const routes: Routes = [
  { path: '', component: UserListComponent },

  // add: /users/add
  { path: 'add', component: UserFormComponent, data: { mode: 'add' } },

  // edit: /users/:id/edit
  { path: ':id/edit', component: UserFormComponent, data: { mode: 'edit' } },

  // detail: /users/:id
  { path: ':id', component: UserDetailComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
