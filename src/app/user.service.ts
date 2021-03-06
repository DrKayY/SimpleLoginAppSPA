import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { User } from './user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;
  loggedInStatus = new Subject<boolean>();
  loggedInUser = new Subject<User>();

  constructor(private http: HttpClient) { }

  login(model: any): Observable<any> {
    return this.http.post(this.baseUrl + 'login', model)
    .pipe(map((response: any) => {
      const user = response;
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.loggedInUser.next(user);
        this.loggedInStatus.next(true);
      }
    })
    );
  }

  register(user: User): Observable<any> {
    return this.http.post(this.baseUrl + 'register', user);
  }

  isLoggedIn(): boolean {
    const user = localStorage.getItem('user');
    return !!user;
  }

  logout(): void {
    localStorage.removeItem('user');
    this.loggedInUser.next(null);
    this.loggedInStatus.next(false);
  }

  getLoggedInUser(): any {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      return user;
    }
  }
}
