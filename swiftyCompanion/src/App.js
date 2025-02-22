import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SearchScreen from './screens/search/SearchScreen';
import DisplayScreen from './screens/display/DisplayScreen';
import { ErrorApiProvider, useErrorApi } from './context/ErrorApi';
import { CurrentUserProvider } from './context/CurrentUser';
import { getToken } from './utils/Token';

const Stack = createStackNavigator();

export function SwiftyCompanion() {
	const { setErrorApi } = useErrorApi()

	useEffect(() => {
		NavigationBar.setVisibilityAsync('hidden');
		NavigationBar.setBackgroundColorAsync('transparent');
		NavigationBar.setBehaviorAsync('overlay-swipe');
		if (!getToken())
			setErrorApi("Error connecting to API 42. Try restarting the application.")
	}, []);

	return (
		<>
			<StatusBar hidden={true}/>
			<NavigationContainer style={styles.container}>
                <Stack.Navigator
                    initialRouteName="SearchScreen"
                >
                    <Stack.Screen
						name="SearchScreen"
						component={SearchScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="DisplayScreen"
						component={DisplayScreen}
						options={{ headerShown: false }}
					/>
                </Stack.Navigator>
            </NavigationContainer>
		</>
	);
}

export default function App() {
  
	return (
		<ErrorApiProvider>
			<CurrentUserProvider>
				<SwiftyCompanion/>
			</CurrentUserProvider>
		</ErrorApiProvider>
	);
}

const styles = StyleSheet.create({
  	container: {
    	flex: 1,
    	backgroundColor: '#fff',
    	alignItems: 'center',
    	justifyContent: 'center',
  	},
});
