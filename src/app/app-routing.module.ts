import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PartyManagementComponent } from './party-management/party-management.component';
import { PartyDetailComponent } from './party-detail/party-detail.component';
import { AddPartyListComponent } from './add-party-list/add-party-list.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'party-management',
    component: PartyManagementComponent,
  },
  {
    path: 'party-detail',
    component: PartyDetailComponent,
  },
  {
    path: 'add-party-detail',
    component: AddPartyListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
