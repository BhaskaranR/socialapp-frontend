import {
  config as sharedConfig,
  AccountsCommonConfiguration,
  HookListener,
  PasswordSignupFields,
} from '@accounts/common';

export type AccountsClientConfiguration = AccountsCommonConfiguration & {
  server?: string;
  storeKey?: string; 
  tokenStoragePrefix?: string;
  title?: string;
  requestPermissions?: any[];
  requestOfflineToken?: object;
  forceApprovalPrompt?: object;
  requireEmailVerification?: boolean;
  loginPath?: string;
  signUpPath?: string;
  resetPasswordPath?: string;
  profilePath?: string;
  changePasswordPath?: string;
  homePath?: string;
  signOutPath?: string;
  onEnrollAccountHook?: HookListener;
  onResetPasswordHook?: HookListener;
  onVerifyEmailHook?: HookListener;
  onSignedInHook?: HookListener;
  onSignedOutHook?: HookListener;
  onResumedSessionHook?: HookListener;
  onUserCreated?: (user: object) => Promise<any>;
  loginOnSignUp?: boolean;
  history?: string[];
  persistImpersonation?: boolean;
};

const localStorageToTokenStorage = () => {
  return {
    getItem(key: string) {
      return Promise.resolve(localStorage.getItem(key));
    },
    removeItem(key: string) {
      const value = localStorage.getItem(key);
      localStorage.removeItem(key);
      return Promise.resolve(value);
    },
    setItem(key: string, value: string) {
      localStorage.setItem(key, value);
      return Promise.resolve(value);
    },
  };
};

export default {
  ...sharedConfig,
  store: null,
  tokenStorage: localStorageToTokenStorage(),
  server: '',
  tokenStoragePrefix: '',
  title: '',
  requestPermissions: [],
  requestOfflineToken: {},
  forceApprovalPrompt: {},
  requireEmailVerification: false,
  loginPath: '/',
  signUpPath: null,
  resetPasswordPath: null,
  profilePath: '/',
  changePasswordPath: null,
  homePath: '/',
  signOutPath: '/',
  loginOnSignUp: true,
  persistImpersonation: true,
};
