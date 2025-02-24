import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, ImageBackground, Dimensions, ActivityIndicator } from 'react-native';
import axios from "axios";

import { useCurrentUser } from '../../context/CurrentUser';
import BackButton from './BackButton';
import Details from './Details'
import { useErrorApi } from '../../context/ErrorApi';
import { API_42 } from '../../utils/Constants';
import { getToken } from '../../utils/Token';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function DisplayScreen() {
    const { currentUser } = useCurrentUser()
    const { setErrorApi } = useErrorApi()
    const [dataUser, setDataUser] = useState({})
    const [fetch, setFetch] = useState(false)

    useEffect(() => {
        const getDataUser = async () => {
            try {
                const token = await getToken()
                if (!token)
                    throw new Error("[Error: No valid token]")
                const res_data = await axios.get(`${API_42}/users/${currentUser.id}`, {
                        headers: {
                             Authorization: `Bearer ${token}`
                        },
                    }
                )
                const res_coalitions = await axios.get(`${API_42}/users/${currentUser.id}/coalitions`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    }
                )
                res_data.data.coalitions = res_coalitions.data
                setDataUser(res_data.data)
                setFetch(true)
            }
            catch (e) {
                console.log(e)
                setErrorApi("Error connecting to API 42. Try restarting the application.")
                setFetch(true)
            }
        }

		getDataUser()
	}, []);
  
    return (
        <>
            <SafeAreaView style={styles.container}>
                <BackButton/>
                {!fetch ? (
                    <ActivityIndicator size="large" color="#fff" style={styles.loader} />
                ) : (
                    <Details dataUser={dataUser} />
                )}
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
    	flex: 1,
    	alignItems: 'center',
		backgroundColor: "#000",
  	},
    loader: {
        position: "absolute",
        top: "50%",
        transform: [{ scale: 2 }],
    },
});
