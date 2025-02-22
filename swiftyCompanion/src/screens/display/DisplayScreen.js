import React, { } from 'react';
import { SafeAreaView, StyleSheet, ImageBackground, Dimensions } from 'react-native';

import { useCurrentUser } from '../../context/CurrentUser';
import BackButton from './BackButton';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function DisplayScreen() {
    const { currentUser } = useCurrentUser()
    console.log(currentUser)
  
    return (
        <>
            <SafeAreaView style={styles.container}>
                <BackButton/>
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
});
