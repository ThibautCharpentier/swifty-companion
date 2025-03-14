import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SearchScreen from './screens/search/SearchScreen';
import DisplayScreen from './screens/display/DisplayScreen';
import LoginScreen from './screens/login/LoginScreen';
import { ErrorApiProvider } from './context/ErrorApi';
import { CurrentUserProvider } from './context/CurrentUser';

const Stack = createStackNavigator();

export function SwiftyCompanion() {

	useEffect(() => {
		NavigationBar.setVisibilityAsync('hidden');
		NavigationBar.setBackgroundColorAsync('transparent');
		NavigationBar.setBehaviorAsync('overlay-swipe');
	}, []);

	return (
		<>
			<StatusBar hidden={true}/>
			<NavigationContainer style={styles.container}>
                <Stack.Navigator
                    initialRouteName="LoginScreen"
                >
					<Stack.Screen
						name="LoginScreen"
						component={LoginScreen}
						options={{ headerShown: false }}
					/>
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
    	alignItems: 'center',
    	justifyContent: 'center',
  	},
});
