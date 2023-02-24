import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor() { }

  readFile(input: Blob): string {
    const fr = new FileReader()
    fr.readAsDataURL(input)
    let val = ''

    fr.addEventListener('load', ()=> {
      const res = fr.result
      val = res?.toString() || ''
    })
    return val
  }
}
