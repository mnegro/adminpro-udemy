import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graficas-donas',
  templateUrl: './graficas-donas.component.html',
  styles: []
})
export class GraficasDonasComponent implements OnInit {

  // @Input()data;
  // @Input()labels;
  // @Input()chartType;


 @Input('ChartLabels') doughnutChartLabels: string[] = [];
 @Input('ChartData') doughnutChartData: number[] = [];
 @Input('ChartType') doughnutChartType = '';

  constructor() { }

  ngOnInit() {
  }

}
