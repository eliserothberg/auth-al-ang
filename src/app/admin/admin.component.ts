import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import {Role, User} from '../_models';
import {AuthenticationService, UserService} from '../_services';
import {Router} from '@angular/router';


@Component({
    selector: 'admin',
    templateUrl: 'admin.component.html',
    styleUrls: ['admin.component.scss']
})
export class AdminComponent implements OnInit {
    users: User[] = [];
    public currentUser: User;
    constructor(
        private router: Router,
        private userService: UserService,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }
    get isAdmin() {
        return this.currentUser && this.currentUser.role === Role.Admin;
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}