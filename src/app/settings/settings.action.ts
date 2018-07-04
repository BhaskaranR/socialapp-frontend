import { changeTheme } from './graphql/change-theme.mutation';
import { changeNightMode } from './graphql/change-night-mode.mutation';

export class ChangeTheme {
    static mutation = changeTheme;
   variables: any;
    constructor(theme: string) {
        this.variables = {theme};
    }
  }

export class ChangeNightMode {
    static mutation = changeNightMode;
    variables: any;
     constructor(nightmode: string) {
         this.variables = {nightmode};
     }
}


export class ThemeChangedSuccess {
    static type = '[Settings] theme changed success!';
  }
  
  export class ThemeChangedFailure {
    static type = '[Settings] theme changed failure!';
  }


export class NightModeChangedSuccess {
    static type = '[Settings] night mode changed success!';
  }
  
  export class NightModeChangedFailure {
    static type = '[Settings] night mode changed failure!';
  }
