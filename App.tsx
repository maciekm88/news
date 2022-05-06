import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import News from "./src/News";

const Stack = createNativeStackNavigator();

export default function Root() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="News" component={News} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
