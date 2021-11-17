import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from "../../constants/types";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() user: any | undefined;
  @Output() logout = new EventEmitter();
  public isLoggedIn = false;
  constructor() { }

  public onLogout() {
    this.logout.emit();
  }
}
