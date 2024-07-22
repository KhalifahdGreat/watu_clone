import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { Formik } from "formik";
import * as Yup from "yup";
import Form from "@/components/Form";
import Radio from "@/components/Radio";
import GenericButton from "@/components/Button";
import { Link } from "expo-router";
import CustomDropdown from "@/components/CustomDropdown";
import useCountriesAndPostalCodes from "@/hooks/useCountriesAndPostalCodes";
import CheckBox from "@/components/CheckBox";
import BackButton from "@/components/BackButton";

interface FormValues {
  acctType: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  postalCode?: string;
  country: string;
  password: string;
  confirmPassword: string;
  referralCode?: string;
  businessEmail?: string;
}

const validationSchema = Yup.object().shape({
  acctType: Yup.string().required("Account type is required"),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().required("This field is required"),
  phoneNumber: Yup.string().when("email", (email, schema) => {
    const isPersonalEmail = email && !email.includes("@company.com"); // Adjust this condition as needed
    return isPersonalEmail
      ? schema.required("Phone Number is required")
      : schema.notRequired();
  }),
  postalCode: Yup.string().when("acctType", (acctType, schema) => {
    if (Array.isArray(acctType)) {
      // Handle array case if needed
      return schema.notRequired();
    }
    return acctType === "Personal"
      ? schema.required("Postal Code is required")
      : schema.notRequired();
  }),
  country: Yup.string().required("Country is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
  referralCode: Yup.string().optional(),
  businessEmail: Yup.string().when("acctType", {
    is: "Business",
    then: (schema) =>
      schema.email("Invalid email").required("Business Email is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const CreateAccount = () => {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [acctType, setAcctType] = useState("Personal");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const { countries, loading, error } = useCountriesAndPostalCodes();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <BackButton style={styles.backbutton} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Formik
          initialValues={{
            acctType: "Personal",
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            postalCode: "",
            country: "",
            password: "",
            confirmPassword: "",
            referralCode: "",
            businessEmail: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values: FormValues) => {
            if (agreeTerms) {
              console.log(values);
              router.push("");
            } else {
              alert("You must agree to the terms and conditions");
            }
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <View style={styles.container}>
              <StatusBar barStyle='light-content' />
              <ImageBackground
                source={require("@/assets/images/backBlue.png")}
                style={styles.imageBackground}>
                <View>
                  <Form
                    formHeader={"Create a Free Account"}
                    headerStyle={styles.customHeaderStyle}>
                    <View>
                      <Radio
                        options={[
                          { label: "Personal", value: "Personal" },
                          { label: "Business", value: "Business" },
                        ]}
                        checkedValue={acctType}
                        onChange={(value: string) => {
                          setAcctType(value);
                          handleChange("acctType")(value);
                        }}
                        style={{ margin: "10px" }}
                      />
                    </View>
                    <View style={styles.inputRow}>
                      <View
                        style={styles.halfInputContainer}
                        key='firstNameContainer'>
                        {!values.firstName && (
                          <Text style={styles.placeholderText}>First Name</Text>
                        )}
                        <TextInput
                          style={styles.input}
                          placeholder=''
                          value={values.firstName}
                          onChangeText={handleChange("firstName")}
                          onBlur={handleBlur("firstName")}
                        />
                        <Ionicons
                          name='person-outline'
                          size={24}
                          color={Colors.text_form}
                          style={styles.icon}
                        />
                        {touched.firstName && errors.firstName && (
                          <Text style={styles.errorText}>
                            {errors.firstName}
                          </Text>
                        )}
                      </View>
                      <View
                        style={styles.halfInputContainer}
                        key='lastNameContainer'>
                        {!values.lastName && (
                          <Text style={styles.placeholderText}>Last Name</Text>
                        )}
                        <TextInput
                          style={styles.input}
                          placeholder=''
                          value={values.lastName}
                          onChangeText={handleChange("lastName")}
                          onBlur={handleBlur("lastName")}
                        />
                        <Ionicons
                          name='person-outline'
                          size={24}
                          color={Colors.text_form}
                          style={styles.icon}
                        />
                        {touched.lastName && errors.lastName && (
                          <Text style={styles.errorText}>
                            {errors.lastName}
                          </Text>
                        )}
                      </View>
                    </View>
                    <View
                      style={styles.fullInputContainer}
                      key='emailContainer'>
                      {!values.email && (
                        <Text style={styles.placeholderText}>
                          {acctType === "Personal" ? "Email" : "Business Name"}
                        </Text>
                      )}
                      <TextInput
                        style={styles.input}
                        placeholder=''
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
                      {touched.email && errors.email && (
                        <Text style={styles.errorText}>{errors.email}</Text>
                      )}
                    </View>
                    {acctType === "Business" && (
                      <View
                        style={styles.fullInputContainer}
                        key='businessEmailContainer'>
                        {!values.businessEmail && (
                          <Text style={styles.placeholderText}>
                            Business Email
                          </Text>
                        )}
                        <TextInput
                          style={styles.input}
                          placeholder=''
                          value={values.businessEmail}
                          onChangeText={handleChange("businessEmail")}
                          onBlur={handleBlur("businessEmail")}
                        />
                        <Ionicons
                          name='mail-outline'
                          size={24}
                          color={Colors.text_form}
                          style={styles.icon}
                        />
                        {touched.businessEmail && errors.businessEmail && (
                          <Text style={styles.errorText}>
                            {errors.businessEmail}
                          </Text>
                        )}
                      </View>
                    )}
                    {acctType === "Personal" && (
                      <>
                        <View style={styles.inputRow}>
                          <View
                            style={styles.halfInputContainer}
                            key='postalCodeContainer'>
                            <CustomDropdown
                              label='Postal Code'
                              options={countries.map((country) => ({
                                label: country.callingCode,
                                value: country.callingCode,
                                flag: country.flag,
                                key: country.callingCode,
                              }))}
                              selectedValue={values.country}
                              onValueChange={handleChange("postalCode")}
                            />
                            {touched.postalCode && errors.postalCode && (
                              <Text style={styles.errorText}>
                                {errors.postalCode}
                              </Text>
                            )}
                          </View>
                          <View
                            style={styles.halfInputContainer}
                            key='phoneNumberContainer'>
                            {!values.phoneNumber && (
                              <Text style={styles.placeholderText}>
                                Phone Number
                              </Text>
                            )}
                            <TextInput
                              style={styles.input}
                              placeholder=''
                              value={values.phoneNumber}
                              onChangeText={handleChange("phoneNumber")}
                              onBlur={handleBlur("phoneNumber")}
                            />
                            <Ionicons
                              name='call-outline'
                              size={24}
                              color={Colors.text_form}
                              style={styles.icon}
                            />
                            {touched.phoneNumber && errors.phoneNumber && (
                              <Text style={styles.errorText}>
                                {errors.phoneNumber}
                              </Text>
                            )}
                          </View>
                        </View>
                        <View
                          style={styles.fullInputContainer}
                          key='referralCodeContainer'>
                          {!values.referralCode && (
                            <Text style={styles.placeholderText}>
                              Referral Code
                            </Text>
                          )}
                          <TextInput
                            style={styles.input}
                            placeholder=''
                            value={values.referralCode}
                            onChangeText={handleChange("referralCode")}
                            onBlur={handleBlur("referralCode")}
                          />
                          <Ionicons
                            name='gift-outline'
                            size={24}
                            color={Colors.text_form}
                            style={styles.icon}
                          />
                          {touched.referralCode && errors.referralCode && (
                            <Text style={styles.errorText}>
                              {errors.referralCode}
                            </Text>
                          )}
                        </View>
                      </>
                    )}
                    <View
                      style={styles.fullInputContainer}
                      key='countryContainer'>
                      <CustomDropdown
                        label='Country'
                        options={countries.map((country) => ({
                          label: country.name,
                          value: country.name,
                          flag: country.flag,
                          key: country.name,
                        }))}
                        selectedValue={values.country}
                        onValueChange={handleChange("country")}
                      />
                      {touched.country && errors.country && (
                        <Text style={styles.errorText}>{errors.country}</Text>
                      )}
                    </View>
                    <View
                      style={styles.fullInputContainer}
                      key='passwordContainer'>
                      {!values.password && (
                        <Text style={styles.placeholderText}>Password</Text>
                      )}
                      <TextInput
                        style={styles.input}
                        placeholder=''
                        secureTextEntry={!isPasswordVisible}
                        value={values.password}
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                      />
                      <TouchableOpacity
                        onPress={togglePasswordVisibility}
                        style={styles.icon}>
                        <Ionicons
                          name={
                            isPasswordVisible
                              ? "eye-off-outline"
                              : "eye-outline"
                          }
                          size={24}
                          color={Colors.text_form}
                        />
                      </TouchableOpacity>
                      {touched.password && errors.password && (
                        <Text style={styles.errorText}>{errors.password}</Text>
                      )}
                    </View>
                    <View
                      style={styles.fullInputContainer}
                      key='confirmPasswordContainer'>
                      {!values.confirmPassword && (
                        <Text style={styles.placeholderText}>
                          Confirm Password
                        </Text>
                      )}
                      <TextInput
                        style={styles.input}
                        placeholder=''
                        secureTextEntry={!isConfirmPasswordVisible}
                        value={values.confirmPassword}
                        onChangeText={handleChange("confirmPassword")}
                        onBlur={handleBlur("confirmPassword")}
                      />
                      <TouchableOpacity
                        onPress={toggleConfirmPasswordVisibility}
                        style={styles.icon}>
                        <Ionicons
                          name={
                            isConfirmPasswordVisible
                              ? "eye-off-outline"
                              : "eye-outline"
                          }
                          size={24}
                          color={Colors.text_form}
                        />
                      </TouchableOpacity>
                      {touched.confirmPassword && errors.confirmPassword && (
                        <Text style={styles.errorText}>
                          {errors.confirmPassword}
                        </Text>
                      )}
                    </View>
                    <View>
                      <CheckBox onChange={setAgreeTerms} />
                    </View>
                    <GenericButton
                      IconColor='#fff'
                      buttonName='Proceed'
                      genericBtnFunction={handleSubmit}
                      buttonStyle={[
                        styles.button,
                        (!agreeTerms || !isValid) && styles.buttonDisabled,
                      ]} // Disable button if terms not agreed
                      buttonTextStyle={styles.buttonText}
                      disabled={!agreeTerms || !isValid} // Disable button if terms not agreed
                    />
                    <View
                      style={styles.bottomAlternative}
                      key='loginLink'
                      className='leading-[5px]'>
                      <Text style={[styles.bottomText, styles.bottomTextOne]}>
                        Already have an account?
                      </Text>
                      <Link href={"(onBoard)/welcome"}>
                        <Text
                          style={[styles.bottomText, styles.bottomTextTwo]}
                          className='underline'>
                          Log in
                        </Text>
                      </Link>
                    </View>
                  </Form>
                </View>
              </ImageBackground>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    fontFamily: "po-r",
    color: "#000",
  },
  inputAndroid: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    fontFamily: "po-r",
    color: "#000",
  },
  iconContainer: {
    top: 15,
    right: 10,
  },
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
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
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    paddingRight: 10, // To ensure the icon has some space on the right
    position: "relative",
    height: 55, // Adjust the height to ensure proper alignment
    width: "48%",
  },
  fullInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    paddingRight: 10, // To ensure the icon has some space on the right
    position: "relative",
    height: 55, // Adjust the height to ensure proper alignment
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
    backgroundColor: Colors.primary, // Adjust the background color as needed
    justifyContent: "center",
    alignItems: "center",
    width: "100%", // Ensure the button takes the full width
  },
  buttonDisabled: {
    backgroundColor: Colors.button_inactive, // Add a disabled color if necessary
  },
  buttonText: {
    color: "#fff", // Adjust text color as needed
    fontSize: 16,
    fontFamily: "po-r", // Adjust font size as needed
  },
  customHeaderStyle: {
    marginBottom: 16,
  },
  bottomAlternative: {
    flexDirection: "row",
    justifyContent: "center",
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
  errorText: {
    color: "red",
    fontSize: 8,
    position: "absolute",
    bottom: -13,
  },
  backbutton: {
    position: "absolute",
    top: -30,
  },
});

export default CreateAccount;
