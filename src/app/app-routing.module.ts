import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { PortalComponent } from './portal/portal.component';
import { PortalInicioComponent } from './portal-inicio/portal-inicio.component';
import { CalificacionesFinalesComponent } from './calificaciones-finales/calificaciones-finales.component';
import { CalificacionesParcialesComponent } from './calificaciones-parciales/calificaciones-parciales.component';

const routes: Routes = [
  {path: '', component: PortalComponent},
  {path: 'login', component: LoginComponent},
  {path: 'portal', component: PortalComponent,
    children: [
        {path: "", component: PortalInicioComponent},
        {path:"inicio", component: PortalInicioComponent},
        {path:"calificaciones/finales", component: CalificacionesFinalesComponent},
        {path:"calificaciones/parciales", component: CalificacionesParcialesComponent},
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
