import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import Characters from '../components/Characters/Characters';
import Locations from '../components/Locations/Locations';
import Episodes from '../components/Episodes/Episodes';

const SearchNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Characters" component={Characters} />
      <Tab.Screen name="Locations" component={Locations} />
      <Tab.Screen name="Episodes" component={Episodes} />
    </Tab.Navigator>
  );
};

export default SearchNavigator;
