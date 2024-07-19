// app/_layout.tsx
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(onBoard)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "gr-b": require("../assets/fonts/SpaceGrotesk-Bold.ttf"),
    "gr-l": require("../assets/fonts/SpaceGrotesk-Light.ttf"),
    "gr-m": require("../assets/fonts/SpaceGrotesk-Medium.ttf"),
    "gr-r": require("../assets/fonts/SpaceGrotesk-Regular.ttf"),
    "gr-sb": require("../assets/fonts/SpaceGrotesk-SemiBold.ttf"),
    "po-b": require("../assets/fonts/Poppins-Bold.ttf"),
    "po-eb": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "po-l": require("../assets/fonts/Poppins-Light.ttf"),
    "po-m": require("../assets/fonts/Poppins-Medium.ttf"),
    "po-r": require("../assets/fonts/Poppins-Regular.ttf"),
    "po-sb": require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen name='(onBoard)' options={{ headerShown: false }} />
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
    </Stack>
  );
}
