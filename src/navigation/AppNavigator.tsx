import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home/Home';
import Favourite from '../screens/Favourite/Favourite';
import Account from '../screens/Account/Account';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Account') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    } else if (route.name === 'Favourite') {
                        iconName = focused ? 'search' : 'search-outline';
                    }
                    return <Ionicons name={iconName} color={color} size={size} />;
                },
                tabBarActiveTintColor: '#5d3572',
                tabBarInactiveTintColor: 'black',
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 60,
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                    left: 16,
                    borderRadius: 10,
                    elevation: 10,
                }
            })}
        >
            <Tab.Screen name="Favourite" component={Favourite} />
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Account" component={Account} />
        </Tab.Navigator>
    );
};

const AppNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="AppTabs"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="AppTabs" component={AppTabs} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
