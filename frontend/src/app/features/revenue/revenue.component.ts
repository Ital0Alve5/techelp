import { Component, ElementRef, viewChild } from '@angular/core';
import { RevenueService } from '@/shared/services/revenue/revenue.service';
import { RevenueTableRowComponent } from './components/revenue-table-row/revenue-table-row.component';
import { ButtonComponent } from '@/shared/ui/button/button.component';
@Component({
  selector: 'app-revenue',
  standalone: true,
  imports: [RevenueTableRowComponent, ButtonComponent],
  templateUrl: './revenue.component.html',
  styleUrl: './revenue.component.scss',
})
export class RevenueComponent {
  revenuesByDate: {
    date: string;
    price: number;
  }[] = [];

  revenuesByCategory: {
    deviceCategory: string;
    price: number;
  }[] = [];

  categoryRevenue = location.pathname.endsWith('/receita/categoria');

  constructor(private revenueService: RevenueService) {
    if (this.categoryRevenue) {
      this.revenuesByCategory = revenueService.getRevenuesByCategory();
    } else {
      this.revenuesByDate = revenueService.getRevenuesByDate();
    }
  }

  generatePdf() {
    window.print();
  }
}
