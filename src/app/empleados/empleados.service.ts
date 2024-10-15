import { Injectable } from '@angular/core';
import { Empleado } from './empleado';
import { DepartamentoService } from './departamento.service';
import { Departamento } from './departamento';
import { DataService } from '../data.service';
import { showMessage } from '../login/showMessage';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  empleados: Empleado[] = [];
  departments: Departamento[] = [];
  private id: number = 0;

  constructor(private departamentoService: DepartamentoService, private dataServices: DataService) { 
    this.departments = this.departamentoService.getDepartamentos();
    //this.fillEmpleados();
  }

  setEmployees(employees: Empleado[]): void {
    this.empleados = employees;
    //console.log("setEmployees: ", this.empleados);
  }

  // Simulación de un array de empleados
    getEmpleados() {
      this.dataServices.loadEmployees().subscribe(empleados => {
        if (empleados!==null) {
          this.empleados = Object.values(empleados);
        } else {
          this.empleados = [];
        }
        this.setEmployees(this.empleados);
      }, err => {
        showMessage('Error: ' + err, 'error');
        console.log(err);
        this.empleados = [];
      });
      return this.empleados;
    }
    
    // Creación de un empleado
    createEmpleado(empleado: Empleado) {
      this.id = this.empleados.length;
      empleado.id = parseInt((this.id).toString() + new Date().getTime().toString());
      //console.log('Empleados guardados: ' + JSON.stringify(this.empleados));
      console.log('Agregando empleado...');
      this.empleados.push(empleado);
      return this.dataServices.safeEmployees(this.empleados);
    }
  
    addEmployees(empleado:Empleado): void {
      this.empleados.push({ id: empleado.id, name: empleado.name, age: empleado.age, department: empleado.department, salary: empleado.salary});
    }

  // Simulación de la obtención de un empleado por ID
  getEmpleadoById(id: number): any {
    const empleados = this.empleados;
    return empleados.find(emp => emp.id === id);
  }

  // Simulación de la actualización de un empleado
  updateEmpleado(empleado: Empleado) {
    console.log(`Editando empleado: ${empleado.name}`);
    const empleados = this.empleados;
    const index = empleados.findIndex(emp => emp.id === empleado.id);
    empleados[index] = empleado;
    this.empleados = empleados;
    return this.dataServices.updateEmployee(index, empleado)
  }

  // Simulación de la eliminación de un empleado
  deleteEmpleado(id: number) {
    console.log(`Eliminando empleado: ${id}`);
    this.empleados = this.empleados.filter(e => e.id != id);
    this.dataServices.deleteEmployee(id);
    if (this.empleados==null) {
      this.empleados = [];
    } 
    
    return this.dataServices.safeEmployees(this.empleados);
    //empleados.splice(this.getEmpleadoIndex(id), 1);
  }

  // Simulación de la obtención del índice de un empleado por ID
  private getEmpleadoIndex(id: number): number {
    const empleados = this.empleados;
    return empleados.findIndex(emp => emp.id === id);
  }

  fillEmpleados(): void {
    this.empleados.push({ id: 0, name: 'Juan', age: 44, department: this.departamentoService.departments[1], salary: 5000 },
      { id: 1, name: 'Maria', age: 19, department: this.departamentoService.departments[3], salary: 6000 },
      { id: 2, name: 'Pedro', age: 32, department: this.departamentoService.departments[0], salary: 7000 });

    this.id = this.empleados.length;
  }
}
