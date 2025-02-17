import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, ImageBackground, TextInput, Image, Animated, Keyboard, Dimensions } from 'react-native';

const spacing = 30

export default function SearchScreen() {
	const [searchLogin, setSearchLogin] = useState('');
	const translateY = useRef(new Animated.Value(0)).current;
	const opacity = useRef(new Animated.Value(1)).current;

	const screenHeight = Dimensions.get('window').height;

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
			Animated.parallel([
				Animated.timing(translateY, {
					toValue: -screenHeight / 2 - spacing,
					duration: 100,
					useNativeDriver: true,
				}),
				Animated.timing(opacity, {
					toValue: 0,
					duration: 100,
					useNativeDriver: true,
				}),
			]).start();
		});
	
		const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
			Animated.parallel([
				Animated.timing(translateY, {
					toValue: 0,
					duration: 100,
					useNativeDriver: true,
				}),
				Animated.timing(opacity, {
					toValue: 1,
					duration: 100,
					useNativeDriver: true,
				}),
			]).start();
		});
	
		return () => {
			keyboardDidShowListener.remove();
			keyboardDidHideListener.remove();
		};
	}, [translateY]);
  
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
						<TextInput
							style={styles.searchLogin}
							placeholder="Entrez un login"
							placeholderTextColor="#aaa"
							value={searchLogin}
							onChangeText={text => setSearchLogin(text)}
						/>
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
		height: 125,
		width: 125,
		marginBottom: spacing,
	},
	searchLogin: {
		backgroundColor: "#0005",
		borderRadius: 5,
		paddingVertical: 10,
		paddingHorizontal: 15,
		color: "#fff",
		width: '80%',
		height: 50,
		fontSize: 20,
	}
});
