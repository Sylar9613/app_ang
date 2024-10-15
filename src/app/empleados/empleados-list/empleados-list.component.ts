import { ChangeDetectionStrategy, Component, inject, Input, OnInit, signal, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { EmpleadosService } from '../empleados.service';
import { Empleado } from '../empleado';
import { Departamento } from '../departamento';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogAnimationComponent } from '../../dialog-animation/dialog-animation.component';

@Component({
  standalone: true,
  selector: 'app-empleados-list',
  templateUrl: './empleados-list.component.html',
  styleUrls: ['./empleados-list.component.css'],
  imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule, FormsModule, MatCheckboxModule, MatButtonModule, MatSelectModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmpleadosListComponent implements OnInit {
  id: number = 0;
  name: string = '';
  age: number = 0;
  salary: number = 0;
  departments: Departamento[] = [];
  empleados: Empleado[] = [];
  isUpdated: boolean = false;

  selectedDepartment: any = '';
  form: FormGroup;
  isInvalid: boolean = false;
  readonly dialog = inject(MatDialog);

  constructor(private empleadosService:EmpleadosService, private router: Router, private route: ActivatedRoute) { 
    this.departments = this.empleadosService.departments;
    this.selectedDepartment = new FormControl(this.departments[0].id);
    /* this.form = new FormGroup({
      department: this.selectedDepartment
    }); */
  }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    //alert(this.route.snapshot.queryParams['accion']);
    if(id){
      this.id = parseInt(id);
      let empleado: Empleado = this.empleadosService.getEmpleadoById(this.id);

      this.name = empleado.name;
      this.age = empleado.age;
      this.salary = empleado.salary;
      this.selectedDepartment = new FormControl(empleado.department.id);
      this.isUpdated = true;
    } 
  }

  protected readonly valueName = signal('');
  protected readonly valueAge = signal('');
  protected readonly valueSalary = signal('');

  protected onInput(event: Event) {
    if ((event.target as HTMLInputElement).name === 'name') {
      this.valueName.set((event.target as HTMLInputElement).value);
    } else if ((event.target as HTMLInputElement).name === 'age') {
      this.valueAge.set((event.target as HTMLInputElement).value);
    } else if ((event.target as HTMLInputElement).name ==='salary') {
      this.valueSalary.set((event.target as HTMLInputElement).value);
    }
  }

  agregarEmpleado(){
    let nombre = this.name;
    let edad = this.age;
    let departamento = this.departments.find(departamento => departamento.id === parseInt(this.selectedDepartment.value)) || this.departments[0];
    let salario = this.salary;

    if(!nombre ||!edad ||!salario || isNaN(edad) || isNaN(salario)){
      this.openDialog('800ms', '300ms');
      return; 
    }
    let empleado: Empleado = {id: this.id, name: nombre, age: edad, department: departamento, salary: salario};
    
    this.empleadosService.createEmpleado(empleado).add(()=>{
      this.router.navigate(['/empleados']);
    });
    /* return JSON.stringify(this.empleados); */
    //this.router.navigate(['/empleados']);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationComponent, {
      data: { dialogTitle: 'Form error', dialogContent: 'This form is invalid check all fields.' },
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  verificarRuta(){
    if (this.isUpdated) {
      let empleado: Empleado = {id: this.id, name: this.name, age: this.age, department: this.departments.find(departamento => departamento.id === parseInt(this.selectedDepartment.value)) || this.departments[0], salary: this.salary};
      this.editarEmpleado(empleado);
    } else {
      this.agregarEmpleado();
    }
  }
  
  editarEmpleado(empleado: Empleado){
    this.empleadosService.updateEmpleado(empleado).add(()=>{
      this.router.navigate(['/empleados']);
    });
  }
}
