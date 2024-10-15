import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css'],
  imports: [MatSlideToggleModule, MatButtonModule, MatIconModule, MatDividerModule, MatCardModule, MatInputModule, MatFormFieldModule, FormsModule, MatCheckboxModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculadoraComponent implements OnInit {
  title: string = 'Mini Calculadora';
  num1: number = 0;
  num2: number = 0;
  result: number = 0;
  private _snackBar = inject(MatSnackBar);
  operationSucceeded: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  sumar(): void {
    this.result = this.num1 + this.num2;
    this.operationSucceeded = true;
  }

  restar(): void {
    this.result = this.num1 - this.num2;
    this.operationSucceeded = true;
  }

  multiplicar(): void {
    this.result = this.num1 * this.num2;
    this.operationSucceeded = true;
  }
  
  dividir(): void {
    if(this.num2!=0){
      this.result = this.num1 / this.num2;
      this.operationSucceeded = true;
    }else{
      this._snackBar.open('No se puede dividir por 0', 'Aceptar', {
        duration: 2000,
      });
    }
  }

  goToEmployees() {
    this.router.navigate(['/empleados']);
  }
}
