import React from 'react';
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "./context/ThemeContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(app)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}