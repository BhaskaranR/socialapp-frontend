import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';

import {
  selectorSettings,
  ActionSettingsChangeTheme,
  ActionSettingsChangeAutoNightMode,
  SettingsState,
  ActionSettingsPersist
} from '../settings.reducer';

@Component({
  selector: 'ksoc-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  settings: SettingsState;

  themes = [
    { value: 'DEFAULT-THEME', label: 'Blue' },
    { value: 'LIGHT-THEME', label: 'Light' },
    { value: 'NATURE-THEME', label: 'Nature' },
    { value: 'BLACK-THEME', label: 'Dark' }
  ];

  constructor(private store: Store<any>) {
    store
      .select(selectorSettings)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(settings => (this.settings = settings));
  }

  ngOnInit() {}

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
    this.onThemeSelect({value: val});
  }

  onThemeSelect({ value: theme }) {
    this.store.dispatch(new ActionSettingsChangeTheme({ theme }));
    this.store.dispatch(new ActionSettingsPersist({ settings: this.settings }));
  }

  _autoNightModeSelect: string;
  get autoNightModelSelect(){
    return this._autoNightModeSelect;
  }

  set autoNightModelSelect(val) {
    this._autoNightModeSelect = val;
    this.onAutoNightModeSelect({value: val});
  }

  onAutoNightModeSelect({ value: autoNightMode }) {
    this.store.dispatch(
      new ActionSettingsChangeAutoNightMode({
        autoNightMode: autoNightMode === 'true'
      })
    );
    this.store.dispatch(new ActionSettingsPersist({ settings: this.settings }));
  }
}
