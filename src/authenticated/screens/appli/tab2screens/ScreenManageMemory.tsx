import React, { useState, useEffect } from "react";
import { View, TextInput, ScrollView, StyleSheet } from "react-native";
import { ListItem, Button, Icon, Text } from "react-native-elements";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Les catégories
const categories = [
  "Musique",
  "Objet",
  "Lieu",
  "Personne",
  "Sentiment",
  "Odeur",
  "Goût",
  "Son",
  "Texture",
];

function ScreenManageMemory() {
  const [memories, setMemories] = useState({});
  const db = getFirestore();
  const colors = [
    "#21becd",
    "#5b5da7",
    "#a4c763",
    "#4ca9e4",
    "#404295",
    "#3a86a8",
    "#2baa8c",
  ];

  // Créez un état initial pour les inputs de chaque catégorie
  const initialInputState: { [key: string]: string } = {};
  categories.forEach((category) => {
    initialInputState[category] = "";
  });

  // Utilisez cet état pour créer un état React pour les inputs
  const [inputTexts, setInputTexts] = useState(initialInputState);
  useEffect(() => {
    const newMemories: Record<string, { id: string; text: string }[]> = {};
    const fetchMemories = async () => {
      const newMemories: Record<string, { id: string; text: string }[]> = {};
      for (const category of categories) {
        newMemories[category] = [];

        const querySnapshot = await getDocs(collection(db, category));
        querySnapshot.forEach((doc) => {
          newMemories[category].push({ id: doc.id, text: doc.data().text });
        });
      }

      setMemories(newMemories);
    };

    fetchMemories();
  }, []);

  const addMemory = async (category: string, text: string) => {
    const docRef = await addDoc(collection(db, category), { text });
    const newMemories: Record<string, { id: string; text: string }[]> = {
      ...memories,
    };
    newMemories[category].push({ id: docRef.id, text });
    setMemories(newMemories);
    setInputTexts((prev) => ({ ...prev, [category]: "" }));
  };

  const deleteMemory = async (category: string, id: string) => {
    await deleteDoc(doc(db, category, id));
    const newMemories: Record<string, { id: string; text: string }[]> = {
      ...memories,
    };
    newMemories[category] = newMemories[category].filter(
      (memory) => memory.id !== id
    );
    setMemories(newMemories);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Vos graines de joie</Text>
      {categories.map((category) => (
        <View key={category}>
          <Text style={styles.category}>{category}</Text>
          {memories[category] &&
            memories[category].map((memory, index) => (
              <ListItem
                key={memory.id}
                bottomDivider
                // Utilisez l'index de l'élément pour choisir la couleur
                containerStyle={{
                  backgroundColor: colors[index % colors.length],
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              >
                <ListItem.Content>
                  <TextInput
                    style={styles.itemText}
                    defaultValue={memory.text}
                    multiline
                    onSubmitEditing={(event) =>
                      updateMemory(category, memory.id, event.nativeEvent.text)
                    }
                  />
                </ListItem.Content>
                <Button
                  icon={
                    <MaterialCommunityIcons
                      name="trash-can"
                      size={24}
                      style={styles.deleteIcon}
                    />
                  }
                  type="clear"
                  onPress={() => deleteMemory(category, memory.id)}
                />
              </ListItem>
            ))}
          <TextInput
            style={styles.input}
            placeholder={`Ajouter un souvenir à ${category}`}
            // Utilisez la valeur de l'input de l'état
            value={inputTexts[category]}
            // Mettez à jour l'état lorsque l'utilisateur tape
            onChangeText={(text) =>
              setInputTexts((prev) => ({ ...prev, [category]: text }))
            }
            // Soumettez le formulaire et réinitialisez la valeur de l'input
            onSubmitEditing={() => {
              addMemory(category, inputTexts[category]);
              setInputTexts((prev) => ({ ...prev, [category]: "" }));
            }}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  title: {
    fontFamily: "roboto700",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  category: {
    fontFamily: "roboto500",
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
  input: {
    fontFamily: "roboto",
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 50,
    marginTop: 15,
    backgroundColor: "#f0f0ff",
  },

  listItemContainer: {
    backgroundColor: "#404295",
    borderRadius: 10,
    marginBottom: 10,
  },
  deleteIcon: {
    color: "gray",
  },
});

export default ScreenManageMemory;
