import { Component, OnInit } from '@angular/core';
import { Compra } from '../../models/compra.models';
import { Router, ActivatedRoute } from '@angular/router';
import { CompraService } from '../../services/compra/compra.service';
import { NgForm } from '@angular/forms';
import { ProveedoresService } from '../../services/proveedores/proveedores.service';
import { Proveedor } from '../../models/proveedor';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styles: []
})
export class CompraComponent implements OnInit {

  compra: Compra = new Compra('','',0,0,new Date);
  proveedores: Proveedor[] = [];
  proveedor: Proveedor = new Proveedor(''); 
  constructor(
    public _compraService: CompraService,
    public _proveedorService: ProveedoresService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
  

  ) { 
    activatedRoute.params.subscribe( params =>{

      let id= params['id'];

      if( id !== 'nuevo' ){
        this.cargarCompra( id );
      }
    })
  }

  ngOnInit() {
    this.cargarProveedores();
  }

  cargarCompra( id: string ){
    this._compraService.cargarCompra ( id )
            .subscribe( compra => {
              this.compra = compra;
            });
    
  }
  cargarProveedores(){
    this._proveedorService.cargarProveedores()
          .subscribe( proveedores => this.proveedores = proveedores );
  }
  cambioProveedor( id: string ){
    this._proveedorService.cargarProveedor( id )
          .subscribe( proveedor => this.proveedor = proveedor );
  }
  guardarCliente( f: NgForm ){
    if( f.invalid ){
      return;
    }
    this._compraService.guardarCompra( this.compra )
          .subscribe( compra =>{
            this.compra._id = compra._id;
            this.router.navigate(['/compras']);
          });
  }
 

}
