import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any;
  loginForm: FormGroup;
  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initializeLoginForm();
    if (this.loggedIn()) {
      this.router.navigate(['/']);
    }
  }

  initializeLoginForm(): void {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    this.model = Object.assign({}, this.loginForm.value);
    this.userService.login(this.model).subscribe(
      next => {
        this.model = {};
        alert('login successful');
      },
      error => {
        console.log(error);
        alert('login error');
      },
      () => {
        this.router.navigate(['/']);
      }
    );
  }

  loggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

}
