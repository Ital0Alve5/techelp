import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTableRowComponent } from './client-table-row.component';

describe('ClientTableRowComponent', () => {
  let component: ClientTableRowComponent;
  let fixture: ComponentFixture<ClientTableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientTableRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
