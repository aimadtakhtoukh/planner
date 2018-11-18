import { Component, OnInit } from '@angular/core';
import {TokenService} from "../services/auth/token.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CurrentUserService} from "../services/currentUser.service";

@Component({
  selector: 'app-token-update',
  templateUrl: './token-update.component.html',
  styleUrls: ['./token-update.component.scss']
})
export class TokenUpdateComponent implements OnInit {

  constructor(private tokenService : TokenService,
              private currentUserService : CurrentUserService,
              private router : Router, private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const accessToken = params[this.tokenService.accessTokenKey];
      const refreshToken = params[this.tokenService.refreshTokenKey];
      this.tokenService.saveAccess(accessToken);
      this.tokenService.saveRefresh(refreshToken);
      this.router.navigate([""]);
    });
  }

}
