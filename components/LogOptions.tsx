import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const validIconNames = [
  "mail-outline",
  "logo-whatsapp", // Add all valid icon names here
] as const;

type IconName = (typeof validIconNames)[number];

interface BtnProp {
  iconName: IconName;
  btnText: string;
  onPress?: () => void;
}

const LogOptions = ({ iconName, btnText, onPress }: BtnProp) => {
  return (
    <TouchableOpacity style={styles.btnOutline} onPress={onPress}>
      <Ionicons name={iconName} size={30} style={styles.btnIcon} />
      <View style={styles.textContainer}>
        <Text style={styles.btnOutlineText}>{btnText}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default LogOptions;

const styles = StyleSheet.create({
  btnOutline: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C3BAC3",
    borderRadius: 5,
    padding: 20,
    marginBottom: 10,
  },
  btnIcon: {
    position: "absolute",
    left: 10,
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
  },
  btnOutlineText: {
    fontSize: 16,
  },
});
