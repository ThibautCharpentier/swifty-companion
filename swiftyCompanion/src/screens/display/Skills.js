import React from 'react';
import { View, StyleSheet, Dimensions, Text, FlatList } from 'react-native';

import { findCursus, getDecimal } from '../../utils/Utils';

const screenWidth = Dimensions.get('window').width;
const fontSizeText = screenWidth / 20
const sizeProgressBar = screenWidth / 30

export default function Skills({ dataUser }) {

    const cursus = findCursus(dataUser.cursus_users)

    return (
        <View style={styles.container}>
            { cursus?.skills &&
                <FlatList
                    data={cursus.skills}
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                    style={styles.listSkills}
                    renderItem={({ item }) => (
                        <>
                            {item?.name && item?.level != undefined &&
                                <View style={styles.skill}>
                                    <View style={styles.nameSkill}>
                                        <Text style={styles.text}>
                                            {item.name}
                                        </Text>
                                    </View>
                                    <View style={styles.levelSkill}>
                                        <Text style={[styles.text, {
                                            fontWeight: "bold",
                                            width: "20%",
                                            alignSelf: "center",
                                            textAlign: "center",
                                        }]}>
                                            {Math.floor(item.level)}
                                        </Text>
                                        <View
                                            style={{
                                                width: "80%",
                                                height: sizeProgressBar,
                                                alignSelf: "center",
                                            }}
                                        >
                                            <View style={styles.progressBar}>
                                                <View style={[styles.fillerBar, {
                                                    width: `${getDecimal(item.level || 0)}%`,
                                                    backgroundColor: dataUser?.coalitions?.[0]?.color || "#aaa",
                                                }]}/>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            }
                        </>
                    )}
                />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
    },
    listSkills: {
        margin: 10,
    },
    skill: {
        flexDirection: "row",
        padding: 10,
        flex: 1
    },
    nameSkill: {
        width: "60%",
        paddingRight: 5
    },
    levelSkill: {
        width: "40%",
        flexDirection: "row",
        paddingLeft: 5
    },
    text: {
        fontSize: fontSizeText
    },
    progressBar: {
        width: "100%",
        borderRadius: 100,
        overflow: "hidden",
        backgroundColor: "#000"
    },
    fillerBar: {
        height: "100%",
    }
});
