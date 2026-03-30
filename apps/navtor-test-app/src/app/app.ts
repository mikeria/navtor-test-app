import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeView } from './pages/home/HomeView';

@Component({
  imports: [HomeView, RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'navtor-test-app';
}
