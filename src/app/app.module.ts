import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PortalComponent } from './portal/portal.component';
import { PortalInicioComponent } from './portal-inicio/portal-inicio.component';
import { CalificacionesFinalesComponent } from './calificaciones-finales/calificaciones-finales.component';
import { CalificacionesParcialesComponent } from './calificaciones-parciales/calificaciones-parciales.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PortalComponent,
    PortalInicioComponent,
    CalificacionesFinalesComponent,
    CalificacionesParcialesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
