import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor() { }

  handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      console.log('HTTP Error', error)
    }
  }
}
