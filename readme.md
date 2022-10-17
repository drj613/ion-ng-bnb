Made following this Udemy course: https://www.udemy.com/course/ionic-2-the-practical-guide-to-building-ios-android-apps/

`npm i` to install dependencies
`ionic serve` to run the app

I excluded `src/environments/environment.ts` from source control because it has my Google Maps and Firebase API keys in it. Without a key, Maps integration won't work (duh) and neither will authorization. To get those working again, create the file I deleted at the path listed above, then put this in it:

```
export const environment = {
  production: false,
  googleMapsApiKey: 'your key here lol',
  firebaseApiKey: 'your key here'
};
```

You can also get around auth entirely by setting `AuthService._userIsAuthenticated` to always be true in `auth.service.ts`

To open in Android or iOS (only available on Mac), create a `www` folder in the root directory and create a blank `index.html` file inside of it. Must have Android Studio and Xcode installed

Then run
`npx cap run android`
or
`npx cap run ios`


I didn't correctly set up image upload because the associated firebase function would cost money.
