import React, { } from 'react';
import { SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, Text, Image } from 'react-native';
import { authorize } from "react-native-app-auth";

import { CLIENT_ID, CLIENT_SECRET } from '@env';
import { OAUTH_42, REDIRECT_URI } from '../../utils/Constants';

const screenWidth = Dimensions.get('window').width;
const fontSizeLogin = screenWidth / 15
const logoSize = screenWidth / 10

export default function LoginScreen() {
	
    const submitLogin = async () => {
        try {
            const config = {
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                redirectUrl: REDIRECT_URI,
                scopes: ["public"],
                serviceConfiguration: {
                    authorizationEndpoint: `${OAUTH_42}/oauth/authorize`,
                    tokenEndpoint: `${OAUTH_42}/oauth/token`,
                },
            };
            const authState = await authorize(config);
            console.log(authState);
        } catch (err) {
            console.log(err);
        }
    }

	return (
		<>
			<SafeAreaView style={styles.container}>
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
