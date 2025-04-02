import React from 'react';
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../context/ThemeContext";
import { Ionicons } from '@expo/vector-icons';

export default function AppLayout() {
  const { theme, isDark } = useTheme();

  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.colors.background,
            borderTopColor: theme.colors.border,
            height: 60,
            paddingBottom: 8,
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.textSecondary,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="track"
          options={{
            title: 'Track',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="locate" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="booking"
          options={{
            title: 'Booking',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cube" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
} 