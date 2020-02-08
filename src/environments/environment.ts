// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyB0qjz_dA5kCOrZ7WIuXXLOsfZSqAaZQDQ',
    authDomain: 'mis-turnos-607b1.firebaseapp.com',
    databaseURL: 'https://mis-turnos-607b1.firebaseio.com',
    projectId: 'mis-turnos-607b1',
    storageBucket: 'mis-turnos-607b1.appspot.com',
    messagingSenderId: '526418128580',
    appId: '1:526418128580:web:d394a2f1b7608fa0272391',
    measurementId: 'G-MEPSDF6CFH'
  },
  loginUrl: 'http://localhost:5001/api/login/',
  turnosUrl: 'https://mis-turnos-nestjs.herokuapp.com/turnos/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
