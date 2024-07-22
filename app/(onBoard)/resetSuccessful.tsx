import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Text,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter, Link } from "expo-router";
import Colors from "@/constants/Colors";
import GenericButton from "@/components/Button";
import BackButton from "@/components/BackButton";
import Form from "@/components/Form";

const RecoverPassword = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login"); // Navigate to login screen
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' />
      <BackButton style={{}} />
      <ImageBackground
        source={require("@/assets/images/backBlue.png")}
        style={styles.imageBackground}>
        <Form>
          <View style={styles.contentContainer}>
            <MaterialCommunityIcons
              name='checkbox-marked-circle-outline'
              size={80}
              color='green'
              style={styles.icon}
            />
            <Text style={styles.successText}>Successful</Text>
            <Text style={styles.messageText}>
              Reset password email has been resent to glory.ayeku@bytelabs.ng
            </Text>
            <GenericButton
              buttonName='Login'
              IconColor='#fff'
              genericBtnFunction={handleLogin}
              buttonStyle={styles.button}
              buttonTextStyle={styles.buttonText}
              disabled={false}
            />
            <Link href={"/recover-password"} style={styles.link}>
              Back
            </Link>
          </View>
        </Form>
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
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  icon: {
    marginBottom: 20,
  },
  successText: {
    fontSize: 20,
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "po-r",
  },
  messageText: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "po-r",
  },
  button: {
    height: 60, // Match the height of the input containers
    borderRadius: 8,
    backgroundColor: Colors.primary, // Default background color for the button
    justifyContent: "center",
    alignItems: "center",
    width: "100%", // Ensure the button takes the full width
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "po-r",
  },
  link: {
    fontFamily: "po-r",
    fontSize: 13,
    color: Colors.primary,
    textAlign: "center",
  },
});

export default RecoverPassword;
