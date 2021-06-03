import { Injectable, Inject } from '@angular/core';
import { SESSION_STORAGE, StorageService, StorageTranscoders } from 'ngx-webstorage-service';


@Injectable()
export class LocalStorageService {
  
  private numberStorage: StorageService<number>;
  private stringStorage: StorageService<string>;
  private booleanStorage: StorageService<boolean>; 
  private jsonStorage: StorageService<{}>;

  constructor(
    @Inject(SESSION_STORAGE)
    private storage: StorageService
  ){ 
      this.numberStorage = storage.withDefaultTranscoder(StorageTranscoders.NUMBER);
      this.stringStorage = storage.withDefaultTranscoder(StorageTranscoders.STRING);
      this.booleanStorage = storage.withDefaultTranscoder(StorageTranscoders.BOOLEAN);
      this.jsonStorage = storage.withDefaultTranscoder(StorageTranscoders.JSON);
  }

  public getString(key:string): string{
    return this.stringStorage.get(key) || null;
  }

  public getJson(key:string): any{
    return this.jsonStorage.get(key) || null;
  }

  public getNumber(key:string): number {
    return this.numberStorage.get(key) || null;
  }

  public getBoolean(key:string): boolean {
    return this.booleanStorage.get(key);
  }


  public setString(key:string , value:string): void {
    this.stringStorage.set(key, value);
  }

  public setBoolean(key:string , value:boolean): void {
    this.booleanStorage.set(key, value);
  }

  public setJson(key:string , value:{}): void {
    this.jsonStorage.set(key,  value);
  }

  public setNumber(key:string, value:number): void {
    this.numberStorage.set(key, value);
  }

  public remove(key:string): void {
    this.storage.remove(key);
  }

  
}



