import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastyService } from 'ng2-toasty';
import { HttpRequestHandler, HttpRequestBase, MessageType, ErrorUtil } from '../../models/http-model';
import  {Observable}  from 'rxjs';
import { finalize , map} from "rxjs/operators";
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient, private toastr: ToastyService, private spinner: NgxSpinnerService) {}

  /**
   * performs a request with GET http method
   */
  public get(url: string, httpRequestHandler: HttpRequestHandler, token?: string) {
    this.setHandlerDefaults(httpRequestHandler);
    const headers = this.getHeaders(httpRequestHandler, token);
    this.handleResponse( this.http.get(url, {headers: headers}), httpRequestHandler)  
  }

  /**
   * performs a request with POST http method
   */
  public post(url: string, data: any, httpRequestHandler: HttpRequestHandler) {
    this.setHandlerDefaults(httpRequestHandler);
    const headers = this.getHeaders(httpRequestHandler);
    this.handleResponse(this.http.post(url, data, { headers: headers }), httpRequestHandler);
  }

  public postOk(url: string, data: any, httpRequestHandler: HttpRequestHandler){
    this.setHandlerDefaults(httpRequestHandler);
    const headers = this.getHeaders(httpRequestHandler);
    this.handleResponse(this.http.post(url, data, { headers: headers }), httpRequestHandler);
  }

  /**
   * performs a request with DELETE http method
   */
  public delete(url: string, httpRequestHandler: HttpRequestHandler) {
    this.setHandlerDefaults(httpRequestHandler);
    const headers = this.getHeaders(httpRequestHandler);
    this.handleResponse(this.http.delete(url, { headers: headers }), httpRequestHandler);
  }

  /**
   * performs a request with PUT http method
   */
  public put(url: string, data: any, httpRequestHandler: HttpRequestHandler) {
    this.setHandlerDefaults(httpRequestHandler);
    const headers = this.getHeaders(httpRequestHandler);
    this.handleResponse(this.http.put(url, data, { headers: headers }), httpRequestHandler);
  }  

  public download(url: string, httpRequestHandler: HttpRequestHandler) {
    this.setHandlerDefaults(httpRequestHandler);
    const headers = this.getHeaders(httpRequestHandler);
    this.handleResponse(this.http.get(url, {headers: headers, responseType: 'blob'}), httpRequestHandler);
  }

  private setHandlerDefaults(httpRequestHandler: HttpRequestHandler) {
    if (httpRequestHandler.includeToken == null) httpRequestHandler.includeToken = true;
    if (httpRequestHandler.errorMsgType == null) httpRequestHandler.errorMsgType = MessageType.Toast;
    if (httpRequestHandler.loadingScreen == null) httpRequestHandler.loadingScreen = true;
  }

  /**
   * returns the headers for an specific request based on guest config
   */
  private getHeaders(httpRequestBase: HttpRequestBase, token?: string) {
    const headers = {};

    if (httpRequestBase.includeToken) {
      if (httpRequestBase.headers) return httpRequestBase.headers;
        headers['Authorization'] = token;
    }
    return headers;
  }

  /**
   * handle the response for a given request
   */
  private handleResponse(request: Observable<any>, httpRequestHandler: HttpRequestHandler) {
    request.pipe(
      map((data) =>  {
        if (httpRequestHandler.loadingScreen) {
          this.spinner.show();
          console.log('spinnerStart :>> ');
        }
        return data;
      }),
      finalize(() => {
        if (httpRequestHandler.loadingScreen) this.spinner.hide();
          
        if (httpRequestHandler.always) httpRequestHandler.always();
      })
    ).subscribe(
      (response) => {
        if (httpRequestHandler.success) httpRequestHandler.success(response);
      },
      (error) => {
        const data = this.handleError(error, httpRequestHandler.errorMsgType);
        if (httpRequestHandler.error) {
          const util: ErrorUtil = {
            err: error,
            showToastError: this.generateError.bind(this, error, MessageType.Toast, data),
            showAlertError: this.generateError.bind(this, error, MessageType.Toast, data)
            };
            httpRequestHandler.error(data, util);
        }
      }

    );
  }


  // private handleResponse(request: Observable<any>, httpRequestHandler: HttpRequestHandler) {
  //   request
  //     .finally(() => {
  //       if (httpRequestHandler.always) httpRequestHandler.always();
  //     })
  //     .subscribe(
  //       res => {
  //         if (httpRequestHandler.success) httpRequestHandler.success(res);
  //       },
  //       err => {
  //         const data = this.handleError(err, httpRequestHandler.errorMsgType);
  //         if (httpRequestHandler.error) {
  //           const util: ErrorUtil = {
  //             err: err,
  //             showToastError: this.generateError.bind(this, err, MessageType.Toast, data),
  //             showAlertError: this.generateError.bind(this, err, MessageType.Toast, data)
  //           };
  //           httpRequestHandler.error(data, util);
  //         }
  //       }
  //     );
  // }

  /**
   * handle the error for the requests
   */
   private handleError(err: any, type: MessageType) {
    let data: any;
    let headers: HttpHeaders  = err.headers;
    if (err.headers && err.headers.get('content-type') === 'application/json; charset=utf-8') {
      if (err.error) {
        data = err.error
      } else {
        data = (err._body !== '') ? JSON.parse(err._body) : [];
      }
    }
    this.generateError(err, type, data);
    return data;
  }

  private generateError(err: any, type: MessageType, data: any) {
    if (type === MessageType.None) return;

    const basicError = () => {
      const errorMsg = err.message ? err.message : err.statusText ? err.statusText : 'Server error';
      console.log('errorMsg', errorMsg);
      if (type === MessageType.Toast){ 
        this.toastr.error(errorMsg);
      }
      else if (type === MessageType.Loading){ 
        console.log('Loading');
      }
    };
    basicError();
  }
}
