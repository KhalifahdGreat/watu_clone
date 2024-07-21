import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

interface CheckBoxProps {
  onChange: (isChecked: boolean) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ onChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckBoxPress = () => {
    setIsChecked(!isChecked);
    onChange(!isChecked); // Notify parent component of the change
  };

  return (
    <View style={styles.termsContainer}>
      <TouchableOpacity onPress={handleCheckBoxPress}>
        <MaterialIcons
          name={isChecked ? "check-box" : "check-box-outline-blank"}
          size={24}
          color={"#000"}
        />
      </TouchableOpacity>
      <Text style={styles.termsText}>
        I Agree to Terms of Service and Privacy Policy
      </Text>
    </View>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  termsText: {
    marginLeft: 10,
    fontFamily: "po-r",
    color: Colors.text_form,
    fontSize: 13,
  },
});
