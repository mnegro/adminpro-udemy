import { Component, OnInit } from '@angular/core';
import { Proveedor } from '../../models/proveedor';
import { ProveedoresService } from '../../services/proveedores/proveedores.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styles: []
})
export class ProveedoresComponent implements OnInit {
  cargando: boolean= true;
  proveedores: Proveedor[] = [];
  constructor(public _proveedorService: ProveedoresService) { }

  ngOnInit() {
    this.cargarProveedores();
 }

 cargarProveedores(){
   this.cargando= true;
   this._proveedorService.cargarProveedores()
           .subscribe( resp => {
             this.cargando= false;
             this.proveedores = resp;
           });
 }
  
  borrarProveedor( proveedor: Proveedor){
    this._proveedorService.borrarProveedor( proveedor._id )
            .subscribe( () => this.cargarProveedores());
  }

}
