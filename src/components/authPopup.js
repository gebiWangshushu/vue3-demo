import customTokenCredential from './CustomTokenCredential';
import { BlobServiceClient } from '@azure/storage-blob';

// const express = require('express');

// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js

import {PublicClientApplication,InteractionRequiredAuthError} from "@azure/msal-browser"
import {msalConfig,loginRequest,tokenRequest,blobRequestToken} from "./authConfig.js"


const myMSALObj = new PublicClientApplication(msalConfig);

let username = "";

 export function selectAccount() {

    /**
     * See here for more info on account retrieval: 
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
     */

    const currentAccounts = myMSALObj.getAllAccounts();
    if (currentAccounts.length === 0) {
        return;
    } else if (currentAccounts.length > 1) {
        // Add choose account code here
        console.warn("Multiple accounts detected.");
    } else if (currentAccounts.length === 1) {
        username = currentAccounts[0].username;
        //showWelcomeMessage(username);
    }
}

export function handleResponse(response) {

    /**
     * To see the full list of response object properties, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#response
     */
//debugger
    if (response !== null) {
        username = response.account.username;
        //showWelcomeMessage(username);
    } else {
        selectAccount();
    }
}

export async function signIn() {

    /**
     * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */
//debugger
    await myMSALObj.loginPopup(loginRequest)
        .then(handleResponse)
        .catch(error => {
            console.error(error);
        });

        
}

export function signOut() {

    /**
     * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */

    const logoutRequest = {
        account: myMSALObj.getAccountByUsername(username),
        postLogoutRedirectUri: msalConfig.auth.redirectUri,
        mainWindowRedirectUri: msalConfig.auth.redirectUri
    };

    myMSALObj.logoutPopup(logoutRequest);
}

export function getTokenPopup(request) {

    /**
     * See here for more info on account retrieval: 
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
     */
    request.account = myMSALObj.getAccountByUsername(username);
    
    return myMSALObj.acquireTokenSilent(request)
        .catch(error => {
            console.warn("silent token acquisition fails. acquiring token using popup");
            if (error instanceof InteractionRequiredAuthError) {
                // fallback to interaction when silent call fails
                return myMSALObj.acquireTokenPopup(request)
                    .then(tokenResponse => {
                        console.log(tokenResponse);
                        return tokenResponse;
                    }).catch(error => {
                        console.error(error);
                    });
            } else {
                console.warn(error);   
            }
    });
}

export function seeProfile() {
    getTokenPopup(loginRequest)
        .then(response => {
            callMSGraph(graphConfig.graphMeEndpoint, response.accessToken, updateUI);
        }).catch(error => {
            console.error(error);
        });
}

export function readMail() {
    getTokenPopup(tokenRequest)
        .then(response => {
            //callMSGraph(graphConfig.graphMailEndpoint, response.accessToken, updateUI);

        }).catch(error => {
            console.error(error);
        });
}

 
 export function readBlob() {
    getTokenPopup(blobRequestToken)
        .then(async response => {
            console.info(response.accessToken);
            const storageAccountName = 'heinersucai';

            let tokenCredential = new CustomTokenCredential(response.accessToken);
            const blobClient = new BlobServiceClient(
              `https://${storageAccountName }.blob.core.chinacloudapi.cn`,
              tokenCredential,
            );

            let i = 1;
            const iter = blobClient.listContainers();
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




selectAccount();

// export default authPopup;
