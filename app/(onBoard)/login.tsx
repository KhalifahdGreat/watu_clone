import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import Form from "@/components/Form";

import { router, useRouter } from "expo-router";
import LogOptions from "@/components/LogOptions";

const MyComponent = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("@/assets/images/backBlack.png")}
        style={styles.imageBackground}>
        <View>
          <Form
            formHeader={"Create an account"}
            formDescription={
              "Choose any of the method below to continue your account create. "
            }>
            <View className='flex '>
              <LogOptions
                iconName='mail-outline'
                btnText='Continue with email'
                onPress={() => router.push("(onBoard)/mailVerification")}
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
});

export default MyComponent;
