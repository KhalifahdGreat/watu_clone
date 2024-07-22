import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  TextInput,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Form from "@/components/Form";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import GenericButton from "@/components/Button";
import BackButton from "@/components/BackButton";

interface FormValues {
  passcode: string[];
}

// Validation schema
const validationSchema = Yup.object().shape({
  passcode: Yup.array()
    .of(Yup.string().matches(/^\d$/, "Must be a digit").required("Required"))
    .length(4, "Must be exactly 4 digits")
    .required("Passcode is required"),
});

const SetupPasscode = () => {
  const router = useRouter();
  const [passcode, setPasscode] = useState(Array(4).fill(""));

  const handlePasscodeChange = (
    index: number,
    value: string,
    setFieldValue: any
  ) => {
    if (/^\d$/.test(value) || value === "") {
      const newPasscode = [...passcode];
      newPasscode[index] = value;
      setPasscode(newPasscode);
      setFieldValue("passcode", newPasscode);
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
          initialValues={{ passcode: Array(4).fill("") }}
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
              formHeader={"Setup your 4-Digit Passcode"}
              headerStyle={styles.customHeaderStyle}
              formDescription={
                "Make your app secure with a passcode that will be required every time you launch the application."
              }
              descriptionStyle={styles.customDescriptionStyle}>
              <View style={styles.passcodeContainer}>
                {passcode.map((digit, index) => (
                  <TextInput
                    key={index}
                    style={[
                      styles.passcodeInput,
                      errors.passcode && touched.passcode && !digit
                        ? styles.errorBorder
                        : null,
                    ]}
                    value={digit}
                    onChangeText={(value) =>
                      handlePasscodeChange(index, value, setFieldValue)
                    }
                    keyboardType='numeric'
                    maxLength={1}
                    onBlur={handleBlur(`passcode[${index}]`)}
                  />
                ))}
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
  passcodeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 10,
  },
  passcodeInput: {
    width: 60,
    height: 60,
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
});

export default SetupPasscode;
