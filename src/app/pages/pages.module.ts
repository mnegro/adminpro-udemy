import { NgModule } from "@angular/core";
import { PagesComponent } from './pages.component';

import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


//ng2-charts
import { ChartsModule} from 'ng2-charts'; 

//Pipe Module
import { PipesModule } from '../pipes/pipes.module';


import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { PAGES_ROUTES } from './pages.routes';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficasDonasComponent } from '../components/donas/graficas-donas.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { ClientesComponent } from './clientes/clientes.component';
import { MaquinasComponent } from './maquinas/maquinas.component';
import { ReparacionesComponent } from './reparaciones/reparaciones.component';
import { RepuestosComponent } from './repuestos/repuestos.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ClienteComponent } from './clientes/cliente.component';
import { MaquinaComponent } from './maquinas/maquina.component';
import { ReparacionComponent } from './reparaciones/reparacion.component';
import { RepuestoComponent } from './repuestos/repuesto.component';
import { ProveedorComponent } from './proveedores/proveedor.component';
import { ComprasComponent } from './compras/compras.component';
import { CompraComponent } from './compras/compra.component';
import { ModalDetalleComponent } from '../components/modal-detalle/modal-detalle.component';
import { FacturasComponent } from './facturas/facturas.component';
import { FacturaComponent } from './facturas/factura.component';
import { SaldoComponent } from './saldos/saldo.component';
import { SaldosComponent } from './saldos/saldos.component';
import { DetallePagoComponent } from './saldos/detalle-pago.component';



@NgModule({
    declarations:[ 
        // PagesComponent,
        DashboardComponent,
        Graficas1Component,
        ProgressComponent,
        IncrementadorComponent,
        GraficasDonasComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        // ModalUploadComponent,
        HospitalesComponent,
        MedicosComponent,
        MedicoComponent,
        BusquedaComponent,
        ClientesComponent,
        MaquinasComponent,
        ReparacionesComponent,
        RepuestosComponent,
        ProveedoresComponent,
        ClienteComponent,
        MaquinaComponent,
        ReparacionComponent,
        RepuestoComponent,
        ProveedorComponent,
        ComprasComponent,
        CompraComponent,
        FacturasComponent,
        FacturaComponent,
        SaldoComponent,
        SaldosComponent,
        DetallePagoComponent
    ],
    exports: [
        DashboardComponent,
        Graficas1Component,
        ProgressComponent
    ],
    imports:[
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule
    ]
})
export class PageModule { }