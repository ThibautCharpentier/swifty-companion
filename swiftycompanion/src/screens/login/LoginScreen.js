import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, Text, Image, View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { getAuthorization } from '../../utils/Token';
import { useErrorApi } from '../../context/ErrorApi';
import Error from './Error';
import { getToken } from '../../utils/Token';

const screenWidth = Dimensions.get('window').width;
const fontSizeLogin = screenWidth / 15
const logoSize = screenWidth / 10
const spaceBelowButton = screenWidth / 7.2

export default function LoginScreen() {
    const navigation = useNavigation();
    const { setErrorApi } = useErrorApi()
    const [fetch, setFetch] = useState(false)

    useEffect(() => {
        const checkToken = async () => {
            if (await getToken())
                navigation.replace('SearchScreen')
            else
                setFetch(true)
        }
        checkToken()
	}, []);
	
    const submitLogin = async () => {
        setFetch(false)
        if (await getAuthorization())
        {
            setErrorApi("")
            navigation.replace('SearchScreen')
        }
        else
        {
            setFetch(true)
            setErrorApi("Error connecting to API 42. Try restarting the application.")
        }
    }

	return (
		<>
            <SafeAreaView style={styles.container}>
            {!fetch ? (
                <>
                    <ActivityIndicator size="large" color="#fff" style={styles.loader} />
                </>
            ) : (
                <View style={{
					alignItems: 'center',
					width: '100%',
				}}>
                    <TouchableOpacity
                        onPress={submitLogin}
                        style={styles.loginButton}
                    >
                        <Image
                            source={require('../../../assets/logo42.png')}
                            style={styles.logo}
                        />
                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: fontSizeLogin,
                                marginLeft: 5,
                            }}
                        >
                            Login
                        </Text>
                    </TouchableOpacity>
                    <View style={{
                        position: "absolute",
                        bottom: -spaceBelowButton,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                    }}>
                        <Error/>
                    </View>
                </View>
            )}
			</SafeAreaView>
		</>
	);
}

const styles = StyleSheet.create({
  	container: {
    	flex: 1,
    	alignItems: 'center',
    	justifyContent: 'center',
        backgroundColor: "#333",
  	},
    loader: {
        position: "absolute",
        top: "50%",
        transform: [{ scale: 2 }],
    },
    loginButton: {
        backgroundColor: "#fff",
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: "row",
        alignItems: "center"
    },
    logo: {
		height: logoSize,
		width: logoSize,
        marginRight: 5,
	},
});
