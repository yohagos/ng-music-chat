import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private data: Subject<any> = new Subject<any>();

  setMenu(value: any) {
    this.data.next(value);
  }

  getData() {
    return this.data.asObservable()
  }
}
