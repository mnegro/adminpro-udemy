import { RouterModule, Routes } from "@angular/router";
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard, AdminGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';
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
import { FacturaComponent } from './facturas/factura.component';
import { FacturasComponent } from './facturas/facturas.component';
import { SaldoComponent } from './saldos/saldo.component';
import { SaldosComponent } from './saldos/saldos.component';
import { DetallePagoComponent } from './saldos/detalle-pago.component';

const pagesRoutes: Routes= [

         { 
             path: 'dashboard',
             component: DashboardComponent,
             data: { titulo: 'Dashboard' },
             canActivate: [ VerificaTokenGuard ]
         },
         { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
         { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Grafica' } },
         { path: 'promesa', component: PromesasComponent, data: { titulo: 'Promesas' } },
         { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
         { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del Tema' } },
         { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
         { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' } },

         //Mantenimientos
         { 
            path: 'usuarios', 
            component: UsuariosComponent,  
            canActivate: [ AdminGuard ],
            data: { titulo: 'Mantenimiento de Usuarios' } 
        },
        { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales' } },
         { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de Medicos' } },
         { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar Medico' } },
         { path: '', redirectTo:'/dashboard', pathMatch:'full' },

         //MAntenimientos CopyWeb
        
        { path: 'clientes', component: ClientesComponent, canActivate:[AdminGuard], data: { titulo: 'Mantenimiento de Clientes' } },
        { path: 'cliente/:id', component: ClienteComponent, canActivate:[AdminGuard], data: { titulo: 'Mantenimiento de Cliente' } },
        { path: 'maquinas', component: MaquinasComponent, canActivate:[AdminGuard], data: { titulo: 'Mantenimiento de Maquinas' } },
        { path: 'maquina/:id', component: MaquinaComponent, canActivate:[AdminGuard], data: { titulo: 'Mantenimiento de Maquina' } },
        { path: 'reparacion/:id', component: ReparacionComponent, canActivate:[AdminGuard], data: { titulo: 'Mantenimiento de Reparaciones' } },
        { path: 'reparaciones/:id', component: ReparacionesComponent, canActivate:[AdminGuard], data: { titulo: 'Mantenimiento de Repuestos' } },
        { path: 'repuestos', component: RepuestosComponent, canActivate:[AdminGuard], data: { titulo: 'Mantenimiento de Repuestos' } },
        { path: 'repuesto/:id', component: RepuestoComponent, canActivate:[AdminGuard], data: { titulo: 'Mantenimiento de Reparaciones' } },
        { path: 'proveedor/:id', component: ProveedorComponent, canActivate:[AdminGuard], data: { titulo: 'Mantenimiento de Proveedor' } },
        { path: 'proveedores', component: ProveedoresComponent, canActivate:[AdminGuard], data: { titulo: 'Mantenimiento de Proveedores' } },
        { path: 'factura', component: FacturaComponent, canActivate:[AdminGuard], data: { titulo: 'Facturacion' } },
        { path: 'facturas/:id', component: FacturasComponent, canActivate:[AdminGuard], data: { titulo: 'Facturacion' } },
        { path: 'saldos/:id', component: SaldosComponent, canActivate:[AdminGuard], data: { titulo: 'Saldos' } },
        { path: 'saldo/:condicion/:id', component: SaldoComponent, canActivate:[AdminGuard], data: { titulo: 'Nuevo Pago' } },
        { path: 'detalle-pago', component: DetallePagoComponent, canActivate:[AdminGuard], data: { titulo: 'Detalle Pago' } },


];
export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );