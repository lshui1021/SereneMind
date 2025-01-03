import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../utils/color";
import { fonts } from "../utils/fonts";
import { useNavigation } from "@react-navigation/native";
 
const HomeScreen = () => {
  const navigation = useNavigation();

  const handleLogin = () =>{
    navigation.navigate("LOGIN");
  }
  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo}/>
      <Text style={styles.title}>SereneMind</Text>
      <Text style={styles.subTitle}>
        Every Emotion Matters
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.loginButtonWrapper,
            {backgroundColor: colors.primary},
          ]}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.loginButtonWrapper]}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.lightpink,
        alignItems: "center",
    
    },
    logo:{
        height:450,
        width:300,
        marginVertical:20
    },
    title:{
        fontSize: 40,
        fontFamily: fonts.SemiBold,
        paddingHorizontal: 15,
        marginVertical: 20,
        textAlign: "center",
        color: colors.primary
    },
    subTitle: {
      fontSize: 18,
      textAlign: "center",
      color: colors.gray,
      fontFamily: fonts.Medium,
      marginVertical: 20,
    },
    buttonContainer: {
      marginTop: 20,
      flexDirection: "row",
      borderWidth: 2,
      borderColor: colors.primary,
      width: "80%",
      height: 60,
      borderRadius: 100
    },
    loginButtonWrapper: {
      justifyContent: "center",
      alignItems: "center",
      width: "50%",
      borderRadius: 98
    },
    loginButtonText: {
      color: colors.white,
      fontSize: 18,
      fontFamily: fonts.SemiBold
    },
    registerButtonText: {
      fontSize: 18,
      fontFamily: fonts.SemiBold
    }
})