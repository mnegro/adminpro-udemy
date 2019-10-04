import { NgModule } from "@angular/core";
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
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
        SidebarComponent,
        ModalUploadComponent
    ],
    exports:[
        BreadcrumsComponent,
        HeaderComponent,
        SidebarComponent,
        ModalUploadComponent
    ]
})
export class SharedModule {}