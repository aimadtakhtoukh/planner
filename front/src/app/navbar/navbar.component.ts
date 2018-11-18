import {Component, OnInit} from '@angular/core';
import {CurrentUserService} from "../services/currentUser.service";
import {User} from "../services/model/user";
import {TokenService} from "../services/auth/token.service";
import {Router} from "@angular/router";

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    user : User = {id : 0, name : ""};

    constructor(
        private currentUserService : CurrentUserService,
        private tokenService : TokenService,
        private router : Router
    ) {}

    ngOnInit(): void {
        this.currentUserService.userChange.subscribe((user) => {
            if (!user) {
                this.router.navigate([""]);
            }
            this.user = user;
        });
        this.currentUserService.login();
    }

    logout() : void {
        this.currentUserService.logout();
        this.tokenService.clearTokens();
        this.router.navigate([""]);
    }

    rightOptionsShown() : boolean {
        return this.user && this.user !== {id : 0, name : ""};
    }

}
