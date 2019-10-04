import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Routes
import { APP_ROUTES } from './app.routes';

//Modulos
import { PageModule } from './pages/pages.module';

//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

// temporal
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


//Sevices
import { ServiceModule } from './services/service.module';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';
import { ModalMaquinaComponent } from './components/modal-maquina/modal-maquina.component';
import { ModalDetalleComponent } from './components/modal-detalle/modal-detalle.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent,
    ModalMaquinaComponent,
    ModalDetalleComponent
       
  ],

  imports: [
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    SharedModule
  ],
  
  providers: [
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
