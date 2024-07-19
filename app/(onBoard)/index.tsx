import React from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Link, useRouter } from "expo-router";
import Onboard_1 from "@/assets/svg/onBoarding_1.svg";
import Watu from "@/assets/svg/Watu logo-(blue).svg";
import Colors from "@/constants/Colors";
import GenericButton from "@/components/Button";
import { useState, useEffect, useRef } from "react";

export default function OnboardingScreen() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [content, setContent] = useState({
    header: "Finances Safe\n& Secure",
    paragraph:
      "We're excited to have you as a customer and to help you manage your finances in a convenient and secure way.",
  });

  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();

      setTimeout(() => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
        setContent((prevContent) =>
          prevContent.header === "Finances Safe\n& Secure"
            ? {
                header: "Simplify your\nFinancial life",
                paragraph:
                  "Transfer and receive money, pay bills, save effortlessly, invest and lot more features with just a few tap on your device.",
              }
            : {
                header: "Finances Safe\n& Secure",
                paragraph:
                  "We're excited to have you as a customer and to help you manage your finances in a convenient and secure way.",
              }
        );
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, [fadeAnim]);
  const handlePress = (index: number) => {
    setActiveIndex(index);
    if (index === 1) {
      setContent({
        header: "Simplify your\nFinancial life",
        paragraph:
          "Transfer and receive money, pay bills, save effortlessly, invest and lot more features with just a few tap on your device.",
      });
    } else {
      setContent({
        header: "Finances Safe\n& Secure",
        paragraph:
          "We're excited to have you as a customer and to help you manage your finances in a convenient and secure way.",
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' />
      <View className='flex-1 '>
        <Onboard_1 width='100%' />
        <View className='flex-1'>
          <ImageBackground
            source={require("@/assets/images/background_pattern.png")}
            style={styles.imageBackground}>
            <View className='px-4 gap-2 mt-8'>
              <Watu />
              <Animated.Text
                style={[styles.text, { lineHeight: 44, opacity: fadeAnim }]}>
                {content.header}
              </Animated.Text>
              <Animated.Text
                style={[
                  styles.paragraph,
                  { lineHeight: 26, opacity: fadeAnim },
                ]}>
                {content.paragraph}
              </Animated.Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.navigation,
                  {
                    height: 15,
                    backgroundColor:
                      activeIndex === 0 ? Colors.primary : Colors.inactive,
                  },
                  {
                    width: activeIndex === 0 ? 30 : 15,
                    borderRadius: activeIndex === 0 ? 10 : 50,
                  },
                ]}
                onPress={() => handlePress(0)}
              />
              <TouchableOpacity
                style={[
                  styles.navigation,
                  {
                    height: 15,
                    opacity: fadeAnim,
                    backgroundColor:
                      activeIndex === 1 ? Colors.primary : Colors.inactive,
                  },
                  {
                    width: activeIndex === 1 ? 30 : 15,
                    borderRadius: activeIndex === 1 ? 10 : 50,
                  },
                ]}
                onPress={() => handlePress(1)}
              />
            </View>

            <View style={styles.bottomLogin}>
              <GenericButton
                genericBtnFunction={() => router.push("/(onBoard)/login")}
              />
              <View style={styles.bottomAlternative} className='leading-[5px]'>
                <Text style={[styles.bottomText, styles.bottomTextOne]}>
                  Already have an account?
                </Text>
                <Link href={"/login"}>
                  {" "}
                  <Text
                    style={[styles.bottomText, styles.bottomTextTwo]}
                    className='underline'>
                    Log in
                  </Text>
                </Link>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  imageBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  text: {
    fontFamily: "gr-b",
    color: Colors.primary,
    fontSize: 38,
  },
  paragraph: {
    color: Colors.text_grey,
    fontFamily: "po-r",
    fontSize: 14.5,
  },
  navigation: {
    backgroundColor: Colors.primary,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    gap: 8, // Adjust the margin as needed
  },
  bottomLogin: {
    justifyContent: "center",
    gap: 8,
  },
  bottomAlternative: {
    flexDirection: "row",
    justifyContent: "center",
  },
  bottomText: {
    fontSize: 16,
    fontFamily: "po-r",
  },
  bottomTextOne: {
    color: Colors.bottomText,
  },
  bottomTextTwo: {
    color: Colors.secondary,
  },
});
