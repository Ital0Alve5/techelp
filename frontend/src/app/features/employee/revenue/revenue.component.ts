import { Component } from '@angular/core';
import { RevenueService } from '@/shared/services/revenue/revenue.service';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { TableComponent } from '@/shared/ui/table/table.component';
import { CurrencyMaskService } from '@/shared/services/input/masks.service';
import { RouterLink } from '@angular/router';
import { ArrowRightIcon } from '@/shared/ui/icons/arrow-right.icon';
import { RequestsService } from '@/shared/services/requests/requests.service';
@Component({
  selector: 'app-revenue',
  standalone: true,
  imports: [ButtonComponent, TableComponent, RouterLink, ArrowRightIcon],
  providers: [CurrencyMaskService, RevenueService, RequestsService],
  templateUrl: './revenue.component.html',
  styleUrl: './revenue.component.scss',
})
export class RevenueComponent {
  userId: number = JSON.parse(localStorage.getItem('userId')!);
  urlParams = new URLSearchParams(location.search);
  startDate = this.urlParams.get('startDate');
  endDate = this.urlParams.get('endDate');
  isCategory = location.pathname.endsWith('/receita/categoria');

  revenuesByDate =
    this.startDate && this.endDate
      ? this.revenueService.getRevenuesByDate(this.startDate, this.endDate)
      : this.revenueService.getRevenuesByDate();

  revenuesByCategory = this.isCategory ? this.revenueService.getRevenuesByCategory() : [];

  constructor(
    private revenueService: RevenueService,
    public currencyMaskService: CurrencyMaskService,
  ) {}

  generatePdf() {
    const header = document.querySelector('header');
    const button = document.querySelector('button');

    header!.style.visibility = 'hidden';
    button!.style.visibility = 'hidden';

    window.print();

    header!.style.visibility = 'visible';
    button!.style.visibility = 'visible';
  }
}
