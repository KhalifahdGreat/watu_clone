import React, { ReactNode } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextStyle,
  ViewStyle,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Watu from "@/assets/svg/Watu logo (white).svg";
import Colors from "@/constants/Colors";
import BackButton from "./BackButton";

interface Prop {
  formHeader: string;
  formDescription?: string;
  children: ReactNode;
  headerStyle?: TextStyle;
  descriptionStyle?: TextStyle;
}

const { width: screenWidth } = Dimensions.get("window");

export default function Form({
  formHeader,
  formDescription,
  children,
  headerStyle,
  descriptionStyle,
}: Prop) {
  return (
    <View style={styles.container} className='py-2'>
      <Watu />
      <View style={styles.form} className='py-6 px-4'>
        <View>
          <Text style={[styles.header, headerStyle]}>{formHeader}</Text>
          {formDescription ? (
            <Text style={[styles.description, descriptionStyle]}>
              {formDescription}
            </Text>
          ) : null}
        </View>
        <View className='gap-1'>{children}</View>
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
    width: screenWidth - 30,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginHorizontal: 10,
  },
  header: {
    fontSize: 19,
    fontWeight: "bold",
    fontFamily: "gr-sb",
    lineHeight: 24,
    color: Colors.primary,
  },
  description: {
    fontSize: 14,
    fontFamily: "po-r",
    lineHeight: 20,
    color: Colors.text_form,
  },
  backButton: {},
});
