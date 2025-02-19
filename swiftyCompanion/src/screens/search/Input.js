import React, { useState } from 'react';
import { StyleSheet, TextInput, Dimensions } from 'react-native';
import axios from "axios";

import { API_42 } from '../../utils/Constants';

const screenWidth = Dimensions.get('window').width;

export default function Input() {
    const [searchLogin, setSearchLogin] = useState('');
    const [logins, setLogins] = useState([])
	const [visibleLogins, setVisibleLogins] = useState(false)

    const dynamicSearchLogin = async (text) => {
		setSearchLogin(text)
		if (text.length < 1)
			setLogins([])
		else {
            try {
                const tab_logins = await axios.get(`${API_42}/users?filter[login]=${text}&fields[users]=id,login,image`)
                console.log(tab_logins)
            }
			catch (e) {
                console.log(e)
            }
		}
	}

    return (
        <>
            <TextInput
                style={styles.searchLogin}
                placeholder="Entrez un login"
                placeholderTextColor="#aaa"
                value={searchLogin}
                onChangeText={dynamicSearchLogin}
                onFocus={() => setVisibleLogins(true)}
            />
        </>
    )
}

const styles = StyleSheet.create({
    searchLogin: {
        backgroundColor: "#0005",
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        color: "#fff",
        width: '80%',
        height: screenWidth / 7.2,
        fontSize: screenWidth / 18,
    },
})
