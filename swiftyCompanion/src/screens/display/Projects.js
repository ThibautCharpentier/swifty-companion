import React from 'react';
import { View, StyleSheet, Dimensions, Text, FlatList } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function Projects({ dataUser }) {

    return (
        <View style={styles.container}>
            <FlatList
                data={dataUser.projects_users}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                style={styles.listProjects}
                renderItem={({ item }) => (
                    <>
                        {item?.cursus_ids?.[0] == 21 && item?.["validated?"] != undefined && item?.project?.name && item?.final_mark &&
                            <View style={styles.project}>
                                <View style={styles.nameProject}>
                                    <Text style={styles.text}>
                                        {item.project.name}
                                    </Text>
                                </View>
                                <View style={styles.markProject}>
                                    <Text style={[styles.text, {
                                        textAlign: "right",
                                        fontWeight: "bold",
                                        color: item["validated?"] ? "#0a0" : "#a00"
                                    }]}>
                                        {item.final_mark}
                                    </Text>
                                </View>
                            </View>
                        }
                    </>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
    },
    listProjects: {
        margin: 10,
    },
    project: {
        flexDirection: "row",
        padding: 10
    },
    nameProject: {
        width: "80%",
    },
    markProject: {
        width: "20%",
        justifyContent: "center"
    },
    text: {
        fontSize: screenWidth / 20
    }
});
