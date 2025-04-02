import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "./context/ThemeContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <ThemeProvider>
        <Stack screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' }
        }} />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}