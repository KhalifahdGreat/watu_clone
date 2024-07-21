import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Form from "@/components/Form";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import GenericButton from "@/components/Button";
import BackButton from "@/components/BackButton";

interface FormValues {
  email: string;
  password: string;
}

// Validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const MyComponent = () => {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = (values: FormValues) => {
    // Handle form submission
    console.log(values);
    // You can redirect or perform other actions here
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
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <Form
              formHeader={"Welcome Back"}
              headerStyle={styles.customHeaderStyle}>
              <View style={styles.inputContainer}>
                {!isEmailFocused && !values.email && (
                  <Text style={styles.placeholderText}>Email</Text>
                )}
                <TextInput
                  style={styles.input}
                  placeholder=''
                  keyboardType='email-address'
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => {
                    handleBlur("email");
                    setIsEmailFocused(false);
                  }}
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
              <View style={styles.inputContainer}>
                {!isPasswordFocused && !values.password && (
                  <Text style={styles.placeholderText}>Password</Text>
                )}
                <TextInput
                  style={styles.input}
                  placeholder=''
                  secureTextEntry={!isPasswordVisible}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => {
                    handleBlur("password");
                    setIsPasswordFocused(false);
                  }}
                />
                <TouchableOpacity
                  onPress={togglePasswordVisibility}
                  style={styles.icon}>
                  <Ionicons
                    name={isPasswordVisible ? "eye-off" : "eye"}
                    size={24}
                    color={Colors.text_form}
                  />
                </TouchableOpacity>
                {errors.password && touched.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>
              <View style={styles.forgotContainer}>
                <Link href={""} style={styles.forgotText} className='underline'>
                  Forgot your Password?
                </Link>
              </View>

              <GenericButton
                buttonName='Login'
                IconColor='#808080'
                genericBtnFunction={handleSubmit}
                buttonStyle={styles.button}
                buttonTextStyle={styles.buttonText}
                disabled={false}
              />
              <View style={styles.bottomAlternative} className='leading-[5px]'>
                <Text style={[styles.bottomText, styles.bottomTextOne]}>
                  Don't have an account?
                </Text>
                <Link href={"(onBoard)/login"}>
                  {" "}
                  <Text
                    style={[styles.bottomText, styles.bottomTextTwo]}
                    className='underline'>
                    Sign up
                  </Text>
                </Link>
              </View>
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
    backgroundColor: Colors.button_inactive, // Adjust the background color as needed
    justifyContent: "center",
    alignItems: "center",
    width: "100%", // Ensure the button takes the full width
  },
  buttonText: {
    color: Colors.button_text_inactive, // Adjust text color as needed
    fontSize: 16,
    fontFamily: "po-r", // Adjust font size as needed
  },
  forgotContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  forgotText: {
    fontFamily: "po-r",
    fontSize: 11,
    color: Colors.primary,
    lineHeight: 18.5,
  },
  bottomAlternative: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  bottomText: {
    fontSize: 13,
    fontFamily: "po-r",
  },
  bottomTextOne: {
    color: Colors.bottomText,
  },
  bottomTextTwo: {
    color: Colors.primary,
  },
  customHeaderStyle: {
    marginBottom: 8,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    position: "absolute",
    bottom: -20,
  },
});

export default MyComponent;
