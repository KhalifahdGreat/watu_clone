import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  buttonName: string;
  IconColor: string;
  genericBtnFunction: () => void;
  buttonStyle?: object; // Add custom button style
  buttonTextStyle?: object; // Add custom button text style
  disabled: boolean;
}

const GenericButton = ({
  buttonName,
  IconColor,
  genericBtnFunction,
  buttonStyle,
  buttonTextStyle,
}: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, buttonStyle]}
        onPress={genericBtnFunction}>
        <Text style={[styles.buttonText, buttonTextStyle]}>{buttonName}</Text>
        <Ionicons name='arrow-forward' size={24} color={IconColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 10,
  },
  button: {
    height: 50, // Default height
    gap: 10,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: Colors.primary, // Adjust the background color as needed
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff", // Adjust text color as needed
    fontSize: 16,
    fontFamily: "po-r", // Adjust font size as needed
  },
});

export default GenericButton;
