import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: User;
  registerForm: FormGroup;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', Validators.required),
      isAdmin: new FormControl(false),
      adminCode: new FormControl('')
    }, {validators: this.confirmPassword});
  }

  confirmPassword(fg: FormGroup): any {
    return fg.get('password').value === fg.get('confirmPassword').value ? null : {mismatch: true};
  }

  register(): void {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.userService.register(this.user)
      .subscribe(
        user => {
          alert('Registration success');
        },
        error => {
          console.log(error);
          alert('registration error');
        },
        () => {
          this.userService.login(this.user);
          this.router.navigate(['/login']);
        }
        );
    }
  }
}
