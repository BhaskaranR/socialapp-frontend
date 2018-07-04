import { Component, OnInit, OnDestroy } from '@angular/core';
//  import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';
import { settingsQuery } from '@app/settings/graphql/settings.query';
import { Loona } from '@loona/angular';
import { ChangeNightMode, ChangeTheme } from '../settings.action';
import { Settings } from '../interfaces';

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

  constructor(private loona: Loona) {
    loona
      .query({
        query: settingsQuery,
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
    this.onThemeSelect(val);
  }

  onThemeSelect(theme) {
    this.loona.dispatch(new ChangeTheme( theme));
  }

  _autoNightModeSelect: string;
  get autoNightModelSelect() {
    return this._autoNightModeSelect;
  }

  set autoNightModelSelect(val) {
    this._autoNightModeSelect = val;
    this.onAutoNightModeSelect(val);
  }

  onAutoNightModeSelect(autoNightMode) {
    this.loona.dispatch(new ChangeNightMode( autoNightMode));
  }
}
