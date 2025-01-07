import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import React from 'react'
import HomeScreen from './src/screen/HomeScreen';
import LoginScreen from './src/screen/LoginScreen';
import RegisterScreen from './src/screen/RegisterScreen';
import DiaryScreen from './src/screen/DiaryScreen';
import AddDiaryScreen from './src/screen/AddDiaryScreen';
import EditDiaryScreen from './src/screen/EditDiaryScreen';
import ViewDiaryScreen from './src/screen/ViewDiaryScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false,}}>
        <Stack.Screen name={"HOME"} component={HomeScreen}/>
        <Stack.Screen name={"LOGIN"} component={LoginScreen}/>
        <Stack.Screen name={"REGISTER"} component={RegisterScreen}/>
        <Stack.Screen name={"DIARY"} component={DiaryScreen} />
        <Stack.Screen name={"AddDiary"} component={AddDiaryScreen} />
        <Stack.Screen name={"EditDiary"} component={EditDiaryScreen} />
        <Stack.Screen name={"ViewDiary"} component={ViewDiaryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})