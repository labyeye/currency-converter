import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { Image, StyleSheet } from "react-native";
import DetailScreen from "./src/screens/DetailsScreen/DetailScreen";
import ConvertScreen from "./src/screens/ConvertScreen/ConvertScreen";
import Start from "./src/screens/StartScreen/StarScreen";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    activeColor="#4F6F52"
    inactiveColor="white"
    barStyle={{ backgroundColor: '#BFD8AF' }}
    shifting={true}
  >
    <Tab.Screen
      name="Home"
      component={DetailScreen}
      options={{
      }}
    />
    <Tab.Screen
      name="Add"
      component={ConvertScreen}
      options={{
      }}
    />
  </Tab.Navigator>
);

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setHideSplashScreen(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer >

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Start"
          component={Start}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;