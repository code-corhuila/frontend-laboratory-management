import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})

export class DashboardComponent implements OnInit {

  currentDate: string;

  constructor() {
    this.currentDate = new Date().toLocaleDateString();
  }

  ngOnInit(): void {
  }
  
}
