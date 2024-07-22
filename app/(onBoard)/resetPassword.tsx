import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  TextInput,
  Text,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Form from "@/components/Form";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, Link } from "expo-router";
import Colors from "@/constants/Colors";
import GenericButton from "@/components/Button";
import BackButton from "@/components/BackButton";

// Validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const RecoverPassword = () => {
  const router = useRouter();

  const handleSubmit = (values: { email: string }) => {
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
          initialValues={{ email: "" }}
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
              formHeader={"Recover Password"}
              headerStyle={styles.customHeaderStyle}
              formDescription={
                "Enter the email address you used when you joined and we’ll send you instructions to reset your password"
              }
              descriptionStyle={styles.customDescriptionStyle}>
              <View style={styles.inputContainer}>
                {!values.email && (
                  <Text style={styles.placeholderText}>Email</Text>
                )}
                <TextInput
                  style={styles.input}
                  placeholder=''
                  keyboardType='email-address'
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                />
                <Ionicons
                  name='mail-outline'
                  size={24}
                  color={Colors.text_form}
                  style={styles.icon}
                />
                {errors.email && touched.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>
              <GenericButton
                buttonName='Send reset Link'
                IconColor={
                  dirty && isValid ? "#fff" : Colors.button_text_inactive
                }
                genericBtnFunction={handleSubmit}
                buttonStyle={[
                  styles.button,
                  !(dirty && isValid) && styles.buttonDisabled,
                ]}
                buttonTextStyle={[
                  styles.buttonText,
                  {
                    color:
                      dirty && isValid ? "#fff" : Colors.button_text_inactive,
                  },
                ]}
                disabled={!(dirty && isValid)}
              />
              <Link href={"/welcome"} style={styles.link}>
                Log in
              </Link>
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
    marginBottom: 25,
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
  placeholderText: {
    position: "absolute",
    left: 10,
    top: "50%", // Center vertically
    transform: [{ translateY: -9.75 }], // Adjust based on font size and line height
    fontFamily: "po-r",
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 19.5,
    letterSpacing: -0.02,
    color: "#4D4D4D",
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
    marginBottom: 8,
  },
  customDescriptionStyle: {
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    position: "absolute",
    bottom: -20,
  },
  link: {
    fontFamily: "po-r",
    fontSize: 13,
    color: Colors.primary,
    marginTop: 30,
    textAlign: "center",
  },
});

export default RecoverPassword;
