import {User} from './model/user';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {UserService} from "./repository/user.service";

@Injectable()
export class CurrentUserService {

    user : User = null;

    userChange : Subject<User> = new Subject<User>();

    constructor(private userService : UserService) {
        this.userChange.subscribe((value) => {
            this.user = value;
        });
    }

    login() {
        this.userService.getSelf().subscribe((user) => {
            this.userChange.next(user);
        })
    }

    loginWith(user : User) {
        this.userChange.next(user);
    }


    logout() {
        this.userChange.next(null);
    }

}