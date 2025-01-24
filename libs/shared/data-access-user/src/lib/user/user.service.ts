import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserLogin } from '../../../../../../apps/login/src/app/models/user.model';
import { User } from '../../../../../../apps/dashboard/src/app/models/user.model';
import { USERS } from '../../../../../../apps/dashboard/src/app/utils/user-data';

@Injectable({ providedIn: 'root' })
export class UserService {

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  private router = inject(Router);

  login(credentials: UserLogin): boolean {
    console.log('login' , credentials);
    const user = USERS.find(
      (u) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );

    if (user) {
      this.currentUserSubject.next(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.router.navigate(['']);
      return true;
    } else {
      return false;
    }
  }


  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }

  getCurrentUser(): User | null {
    const storedUser = localStorage.getItem('currentUser');
    if (!this.currentUserSubject.value && storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
    return this.currentUserSubject.value;
  }

}
