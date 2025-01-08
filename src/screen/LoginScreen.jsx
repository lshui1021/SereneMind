import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from "react-native";
import { colors } from "../utils/color";
import { fonts } from '../utils/fonts';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";

const LoginScreen = () => {
  const [secureEntry, setSecureEntry] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const loginWithEmailAndPassword = () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and password are required.");
      return;
    }

    auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log("Login Successful:", res);
        Alert.alert("Login Successful", "Welcome back to the app!");
        navigation.navigate("DIARY"); // Navigate to Diary screen
      })
      .catch((err) => {
        console.log(err);
        switch (err.code) {
          case "auth/invalid-email":
            Alert.alert("Login Error", "Invalid email format.");
            break;
          case "auth/user-not-found":
            Alert.alert("Login Error", "No user found with this email.");
            break;
          case "auth/wrong-password":
            Alert.alert("Login Error", "Incorrect password.");
            break;
          default:
            Alert.alert("Login Error", "Something went wrong. Please try again.");
        }
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButtonWrapper}
        onPress={() => navigation.navigate("HOME")}
      >
        <MaterialIcons
          name={"keyboard-arrow-left"}
          color={colors.primary}
          size={40}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Welcome back!</Text>
        <Text style={styles.headingText}>Glad to see you again!</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <MaterialIcons name={"mail-outline"} size={30} color={colors.secondary} />
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.textInput}
            placeholder="Enter your Email"
            placeholderTextColor={colors.secondary}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcons name={"lock-outline"} size={30} color={colors.secondary} />
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.textInput}
            placeholder="Enter your password"
            placeholderTextColor={colors.secondary}
            secureTextEntry={secureEntry}
          />
          <TouchableOpacity
            onPress={() => {
              setSecureEntry((prev) => !prev);
            }}
          >
            <SimpleLineIcons name={"eye"} size={20} color={colors.secondary} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButtonWrapper}
          onPress={loginWithEmailAndPassword}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Don’t have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("REGISTER")}>
            <Text style={styles.signupText}>Register now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightpink,
        padding: 20
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
        fontFamily: fonts.SemiBold
      },
      formContainer:{
        marginTop: 20,
      },
      inputContainer:{
        borderWidth: 1,
        borderColor: colors.seconary,
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
        color:colors.primary
      },
      forgotPasswordText: {
        textAlign: "right",
        color: colors.primary,
        fontFamily: fonts.SemiBold,
        marginVertical: 10,
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
      continueText: {
        textAlign: "center",
        marginVertical: 20,
        fontSize: 14,
        fontFamily: fonts.Regular,
        color: colors.primary,
      },
      googleButtonContainer: {
        flexDirection: "row",
        borderWidth: 2,
        borderColor: colors.primary,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        gap: 10,
      },
      googleImage: {
        height: 30,
        width: 30,
      },
      googleText: {
        fontSize: 20,
        fontFamily: fonts.SemiBold,
      },
      footerContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
        gap: 5,
      },
      accountText: {
        color: colors.primary,
        fontFamily: fonts.Regular,
      },
      signupText: {
        color: colors.primary,
        fontFamily: fonts.Bold,
      }
});