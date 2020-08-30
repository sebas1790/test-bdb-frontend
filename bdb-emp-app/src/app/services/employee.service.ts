import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from './employee';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private urlEndPoint = 'http://localhost:8080/api/employees';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.urlEndPoint);
  }

  create(employee: Employee): Observable<Employee> {
    return this.http
      .post(this.urlEndPoint, employee, { headers: this.httpHeaders })
      .pipe(
        map((response: any) => response.employee as Employee),
        catchError((error) => {
          console.error(error.error.mensaje);
          swal.fire(error.error.mensaje, error.error.error, 'error');
          return throwError(error);
        })
      );
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http
    .get<Employee>(`${this.urlEndPoint}/${id}`)
    .pipe(
      catchError((error) => {
        this.router.navigate(['/employees']);
        console.error(error.error.mensaje);
        swal.fire(
          'Error al obtener el empleado.',
          error.error.mensaje,
          'error'
        );
        return throwError(error);
      })
    );
  }

  update(employee: Employee): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndPoint}/${employee.id}`, employee, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((error) => {
          console.error(error.error.mensaje);
          swal.fire(error.error.mensaje, error.error.error, 'error');
          return throwError(error);
      })
    );
  }

  delete(id: number): Observable<Employee> {
    return this.http
      .delete<Employee>(`${this.urlEndPoint}/${id}`, {
        headers: this.httpHeaders,
      });
  }
}
