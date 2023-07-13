import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { ListItem } from "react-native-elements";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth } from "../../../../../utils/firebase.js";
import { Memory, Memories } from "./../../../../../utils/types";

function ScreenRandomMemory() {
  const userId = auth.currentUser?.uid;
  const db = getFirestore();

  const [randomMemories, setRandomMemories] = useState<{
    [categoryId: string]: Memory[];
  }>({});

  const fetchRandomMemories = async () => {
    if (!userId) return;

    // Fetch user memories
    const memoriesRef = collection(db, "users", userId, "memories");
    const memoriesQuery = query(memoriesRef);
    const querySnapshot = await getDocs(memoriesQuery);

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
  }, [userId]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {Object.keys(randomMemories).map((categoryId, index) => (
          <View key={index}>
            <Text style={styles.category}>{categoryId}</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
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
});

export default ScreenRandomMemory;
