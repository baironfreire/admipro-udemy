import { Component, OnInit } from '@angular/core';
import { Meta, Title, MetaDefinition } from '@angular/platform-browser';
import { Router , ActivationEnd} from '@angular/router';

import { filter, map } from 'rxjs/operators'

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  public namePage: string;
  constructor(private router: Router,
    private title: Title,
    private meta: Meta) {
    this.getDataRoute()
    .subscribe(
      (data => {
        console.log('evento', data);
        this.namePage = data.title;
        this.title.setTitle(this.namePage);
        let metaTag: MetaDefinition = {
          name: 'description',
          content: this.namePage
        };
        this.meta.updateTag(metaTag);
      })
    )
  }

  public getDataRoute() {
    return this.router.events
    .pipe(
      filter( evento => evento instanceof ActivationEnd),
      filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map((evento: ActivationEnd) => evento.snapshot.data)
    );
  }

  ngOnInit() {
  }

}
