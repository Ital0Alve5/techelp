import { Component } from '@angular/core';
import { TesteService } from '../../core/services/teste/teste.service';

@Component({
  selector: 'teste-component',
  standalone: true,
  templateUrl: './teste.component.html',
  styleUrl: './teste.component.scss',
})
export class TesteComponent {
  testinho: string | undefined;

  constructor(private testinhoService: TesteService) {
    this.getMessage();
  }
  getMessage() {
    this.testinhoService
      .getTestMessage()
      .then((response) => {
        this.testinho = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
