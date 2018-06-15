import { Title } from '@angular/platform-browser';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { filter } from 'rxjs/operators/filter';

import {
  routerTransition
} from '@app/core';
import { environment as env } from '@env/environment';

import { MatDialogRef, MatDialog } from '@angular/material';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { query, settingsFragment } from '../settings/models/settings';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { NIGHT_MODE_THEME } from '@app/settings';
import gql from 'graphql-tag';

@Component({
  selector: 'ksoc-welcome',
  templateUrl: "./welcome.component.html",
  styleUrls: ['./welcome.component.scss'],
  animations: [routerTransition]
})
export class WelcomeComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  @HostBinding('class') componentCssClass;

  isProd = env.production;
  envName = env.envName;
  year = new Date().getFullYear();
  logo = require('../../assets/logo.png');
  navigation = [
    { link: 'trending', label: 'Trending' },
    { link: '', label: 'About' },
  ];
  navigationSideMenu = [
    ...this.navigation,
    { link: 'settings', label: 'Settings' }
  ];

  constructor(
    private apollo: Apollo,
    public overlayContainer: OverlayContainer,
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: gql`
      query settings {
          settings @client {
            theme
            autoNightMode
            persist
          }
        }
      `,
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
    this.router.events
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(event => event instanceof ActivationEnd)
      )
      .subscribe((event: ActivationEnd) => {
        let lastChild = event.snapshot;
        while (lastChild.children.length) {
          lastChild = lastChild.children[0];
        }
        const { title } = lastChild.data;
        this.titleService.setTitle(
          title ? `${title} - ${env.appName}` : env.appName
        );
      });
  }



  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
