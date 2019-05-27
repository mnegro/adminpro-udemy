import { NgModule } from "@angular/core";
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

//Pipes
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
    imports:[
            RouterModule,
            CommonModule,
            PipesModule
    ],
    declarations:[
        NopagefoundComponent,
        BreadcrumsComponent,
        HeaderComponent,
        SidebarComponent
    ],
    exports:[
        BreadcrumsComponent,
        HeaderComponent,
        SidebarComponent
    ]
})
export class SharedModule {}