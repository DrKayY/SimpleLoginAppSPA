import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  userStatusSubscription: Subscription;
  loggedInUserSubscription: Subscription;
  isLoggedIn = this.loggedIn();
  user: User;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userStatusSubscription = this.userService.loggedInStatus.subscribe(
      (logInStatus) => {
        this.isLoggedIn = logInStatus;
      }
    );

    this.loggedInUserSubscription = this.userService.loggedInUser.subscribe(
      (userLoggedIn) => {
        this.user = userLoggedIn;
      }
    );

    this.user = this.userService.getLoggedInUser();
  }

  ngOnDestroy(): void {
    this.userStatusSubscription.unsubscribe();
    this.loggedInUserSubscription.unsubscribe();
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  loggedIn(): boolean {
    return this.userService.isLoggedIn();
  }
}
