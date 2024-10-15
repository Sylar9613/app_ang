import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import "firebase/auth";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { showMessage } from './showMessage';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  token: string;
  private auth: Auth = inject(Auth);

  constructor(private router: Router, private cookieSvc: CookieService) { }

  async login(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        this.auth.currentUser?.getIdToken()
          .then((token) => { 
            this.token = token;
            localStorage.setItem('token', token);
            this.cookieSvc.set('token', this.token, { expires: 2 });
            showMessage("Welcome " + userCredential.user?.email + ' ');
          /* this.router.navigate(['/empleados']); */
        })
        /* this.token = userCredential.user?.uid;
       localStorage.setItem('token', this.token);
        this.router.navigate(['/empleados']); */
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-credential') {
          showMessage("Invalid credential ",  'error');
        } else if (error.code === 'auth/too-many-requests'){
          showMessage("Too many requests ",  'error');
        } else {
          showMessage(error.message,  'error');
        }
      });
  }

  getIdToken() {
    return this.cookieSvc.get('token');    //this.token;
  }

  isLoggedIn() {
    return !!this.cookieSvc.get('token');    //this.token;
  }

  logout() { 
    this.auth.signOut().then(() => {
      this.token = '';
      this.cookieSvc.delete('token');
      localStorage.removeItem('token');
      showMessage("Logged out");
      console.log('Logged out');
      this.router.navigate(['/login']);
    });
  }
}
