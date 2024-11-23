import { Component, OnInit, signal } from '@angular/core';
import { RevenueService } from './services/revenue.service';
import { TableComponent } from '@/shared/ui/table/table.component';
import { CurrencyMaskService } from '@/shared/services/input/masks.service';
import { RouterLink } from '@angular/router';
import { ArrowRightIcon } from '@/shared/ui/icons/arrow-right.icon';
import { Revenue } from './types/revenue.type';
import { PopupService } from '@/shared/services/pop-up/pop-up.service';
import { Status } from '@/shared/ui/pop-up/enum/status.enum';

@Component({
  selector: 'app-revenue',
  standalone: true,
  imports: [TableComponent, RouterLink, ArrowRightIcon],
  providers: [CurrencyMaskService, RevenueService, PopupService],
  templateUrl: './revenue.component.html',
  styleUrl: './revenue.component.scss',
})
export class RevenueComponent implements OnInit {
  urlParams = new URLSearchParams(location.search);
  startDate = this.urlParams.get('startDate');
  endDate = this.urlParams.get('endDate');
  isCategory = location.pathname.endsWith('/receita/categoria');

  revenues = signal<Revenue[]>([]);

  constructor(
    private revenueService: RevenueService,
    private popupService: PopupService,
    public currencyMaskService: CurrencyMaskService,
  ) {}

  ngOnInit(): void {
    this.setRevenuesByCategory();
  }

  formatDate(date: string): string {
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
  }

  async setRevenuesByCategory() {
    const response = this.isCategory
      ? await this.revenueService.getRevenuesByCategory()
      : this.startDate && this.endDate
        ? await this.revenueService.getRevenuesByDate(this.formatDate(this.startDate), this.formatDate(this.endDate))
        : await this.revenueService.getRevenuesByDate();

    if (!response?.data) {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Algo deu errado!',
      });
      return;
    }

    if ('errors' in response.data) {
      Object.values(response.data.errors).forEach((error) => {
        this.popupService.addNewPopUp({
          type: Status.Error,
          message: error,
        });
      });
      return;
    }

    const revenues = response?.data?.data as unknown;
    this.revenues.set(revenues as Revenue[]);
  }

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
