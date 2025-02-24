import React, { } from 'react';
import { View, StyleSheet, Dimensions, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useCurrentUser } from '../../context/CurrentUser';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function Details({ dataUser }) {
    const { currentUser } = useCurrentUser()
    console.log(dataUser?.cursus_users[dataUser.cursus_users.length - 1]?.level)
  
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: `${currentUser.image.link}` }}
                style={{
                    width: screenWidth / 3,
                    height: screenWidth / 3,
                    borderRadius: 100,
                    marginRight: 5,
                }}
            />
            <View style={styles.details}>
                <Text style={styles.login}>
                    {currentUser.login}
                </Text>
                <View
                    style={{
                        width: "100%",
                        alignItems: "start",
                        paddingVertical: 1
                    }}
                >
                    <View style={styles.informationContainer}>
                        <Ionicons
                            name="person-outline"
                            size={screenWidth / 30}
                            color="#fff"
                        />
                        {currentUser?.displayname &&
                            <Text style={styles.informationText}>{currentUser.displayname}</Text>
                        }
                    </View>
                    <View style={styles.informationContainer}>
                        <Ionicons
                            name="mail-outline"
                            size={screenWidth / 30}
                            color="#fff"
                        />
                        {currentUser?.email &&
                            <Text style={styles.informationText}>{currentUser.email}</Text>
                        }
                    </View>
                    <View style={styles.informationContainer}>
                        <Ionicons
                            name="location-outline"
                            size={screenWidth / 30}
                            color="#fff"
                        />
                        {dataUser?.campus[dataUser.campus.length - 1]?.name &&
                            <Text style={styles.informationText}>{dataUser.campus[0].name}</Text>
                        }
                    </View>
                </View>
                <View
                    style={{
                        flex: 1,
                        width: "100%",
                        alignItems: "start",
                        paddingTop: 1,
                        backgroundColor: "#00f",
                        flexDirection: 'row',
                    }}
                >
                    {dataUser?.cursus_users[dataUser.cursus_users.length - 1]?.level &&
                        <Text style={{color: "#fff", fontSize: screenWidth / 14, fontWeight: "bold"}}>{dataUser.cursus_users[dataUser.cursus_users.length - 1].level}</Text>
                    }
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: 'row',
        marginTop: screenHeight / 25,
        paddingHorizontal: 10,
        backgroundColor: "#f00",
    },
    details: {
        marginLeft: 5,
        backgroundColor: "#0f0",
        alignItems: 'center',
        flex: 1
    },
    login: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: screenWidth / 14,
        paddingBottom: 1
    },
    informationContainer: {
        flexDirection: "row",
        alignItems: 'center',
    },
    informationText: {
        color: "#fff",
        fontSize: screenWidth / 33,
        paddingLeft: 5,
    }
});
