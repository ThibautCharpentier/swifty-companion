import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, ActivityIndicator, ImageBackground, View, Dimensions } from 'react-native';
import axios from "axios";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { useCurrentUser } from '../../context/CurrentUser';
import BackButton from './BackButton';
import Details from './Details'
import Projects from './Projects'
import Skills from './Skills'
import { useErrorApi } from '../../context/ErrorApi';
import { API_42 } from '../../utils/Constants';
import { getToken } from '../../utils/Token';

const screenWidth = Dimensions.get('window').width;
const Tab = createMaterialTopTabNavigator();

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

		const timer = setTimeout(() => {
            getDataUser()
        }, 1000)
    
        return () => clearTimeout(timer)
	}, []);
  
    return (
        <>
            <SafeAreaView style={styles.container}>
                {!fetch ? (
                    <ActivityIndicator size="large" color="#fff" style={styles.loader} />
                ) : (
                    <>
                        <ImageBackground
                            source={dataUser?.coalitions?.[0]?.cover_url ?
                                { uri: dataUser.coalitions[0].cover_url }
                                :
                                require('../../../assets/search/backgroundSearchScreen.png')
                            }
                            resizeMode="cover"
                        >
                            <View style={styles.backgroundImage}>
                                <BackButton/>
                                <Details dataUser={dataUser} />
                            </View>
                        </ImageBackground>
                        <View style={styles.tabContainer}>
                            <Tab.Navigator
                                tabBarPosition="top"
                                initialRouteName="Projects"  
                                screenOptions={{
                                    tabBarIndicatorStyle: { backgroundColor: dataUser?.coalitions?.[0]?.color || "#000", height: 3 },
                                    tabBarLabelStyle: { fontWeight: 'bold', fontSize: screenWidth / 25 },
                                    tabBarPressColor: 'transparent',
                                }}                              
                            >
                                <Tab.Screen
                                    name="Projects"
                                    children={() => <Projects
                                        dataUser={dataUser}
                                    />}
                                />
                                <Tab.Screen
                                    name="Skills"
                                    children={() => <Skills
                                        dataUser={dataUser}
                                    />}
                                />
                            </Tab.Navigator>
                        </View>
                    </>
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
    backgroundImage: {
        backgroundColor: "#0007",
        width: "100%",
        paddingBottom: 10
    },
    tabContainer: {
        backgroundColor: "#ddd",
        flex: 1,
        width: "100%",
    }
});
