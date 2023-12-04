import { View, Text } from 'react-native';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../Screens/LoginScreen';
import HomeScreen from '../Screens/HomeScreen';



export type RootStack = {
    LoginScreen: any,
    HomeScreen: any,
}

const Stack = createNativeStackNavigator<RootStack>()

const Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='LoginScreen' component={LoginScreen}></Stack.Screen>
                <Stack.Screen name='HomeScreen' component={HomeScreen}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router