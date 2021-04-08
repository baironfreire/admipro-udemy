import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    

    this.contar().then(
      (mensaje) => console.log('Termino', mensaje)
    ).catch((err) => console.log('Error en la promesa', err))
  }

  ngOnInit() {
  }

  contar(): Promise<boolean> {

    return new  Promise((resolve, reject) => {
      let cont = 0;
      let intervalo = setInterval(() => {
        cont += 1;
        if (cont == 3) {
          resolve(true);
          clearInterval(intervalo);
        }
      }, 1000);
    });  

    
  }

}
