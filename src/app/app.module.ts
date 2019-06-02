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






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
   
  ],

  imports: [
    BrowserModule,
    APP_ROUTES,
    PageModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
