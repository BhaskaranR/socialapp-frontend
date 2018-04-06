const packageJson = require('../../package.json');

export const environment = {
  appName: 'ksoc ui',
  envName: 'PROD',
  production: true,
  apiBaseUrl: 'https://karmasoc-alpha.com/karmaweb',
  google_map_key: 'AIzaSyDrr1Q-4NNGzR6exP1EUhETEOt2L4Kq2Ts',
  recaptcha_site_key: '6LdZ2UgUAAAAAJr3zO9GSqH4SBl83Dss5hEIQWHI',
  recaptcha_secret_key: '6LdZ2UgUAAAAAImNcmiioWA4uuQX9TRzRI4yr_xx',
  firebase: {
    apiKey: 'AIzaSyC-TuRBbvsydtcKxhAOVnk2qPUCSQ8MmLQ',
    authDomain: 'karmasoc-148700.firebaseapp.com',
    databaseURL: 'https://karmasoc-148700.firebaseio.com',
    projectId: 'karmasoc-148700',
    storageBucket: 'karmasoc-148700.appspot.com',
    messagingSenderId: '1088480510830'
  },
  versions: {
    app: packageJson.version
  }
};
