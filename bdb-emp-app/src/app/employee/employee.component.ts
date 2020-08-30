import { Component, OnInit } from '@angular/core';

import swal from 'sweetalert2';
import { Employee } from '../services/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[];

  titulo = 'Empleados';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.employees = employees;
    });
  }

  delete(employee: Employee): void {
    swal
      .fire({
        title: '¿Está seguro?',
        text: `¿Seguro que desea eliminar al empleado ${employee.fullname}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
      })
      .then((result) => {
        if (result.value) {
          this.employeeService.delete(employee.id).subscribe((response) => {
            this.employees = this.employees.filter((emp) => emp !== employee);
            swal.fire(
              'Empleado eliminado!',
              `Empleado ${employee.fullname} eliminado con éxito`,
              'success'
            );
          });
        }
      });
  }

}
