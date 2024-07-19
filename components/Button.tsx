import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  genericBtnFunction: () => void;
}

const GenericButton = ({ genericBtnFunction }: Props) => {
  return (
    <View style={styles.container} className='px-4'>
      <TouchableOpacity style={styles.button} onPress={genericBtnFunction}>
        <Text style={styles.buttonText} className='capitalize'>
          create account
        </Text>
        <Ionicons name='arrow-forward' size={24} color='#fff' />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  button: {
    height: 60,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: Colors.primary, // Adjust the background color as needed
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8, // Gap from other elements
  },
  buttonText: {
    color: "#fff", // Adjust text color as needed
    fontSize: 18,
    fontFamily: "po-r", // Adjust font size as needed
  },
});
export default GenericButton;
