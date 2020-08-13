import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {AuthenticationService} from '../_services';
import {faLock, faUser} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  userIcon = faUser;
  lockIcon = faLock;

  public persistSignIn: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    if (!this.persistSignIn) {
      // handle NOT persisting sign in
    }

    this.loading = true;
    // this.authenticationService.login(this.f.username.value, this.f.password.value)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       this.router.navigate([this.returnUrl]);
    //     },
    //     error => {
    //       this.error = error;
    //       this.loading = false;
    //     });
  }

  persistingSignIn(target) {
    this.persistSignIn = target.value;
    console.log('persist = ' + this.persistSignIn);
    console.log(target);

  }

  forgotPassword() {
    alert('We will do something about forgotten password')
    // handle forgotten password
  }

  foo() {
    this.authenticationService.linkingLogin().subscribe(response => {
      // console.log('response');
      // console.log(response);
      setTimeout(() => {
        this.bar(response);
      }, 3000);
    });
  }
  bar(user) {
    this.authenticationService.getRoles().subscribe(x => {
      console.log('roles');
      console.log(x);
    });
    this.foobar(user);
  }
  foobar(user) {
    this.authenticationService.queryForCreds(user).subscribe(x => {
      console.log('queryForCreds');
      console.log(x);
    });
  }
}
