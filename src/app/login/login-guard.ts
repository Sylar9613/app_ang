import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "./login.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
    constructor(private router: Router, private loginSvc: LoginService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       if (this.loginSvc.isLoggedIn()) {
         return true;
       }
       else {
           this.router.navigate(['/login']);
            return false;
        }
    }
}
