import axios from 'axios';
import * as Keychain from 'react-native-keychain';

import { CLIENT_ID, CLIENT_SECRET } from '@env';
import { API_42 } from './Constants';

const setToken = async() => {
    try {
        const response = await axios.post(`${API_42}/oauth/token?grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`)
        const token = await Keychain.setGenericPassword('token', JSON.stringify({
            access_token: response.data.access_token,
            expires_in: Date.now() + response.data.expires_in * 1000
        }), { service: 'token' })
        return token
    }
    catch (e) {
        console.log(e)
        return null
    }
}

export async function getToken() {
    try {
        const token = await Keychain.getGenericPassword({ service: 'token' })
        if (!token && !(token = await setToken()))
            return null
        const tokenData = JSON.parse(token.password);
        if (tokenData.expires_in - Date.now() < 10000)
            return setToken()
    }
    catch (e) {
        console.log(e)
        return null
    }
}
