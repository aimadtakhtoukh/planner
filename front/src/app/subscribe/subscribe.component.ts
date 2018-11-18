import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/repository/user.service";
import {User} from "../services/model/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {

  name : string;

  constructor(private router : Router, private userService : UserService) { }

  ngOnInit() {}

  subscribe() {
      this.userService
          .create(this.name)
          .subscribe(
              () => this.router.navigate(['']),
              () => {}
          );
  }

}
