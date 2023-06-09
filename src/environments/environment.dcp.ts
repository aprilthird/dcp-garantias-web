// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  project: "dcp",
  title: "DCP",
  apiUrl: "https://appsrvsgpapi.azurewebsites.net",
  azureAccountName: "garantias",
  azureContaineName: "archivos",
  azureSas:
    //"sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2022-03-03T23:39:46Z&st=2022-01-03T15:39:46Z&spr=https&sig=BU4Y9BHhsNT4EbY%2FM2eJZ7X9EYdNE4NUC9nbcSwFuc8%3D",
    "sp=racwdli&st=2022-07-27T20:06:25Z&se=2022-09-01T04:06:25Z&sv=2021-06-08&sr=c&sig=fCczp3sfaP6hhuTzgZBccj5inNt4OFPEKUtDc%2BMZmik%3D",

  officeTenant: {
    clientIdAzure: "47da4b03-1750-4f10-a60e-a8ccd55b3746",
    objectIdAzure: "27349a51-6e36-49b9-9ab1-ed553c1f8535",
    redirectUrl: "https://appsrvsgpwebdock.azurewebsites.net/",
    postLogoutRedirectUri: "https://appsrvsgpwebdock.azurewebsites.net/",
    tenantId: "807307b4-6a4c-4b3d-97fd-7c78330bba23",
    microsoftUri: "https://login.microsoftonline.com",
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
