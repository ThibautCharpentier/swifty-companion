import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SearchScreen from './screens/search/SearchScreen';

const Stack = createStackNavigator();

export default function App() {
  
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
                    initialRouteName="SearchScreen"
                >
                    <Stack.Screen
						name="SearchScreen"
						component={SearchScreen}
						options={{ headerShown: false }}
					/>
                </Stack.Navigator>
            </NavigationContainer>
		</>
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
