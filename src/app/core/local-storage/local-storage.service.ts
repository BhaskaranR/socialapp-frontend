import { Injectable } from '@angular/core';

const APP_PREFIX = 'ksoc-';

@Injectable()
export class LocalStorageService {
  constructor() {}

  setItem(key: string, value: any) : Promise<any> {
    return Promise.resolve().then(function () {
      localStorage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
    });
  }

  getItem(key: string) : Promise<any> {
    return Promise.resolve().then(function () {
      return JSON.parse(localStorage.getItem(`${APP_PREFIX}${key}`));
    });
  }

  removeItem(key: string) {
    return Promise.resolve().then(function () {
      localStorage.removeItem(`${APP_PREFIX}${key}`);
    });
  }

  static loadInitialState() {
    return Object.keys(localStorage).reduce((state: any, storageKey) => {
      if (storageKey.includes(APP_PREFIX)) {
        state = state || {};
        const stateKey = storageKey
          .replace(APP_PREFIX, '')
          .toLowerCase()
          .split('.');
        let currentStateRef = state;
        stateKey.forEach((key, index) => {
          if (index === stateKey.length - 1) {
            currentStateRef[key] = JSON.parse(localStorage.getItem(storageKey));
            return;
          }
          currentStateRef[key] = currentStateRef[key] || {};
          currentStateRef = currentStateRef[key];
        });
      }
      return state;
    }, undefined);
  }
}
