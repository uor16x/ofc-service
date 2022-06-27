// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// export const apiBaseUrl = 'http://localhost:3333';
export const apiBaseUrl = 'http://185.4.75.206:8080';


export const environment = {
  production: true,
  apikey: '',
  api: {
    game: {
      create: `${apiBaseUrl}/game`,
      get: (id: string) => `${apiBaseUrl}/game/${id}`,
      update: (id: string) => `${apiBaseUrl}/game/${id}`,
      delete: (id: string) => `${apiBaseUrl}/game/${id}`,
      getAll: `${apiBaseUrl}/game`,
    },
    version: `${apiBaseUrl}/version`,
  },
  version: '1.1.0',
  latestApkLink: (latestVersion) =>
    `https://github.com/uor16x/ofc-service/releases/download/v1.0/ofc-poker_v${latestVersion}.apk`,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
