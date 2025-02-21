import React, { useCallback, useState } from 'react';
import { StyleSheet, TextInput, Dimensions, TouchableOpacity, FlatList, Text, View, Image, Keyboard } from 'react-native';
import axios from "axios";
import { debounce } from "lodash"

import { API_42 } from '../../utils/Constants';
import { getToken } from '../../utils/Token';
import { useErrorApi } from '../../context/ErrorApi';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Input() {
    const { setErrorApi } = useErrorApi()
    const [searchLogin, setSearchLogin] = useState('');
    const [logins, setLogins] = useState([])
	const [visibleLogins, setVisibleLogins] = useState(false)

    const dynamicSearchLogin = async (text) => {
		if (text.length < 3)
			setLogins([])
		else {
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
                if (tab_logins.data.length < 1) {
                    setLogins([])
                    setErrorApi("Aucun utilisateur ne correspond à votre recherche")
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
                setErrorApi("Erreur lors de la connexion à l'API 42. Essayez de redémarrer l'application.")
            }
		}
	}

    const debouncedSearchLogin = useCallback(debounce(dynamicSearchLogin, 500), [])

    const handleSearchLoginChange = (text) => {
        setSearchLogin(text)
        debouncedSearchLogin(text)
    }

    const handleSearchLoginSubmit = () => {
        setSearchLogin("")
        setLogins([])
        setVisibleLogins(false)
    }

    const handleSearchLoginSelection = () => {
        Keyboard.dismiss()
        setErrorApi("")
        setSearchLogin("")
        setLogins([])
        setVisibleLogins(false)
    }

    return (
        <>
            <TextInput
                style={styles.searchLogin}
                placeholder="Entrez un login"
                placeholderTextColor="#aaa"
                value={searchLogin}
                onChangeText={handleSearchLoginChange}
                onFocus={() => setVisibleLogins(true)}
                onSubmitEditing={handleSearchLoginSubmit}
            />
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
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <Text
                                                style={{
                                                    fontWeight: 'bold',
                                                    fontSize: screenWidth / 22,
                                                    paddingHorizontal: 15,
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
    }
})
