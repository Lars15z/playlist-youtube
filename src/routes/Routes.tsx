import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddList } from '../screens/AddList';
import { Home } from '../screens/Home';
import { Detalhes } from '../screens/Detalhes';

const Stack = createNativeStackNavigator()

export function Routes() {
  return (
    <Stack.Navigator initialRouteName='Home' screenOptions={{ animation: "slide_from_bottom", navigationBarColor: "#27272a", statusBarColor: "#27272a" }}>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="addlist" component={AddList} options={{ 
          headerShown: false
          }} />
        <Stack.Screen name="Detalhes" component={Detalhes} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}