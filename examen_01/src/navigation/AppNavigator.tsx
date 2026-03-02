import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";
import CartScreen from "../screens/CartScreen";

// Tipado de las rutas
export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Detail: { product: any };
  Cart: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Fake Store - Login" }}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Fake Store" }}
        />

        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ title: "Product Detail" }}
        />

        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ title: "Shopping Cart" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;