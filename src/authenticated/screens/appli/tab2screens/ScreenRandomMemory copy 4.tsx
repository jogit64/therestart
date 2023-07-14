import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  Modal,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { ListItem, Button, Icon, Text } from "react-native-elements";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { auth } from "../../../../../utils/firebase.js";
import { Memory, Category, Memories } from "./../../../../../utils/types";
import { useNavigation } from "@react-navigation/native";

import LottieView from "lottie-react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import rondBleuAnimation from "./../../../../../assets/animations/rondbleu.json";
import rondVertAnimation from "./../../../../../assets/animations/rondvert.json";

const colors = [
  "#20c2cd",
  "#5b5da7",
  "#a4c763",
  "#bc6047",
  "#4ca9e4",
  "#2baa8c",
  "#404295",
  "#3a86a8",
];

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function ScreenRandomMemory() {
  const navigation = useNavigation();
  const userId = auth.currentUser?.uid;
  const db = getFirestore();
  const [memories, setMemories] = useState<Memories>({});
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;

      // Fetch user categories
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        setCategories(userDoc.data().categories || []);
      }

      // Fetch user memories
      const memoriesRef = collection(db, "users", userId, "memories");
      const memoriesQuery = query(memoriesRef);
      const querySnapshot = await getDocs(memoriesQuery);

      // Group memories by category
      const groupedMemories: Record<string, Memory[]> = {};

      querySnapshot.forEach((doc) => {
        const memory = {
          id: doc.id,
          text: doc.data().text,
          categoryId: doc.data().categoryId,
        };

        // If this memory's category does not exist in groupedMemories yet, create it
        if (!groupedMemories[memory.categoryId]) {
          groupedMemories[memory.categoryId] = [];
        }

        // Add this memory to its corresponding category
        groupedMemories[memory.categoryId].push(memory);
      });

      // Create a new object to store the randomly selected memories
      const randomMemories: Record<string, Memory[]> = {};

      // Iterate over each category in groupedMemories
      for (const categoryId in groupedMemories) {
        randomMemories[categoryId] = [];

        // If this category has at least one memory, randomly select one
        if (groupedMemories[categoryId].length >= 1) {
          const randomIndex = Math.floor(
            Math.random() * groupedMemories[categoryId].length
          );
          const selectedMemory = groupedMemories[categoryId].splice(
            randomIndex,
            1
          )[0];
          randomMemories[categoryId].push(selectedMemory);
        }

        // If this category has at least one more memory, randomly select another one
        if (groupedMemories[categoryId].length >= 1) {
          const randomIndex = Math.floor(
            Math.random() * groupedMemories[categoryId].length
          );
          const selectedMemory = groupedMemories[categoryId].splice(
            randomIndex,
            1
          )[0];
          randomMemories[categoryId].push(selectedMemory);
        }
      }

      setMemories(randomMemories);
    };

    fetchUserData();
  }, [userId]);

  const addMemory = async (categoryId: string, text: string) => {
    if (!userId) return;

    // Trouver le nom de la catégorie en utilisant categoryId
    const category = categories.find((c) => c.id === categoryId)?.name;
    if (!category) {
      console.error(`No category found for id ${categoryId}`);
      return;
    }

    const docRef = await addDoc(collection(db, "users", userId, "memories"), {
      categoryId,
      text,
    });

    // Faire une copie de l'état des memories
    const newMemories = { ...memories };

    // Si la catégorie de ce souvenir n'existe pas encore dans newMemories, créez-la
    if (!newMemories[categoryId]) {
      newMemories[categoryId] = [];
    }

    // Ajoutez ce souvenir à sa catégorie correspondante
    newMemories[categoryId].push({ id: docRef.id, categoryId, text }); // use categoryId instead of category name
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {categories &&
          categories.map((category) => {
            // Initialiser un tableau avec les souvenirs pour cette catégorie ou un tableau vide si la catégorie n'a pas de souvenirs
            let memoriesForCategory = memories[category.id] || [];

            // S'il y a moins de 2 souvenirs, ajouter "(Pas de donnée)" jusqu'à ce qu'il y ait 2 éléments
            while (memoriesForCategory.length < 2) {
              memoriesForCategory.push({ text: "(Pas de donnée)", id: "N/A" });
            }

            // Mélangeons les souvenirs pour cette catégorie
            let shuffledMemories = shuffleArray(memoriesForCategory);

            return (
              <View key={category.id}>
                <Text style={styles.category}>{category.name}</Text>
                {shuffledMemories.slice(0, 2).map((memory, index) => (
                  <View key={index}>
                    <ListItem
                      bottomDivider
                      containerStyle={{
                        backgroundColor: colors[index % colors.length],
                        borderRadius: 10,
                        marginBottom: 10,
                      }}
                    >
                      <ListItem.Content
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <TextInput
                          style={[styles.itemText, { flex: 1 }]}
                          defaultValue={memory.text}
                          onChangeText={(newText) =>
                            memory.id !== "N/A"
                              ? onTextChange(category, memory.id, newText)
                              : null
                          }
                          onSubmitEditing={() =>
                            memory.id !== "N/A"
                              ? updateMemory(
                                  category,
                                  memory.id,
                                  editedTexts[category]?.[memory.id] ||
                                    memory.text
                                )
                              : null
                          }
                        />
                      </ListItem.Content>
                    </ListItem>
                  </View>
                ))}
              </View>
            );
          })}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 50,
    backgroundColor: "#fff",
  },

  category: {
    fontFamily: "roboto500",
    color: "rgba(50,56,106,1)",
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  itemText: {
    fontFamily: "roboto",
    fontSize: 16,
    marginVertical: 10,
    color: "white",
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
