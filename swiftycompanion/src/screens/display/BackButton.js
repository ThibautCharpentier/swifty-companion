import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const spaceAboveContainer = screenHeight / 17
const sizeIonicon = screenWidth / 12
const fontSizeBackText = screenWidth / 18

export default function BackButton() {
    const navigation = useNavigation();
  
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('SearchScreen')
                }}
                style={styles.button}
            >
                <Ionicons
                    name="chevron-back-outline"
					size={sizeIonicon}
					color="#fff"
                />
                <Text style={styles.backText}>
                    Back
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginTop: spaceAboveContainer
    },
    button: {
        flexDirection: "row",
        padding: 5,
        alignSelf: "flex-start",
    },
    backText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: fontSizeBackText,
        alignSelf: "center"
    }
});
