import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import Form from "@/components/Form";

import { useRouter } from "expo-router";
import LogOptions from "@/components/LogOptions";
import BackButton from "@/components/BackButton";

const MyComponent = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("@/assets/images/backBlack.png")}
        style={styles.imageBackground}>
        <View>
          <BackButton style={{}} />
          <Form
            formHeader={"Create an account"}
            formDescription={
              "Choose any of the method below to continue your account create. "
            }
            headerStyle={styles.customHeaderStyle}
            descriptionStyle={styles.customDescriptionStyle}>
            <View>
              <LogOptions
                iconName='mail-outline'
                btnText='Continue with email'
                onPress={() => router.push("(onBoard)/createAccount")}
              />
              <LogOptions
                iconName='logo-whatsapp'
                btnText='Continue with Whatsapp'
                onPress={() => router.push("")}
              />
            </View>
          </Form>
        </View>
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
  customHeaderStyle: {
    marginBottom: 8,
  },
  customDescriptionStyle: {
    marginBottom: 16,
  },
});

export default MyComponent;
