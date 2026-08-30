import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
  templateUrl: './main-layout.container.html',
  styleUrl: './main-layout.container.scss',
})
export class MainLayoutContainer {
  private readonly breakpointObserver = inject(BreakpointObserver);

  protected readonly isWideDesktop = toSignal(
    this.breakpointObserver.observe('(min-width: 1280px)').pipe(map(({ matches }) => matches)),
    { initialValue: false },
  );

  protected readonly isNarrowMobile = toSignal(
    this.breakpointObserver.observe('(max-width: 599px)').pipe(map(({ matches }) => matches)),
    { initialValue: false },
  );
}
