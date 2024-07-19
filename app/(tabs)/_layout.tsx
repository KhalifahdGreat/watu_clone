import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import Colors from "@/constants/Colors";

interface Icons {
  color: string;
  size: number;
}

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarLabelStyle: {
          fontFamily: "grot-regular",
        },
      }}>
      <Tabs.Screen
        name='index'
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name='search' size={size} color={color} />;
          },
        }}></Tabs.Screen>
      <Tabs.Screen
        name='transaction'
        options={{
          tabBarLabel: "Transactions",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name='heart-outline' size={size} color={color} />;
          },
        }}></Tabs.Screen>
      <Tabs.Screen
        name='help'
        options={{
          tabBarLabel: "Help",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name='heart-outline' size={size} color={color} />;
          },
        }}></Tabs.Screen>
      <Tabs.Screen
        name='account'
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name='heart-outline' size={size} color={color} />;
          },
        }}></Tabs.Screen>
    </Tabs>
  );
};

export default Layout;
