import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  Modal,
  TouchableOpacity,
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
} from "firebase/firestore";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Memories, Memory } from "./../../../../../utils/types";

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
  //const [memories, setMemories] = useState({});
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

  const [modalVisible, setModalVisible] = useState(false);

  // Créez un état initial pour les inputs de chaque catégorie
  const initialInputState: { [key: string]: string } = {};
  categories.forEach((category) => {
    initialInputState[category] = "";
  });

  // Utilisez cet état pour créer un état React pour les inputs
  const [inputTexts, setInputTexts] = useState(initialInputState);

  const [memories, setMemories] = useState<Memories>({});

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

  const updateMemory = async (category: string, id: string, text: string) => {
    const memoryRef = doc(db, category, id);
    await updateDoc(memoryRef, { text });

    const newMemories: Record<string, { id: string; text: string }[]> = {
      ...memories,
    };

    const memoryIndex = newMemories[category].findIndex(
      (memory) => memory.id === id
    );
    if (memoryIndex !== -1) {
      newMemories[category][memoryIndex].text = text;
    }

    setMemories(newMemories);
  };

  const [editedTexts, setEditedTexts] = useState<
    Record<string, Record<string, string>>
  >({});

  const onTextChange = (category: string, id: string, newText: string) => {
    setEditedTexts((prev) => ({
      ...prev,
      [category]: {
        ...(prev[category] || {}),
        [id]: newText,
      },
    }));
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <MaterialCommunityIcons
                name="help-circle"
                size={34}
                color="#5b5da7"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Mes graines de joie</Text>
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Ici vous pouvez afficher vos FAQ
              </Text>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cacher</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {categories.map((category) => (
          <View key={category}>
            <Text style={styles.category}>{category}</Text>
            {memories[category] &&
              memories[category].map((memory, index) => (
                <ListItem
                  key={memory.id}
                  bottomDivider
                  containerStyle={{
                    backgroundColor: colors[index % colors.length],
                    borderRadius: 10,
                    marginBottom: 10,
                  }}
                >
                  <ListItem.Content>
                    {/* <TextInput
                    style={styles.itemText}
                    defaultValue={memory.text}
                    multiline
                    onChangeText={(newText) =>
                      onTextChange(category, memory.id, newText)
                    }
                    onBlur={() =>
                      updateMemory(
                        category,
                        memory.id,
                        editedTexts[category]?.[memory.id] || memory.text
                      )
                    }
                  /> */}

                    <TextInput
                      style={styles.itemText}
                      defaultValue={memory.text}
                      // multiline
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
              value={inputTexts[category]}
              onChangeText={(text) =>
                setInputTexts((prev) => ({ ...prev, [category]: text }))
              }
              onSubmitEditing={() => {
                addMemory(category, inputTexts[category]);
                setInputTexts((prev) => ({ ...prev, [category]: "" }));
              }}
            />
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
        // onPress={/* Ajouter votre gestionnaire de clic ici */}
        >
          <Text style={styles.footerText}>Gérer les catégories</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    height: 50,
    paddingLeft: 15,
  },

  listItemContainer: {
    backgroundColor: "#404295",
    borderRadius: 10,
    marginBottom: 10,
  },
  deleteIcon: {
    color: "white",
  },

  header: {
    marginHorizontal: 10,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  titleContainer: {
    alignItems: "center",
    marginTop: -20, // margin négatif pour rapprocher les deux lignes
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "80%", // Pour définir la hauteur de votre modal
  },

  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 50, // Ajustez selon vos besoins
    backgroundColor: "red", // Choisissez une couleur
    opacity: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default ScreenManageMemory;
