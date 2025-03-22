import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './src/screens/HomeScreen'
import DiscoverScreen from './src/screens/DiscoverScreen'
import LikeScreen from './src/screens/LikeScreen'
import Feather from 'react-native-vector-icons/Feather'
import { colors } from './src/theme'

const Tab = createBottomTabNavigator()
const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = '';
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Discover') {
            iconName = 'globe';
          } else if (route.name === 'Like') {
            iconName = 'heart';
          }
          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.activeTabColor,
        tabBarInactiveTintColor: colors.inactiveTabColor,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.primary,
          borderTopWidth: 0,
          shadowOffset: { width: 5, height: 3 },
          shadowColor: 'black',
          shadowOpacity: 0.5,
          elevation: 5,
        },
        animation:'shift'
      })}
      >
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Discover" component={DiscoverScreen}/>
        <Tab.Screen name="Like" component={LikeScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App