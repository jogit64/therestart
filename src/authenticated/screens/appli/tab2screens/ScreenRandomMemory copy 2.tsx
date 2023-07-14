import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { ListItem } from "react-native-elements";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { auth } from "../../../../../utils/firebase.js";
import { Memory, Memories } from "./../../../../../utils/types";
import { useNavigation } from "@react-navigation/native";

import LottieView from "lottie-react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import rondBleuAnimation from "./../../../../../assets/animations/rondbleu.json";
import rondVertAnimation from "./../../../../../assets/animations/rondvert.json";

function ScreenRandomMemory() {
  const navigation = useNavigation();
  const userId = auth.currentUser?.uid;
  const db = getFirestore();

  const [randomMemories, setRandomMemories] = useState<{
    [categoryId: string]: Memory[];
  }>({});
  const [categoryNames, setCategoryNames] = useState<{ [id: string]: string }>(
    {}
  );

  const fetchCategoryNames = async () => {
    if (!userId) return;

    const categoriesRef = collection(db, "users", userId, "category");
    const querySnapshot = await getDocs(categoriesRef);

    const categoryNames: { [id: string]: string } = {};
    querySnapshot.forEach((doc) => {
      categoryNames[doc.id] = doc.data().name;
    });

    setCategoryNames(categoryNames);
  };

  const fetchRandomMemories = async () => {
    if (!userId) return;

    // Fetch user memories
    const memoriesRef = collection(db, "users", userId, "memories");
    const querySnapshot = await getDocs(memoriesRef);

    // Build a map of categories to their memories
    const memoriesMap: { [categoryId: string]: Memory[] } = {};
    querySnapshot.forEach((doc) => {
      const memory = {
        id: doc.id,
        text: doc.data().text,
        categoryId: doc.data().categoryId,
      };
      if (!memoriesMap[memory.categoryId]) {
        memoriesMap[memory.categoryId] = [];
      }
      memoriesMap[memory.categoryId].push(memory);
    });

    // For each category, select up to two memories at random
    Object.keys(memoriesMap).forEach((categoryId) => {
      let memories = memoriesMap[categoryId];
      let selectedMemories = [];
      if (memories.length > 1) {
        while (selectedMemories.length < 2) {
          const index = Math.floor(Math.random() * memories.length);
          if (!selectedMemories.includes(memories[index])) {
            selectedMemories.push(memories[index]);
          }
        }
      } else if (memories.length === 1) {
        selectedMemories.push(memories[0]);
      }
      memoriesMap[categoryId] = selectedMemories;
    });

    setRandomMemories(memoriesMap);
  };

  useEffect(() => {
    fetchRandomMemories();
    fetchCategoryNames();
  }, [userId]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {Object.keys(randomMemories).map((categoryId, index) => (
          <View key={index}>
            <Text style={styles.category}>{categoryNames[categoryId]}</Text>
            {randomMemories[categoryId].map((memory, index) => (
              <ListItem
                key={index}
                bottomDivider
                containerStyle={{
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              >
                <ListItem.Content>
                  <ListItem.Title style={styles.text}>
                    {memory.text}
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
            {randomMemories[categoryId].length === 0 && (
              <Text style={styles.noData}>Pas de données</Text>
            )}
          </View>
        ))}
      </ScrollView>
      <View style={styles.bottomBar}>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.lottieButton}
            onPress={() => navigation.navigate("ScreenRandomMemory")}
          >
            <LottieView
              source={rondBleuAnimation}
              autoPlay
              style={styles.animation}
            />
            <MaterialCommunityIcons
              name="watering-can-outline"
              size={40}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.lottieButton}
            onPress={() => navigation.navigate("ScreenManageMemory")}
          >
            <LottieView
              source={rondVertAnimation}
              autoPlay
              style={styles.animation}
            />
            <MaterialCommunityIcons name="shovel" size={40} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    //backgroundColor: "#fff",
  },
  category: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    color: "#000",
  },
  noData: {
    fontSize: 18,
    color: "grey",
    alignSelf: "center",
  },

  scrollView: {
    flex: 0.75,
    backgroundColor: "#f5f5f5", // Changer la couleur de fond si nécessaire
  },
  bottomBar: {
    height: 100, // Changer la hauteur si nécessaire
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "red", // Changer la couleur de fond si nécessaire
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    //marginBottom: 80,
  },
  lottieButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    position: "absolute",
    width: 250,
    height: 250,
  },
  overlay: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1, // Assurez-vous que les icônes apparaissent au-dessus de l'animation
  },
});

export default ScreenRandomMemory;
