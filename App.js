import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import DataView from "./DataView";
import FormView from "./FormView";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Form">
        <Stack.Screen
          name="Form"
          component={FormView}
          options={{ title: "Formulário" }}
        />
        <Stack.Screen
          name="Data"
          component={DataView}
          options={{ title: "Dados Inseridos" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
