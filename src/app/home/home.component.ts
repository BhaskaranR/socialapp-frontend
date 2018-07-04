import { Component, ViewEncapsulation, HostBinding } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, takeUntil, map } from 'rxjs/operators';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';

import { environment as env } from '@env/environment';
// import { selectorSettings, NIGHT_MODE_THEME } from '@app/settings';
import { routerTransition } from '@app/core';
import { NIGHT_MODE_THEME } from '@app/settings';
import gql from 'graphql-tag';
import { settingsQuery } from '@app/settings/graphql/settings.query';
import { Loona } from '@loona/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [routerTransition],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {

  private unsubscribe$: Subject<void> = new Subject<void>();

  @HostBinding('class') componentCssClass;

  isProd = env.production;
  envName = env.envName;
  year = new Date().getFullYear();
  logo = require('../../assets/logo.png');

  isAuthenticated;

  constructor(router: Router,
    private loona: Loona,
    public overlayContainer: OverlayContainer,
    private titleService: Title
  ) {
    let previousRoute = router.routerState.snapshot.url;

    router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((data: NavigationEnd) => {
        if (!isNavigationWithinComponentView(previousRoute, data.urlAfterRedirects)) {
          resetScrollPosition();
        }
        previousRoute = data.urlAfterRedirects;
      });
  }

  logout() {
    //console logs
  }

  ngOnInit(): void {
    this.loona
    .query({
      query: settingsQuery,
      fetchPolicy: 'cache-and-network'
    })
    .valueChanges.pipe(
      takeUntil(this.unsubscribe$),
      map((result: any) => result.data.settings))
    .subscribe((settings) => {
      const { theme, autoNightMode } = settings;
      const hours = new Date().getHours();
      const effectiveTheme = (autoNightMode && (hours >= 20 || hours <= 6)
        ? NIGHT_MODE_THEME
        : theme
      ).toLowerCase();
      this.componentCssClass = effectiveTheme;
      const classList = this.overlayContainer.getContainerElement().classList;
      const toRemove = Array.from(classList).filter((item: string) =>
        item.includes('-theme')
      );
      classList.remove(...toRemove);
      classList.add(effectiveTheme);
    });

   /* this.store
      .select(selectorSettings)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(settings => {
        const { theme, autoNightMode } = settings;
        const hours = new Date().getHours();
        const effectiveTheme = (autoNightMode && (hours >= 20 || hours <= 6)
          ? NIGHT_MODE_THEME
          : theme
        ).toLowerCase();
        this.componentCssClass = effectiveTheme;
        const classList = this.overlayContainer.getContainerElement().classList;
        const toRemove = Array.from(classList).filter((item: string) =>
          item.includes('-theme')
        );
        classList.remove(...toRemove);
        classList.add(effectiveTheme);
      });
      */
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

function isNavigationWithinComponentView(oldUrl: string, newUrl: string) {
  const componentViewExpression = /components\/(\w+)/;
  return oldUrl && newUrl
    && componentViewExpression.test(oldUrl)
    && componentViewExpression.test(newUrl)
    && oldUrl.match(componentViewExpression)[1] === newUrl.match(componentViewExpression)[1];
}

function resetScrollPosition() {
  if (typeof document === 'object' && document) {
    const sidenavContent = document.querySelector('.mat-drawer-content');
    if (sidenavContent) {
      sidenavContent.scrollTop = 0;
    }
  }
}
