import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardEcm } from '@alfresco/adf-core';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DocumentlistComponent } from './documentlist/documentlist.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { FileViewComponent } from './file-view/file-view.component';
import {AdminComponent} from './admin/admin.component';
import {AuthGuard} from './_guards/auth.guard';
import {Role} from './_models';
import {DatatableComponent} from './datatable/datatable.component';

export const appRoutes: Routes = [
  { path: 'files/:nodeId/view', component: FileViewComponent, canActivate: [AuthGuard], outlet: 'overlay' },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
      },
      {
        path: 'documentlist',
        component: DocumentlistComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'file-view',
        component: FileViewComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'datatable',
        component: DatatableComponent
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})

export class AppRoutesModule { }
