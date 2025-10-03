import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import ProviderScreen from "./src/screens/ProviderScreen";

export type RootStackParamList = {
  Home: undefined;
  Provider: { provider: Provider };
};

export type Provider = {
  name: string;
  phone: string;
  website?: string;
  address?: string;
  features?: string[];
  open_hours?: string;
  open_now?: boolean;
  advance_notice?: string;
  notes?: string;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Accessible Rides" }} />
        <Stack.Screen name="Provider" component={ProviderScreen} options={{ title: "Provider" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

