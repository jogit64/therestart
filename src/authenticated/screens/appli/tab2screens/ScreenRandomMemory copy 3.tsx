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
//import { MaterialCommunityIcons } from "@expo/vector-icons";
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

function ScreenRandomMemory() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const userId = auth.currentUser?.uid;
  const [selectedMemory, setSelectedMemory] = useState<{
    id: string;
    category: string;
    text: string;
  } | null>(null);

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

      // C'est ici que vous allez regrouper vos souvenirs par catégorie
      const groupedMemories: Record<string, Memory[]> = {};
      const fetchedMemoryColors: Record<string, string> = {};

      querySnapshot.forEach((doc) => {
        const memory = {
          id: doc.id,
          text: doc.data().text,
          categoryId: doc.data().categoryId,
        };

        // Si la catégorie de ce souvenir n'existe pas encore dans groupedMemories, créez-la
        if (!groupedMemories[memory.categoryId]) {
          groupedMemories[memory.categoryId] = [];
        }

        // Ajoutez ce souvenir à sa catégorie correspondante
        groupedMemories[memory.categoryId].push(memory);

        console.log(`Assigning color to Memory ID: ${doc.id}`); // Log before assigning color
      });

      setMemories(groupedMemories);
      // Mettre à jour l'état des memoryColors avec les couleurs récupérées
      setMemoryColors(fetchedMemoryColors);
    };

    fetchUserData();
    // }, [userId, categories]);
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
          categories.map((category) => (
            <View key={category.id}>
              <Text style={styles.category}>{category.name}</Text>
              {memories[category.id] &&
                memories[category.id].map((memory, index) => (
                  <View key={memory.id}>
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
                            onTextChange(category, memory.id, newText)
                          }
                          onSubmitEditing={() =>
                            updateMemory(
                              category,
                              memory.id,
                              editedTexts[category]?.[memory.id] || memory.text
                            )
                          }
                        />
                      </ListItem.Content>
                    </ListItem>
                  </View>
                ))}
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
