import {Component, OnInit} from '@angular/core';
import {AuthenticationService, UserService} from '../_services';
import {Router} from '@angular/router';
import {MenuItem} from '../_models/menuItem.model';
import {faFeatherAlt, faHandsWash, faHome, faMugHot, faSearch, faShoePrints} from '@fortawesome/free-solid-svg-icons';
import {first} from 'rxjs/operators';
import {User} from '../_models';

@Component({
  selector: 'app-root',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class AppLayoutComponent implements OnInit {
  users: User[] = [];
  public currentUser: User;
  printIcon = faShoePrints;
  searchIcon = faSearch;
  currentMenuItem = new MenuItem();
  value: string;
  mainMenuItems: MenuItem[] = [
    {
      path: '/admin',
      title: 'Admin',
      icon: faShoePrints,
    },
    {
      path: '/home',
      title: 'Home',
      icon: faHome,
    },
    {
      path: '/datatable',
      title: 'Datatable',
      icon: faHandsWash,
    },
    {
      path: '/documentlist',
      title: 'Documents',
      icon: faFeatherAlt,
    },
    {
      path: '/file-view',
      title: 'File View',
      icon: faMugHot,
    },
  ];

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private userService: UserService,
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    if (this.router.url === '/') {
      this.currentMenuItem = this.mainMenuItems[1];
    } else {
      for (const item of this.mainMenuItems) {
        if (this.router.url === item.path) {
          this.currentMenuItem = item;
        }
      }
    }
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
    });
  }

  searchInput(event) {
    console.log(event);
  }

  chooseSecondaryNav(menuItem: MenuItem) {
    console.log(menuItem)
    this.currentMenuItem = menuItem;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  login() {
    this.authenticationService.linkingLogin().subscribe(response => {
      // console.log('response');
      // console.log(response);
    });
  }

}
