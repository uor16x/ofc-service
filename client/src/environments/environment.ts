// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const baseUrl = 'http://localhost:3333';

export const environment = {
  production: false,
  apikey: '696f2386-5b97-4a61-8720-cd248645b5ce',
  api: {
    game: {
      create: `${baseUrl}/game`,
      get: (id: string) => `${baseUrl}/game/${id}`,
      update: (id: string) => `${baseUrl}/game/${id}`,
      delete: (id: string) => `${baseUrl}/game/${id}`,
      getAll: `${baseUrl}/game`,
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
