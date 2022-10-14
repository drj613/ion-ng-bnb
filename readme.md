Made following this Udemy course: https://www.udemy.com/course/ionic-2-the-practical-guide-to-building-ios-android-apps/

`npm i` to install dependencies
`ionic serve` to run the app

I excluded `src/environments/environment.ts` from source control because it has my Google Maps API key in it. Without a key, Maps integration won't work (duh). To get that working again, create the file I deleted at the path listed above, then put this in it:

```
export const environment = {
  production: false,
  googleMapsApiKey: 'your key here lol'
};
```
