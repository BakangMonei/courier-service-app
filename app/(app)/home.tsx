import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function HomeScreen() {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      </ScrollView>
    </SafeAreaView>
  );
} 