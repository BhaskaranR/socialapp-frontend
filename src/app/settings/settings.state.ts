import { State, Mutation, Action, Update } from '@loona/angular';
import { changeTheme } from './graphql/change-theme.mutation';
import { settingsQuery } from './graphql/settings.query';
import { changeNightMode } from './graphql/change-night-mode.mutation';
export const defaultState = {
    settings: {
        theme: 'DEFAULT-THEME',
        autoNightMode: false,
        persist: true,
        __typename: 'Settings'
    }
};


@State({
    defaults: defaultState,
  })
  export class SettingsState {

    @Mutation(changeTheme)
    @Update(settingsQuery)
    changeTheme(state, { theme }) {
        state.theme = theme;
    }

    @Mutation(changeNightMode)
    @Update(settingsQuery)
    changeNightMode(state, { autoNightMode }) {
        state.theme = autoNightMode;
    }

  }