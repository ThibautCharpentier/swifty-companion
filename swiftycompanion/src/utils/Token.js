import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import { authorize } from "react-native-app-auth";

import { CLIENT_ID } from '@env';
import { API_42, REDIRECT_URI, API_BACK } from './Constants';

const setToken = async(data) => {
    try {
        await Keychain.setGenericPassword('token', JSON.stringify({
            access_token: data.access_token,
            expires_in: Date.now() + data.expires_in * 1000,
            refresh_token: data.refresh_token
        }), { service: 'token' })
        return await Keychain.getGenericPassword({ service: 'token' })
    }
    catch (e) {
        console.log(e)
        return null
    }
}

export async function getToken() {
    try {
        let token = await Keychain.getGenericPassword({ service: 'token' })
        if (!token)
            return null
        let tokenData = JSON.parse(token.password);
        if (tokenData.expires_in - Date.now() < 60000)
        {
            const obj = {
                refreshToken: tokenData.refresh_token,
            }
            const res = await axios.post(`${API_BACK}/auth/refresh`, obj, {
                headers: {
                    'X-Mobile-App': 'SwiftyCompanion'
                },
            })
            if (res.status != 200)
                throw new Error("statusCode != 200")
            token = await setToken(res.data.message)
            tokenData = JSON.parse(token.password);
        }
        return tokenData.access_token
    }
    catch (e) {
        console.log(e)
        return null
    }
}

export async function getAuthorization() {
    try {
        const config = {
            clientId: CLIENT_ID,
            redirectUrl: REDIRECT_URI,
            scopes: ["public"],
            serviceConfiguration: {
                authorizationEndpoint: `${API_42}/oauth/authorize`,
                tokenEndpoint: `${API_42}/oauth/token`,
            },
            skipCodeExchange: true
        };
        const authState = await authorize(config);
        const obj = {
            authorizationCode: authState.authorizationCode,
            codeVerifier: authState.codeVerifier
        }
        const res = await axios.post(`${API_BACK}/auth/authorize`, obj, {
            headers: {
                'X-Mobile-App': 'SwiftyCompanion'
            },
        })
        if (res.status != 200)
            throw new Error("statusCode != 200")
        return await setToken(res.data.message)
    } catch (e) {
        console.log(e);
        return null
    }
}

export async function revokeToken() {
    await Keychain.resetGenericPassword({ service: 'token' });
}
