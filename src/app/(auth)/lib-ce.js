import { PublicClientApplication } from "@azure/msal-browser";

export const msalInstance = new PublicClientApplication({
    auth: {
        clientId: process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID,
        // `common` accepts both Entra work/school accounts and personal Microsoft accounts.
        authority: "https://login.microsoftonline.com/common",
        // Popup authentication must return to a page containing MSAL's redirect bridge.
        redirectUri: typeof window !== "undefined" ? `${window.location.origin}/auth_callback` : undefined
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true // helps with Edge/Safari/strict cookie browsers
    },
    system: {
        loggerOptions: {
            loggerCallback: () => {},
            piiLoggingEnabled: false
        }
    }
});

// The app only uses popup authentication. `handleRedirectPromise` is for the
// separate redirect-login flow and would not process a popup result.
export const msalInitialized = msalInstance.initialize();
