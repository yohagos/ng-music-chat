import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {
  sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  value = ''

  constructor() { }

  async readFile(input: Blob): Promise<string> {
    const fr = new FileReader()
    fr.readAsDataURL(input)

    return new Promise((resolve, reject) => {
      fr.addEventListener('load', () => {
        this.sleep(30)
        return resolve(fr.result?.toString() || '');
      })
    })
  }
}
