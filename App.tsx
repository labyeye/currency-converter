import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Start from './src/screens/StartScreen/StarScreen';
import ConvertScreen from './src/screens/ConvertScreen/ConvertScreen';
import DetailScreen from './src/screens/DetailsScreen/DetailScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator >
        <Stack.Screen name="Start" component={Start} options={{headerShown:false}}  /> 
        <Stack.Screen name="Detail" component={DetailScreen} options={{headerShown:false}}  /> 
        <Stack.Screen name="Convert" component={ConvertScreen} options={{headerShown:false}}  /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
