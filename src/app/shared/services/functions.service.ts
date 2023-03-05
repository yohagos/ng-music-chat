import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileComponent } from 'src/app/main/profile/profile.component';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {
  public sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  value = ''

  constructor(private router: Router) { }

  async readFile(input: Blob): Promise<string> {
    const fr = new FileReader()
    fr.readAsDataURL(input)

    return new Promise(
      (resolve) => {
        fr.addEventListener('load', () => {
          this.sleep(40)
          return resolve(fr.result?.toString() || '');
        })
      }
    )
  }

  

}
