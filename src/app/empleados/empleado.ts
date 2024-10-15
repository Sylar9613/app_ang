import { Departamento } from "./departamento";

export interface Empleado {
    id: number;
    name: string;
    age: number;
    department: Departamento;
    salary: number;
}
