import React, { useState } from "react";
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
import { Link, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import GenericButton from "@/components/Button";
import BackButton from "@/components/BackButton";

interface FormValues {
  otp: string[];
}

// Validation schema
const validationSchema = Yup.object().shape({
  otp: Yup.array()
    .of(Yup.string().matches(/^\d$/, "Must be a digit").required("Required"))
    .length(6, "Must be exactly 6 digits")
    .required("OTP is required"),
});

const AccountVerification = () => {
  const router = useRouter();
  const [otp, setOtp] = useState(Array(6).fill(""));

  const handleOtpChange = (
    index: number,
    value: string,
    setFieldValue: any
  ) => {
    if (/^\d$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setFieldValue("otp", newOtp);
    }
  };

  const handleSubmit = (values: FormValues) => {
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
          initialValues={{ otp: Array(6).fill("") }}
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
            setFieldValue,
          }) => (
            <Form
              formHeader={"Account Verification"}
              headerStyle={styles.customHeaderStyle}
              formDescription={
                "Kindly provide the 6-digits OTP sent to your ayekuglory022@gmail.com"
              }
              descriptionStyle={styles.customDescriptionStyle}>
              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    style={[
                      styles.otpInput,
                      errors.otp && touched.otp && !digit
                        ? styles.errorBorder
                        : null,
                    ]}
                    value={digit}
                    onChangeText={(value) =>
                      handleOtpChange(index, value, setFieldValue)
                    }
                    keyboardType='numeric'
                    maxLength={1}
                    onBlur={handleBlur(`otp[${index}]`)}
                  />
                ))}
              </View>
              <View style={styles.otpFooter}>
                <Link href={""} style={styles.link}>
                  Didn’t receive OTP?
                </Link>
                <Text style={styles.resendText}>Resend OTP (55s)</Text>
              </View>
              <GenericButton
                buttonName='Submit'
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
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    textAlign: "center",
    fontSize: 20,
    color: "#000",
  },
  errorBorder: {
    borderColor: "red",
  },
  otpFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
  },
  link: {
    fontFamily: "po-r",
    fontSize: 13,
    color: Colors.primary,
  },
  resendText: {
    fontFamily: "po-r",
    fontSize: 13,
    color: Colors.primary,
  },
  button: {
    height: 60,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  buttonDisabled: {
    backgroundColor: Colors.button_inactive,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "po-r",
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
    marginTop: 10,
  },
});

export default AccountVerification;
