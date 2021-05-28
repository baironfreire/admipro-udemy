import { Component, OnInit } from '@angular/core';
import { ToastyService, ToastData, ToastOptions, ToastyConfig } from 'ng2-toasty';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor(private toastyService:ToastyService,
    private toastyConfig: ToastyConfig) { 
      this.toastyConfig.theme = 'material';
    }

  ngOnInit() {
  }

  addToast() {

    this.toastyService.default('Hi there');
    
    var toastOptions:ToastOptions = {
      title: "My title",
      msg: "The message",
      showClose: false,
      timeout: 5000,
      theme: 'default',
      onAdd: (toast:ToastData) => {
          console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: function(toast:ToastData) {
          console.log('Toast ' + toast.id + ' has been removed!');
      }
  };
    // Add see all possible types in one shot
    this.toastyService.info(toastOptions);

  }

}
