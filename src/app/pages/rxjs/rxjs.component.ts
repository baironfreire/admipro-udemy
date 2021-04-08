import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  private suscription: Subscription;
  constructor() { 
   

    this.suscription =  this.regresaObservable()
    .subscribe(
      numero => console.log('Numero', numero),
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!'),
    );
    
      

    
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('La pagina se va a cerrar');
    this.suscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {

    return new Observable( observer => {
      let cont = 0;
      let intervalo = setInterval(() => {
        cont += 1;
        observer.next(cont);
 
      }, 3000)
    });
  }

}
