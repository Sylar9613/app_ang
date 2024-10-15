import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private loginService: LoginService, private router: Router) {}

  async login(form: NgForm) {
    // Check if form is valid before sending the request
    if (form.invalid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    await this.loginService.login(email, password).then(() => { 
      // Login successful, redirect to dashboard or other page
      console.log('Login successful');
      this.router.navigate(['/empleados']);
    });
    console.log('Login request sent: ' + email + ' - pass: ' + password);
  }
}
