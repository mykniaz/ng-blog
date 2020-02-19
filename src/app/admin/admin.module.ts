// Libs
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
// Modules
import { SharedModule } from '../shared/shared.module';
// Services
import { AuthGuard } from './shared/services/auth.guard';
// Pipes
import { SearchPipe } from './shared/search.pipe';
// Components
import { EditPageComponent } from './edit-page/edit-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';

@NgModule({
  declarations: [
    SearchPipe,
    EditPageComponent,
    LoginPageComponent,
    CreatePageComponent,
    AdminLayoutComponent,
    DashboardPageComponent,
  ],
  imports: [
    FormsModule,
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminLayoutComponent,
        children: [
          { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
          { path: 'login', component: LoginPageComponent },
          { path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard] },
          { path: 'create', component: CreatePageComponent, canActivate: [AuthGuard] },
          { path: 'post/:id/edit', component: EditPageComponent, canActivate: [AuthGuard] },
        ],
      },
    ]),
  ],
  providers: [AuthGuard],
  exports: [RouterModule],
})
export class AdminModule {

}
