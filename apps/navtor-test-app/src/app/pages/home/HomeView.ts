import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home-view',
  imports: [MenubarModule],
  templateUrl: './HomeView.html',
  styleUrl: './HomeView.css',
  
})
export class HomeView implements OnInit {
  items: MenuItem[] | undefined;
  
  ngOnInit() {
    
    this.items = [
      {
        label: 'Vessels',
        icon: 'pi pi-home',
        routerLink: '/vessels'
      },
      {
        label: 'Emissions',
        icon: 'pi pi-star',
        routerLink: '/emissions'
      },
    ];
  }
}
