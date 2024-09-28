import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [MatToolbarModule, MatButtonModule, RouterModule, MatIconModule]
})
export class HeaderComponent implements OnInit {
  userIsAuthenticated: boolean = false; // Simulate authentication status

  constructor() { }

  ngOnInit() {
  }

  onLogout() {
    this.userIsAuthenticated = false; // Simulate logging out
  }

  Login() {
    this.userIsAuthenticated = true; // Simulate logging in
  }
}
