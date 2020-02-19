// Libs
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// Services
import { AuthService } from '../shared/services/auth.service';
// Interfaces
import {User} from '../../shared/interfaces';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;
  isLoading = false;
  message?: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params.loginAgain) {
        this.message = 'You must login.';
      } else if (params.authFailed) {
        this.message = 'Session is over.';
      }
    });

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.minLength(6), Validators.required])
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    console.log('submit', user);

    this.authService.login(user).subscribe((responce) => {

      console.log(responce);

      this.form.reset();
      this.router.navigate(['/admin', 'dashboard']).then();
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    } );
  }
}
