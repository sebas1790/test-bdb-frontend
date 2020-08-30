import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';

import swal from 'sweetalert2';
import { Employee } from '../services/employee';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public employee: Employee = new Employee();
  public titulo: string = 'Crear Empleado';

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarEmployee();
  }

  cargarEmployee(): void {
    this.activatedRoute.params.subscribe((parametros) => {
      let id = parametros['id'];
      if (id) {
        this.employeeService
          .getEmployee(id)
          .subscribe((employee) => (this.employee = employee));
      }
    });
  }

  public create(): void {
    this.employeeService.create(this.employee).subscribe((employee) => {
      this.router.navigate(['/employees']);
      swal.fire(
        'Nuevo Empleado',
        `El empleado ${employee.fullname} ha sido creado con éxito`,
        'success'
      );
    });
  }

  update(): void {
    this.employeeService.update(this.employee).subscribe((json) => {
      this.router.navigate(['/employees']);
      swal.fire(
        'Empleado Actualizado',
        `${json.mensaje}: ${json.employee.fullname}`,
        'success'
      );
    });
  }

}
