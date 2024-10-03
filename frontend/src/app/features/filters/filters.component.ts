import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ButtonComponent } from '@/shared/ui/button/button.component';
import { DateComponent } from './components/date/date.component';
import { RequestsService } from '@/shared/services/requests/requests.service';
import { Requests } from '@/shared/types/api/maintenance-requests.type';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [ButtonComponent, DateComponent],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent implements OnInit {
  requests: Requests[] = [];
  filteredRequests: Requests[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private requestsService: RequestsService,
  ) {}

  ngOnInit(): void {
    this.requests = this.requestsService.getRequest();

    this.route.queryParams.subscribe((params) => {
      const filter = params['filter'];

      if (filter === 'today') {
        this.filterToday();
      } else {
        this.filterAll();
      }
    });
  }

  filterBy(filter: string) {
    const queryParams = { filter };

    if (filter === 'today') {
      this.filterToday();
    } else if (filter === 'all') {
      this.filterAll();
    }

    this.router.navigate([], { queryParams });
  }

  filterToday() {
    const today = new Date().toISOString().split('T')[0];
    this.filteredRequests = this.requests.filter((req) => req.date === today);
  }

  filterAll() {
    this.filteredRequests = this.requests;
  }
}
