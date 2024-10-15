import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { showMessage } from '../login/showMessage';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [MatButtonModule, MatIconModule, MatDividerModule, MatCardModule, MatSlideToggleModule]
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  user: any = { userId: '1', name: 'Administrator',email: 'john@example.com', role: 'admin' };

  constructor(private router: Router, private loginSvc: LoginService) { }

  ngOnInit() {
    this.isLoggedIn = this.loginSvc.isLoggedIn();
  }
  goToEmployees() {
    this.router.navigate(['/empleados']);
  }
  logout() {
    this.user.name = 'Anonymous';
    this.user.email = 'Anonymous';
    this.user.role = 'anonymous';
    showMessage('Este es un fake logout');
  }
  toggleDarkMode() {
    const root = document.documentElement;
    root.classList.toggle('dark-mode');
  }
  isDarkMode() {
    return document.documentElement.classList.contains('dark-mode');
  }
}
