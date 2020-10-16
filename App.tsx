import 'react-native-gesture-handler';
import React from 'react';
// import Icon from 'react-native-vector-icons/MaterialIcons';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

import Intro from './components/Intro';
import SearchNavigator from './navigators/SearchNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#403F3E',
          },
          headerTitleStyle: {
            fontFamily: 'monospace',
          },
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
        }}>
        <Stack.Screen
          name="Welcome"
          component={Intro}
          options={{title: 'Rick & Morty'}}
        />
        <Stack.Screen name="Search" component={SearchNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
