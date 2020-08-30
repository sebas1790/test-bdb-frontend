import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { FormComponent } from './form/form.component';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeService } from './services/employee.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeeComponent },
  { path: 'employees/form', component: FormComponent },
  { path: 'employees/form/:id', component: FormComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    FormComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent],
})
export class AppModule { }
