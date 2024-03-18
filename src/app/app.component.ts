import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './ui/header/header.component';
import { SideMenuComponent } from './ui/side-menu/side-menu.component';
import { MainComponent } from './ui/main/main.component';
import { FormComponent } from './ui/form/form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SideMenuComponent,
    MainComponent,
    FormComponent,
  ],
})
export class AppComponent {}
