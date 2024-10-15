import { Routes } from '@angular/router';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { AuxiliarComponent } from './auxiliar/auxiliar.component';
import { HomeComponent } from './home/home.component';
import { EmpleadosListComponent } from './empleados/empleados-list/empleados-list.component';
import { Error404Component } from './error404/error404.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login/login-guard';

export const routes: Routes = [
    //{ path: '', redirectTo: 'home', pathMatch: 'full' },
    // Add more routes here...
    { path: '', component: HomeComponent },
    { path: 'calculadora', component: CalculadoraComponent },
    { path: 'empleados', component: EmpleadosComponent, canActivate: [LoginGuard] },
    { path: 'auxiliar', component: AuxiliarComponent },
    { path: 'nuevo', component: EmpleadosListComponent },
    { path: 'actualizar/:id', component: EmpleadosListComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', component: Error404Component },
];
