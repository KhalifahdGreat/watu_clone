import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Watu from "@/assets/svg/Watu logo (white).svg";
import Colors from "@/constants/Colors";
import BackButton from "./BackButton";

interface Prop {
  formHeader: string;
  formDescription: string;
  children: React.ReactNode;
}

const { width: screenWidth } = Dimensions.get("window");

export default function Form({ formHeader, formDescription, children }: Prop) {
  return (
    <View style={styles.container} className='py-2'>
      <BackButton />
      <Watu />
      <View style={styles.form} className='py-6 px-4'>
        <View className='mb-4'>
          <Text style={styles.header}>{formHeader}</Text>
          <Text style={styles.description}>{formDescription}</Text>
        </View>

        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },
  form: {
    width: screenWidth - 30, // Screen width minus the total horizontal margin (10 on each side)
    backgroundColor: "#fff",
    borderRadius: 15,

    marginHorizontal: 10,
  },
  header: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: "gr-sb",
    lineHeight: 24,
    color: Colors.primary,
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
    fontFamily: "po-r",
    lineHeight: 20,
    color: Colors.text_form,
  },
  backButton: {},
});
