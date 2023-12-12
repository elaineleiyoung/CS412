import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import mockData from '../mock/mock.json';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],  // Use RouterModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // Corrected to styleUrls
})
export class AppComponent {
  title = 'PS6';
  data: any;
  isLoading = false;

  fetchData() {
    this.isLoading = true;
    setTimeout(() => {
      this.data = mockData;
      this.isLoading = false;
    }, 1000); // Simulates a delay of 1 second
  }
}
