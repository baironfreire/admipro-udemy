import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {
  public porcentaje1: number;
  public porcentaje2: number;
  constructor() { 
    this.porcentaje1 = 20;
    this.porcentaje2 = 30;
  }

  ngOnInit() {
  }

  public actualizar(event: number): void {
    console.log('evento', event);
  }

 

}
