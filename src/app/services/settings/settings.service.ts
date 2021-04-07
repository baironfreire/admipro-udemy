import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public ajustes: Ajustes;

  constructor(@Inject(DOCUMENT) private _document,) { 
    this.ajustes = {
      temaUrl: 'assets/css/colors/default-dark.css',
      tema: 'default'
    }
    this.cargarAjustes();
  }

  guardarAjustes(): void {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes(): void {
    if(localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTema(this.ajustes.tema);
    }
    else{
      console.log('Usando valores por defecto');
    }
  }

  public aplicarTema(theme:string): void {
    const url = `assets/css/colors/${theme}.css`;
    console.log('document',   this._document.getElementById('theme').setAttribute('href', url));
    this.ajustes.tema = theme;
    this.ajustes.temaUrl = url;
    this.guardarAjustes();
  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
