// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyAKZQi4V5b28vpRpWKn5Bj_UOIIZYKoLU0",
    authDomain: "e-uprava-24f0a.firebaseapp.com",
    projectId: "e-uprava-24f0a",
    storageBucket: "e-uprava-24f0a.appspot.com",
    messagingSenderId: "106395402979",
    appId: "1:106395402979:web:d5e112b4346da8c86cbbd6",
    measurementId: "G-CM87BS90LE"
  }

};

const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
