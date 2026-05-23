export const msalConfig = {
    auth: {
      clientId: "2efe7b6a-e45c-438c-92c6-0c08fb919794",
      authority: "https://login.microsoftonline.com/803cc9b5-34ff-4962-aa0c-d494c7632af6", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
      redirectUri: "https://sqlaccess.caresmartz360.net",
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
  };

  export const loginRequest = {
    scopes: ["User.Read"]
   };
   