import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, TextInput, Dimensions, TouchableOpacity, FlatList, Text, View, Image, Keyboard, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { debounce, set } from "lodash"

import { API_42 } from '../../utils/Constants';
import { getToken } from '../../utils/Token';
import { useErrorApi } from '../../context/ErrorApi';
import { useCurrentUser } from '../../context/CurrentUser';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Input() {
    const navigation = useNavigation();
    const { setCurrentUser } = useCurrentUser()
    const { setErrorApi } = useErrorApi()
    const [searchLogin, setSearchLogin] = useState('');
    const [logins, setLogins] = useState([])
	const [visibleLogins, setVisibleLogins] = useState(false)
    const [loading, setLoading] = useState(false)
    const hasSubmit = useRef(false)

    const dynamicSearchLogin = async (text) => {
		if (text.length < 3)
			setLogins([])
		else {
            setLoading(true)
            try {
                const token = await getToken()
                if (!token)
                    throw new Error("[Error: No valid token]")
                const tab_logins = await axios.get(`${API_42}/users?range[login]=${text},${text}zzz`, {
                        headers: {
                             Authorization: `Bearer ${token}`
                        },
                    }
                )
                if (hasSubmit.current)
                    return
                if (tab_logins.data.length < 1) {
                    setLogins([])
                    setErrorApi("No user match your search. Type something else.")
                }
                else {
                    let tab_tmp = []
                    for (let i = 0; i < tab_logins.data.length; i++) {
                        if (tab_logins?.data[i]?.login && tab_logins?.data[i]?.image?.link)
                            tab_tmp.push(tab_logins.data[i])
                    }
                    setLogins(tab_tmp)
                    setErrorApi("")
                }
            }
			catch (e) {
                console.log(e)
                setLogins([])
                setErrorApi("Error connecting to API 42. Try restarting the application.")
            }
            setLoading(false)
		}
	}

    const submitLogin = async (text) => {
        try {
            const token = await getToken()
            if (!token)
                throw new Error("[Error: No valid token]")
            const login = await axios.get(`${API_42}/users?filter[login]=${text}`, {
                    headers: {
                         Authorization: `Bearer ${token}`
                    },
                }
            )
            if (login.data.length < 1) {
                setSearchLogin("")
                setLogins([])
                setErrorApi("No user match your search. Type something else.")
            }
            else {
                setErrorApi("")
                setSearchLogin(login.data[0].login)
                setCurrentUser(login.data[0])
                setLogins([])
                navigation.navigate('DisplayScreen')
            }
        }
        catch (e) {
            console.log(e)
            setSearchLogin("")
            setLogins([])
            setErrorApi("Error connecting to API 42. Try restarting the application.")
        }
        setLoading(false)
    }

    const debouncedSearchLogin = useCallback(debounce(dynamicSearchLogin, 500), [])
    const debouncedSubmit = useCallback(debounce(submitLogin, 500), [])

    const handleSearchLoginChange = (text) => {
        setSearchLogin(text)
        debouncedSearchLogin(text)
    }

    const handleSearchLoginSubmit = () => {
        hasSubmit.current = true
        setVisibleLogins(false)
        setLoading(true)
        debouncedSubmit(searchLogin)
    }

    const handleSearchLoginSelection = (selectedUser) => {
        setVisibleLogins(false)
        Keyboard.dismiss()
        setErrorApi("")
        setSearchLogin(selectedUser.login)
        setCurrentUser(selectedUser)
        setLogins([])
        navigation.navigate('DisplayScreen')
    }

    return (
        <>
            <View style={styles.containerLogin}>
                <TextInput
                    style={styles.searchLogin}
                    placeholder="Search a login"
                    placeholderTextColor="#aaa"
                    value={searchLogin}
                    onChangeText={handleSearchLoginChange}
                    onFocus={() => {
                        hasSubmit.current = false
                        setVisibleLogins(true)
                        dynamicSearchLogin(searchLogin)
                    }}
                    onSubmitEditing={handleSearchLoginSubmit}
                    autoCapitalize='none'
                />
                <ActivityIndicator size="small" color="#aaa" style={[styles.loader, { opacity: loading ? 1 : 0 }]} />
            </View>
            {visibleLogins && logins.length > 0 && (
                <View style={styles.suggestedLoginsContainer}>
                    <FlatList
                        data={logins}
                        keyExtractor={(item, index) => `${item.id}-${index}`}
                        style={styles.suggestedLogins}
                        keyboardShouldPersistTaps="handled"
                        renderItem={({ item }) => (
                            <>
                                {item?.login && item?.image?.link && 
                                    <TouchableOpacity
                                        onPress={() => handleSearchLoginSelection(item)}
                                        style={styles.suggestedLogin}
                                    >
                                        <Image
                                            source={{ uri: `${item.image.link}` }}
                                            style={{
                                                width: screenWidth / 7.2,
                                                height: screenWidth / 7.2,
                                                borderRadius: 100,
                                            }}
                                        />
                                        <View style={{
                                            alignItems: 'start',
                                            justifyContent: 'center',
                                            width: "80%",
                                            paddingLeft: 15,
                                        }}>
                                            <Text
                                                style={{
                                                    fontWeight: 'bold',
                                                    fontSize: screenWidth / 22,
                                                }}
                                            >
                                                {item.login}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                }
                            </>
                        )}
                        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#ccc' }}/>}
                    />
                </View>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    containerLogin: {
        backgroundColor: "#0005",
        borderRadius: 5,
        width: '80%',
        height: screenWidth / 7.2,
        justifyContent: "center",
        flexDirection: "row",
    },
    searchLogin: {
        paddingVertical: 10,
        paddingLeft: 15,
        color: "#fff",
        width: '100%',
        fontSize: screenWidth / 18,
        flex: 8
    },
    loader: {
        flex: 2,
        transform: [{ scale: 1.3 }],
    },
    suggestedLoginsContainer: {
        position: "relative",
		backgroundColor: '#fff',
        borderRadius: 5,
		width: '80%',
		maxHeight: screenHeight / 3,
	},
    suggestedLogins: {
        position: "absolute",
		backgroundColor: '#fff',
        borderRadius: 5,
		width: '100%',
		maxHeight: screenHeight / 3,
	},
    suggestedLogin: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 15,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    }
})
