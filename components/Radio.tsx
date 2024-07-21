import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { MaterialIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

interface RadioOption {
  label: string;
  value: string;
}

interface RadioProps {
  options: RadioOption[];
  checkedValue: string;
  onChange: (value: string) => void;
  style?: object;
}

const Radio: React.FC<RadioProps> = ({
  options,
  checkedValue,
  onChange,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {options.map((option) => {
        let active = checkedValue == option.value;

        return (
          <TouchableOpacity
            className='flex flex-row items-center gap-2'
            onPress={() => {
              onChange(option.value);
            }}
            key={option.value}>
            <MaterialIcons
              name={active ? "radio-button-checked" : "radio-button-unchecked"}
              size={24}
              color={"#000"}
            />
            <Text style={styles.text}>{option.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Radio;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 78,
    marginBottom: 5,
  },
  text: {
    fontFamily: "po-m",
    color: Colors.text_form,
    fontSize: 17,
  },
  radio: {},
  activeRadio: {},
});
