/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { store, persistor } from './src/store';
import Login from './src/screens/Login';
import Track from './src/screens/Track';
import Certificate from './src/screens/Certificate';
import Tests from './src/screens/Tests';
import TestDetails from './src/screens/TestDetails';
import Info from './src/screens/Info';
import Settings from './src/screens/Settings';
import Register from './src/screens/Register';
import AutoLogin from './src/screens/AutoLogin';

const AppNavigator = createStackNavigator({
	Login: {
		screen: Login,
		navigationOptions: {
			headerShown: false,
		},
	},
	Track: {
		screen: Track
	},
	Certificate: {
		screen: Certificate
	},
	Tests: {
		screen: Tests
	},
	TestDetails: {
		screen: TestDetails,
		title: 'Test Details'
	},
	Info: {
		screen: Info
	},
	Settings: {
		screen: Settings
	},
	Register: {
		screen: Register
	},
	AutoLogin: {
		screen: AutoLogin,
		navigationOptions: {
			headerShown: false,
		}
	}
},
{
    initialRouteName: 'AutoLogin',
});

const AppContainer = createAppContainer(AppNavigator);


const App: () => Node = () => {

    return (
	<SafeAreaProvider>
	<Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
		<AppContainer />
      </PersistGate>
    </Provider>
	</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
