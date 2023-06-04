import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
import { ProfileComponent } from 'src/app/main/profile/profile.component';
import { AuthService } from './auth.service';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {
  public sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  list: Route[] = []

  public toggleNav: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(private routing: AppRoutingModule) {
    this.setList()
  }

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

  setList() {
    this.list = this.routing.getRoutingList()
  }

  getList() {
    return this.list
  }

  toggleSideNav() {
    this.toggleNav.next(!this.toggleNav.value)
    console.log(this.toggleNav.value)
  }

}
