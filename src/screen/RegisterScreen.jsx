import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView } from "react-native";
import { colors } from "../utils/color";
import { fonts } from "../utils/fonts";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureEntry, setSecureEntry] = useState(true);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const onSignup = () => {
    if (!isTermsAccepted) {
      Alert.alert("Error", "You must agree to the terms and conditions to register.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log("User account created & signed in!");
        Alert.alert("Success", "Account created successfully!");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          Alert.alert("Error", "That email address is already in use!");
        } else if (error.code === "auth/invalid-email") {
          Alert.alert("Error", "That email address is invalid!");
        } else {
          Alert.alert("Error", "An unexpected error occurred!");
        }
      });
  };

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.navigate("HOME");
  };

  const handleLogin = () => {
    navigation.navigate("LOGIN");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
        <MaterialIcons name={"keyboard-arrow-left"} color={colors.primary} size={40} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Hello!</Text>
        <Text style={styles.headingText}>Register to get started!</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <AntDesign name={"user"} size={30} color={colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Username"
            placeholderTextColor={colors.secondary}
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcons name={"mail-outline"} size={30} color={colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            placeholderTextColor={colors.secondary}
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcons name={"lock-outline"} size={30} color={colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            placeholderTextColor={colors.secondary}
            secureTextEntry={secureEntry}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            onPress={() => {
              setSecureEntry((prev) => !prev);
            }}
          >
            <SimpleLineIcons name={"eye"} size={20} color={colors.secondary} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcons name={"lock-outline"} size={30} color={colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Confirm password"
            placeholderTextColor={colors.secondary}
            secureTextEntry={secureEntry}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <TouchableOpacity
            onPress={() => {
              setSecureEntry((prev) => !prev);
            }}
          >
            <SimpleLineIcons name={"eye"} size={20} color={colors.secondary} />
          </TouchableOpacity>
        </View>

        {/* Terms and Conditions */}
        <View style={styles.termsContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setIsTermsAccepted((prev) => !prev)}
          >
            <View
              style={[
                styles.checkboxInner,
                { backgroundColor: isTermsAccepted ? colors.primary : colors.white },
              ]}
            />
          </TouchableOpacity>
          <Text style={styles.termsText}>
            I agree to the{" "}
            <Text
              style={styles.linkText}
              onPress={() => navigation.navigate("POLICY")} // 或 openPrivacyPolicy()
            >
              Terms and Conditions
            </Text>
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.loginButtonWrapper, !isTermsAccepted && styles.disabledButton]}
          onPress={onSignup}
        >
          <Text style={styles.loginText}>Register</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Already have an account?</Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.signupText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.lightpink,
    padding: 20,
  },
  backButtonWrapper: {
    height: 50,
    width: 50,
    backgroundColor: colors.gray,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginVertical: 20,
  },
  headingText: {
    fontSize: 30,
    color: colors.primary,
    fontFamily: fonts.SemiBold,
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    marginVertical: 10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: fonts.Light,
    fontSize: 15,
    color: colors.primary,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkbox: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: colors.secondary,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxInner: {
    height: 14,
    width: 14,
  },
  termsText: {
    fontSize: 14,
    color: colors.primary,
  },
  linkText: {
    fontSize: 14,
    color: colors.primary,
    textDecorationLine: "underline",
  },
  loginButtonWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    marginTop: 20,
  },
  loginText: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.SemiBold,
    textAlign: "center",
    padding: 10,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  accountText: {
    color: colors.primary,
    fontFamily: fonts.Regular,
  },
  signupText: {
    color: colors.primary,
    fontFamily: fonts.Bold,
  },
  disabledButton: {
    backgroundColor: colors.gray,
  },
});
