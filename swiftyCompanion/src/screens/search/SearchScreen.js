import React, { useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, ImageBackground, Animated, Keyboard, Dimensions, View } from 'react-native';

import Input from './Input';
import Error from './Error';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const spacing = screenWidth / 12

export default function SearchScreen() {
	const translateY = useRef(new Animated.Value(0)).current;
	const opacity = useRef(new Animated.Value(1)).current;

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
			Animated.parallel([
				Animated.timing(translateY, {
					toValue: -screenHeight / 2 - spacing,
					duration: screenHeight / 6.7,
					useNativeDriver: true,
				}),
				Animated.timing(opacity, {
					toValue: 0,
					duration: screenHeight / 6.7,
					useNativeDriver: true,
				}),
			]).start();
		});
	
		const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
			Animated.parallel([
				Animated.timing(translateY, {
					toValue: 0,
					duration: screenHeight / 6.7,
					useNativeDriver: true,
				}),
				Animated.timing(opacity, {
					toValue: 1,
					duration: screenHeight / 6.7,
					useNativeDriver: true,
				}),
			]).start();
		});
	
		return () => {
			keyboardDidShowListener.remove();
			keyboardDidHideListener.remove();
		};
	}, []);
  
	return (
		<>
			<ImageBackground
				source={require('../../../assets/search/backgroundSearchScreen.png')}
				style={styles.backgroundImage}
				resizeMode="cover"
			>
				<SafeAreaView style={styles.container}>
					<Animated.View style={[styles.animatedContainer, { transform: [{ translateY }] }]}>
						<Animated.Image 
							source={require('../../../assets/search/logo42.png')}
							style={[styles.logo, { opacity: opacity }]}
						/>
						<View style={{
							alignItems: 'center',
							width: '100%',
						}}>
							<Input/>
							<View style={{
								position: "absolute",
								bottom: -screenWidth / 7.2,
								alignItems: 'center',
								justifyContent: 'center',
								width: '100%',
							}}>
								<Error/>
							</View>
						</View>
					</Animated.View>
				</SafeAreaView>
			</ImageBackground>
		</>
	);
}

const styles = StyleSheet.create({
  	container: {
    	flex: 1,
    	alignItems: 'center',
    	justifyContent: 'center',
		backgroundColor: "#0003",
  	},
	backgroundImage: {
		flex: 1,
		justifyContent: 'center',
	},
	animatedContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
	logo: {
		height: screenWidth / 2.88,
		width: screenWidth / 2.88,
		marginBottom: spacing,
	},
});
