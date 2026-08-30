import { Component } from '@angular/core';

import { MainLayoutContainer } from './core/layout/main-layout.container';

@Component({
  selector: 'app-root',
  imports: [MainLayoutContainer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
