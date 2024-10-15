import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { AuxiliarComponent } from "./auxiliar/auxiliar.component";
import { EmpleadosComponent } from "./empleados/empleados.component";
import { HeaderComponent } from "./header/header.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ConfirmInterceptor } from './confirm-interceptor.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, RouterOutlet, CalculadoraComponent, AuxiliarComponent, EmpleadosComponent, HeaderComponent, MatProgressSpinnerModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ConfirmInterceptor, multi: true }
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}
