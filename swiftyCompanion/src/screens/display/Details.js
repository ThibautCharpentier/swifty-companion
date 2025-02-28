import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image, Text, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useCurrentUser } from '../../context/CurrentUser';
import { getDecimal, findCursus } from '../../utils/Utils';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function Details({ dataUser }) {
    const { currentUser } = useCurrentUser()
    const cursus = findCursus(dataUser.cursus_users)
    const progress = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(progress, {
            toValue: getDecimal(cursus?.level || 0),
            duration: screenWidth * 2.78,
            useNativeDriver: false,
        }).start();
    }, []);

    const progressInterpolate = progress.interpolate({
        inputRange: [0, 100],
        outputRange: ["0%", "100%"],
    });
  
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
                            color={dataUser?.coalitions?.[0]?.color || "#fff"}
                        />
                        <Text style={[styles.informationText, {paddingLeft: 5}]}>
                            {currentUser?.displayname || ""}
                        </Text>
                    </View>
                    <View style={styles.informationContainer}>
                        <Ionicons
                            name="mail-outline"
                            size={screenWidth / 30}
                            color={dataUser?.coalitions?.[0]?.color || "#fff"}
                        />
                        <Text style={[styles.informationText, {paddingLeft: 5}]}>
                            {currentUser?.email || ""}
                        </Text>
                    </View>
                    <View style={styles.informationContainer}>
                        <Ionicons
                            name="location-outline"
                            size={screenWidth / 30}
                            color={dataUser?.coalitions?.[0]?.color || "#fff"}
                        />
                        <Text style={[styles.informationText, {paddingLeft: 5}]}>
                            {dataUser?.campus?.[dataUser.campus.length - 1]?.name || ""}
                        </Text>
                    </View>
                </View>
                <View style={styles.levelContainer}>
                    <Text style={{color: "#fff", fontSize: screenWidth / 14, fontWeight: "bold"}}>
                        {Math.floor(cursus?.level || 0)}
                    </Text>
                    <View
                        style={{
                            flexDirection: "col",
                            flex: 1,
                            paddingLeft: 5
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                width: "100%",
                                height: "50%",
                            }}
                        >
                            <View style={{width: "33%", justifyContent: "flex-end"}}>
                                <Text style={{color: "#fff", fontSize: screenWidth / 30, fontWeight: "bold", textAlign: "left",}}>
                                    {cursus?.level ?
                                        getDecimal(cursus.level)
                                        :
                                        "00"
                                    }%
                                </Text>
                            </View>
                            <View style={{width: "34%", justifyContent: "flex-end"}}>
                                <Text style={[styles.informationText, {textAlign: "center",}]}>
                                    {currentUser?.wallet || "0"}₳
                                </Text>
                            </View>
                            <View style={{width: "33%", justifyContent: "flex-end"}}>
                                <Text style={[styles.informationText, {textAlign: "right",}]}>
                                    ev.p {currentUser?.correction_point || "0"}
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                width: "100%",
                                height: "50%",
                            }}
                        >
                            <View style={[styles.progressBar, {
                                borderColor: dataUser?.coalitions?.[0]?.color || "#fff",
                            }]}>
                                <Animated.View style={[styles.fillerBar, {
                                    width: progressInterpolate,
                                    backgroundColor: dataUser?.coalitions?.[0]?.color || "#fff",
                                    borderColor: dataUser?.coalitions?.[0]?.color || "#fff",
                                }]}/>
                            </View>
                        </View>
                    </View>
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
    },
    details: {
        marginLeft: 5,
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
    levelContainer: {
        flex: 1,
        width: "100%",
        alignItems: "start",
        paddingTop: 1,
        flexDirection: 'row',
    },
    informationText: {
        color: "#fff",
        fontSize: screenWidth / 33,
    },
    progressBar: {
        width: "100%",
        height: "50%",
        borderRadius: 100,
        borderWidth: 1,
        overflow: "hidden",
    },
    fillerBar: {
        height: "100%",
    }
});
