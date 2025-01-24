import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UserService {
  private isUserLoggedIn = new BehaviorSubject(false);
  isUserLoggedIn$ = this.isUserLoggedIn.asObservable();
  private router = inject(Router);
  checkCredentials(credentials: any) {
    if (credentials.username === 'demo' && credentials.password === 'demo') {
      this.isUserLoggedIn.next(true);
      this.router.navigate(['']);
    }
  }

  logout() {
    this.isUserLoggedIn.next(false);
  }
}
