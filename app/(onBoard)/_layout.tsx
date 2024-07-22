import React from "react";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='login' options={{ headerShown: false }} />
      <Stack.Screen name='createAccount' options={{ headerShown: false }} />
      <Stack.Screen name='welcome' options={{ headerShown: false }} />
      <Stack.Screen name='setPin' options={{ headerShown: false }} />
      <Stack.Screen name='resetPassword' options={{ headerShown: false }} />
      <Stack.Screen name='resetSuccessful' options={{ headerShown: false }} />
      <Stack.Screen name='resetToken' options={{ headerShown: false }} />
      <Stack.Screen name='setNewPassword' options={{ headerShown: false }} />
      <Stack.Screen name='enterPin' options={{ headerShown: false }} />
      <Stack.Screen
        name='account_verification'
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
