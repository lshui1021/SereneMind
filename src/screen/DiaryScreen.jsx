import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";


const DiaryScreen = () => {
  const [diaries, setDiaries] = useState([]);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      fetchDiaries();
    }, [])
  );

  const fetchDiaries = async () => {
    try {
      const user = auth().currentUser;
      if (!user) {
        Alert.alert("Error", "User not logged in.");
        return;
      }

      const snapshot = await firestore()
        .collection("diaries")
        .where("userId", "==", user.uid)
        .orderBy("createdAt", "desc")
        .get();

      const fetchedDiaries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDiaries(fetchedDiaries);
    } catch (error) {
      console.error("Error fetching diaries: ", error);
      Alert.alert("Error", "Failed to fetch diaries.");
    }
  };

  const deleteDiary = async (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this diary?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await firestore().collection("diaries").doc(id).delete();
              Alert.alert("Success", "Diary deleted successfully!");
              fetchDiaries();
            } catch (error) {
              console.error("Error deleting diary: ", error);
              Alert.alert("Error", "Failed to delete diary.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const navigateToEditDiary = (id) => {
    navigation.navigate("EditDiary", { id });
  };

  const navigateToViewDiary = (id) => {
    navigation.navigate("ViewDiary", { id });
  };

  const renderDiary = ({ item }) => (
    <Swipeable
      renderRightActions={() => (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteDiary(item.id)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      )}
    >
      <View style={styles.diaryItem}>
        <View style={styles.diaryHeader}>
          <Text style={styles.date}>{item.createdAt?.toDate().toISOString().split("T")[0]}</Text>
          <View style={styles.moodBubble}>
            <Text style={styles.moodText}>{item.mood}</Text>
          </View>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.content}>
          {item.content.length > 100 ? `${item.content.slice(0, 100)}...` : item.content}
        </Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.analysisButton}
            onPress={() => console.log(`Analysis for: ${item.title}`)}
          >
            <Text style={styles.analysisText}>Analysis Result</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigateToEditDiary(item.id)}
          >
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() => navigateToViewDiary(item.id)}
          >
            <Text style={styles.viewText}>View</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={diaries}
        keyExtractor={(item) => item.id}
        renderItem={renderDiary}
        ListHeaderComponent={<Text style={styles.header}>My Diaries</Text>}
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddDiary")}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};
export default DiaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  listContent: {
    paddingBottom: 80,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 16,
  },
  diaryItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  diaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
  },
  moodBubble: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: "#E0F7FA",
    alignItems: "center",
    justifyContent: "center",
  },
  moodText: {
    fontSize: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  content: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  analysisButton: {
    flex: 2,
    backgroundColor: "#E3F2FD",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  analysisText: {
    fontSize: 12,
    color: "#1E88E5",
    fontWeight: "bold",
  },
  editButton: {
    flex: 1,
    backgroundColor: "#FFE0B2",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  editText: {
    fontSize: 12,
    color: "#FF9800",
    fontWeight: "bold",
  },
  viewButton: {
    flex: 1,
    backgroundColor: "#C8E6C9",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  viewText: {
    fontSize: 12,
    color: "#388E3C",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#FFCDD2",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    borderRadius: 10,
    marginBottom: 12,
  },
  deleteButtonText: {
    color: "#D32F2F",
    fontSize: 16,
    fontWeight: "bold",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#5E84E2",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
  }
});
