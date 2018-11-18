import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TokenService} from "../services/auth/token.service";
import {UserService} from "../services/repository/user.service";

@Component({
  selector: 'app-redirect-if-logged',
  templateUrl: './redirect-if-logged.component.html',
  styleUrls: ['./redirect-if-logged.component.scss']
})
export class RedirectIfLoggedComponent implements OnInit {

  constructor(
      private tokenService : TokenService,
      private userService : UserService,
      private router : Router
  ) { }

  ngOnInit() {
      if (!this.tokenService.accessToken()) {
        this.router.navigate(['not-logged']);
      } else {
          this.userService.getSelf().subscribe(user => {
              if (user) {
                  this.router.navigate(['planner'])
              } else {
                  this.router.navigate(['subscribe'])
              }
          })
      }
  }

}
