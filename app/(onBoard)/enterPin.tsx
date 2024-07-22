import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";
import GenericButton from "@/components/Button";
import Watu from "@/assets/svg/Watu logo-(blue).svg";

interface CustomKeyboardProps {
  onKeyPress: (key: string) => void;
}

const CustomKeyboard: React.FC<CustomKeyboardProps> = ({ onKeyPress }) => {
  const keys = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["Sign out", "0", "<"],
  ];

  return (
    <View style={styles.keyboardContainer}>
      {keys.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.keyboardRow}>
          {row.map((key) => (
            <TouchableOpacity
              key={key}
              style={styles.key}
              onPress={() => onKeyPress(key)}>
              {key === "Sign out" ? (
                <Text style={styles.signOutText}>{key}</Text>
              ) : key === "<" ? (
                <Ionicons name='backspace-outline' size={24} color='#000' />
              ) : (
                <Text style={styles.keyText}>{key}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

const PinScreen: React.FC = () => {
  const [pin, setPin] = useState<string[]>(["", "", "", ""]);
  const pinRefs = useRef<Array<TextInput | null>>([]);

  const handleKeyPress = (key: string) => {
    if (key === "Sign out") {
      // Handle sign out logic
      console.log("Sign out pressed");
    } else if (key === "<") {
      // Handle backspace
      let newPin = [...pin];
      for (let i = newPin.length - 1; i >= 0; i--) {
        if (newPin[i] !== "") {
          newPin[i] = "";
          setPin(newPin);
          break;
        }
      }
    } else {
      // Handle number input
      let newPin = [...pin];
      for (let i = 0; i < newPin.length; i++) {
        if (newPin[i] === "") {
          newPin[i] = key;
          setPin(newPin);
          break;
        }
      }
    }
  };

  useEffect(() => {
    // Focus the first empty input field
    for (let i = 0; i < pinRefs.current.length; i++) {
      if (pin[i] === "") {
        pinRefs.current[i]?.focus();
        break;
      }
    }

    // Check if all fields are filled and submit the form
    if (pin.every((digit) => digit !== "")) {
      handleSubmit();
    }
  }, [pin]);

  const handleSubmit = () => {
    // Handle form submission logic
    console.log("PIN submitted:", pin.join(""));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' />
      <Watu />
      <View style={styles.message_input}>
        <Text style={styles.pinText}>Enter your 4-digit passcode</Text>
        <View style={styles.pinContainer}>
          {pin.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.pinInput}
              value={digit}
              ref={(ref) => (pinRefs.current[index] = ref)}
              editable={false}
              selectTextOnFocus={false}
            />
          ))}
        </View>
      </View>

      <View style={styles.forgotLinkContainer}>
        <Link href='/forgot-passcode' style={styles.forgotLink}>
          <View style={styles.forgotLinkContent}>
            <Text style={styles.forgot_input}>Forgot Passcode</Text>
            <AntDesign
              name='questioncircle'
              size={16}
              color={Colors.primary}
              style={styles.forgotIcon}
            />
          </View>
        </Link>
      </View>
      <CustomKeyboard onKeyPress={handleKeyPress} />
      <GenericButton
        buttonName='Biometrics'
        IconColor='#fff'
        genericBtnFunction={() => console.log("Biometrics pressed")}
        buttonStyle={styles.biometricsButton}
        buttonTextStyle={styles.biometricsButtonText}
        icon={<Ionicons name='finger-print' size={18} color='#202020' />}
        disabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 40,
  },
  pinContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  message_input: {
    width: "100%",
    height: 140,
    alignItems: "center", // Center horizontally
    justifyContent: "center", // Center vertically
    backgroundColor: Colors.pin_input,
    borderRadius: 8,
    marginBottom: 20,
    marginTop: 28, // Add margin between Watu logo and message_input
  },
  pinInput: {
    width: 70,
    height: 70,
    backgroundColor: "#fff",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 24,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  pinText: {
    fontFamily: "gr-sb",
    fontSize: 16,
    textAlign: "center",
    paddingTop: 20,
  },
  forgotLinkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  forgotLink: {
    fontSize: 13,
    flexDirection: "row",
    color: Colors.primary,
    fontFamily: "po-r",
    marginRight: 5,
    alignItems: "center", // Add space between the text and the icon
  },
  forgotLinkContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  forgot_input: {
    fontFamily: "po-r",
    color: Colors.primary,
  },
  forgotIcon: {
    marginLeft: 5,
  },
  keyboardContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  keyboardRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  key: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  keyText: {
    fontSize: 30,
    color: "#000",
    fontFamily: "ro-r", // Set the color of the key text to black
  },
  signOutText: {
    fontFamily: "Space Grotesk",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    letterSpacing: -0.02,
    textAlign: "center",
    color: "#AD2525",
  },
  biometricsButton: {
    backgroundColor: Colors.secondary,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 8,
  },
  biometricsButtonText: {
    color: Colors.text_form,
    fontSize: 16,
    marginLeft: 10,
    fontFamily: "gr-r",
    lineHeight: 20,
  },
});

export default PinScreen;
