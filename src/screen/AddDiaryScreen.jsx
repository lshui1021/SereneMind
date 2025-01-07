import { Alert, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../utils/color';
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DateTimePicker from '@react-native-community/datetimepicker';
import { firebase } from '../firebase/config'; // Assuming firebase is configured in this path

const AddDiaryScreen = () => {
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState("😊");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Function to handle date change
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate && selectedDate <= new Date()) {
      setDate(selectedDate); // Update the date
    } else if (selectedDate) {
      Alert.alert("Error", "You cannot select a future date.");
    }
  };

  // Function to add diary to Firebase
  const addDiary = async () => {
    if (!title || !content || !mood) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    try {
      const formattedDate = date.toISOString().split("T")[0]; // Format the date to yyyy-mm-dd

      // Firebase - Add diary to Firestore
      await firebase.firestore().collection("diaries").add({
        title,
        content,
        mood,
        created_at: formattedDate,
        analysis_result: "", // Add analysis result if required
      });

      Alert.alert("Success", "Diary added successfully!");
      setTitle('');
      setContent('');
      setMood("😊");
      setDate(new Date()); // Reset to today
      navigation.goBack(); // Return to the previous screen
    } catch (error) {
      console.error("Error adding diary:", error);
      Alert.alert("Error", "Failed to add diary.");
    }
  };

  const displayDate =
    date.toDateString() === new Date().toDateString() ? "Today" : date.toDateString();

  const handleDiary = () => {
    navigation.navigate("DIARY");
  };

  return (
    <View style={styles.container}>
      
      
      {/* Date Selection */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateText}>{displayDate}</Text>
        </TouchableOpacity>
        
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        )}
      </View>

      {/* Title Input */}
      <TextInput
        style={styles.titleInput}
        value={title}
        onChangeText={setTitle}
        placeholder="Headline"
        placeholderTextColor="#aaa"
      />

      {/* Content Input */}
      <TextInput
        style={styles.contentInput}
        value={content}
        onChangeText={setContent}
        placeholder="Start typing..."
        placeholderTextColor="#aaa"
        multiline
      />

      {/* Mood Selection */}
      <Text style={styles.moodText}>How do you feel today?</Text>
      <View style={styles.moodContainer}>
        {["😡", "😢", "😐", "😊", "😁"].map((emoji) => (
          <TouchableOpacity
            key={emoji}
            style={[
              styles.moodButton,
              mood === emoji ? styles.moodSelected : null,
            ]}
            onPress={() => setMood(emoji)}
          >
            <Text style={styles.emoji}>{emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={addDiary}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  dateText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#555",
  },
  titleInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  contentInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    height: 150,
    fontSize: 16,
    textAlignVertical: "top",
    backgroundColor: "#fff",
  },
  moodText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  moodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  moodButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  moodSelected: {
    borderColor: "#6C63FF",
    backgroundColor: "#E0E0FF",
  },
  emoji: {
    fontSize: 24,
  },
  saveButton: {
    backgroundColor: "#6C63FF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  saveText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AddDiaryScreen;
