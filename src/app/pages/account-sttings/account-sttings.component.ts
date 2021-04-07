import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/service.index';



@Component({
  selector: 'app-account-sttings',
  templateUrl: './account-sttings.component.html',
  styles: []
})
export class AccountSttingsComponent implements OnInit {

  constructor(public _ajustes: SettingsService) { }

  ngOnInit() {
    this.colocarCheck();
  }

  public cambiarColor(theme: string, link: any): void {
    console.log('tema', theme, link)
    this.aplicarCheck(link)
    this._ajustes.aplicarTema(theme);

  }

  public aplicarCheck(link: any): void {
    let selector: any = document.getElementsByClassName('selector');
    for(let ref of selector) {
      ref.classList.remove('working');
    }
    link.classList.add('working')
  }

  public colocarCheck(): void {
    let selector: any = document.getElementsByClassName('selector');
    let theme = this._ajustes.ajustes.tema;
    for(let ref of selector) {
      if(ref.getAttribute('data-theme') === theme){
        ref.classList.add('working')
        break;
      }
    }
  }



}
