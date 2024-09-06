import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class TesteService {
  constructor() {}

  getTestMessage() {
    return axios.get('//localhost:8080');
  }
}
