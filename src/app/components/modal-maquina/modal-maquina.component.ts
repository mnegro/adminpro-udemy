import { Component, OnInit } from '@angular/core';
import { ModalMaquinaService } from './modal-maquina.service';

@Component({
  selector: 'app-modal-maquina',
  templateUrl: './modal-maquina.component.html',
  styles: []
})
export class ModalMaquinaComponent implements OnInit {

  constructor(
    public _modalMaquina: ModalMaquinaService

    ) { }

  ngOnInit() {
  }
}
