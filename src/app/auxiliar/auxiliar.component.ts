import { Component, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { EmpleadosComponent } from '../empleados/empleados.component';

@Component({
  standalone: true,
  selector: 'app-auxiliar',
  templateUrl: './auxiliar.component.html',
  styleUrls: ['./auxiliar.component.css'],
  imports: [MatSlideToggleModule, MatButtonModule, MatIconModule, MatDividerModule, MatCardModule, EmpleadosComponent]
})
export class AuxiliarComponent implements OnInit {
  title = 'Auxiliar';
  constructor() { }

  ngOnInit() {
  }

}
