import { Injectable } from '@angular/core';
import mockData from '../mock/mock.json';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  getData() {
    return mockData;
  }
}
