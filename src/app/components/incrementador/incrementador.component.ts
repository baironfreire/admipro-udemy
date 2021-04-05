import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtprogress') txtprogress : ElementRef;
  
  @Input('name') leyenda: string;
  @Input('porcent') porcentaje: number;
  
  @Output('updatevalue') cambioValor: EventEmitter<number>;

  constructor() { 
    this.leyenda = 'Leyenda';
    this.porcentaje = 50;
    this.cambioValor = new EventEmitter();
  }

  ngOnInit() {
  }

  public onChanges(newValue: number): void {
    console.log('newValue', newValue);
    // let elementHTML: any = document.getElementsByName('porcentaje')[0];
    // console.log('element', elementHTML.value);
    if (newValue >= 100){
      this.porcentaje = 100;
    }else if( newValue <= 0) {
      this.porcentaje = 0;
    }else{
      this.porcentaje = newValue;

    }
    this.txtprogress.nativeElement.value = this.porcentaje;
    this.cambioValor.emit(this.porcentaje);
  }

  public cambiarValor(valor: number): void {
    if (this.porcentaje >= 100 && valor > 0) {
      this.porcentaje = 100;
      return;
    }
    if (this.porcentaje <= 0 && valor < 0) {
      this.porcentaje = 0;
      return;
    }
    this.porcentaje += valor;
    this.cambioValor.emit(this.porcentaje);
    this.txtprogress.nativeElement.focus();
  }

}
