import { Component, ViewChild, ElementRef } from '@angular/core';
import { jsPDF } from 'jspdf';
import { RevenueService } from '@/shared/services/revenue/revenue.service';
import { RevenueTableRowComponent } from './components/revenue-table-row/revenue-table-row.component';
import { ButtonComponent } from '@/shared/ui/button/button.component';
@Component({
  selector: 'app-revenue',
  standalone: true,
  imports: [RevenueTableRowComponent, ButtonComponent],
  templateUrl: './revenue.component.html',
  styleUrl: './revenue.component.scss'
})
export class RevenueComponent {
  @ViewChild('content',{static: false}) el!: ElementRef;
  revenuesByDate: {
    date : string,
    price : number
  }[] = [];

  revenuesByCategory:{
    deviceCategory: string,
    price: number
  }[] = [];

  begginingDate = '01/01/2024';
  endingDate = '14/10/2024';
  categoryRevenue = location.pathname === '/funcionario/login';

  constructor(private revenueService : RevenueService){
    
    if(this.categoryRevenue){
      this.revenuesByCategory = revenueService.getRevenuesByCategory();
    } else {
      this.revenuesByDate = revenueService.getRevenuesByDate();
    }
  }

  generatePdf() {
    const pdf = new jsPDF('p', 'pt', 'a4');
  
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('exportedContent.pdf');
      },
      x: 10,
      y: 10, 
      autoPaging: 'text',
      html2canvas: {
        scale: 0.61
      }
    });
  }
   
}
