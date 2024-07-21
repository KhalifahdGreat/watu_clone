import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface Prop {
  style: object;
}

const BackButton = ({ style }: Prop) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={[styles.backButton, style]}
      onPress={() => router.back()}>
      <Ionicons name='arrow-back' size={28} color='#fff' />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 60,
    left: 10,
    zIndex: 1,
  },
});
