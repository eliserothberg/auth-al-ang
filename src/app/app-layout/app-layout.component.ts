import { Component } from '@angular/core';
import {AuthenticationService} from '../_services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,

  ) {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
