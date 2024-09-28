import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  login(form:NgForm): void {
    const username = form.value.username;
    const password = form.value.password;
    console.log('Login request sent');
  }
}
