import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from '../login/login.service';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [MatToolbarModule, MatButtonModule, RouterModule, MatIconModule]
})
export class HeaderComponent implements OnInit {
  token: string = '';

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    let token = this.loginService.getIdToken();
    if (token) {
      this.token = token;
    } else {
      this.token = '';
    }
  }

  onLogout() {
    this.loginService.logout();
  }

  isLoggedIn() {
    return this.loginService.isLoggedIn();
  }
}
