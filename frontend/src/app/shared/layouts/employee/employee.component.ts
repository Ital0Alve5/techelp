import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
@Component({
  selector: 'employee-layout',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent {}
