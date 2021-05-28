import { Injectable, Inject } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';


@Injectable()
export class LocalStorageService {

  constructor(
    @Inject(SESSION_STORAGE)
    private storage: StorageService
  ) { }

  get(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const value =  this.storage.get(key) || null;
      resolve(value);
    });
  }

  save(key: string, value: any) {
    return new Promise((resolve, reject) => {
      if (value) {
        this.storage.set(key, value);
        resolve(true);
      } else {
        this.storage.remove(key);
        resolve(false);
      }
    })
  }

  remove(key: string) {
    return new Promise((resolve, reject) => {
      if (key) {
        this.storage.remove(key);
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }
}



