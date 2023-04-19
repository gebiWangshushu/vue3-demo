
import customTokenCredential from './CustomTokenCredential';
import { BlobServiceClient } from '@azure/storage-blob';


import {PublicClientApplication,InteractionRequiredAuthError} from "@azure/msal-browser"
import {msalConfig,loginRequest,tokenRequest,blobRequestToken} from "./authConfig.js"

// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js
const myMSALObj = new PublicClientApplication(msalConfig);

let username = "";

/**
 * A promise handler needs to be registered for handling the
 * response returned from redirect flow. For more information, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/acquire-token.md
 */
myMSALObj.handleRedirectPromise()
    .then(handleResponse)
    .catch((error) => {
        console.error(error);
    });

export function  selectAccount () {

    /**
     * See here for more info on account retrieval: 
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
     */

    const currentAccounts = myMSALObj.getAllAccounts();

    if (currentAccounts.length === 0) {
        return;
    } else if (currentAccounts.length > 1) {
        // Add your account choosing logic here
        console.warn("Multiple accounts detected.");
    } else if (currentAccounts.length === 1) {
        username = currentAccounts[0].username;
        showWelcomeMessage(username);
    }
}

export function  handleResponse(response) {
    if (response !== null) {
        username = response.account.username;
        showWelcomeMessage(username);
    } else {
        selectAccount();
    }
}

export function  signIn() {

    /**
     * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */

    myMSALObj.loginRedirect(loginRequest);
}

export function  signOut() {

    /**
     * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */

    const logoutRequest = {
        account: myMSALObj.getAccountByUsername(username),
        postLogoutRedirectUri: msalConfig.auth.redirectUri,
    };

    myMSALObj.logoutRedirect(logoutRequest);
}

export function  getTokenRedirect(request) {
    /**
     * See here for more info on account retrieval: 
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
     */
    request.account = myMSALObj.getAccountByUsername(username);

    return myMSALObj.acquireTokenSilent(request)
        .catch(error => {
            console.warn("silent token acquisition fails. acquiring token using redirect");
            if (error instanceof InteractionRequiredAuthError) {
                // fallback to interaction when silent call fails
                return myMSALObj.acquireTokenRedirect(request);
            } else {
                console.warn(error);   
            }
        });
}

export function  seeProfile() {
    getTokenRedirect(loginRequest)
        .then(response => {
            callMSGraph(graphConfig.graphMeEndpoint, response.accessToken, updateUI);
        }).catch(error => {
            console.error(error);
        });
}

export function  readMail() {
    getTokenRedirect(tokenRequest)
        .then(response => {
            callMSGraph(graphConfig.graphMailEndpoint, response.accessToken, updateUI);
        }).catch(error => {
            console.error(error);
        });
}

export function  showWelcomeMessage(msg) {
      console.log("showWelcomeMessage");
      console.log(msg);
    }
    
 
export function  readBlob() {
    getTokenRedirect(blobRequestToken)
        .then(async response => {
            console.info(response.accessToken);

            //var token= await getAccessToken();


            const storageAccountName = 'heinersucai';
            let tokenCredential = new customTokenCredential(response.accessToken);
            const blobClient = new BlobServiceClient(
              `https://${storageAccountName}.blob.core.chinacloudapi.cn`,
              tokenCredential,
            );

            let i = 1;
            const iter = blobClient.listContainers();
            console.info(iter);

            let containerItem = await iter.next();
            while (!containerItem.done) {
              console.log(`Container ${i++}: ${containerItem.value.name}`);
              this.containers.push({
                id: containerItem.value.properties.etag,
                name: containerItem.value.name,
              });
              containerItem = await iter.next();
            }

        }).catch(error => {
            console.error(error);
        });
}

async function getAccessToken(){
    let request = {
      scopes: ['https://storage.azure.com/user_impersonation'],
    };
    const msalInstance = new PublicClientApplication(msalConfig    );
    try {
      //let tokenResponse = await msalInstance.acquireTokenSilent(request);
      let tokenResponse = await msalInstance.acquireTokenSilent(request);
      console.warn( tokenResponse.accessToken);
    } catch (error) {
        console.error( 'Silent token acquisition failed. Using interactive mode' );
        let tokenResponse = await msalInstance.acquireTokenRedirect(request);
        console.log(`Access token acquired via interactive auth ${tokenResponse.accessToken}`)
    }
  }
