import { Component } from '@angular/core';
import { Requests } from '@/shared/types/api/maintenance-requests.type';

@Component({
  selector: 'app-revenue',
  standalone: true,
  imports: [],
  templateUrl: './revenue.component.html',
  styleUrl: './revenue.component.scss'
})
export class RevenueComponent {
  userRequests: Requests[] = [];
}
