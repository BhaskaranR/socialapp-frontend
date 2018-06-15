import { Component, OnInit, OnDestroy } from '@angular/core';
//  import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { Apollo } from 'apollo-angular';
import { query, Settings, changeTheme, changeNightMode } from '../models/settings';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';


@Component({
  selector: 'ksoc-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  settings: Settings;

  themes = [
    { value: 'DEFAULT-THEME', label: 'Blue' },
    { value: 'LIGHT-THEME', label: 'Light' },
    { value: 'NATURE-THEME', label: 'Nature' },
    { value: 'BLACK-THEME', label: 'Dark' }
  ];

  constructor(private apollo: Apollo) {
    // store
    //   .select(selectorSettings)
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe(settings => (this.settings = settings));
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
        fetchPolicy: 'cache-and-network',
      })
      .valueChanges.pipe(
        takeUntil(this.unsubscribe$),
        map((result: any) => result.data.settings))
      .subscribe((settings) => this.settings = settings);
  }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  _selectedTheme: string;
  get selectedTheme() {
    return this._selectedTheme;
  }

  set selectedTheme(val) {
    this._selectedTheme = val;
    this.onThemeSelect({ value: val });
  }

  onThemeSelect({ value: theme }) {
    this.apollo
      .mutate({
        mutation: changeTheme,
        variables: {
          theme: theme
        }
      })
      .subscribe();
      
    /*  this.store.dispatch(new ActionSettingsChangeTheme({ theme }));
      this.store.dispatch(new ActionSettingsPersist({ settings: this.settings }));
      */
  }

  _autoNightModeSelect: string;
  get autoNightModelSelect() {
    return this._autoNightModeSelect;
  }

  set autoNightModelSelect(val) {
    this._autoNightModeSelect = val;
    this.onAutoNightModeSelect({ value: val });
  }

  onAutoNightModeSelect({ value: autoNightMode }) {
    this.apollo
    .mutate({
      mutation: changeNightMode,
      variables: {
        autoNightMode: autoNightMode
      }
    })
    .subscribe();

    /* this.store.dispatch(
      new ActionSettingsChangeAutoNightMode({
        autoNightMode: autoNightMode === 'true'
      })
    );
    */
    //this.store.dispatch(new ActionSettingsPersist({ settings: this.settings }));
  }
}
