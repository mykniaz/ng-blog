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
import { AuthService } from './shared/services/auth.service';
// Components
import { EditPageComponent } from './edit-page/edit-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';

@NgModule({
  declarations: [
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
          { path: 'dashboard', component: DashboardPageComponent },
          { path: 'create', component: CreatePageComponent },
          { path: 'post/:id/edit', component: EditPageComponent },
        ],
      },
    ]),
  ],
  providers: [AuthService],
  exports: [RouterModule],
})
export class AdminModule {

}
