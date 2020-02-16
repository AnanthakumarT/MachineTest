import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import Profile from '../screens/Profile'
const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import LoginPage from './LoginPage'

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  return( 
  <Stack.Navigator headerMode  initialRouteName={LoginPage}  title="Home"
  
  >
  <Stack.Screen name="LoginPage" component={LoginPage}     />
  <Stack.Screen name="HomeScreen" component={HomeScreen}     />
 
</Stack.Navigator>
  );
}

