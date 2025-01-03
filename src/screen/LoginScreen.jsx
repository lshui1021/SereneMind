import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { colors } from '../utils/color';
import { fonts } from '../utils/fonts';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
    const [secureEntery, setSecureEntery] = useState(true);
    const navigation = useNavigation()

    const handleGoBack = () =>{
        navigation.navigate("HOME");
      }
      const handleRegister = () => {
        navigation.navigate("REGISTER");
      };
  return (

    <View style={styles.container}>
      <TouchableOpacity style={styles.backButtonWrapper}  onPress ={handleGoBack}>
        <MaterialIcons
            name={"keyboard-arrow-left"}
            color={colors.primary}
            size={40}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Welcome back!</Text>
        <Text style={styles.headingText}>Glad to see you, Again!</Text>
      </View>
     
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <MaterialIcons name={"mail-outline"} size={30} color={colors.secondary}/>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your Email"
              placeholderTextColor={colors.secondary}
              keyboardType="email-address"/>
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcons name={"lock-outline"} size={30} color={colors.secondary}/>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            placeholderTextColor={colors.secondary}
            secureTextEntry={secureEntery}
          />
          <TouchableOpacity
            onPress={() => {
              setSecureEntery((prev) => !prev);
            }}
          >
            <SimpleLineIcons name={"eye"} size={20} color={colors.secondary} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButtonWrapper}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.continueText}>or continue with</Text>

        <TouchableOpacity style={styles.googleButtonContainer}>
          <Image
            source={require("../assets/google.png")}
            style={styles.googleImage}
          />
          <Text style={styles.googleText}>Google</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Don’t have an account?</Text>
          <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.signupText}>Register now</Text>
          </TouchableOpacity>
        </View>
      </View>  
    </View>
  )
}

export default LoginScreen

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