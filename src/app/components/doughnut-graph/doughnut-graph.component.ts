import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-doughnut-graph',
  templateUrl: './doughnut-graph.component.html',
  styles: []
})
export class DoughnutGraphComponent implements OnInit {

  @Input('ChartLabels') doughnutChartLabels: string[];
  @Input('ChartData') doughnutChartData: number[];
  @Input('ChartType') doughnutChartType: string;
  
  constructor() { 
    this.doughnutChartLabels = ['Download sales', 'In-Store Sale', 'Mail-Order Sales'];
    this.doughnutChartData = [350, 450, 100];
    this.doughnutChartType = 'doughnut';
  }

  ngOnInit() {
  }

}
