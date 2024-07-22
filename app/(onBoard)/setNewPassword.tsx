import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Form from "@/components/Form";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import GenericButton from "@/components/Button";
import BackButton from "@/components/BackButton";

// Validation schema
const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("New Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("newPassword"), ""], "Passwords must match"),
});

const PasswordReset = () => {
  const router = useRouter();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (values: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    // Handle form submission
    console.log(values);
    router.push(""); // Example of navigation after submission
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' />
      <BackButton style={{}} />
      <ImageBackground
        source={require("@/assets/images/backBlue.png")}
        style={styles.imageBackground}>
        <Formik
          initialValues={{ newPassword: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
            dirty,
          }) => (
            <Form
              formHeader={"Password Reset"}
              headerStyle={styles.customHeaderStyle}
              formDescription={""}
              descriptionStyle={styles.customDescriptionStyle}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder='New Password'
                  secureTextEntry={!showNewPassword}
                  value={values.newPassword}
                  onChangeText={handleChange("newPassword")}
                  onBlur={handleBlur("newPassword")}
                />
                <TouchableOpacity
                  onPress={() => setShowNewPassword(!showNewPassword)}
                  style={styles.icon}>
                  <Ionicons
                    name={showNewPassword ? "eye-outline" : "eye-off-outline"}
                    size={24}
                    color={Colors.text_form}
                  />
                </TouchableOpacity>
                {errors.newPassword && touched.newPassword && (
                  <Text style={styles.errorText}>{errors.newPassword}</Text>
                )}
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder='Confirm Password'
                  secureTextEntry={!showConfirmPassword}
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.icon}>
                  <Ionicons
                    name={
                      showConfirmPassword ? "eye-outline" : "eye-off-outline"
                    }
                    size={24}
                    color={Colors.text_form}
                  />
                </TouchableOpacity>
                {errors.confirmPassword && touched.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
              </View>
              <GenericButton
                buttonName='Reset'
                IconColor={
                  dirty && isValid ? "#fff" : Colors.button_text_inactive
                }
                genericBtnFunction={handleSubmit}
                buttonStyle={[
                  styles.button,
                  !(isValid && dirty) && styles.buttonDisabled,
                ]}
                buttonTextStyle={[
                  styles.buttonText,
                  {
                    color:
                      dirty && isValid ? "#fff" : Colors.button_text_inactive,
                  },
                ]}
                disabled={!(isValid && dirty)}
              />
            </Form>
          )}
        </Formik>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    paddingRight: 10, // To ensure the icon has some space on the right
    position: "relative",
    height: 60, // Adjust the height to ensure proper alignment
    width: "100%",
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    fontFamily: "po-r",
    color: "#000", // Color for the input text
  },
  icon: {
    marginLeft: 10, // To ensure there is some space between the input field and the icon
  },
  button: {
    height: 60, // Match the height of the input containers
    borderRadius: 8,
    backgroundColor: Colors.primary, // Default background color for the button
    justifyContent: "center",
    alignItems: "center",
    width: "100%", // Ensure the button takes the full width
  },
  buttonDisabled: {
    backgroundColor: Colors.button_inactive, // Disabled background color
  },
  buttonText: {
    color: "#fff", // Default text color
    fontSize: 16,
    fontFamily: "po-r", // Adjust font size as needed
  },
  customHeaderStyle: {
    marginBottom: 20,
  },
  customDescriptionStyle: {},
  errorText: {
    color: "red",
    fontSize: 12,
    position: "absolute",
    bottom: -20,
  },
});

export default PasswordReset;
