import { ChangeDetectionStrategy, Component, inject, OnInit, ViewChild } from '@angular/core';
import { Empleado } from './empleado';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule, MatTable} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { EmpleadosService } from './empleados.service';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogAnimationComponent } from '../dialog-animation/dialog-animation.component';
import {CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  standalone: true,
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
  imports: [CurrencyPipe, MatTableModule, MatIconModule, MatButtonModule, RouterModule, CdkDropList, CdkDrag],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmpleadosComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  empleados: Empleado[] = [];
  
  datasource = [...this.empleados];
  displayedColumns: string[] = ['id', 'name', 'age', 'department', 'salary', 'actions'];

  @ViewChild(MatTable) table: MatTable<Empleado>; // typeof MatTable<PeriodicElement>

  constructor(private empleadosService: EmpleadosService) {}

  ngOnInit() {
    this.empleadosService.getEmpleados().map(empleados => {
      this.empleados.push(empleados);
      this.datasource = [...this.empleados];
    });
  }
  
  eliminarEmpleado(id: number){
    this.empleadosService.deleteEmpleado(id).add(()=>{
      let idEmpleadoEliminado = this.empleados.findIndex(emp => emp.id === id);
      this.empleados = this.empleados.filter(e => e.id != id);
      this.datasource.splice(idEmpleadoEliminado, 1);
      this.table.renderRows();
    });
    //
    //var idx = Object.keys(this.empleados);
    //console.log("ID Empleado: "+idEmpleadoEliminado);
    //
  }

  openDeleteDialog(id: number): void {
    const dialogo = this.dialog.open(DialogAnimationComponent, {
      data: { dialogTitle: 'Delete employee', dialogContent: 'Are you sure that you deleted?', dialogCancel: true },
      width: '250px'
    });
    dialogo.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.eliminarEmpleado(id);
      }
    });
  }

  // Drop and drag the table header
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }
}
