import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empleado } from './empleados/empleado';
import { apiServer } from './apiServer';
import { LoginService } from './login/login.service';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  empleados: Empleado[] = [];
  constructor(private httpClient: HttpClient, private loginService: LoginService){}

  loadEmployees() {
    const token = this.loginService.getIdToken();
    return this.httpClient.get(apiServer.serverUrl + '?auth=' + token).pipe(
      catchError(error => {
        console.error('Error loading employees');
        throw error.status + ' ' + error.statusText + '\n' + error.error.error;
      })
    );
  }

  safeEmployees(employees: Empleado[]) {
    const token = this.loginService.getIdToken();
      return this.httpClient.put(apiServer.serverUrl + '?auth=' + token, employees).subscribe(data=>{
        console.log("Empleado guardado correctamente", data);
      });
  }

  updateEmployee(id: number, employee: Empleado) {
    const token = this.loginService.getIdToken();
    let url = apiServer.serverUrl.replace('.json','/') + id + '.json';
    //console.log('updateEmployees', url);
    //return;
    return this.httpClient.put(url + '?auth=' + token, employee).subscribe(data=>{
      console.log("Empleado actualizado correctamente", data);
    });
  }

  deleteEmployee(id: number) {
    const token = this.loginService.getIdToken();
    let url = apiServer.serverUrl.replace('.json','/') + id + '.json';
    //console.log('updateEmployees', url);
    //return;
    return this.httpClient.delete(url + '?auth=' + token).subscribe(()=>{
      console.log("Empleado eliminado correctamente");
    });
  }
}
