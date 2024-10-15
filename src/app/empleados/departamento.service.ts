import { Injectable } from '@angular/core';
import { Departamento } from './departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  departments: Departamento[] = [{id: 1, label: 'Marketing'},{id: 2, label: 'Sales'},{id: 3, label: 'Admin'},{id: 4, label: 'Logistics'}];
  
  constructor() { }

  // Simulación de la obtención de los departamentos
  getDepartamentos(): Departamento[] {
    return this.departments;
  }
}
