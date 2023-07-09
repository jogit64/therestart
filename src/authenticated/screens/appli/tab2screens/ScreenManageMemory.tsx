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
  query,
  where,
} from "firebase/firestore";
import { auth } from "../../../../../utils/firebase.js";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Memories, Memory } from "./../../../../../utils/types";
import ManageCategoriesModal from "./modal/ManageCategoriesModal";

function ScreenManageMemory() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [modalVisibleReassign, setModalVisibleReassign] = useState(false);
  const [modalVisibleManage, setModalVisibleManage] = useState(false);
  const userId = auth.currentUser?.uid;
  const [selectedMemory, setSelectedMemory] = useState<{
    id: string;
    category: string;
    text: string;
  } | null>(null);

  const [inputTexts, setInputTexts] = useState({});

  const [categories, setCategories] = useState([
    "Musique",
    "Objet",
    "Lieu",
    "Personne",
    "Sentiment",
    "Odeur",
    "Goût",
    "Son",
    "Texture",
  ]);

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

  const [memories, setMemories] = useState<Memories>({});

  useEffect(() => {
    const fetchMemories = async () => {
      if (!userId) return;

      const memoriesRef = collection(db, "users", userId, "memories");
      const memoriesQuery = query(memoriesRef);
      const querySnapshot = await getDocs(memoriesQuery);

      // C'est ici que vous allez regrouper vos souvenirs par catégorie
      const groupedMemories: Record<string, Memory[]> = {};

      querySnapshot.forEach((doc) => {
        const memory = {
          id: doc.id,
          category: doc.data().category,
          text: doc.data().text,
        };

        // Si la catégorie de ce souvenir n'existe pas encore dans groupedMemories, créez-la
        if (!groupedMemories[memory.category]) {
          groupedMemories[memory.category] = [];
        }

        // Ajoutez ce souvenir à sa catégorie correspondante
        groupedMemories[memory.category].push(memory);
      });

      setMemories(groupedMemories);
    };

    fetchMemories();
  }, [userId]);

  const addMemory = async (category: string, text: string) => {
    if (!userId) return;
    const docRef = await addDoc(collection(db, "users", userId, "memories"), {
      category,
      text,
    });

    // Si la catégorie de ce souvenir n'existe pas encore dans memories, créez-la
    if (!memories[category]) {
      memories[category] = [];
    }

    // Ajoutez ce souvenir à sa catégorie correspondante
    memories[category].push({ id: docRef.id, category, text });

    setMemories({ ...memories });
  };

  const reassignMemory = async (
    id: string,
    oldCategory: string,
    newCategory: string
  ) => {
    if (!memories[oldCategory] || !userId) return;
    const memory = memories[oldCategory].find((memory) => memory.id === id);
    if (!memory) return;

    // Mettre à jour le champ 'category' du document de ce souvenir
    const memoryRef = doc(db, "users", userId, "memories", id);
    await updateDoc(memoryRef, { category: newCategory });

    // Retirer le souvenir de l'ancienne catégorie
    memories[oldCategory] = memories[oldCategory].filter(
      (memory) => memory.id !== id
    );
    // Si la nouvelle catégorie n'existe pas encore, créez-la
    if (!memories[newCategory]) {
      memories[newCategory] = [];
    }
    // Ajouter le souvenir à la nouvelle catégorie
    memories[newCategory].push({ ...memory, category: newCategory });

    setMemories({ ...memories });
  };

  const deleteMemory = async (id: string, category: string) => {
    console.log(`Deleting memory: ${id}, ${category}`); // Ajoutez cette ligne
    if (!userId) {
      console.log("User ID not found"); // Ajoutez cette ligne
      return;
    }

    try {
      await deleteDoc(doc(db, "users", userId, "memories", id));
    } catch (error) {
      console.error("Failed to delete document:", error); // Ajoutez cette ligne
    }

    if (!memories[category]) {
      console.log("Category not found in memories"); // Ajoutez cette ligne
      return;
    }

    const newMemoriesCategory = memories[category].filter(
      (memory) => memory.id !== id
    );

    if (newMemoriesCategory.length === memories[category].length) {
      console.log("Memory not found in category"); // Ajoutez cette ligne
    } else {
      memories[category] = newMemoriesCategory;
      setMemories({ ...memories });
    }
  };

  const updateMemory = async (id: string, category: string, text: string) => {
    if (!userId) return;
    const memoryRef = doc(db, "users", userId, "memories", id);
    await updateDoc(memoryRef, { text });

    if (!memories[category] || !userId) return;
    const memoryToUpdate = memories[category].find(
      (memory) => memory.id === id
    );
    if (memoryToUpdate) {
      memoryToUpdate.text = text;
    }

    setMemories({ ...memories });
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
                      <View style={{ flexDirection: "row" }}>
                        <Button
                          icon={
                            <MaterialCommunityIcons
                              name="folder-move"
                              size={24}
                              style={styles.moveIcon}
                            />
                          }
                          type="clear"
                          onPress={() => {
                            setSelectedMemory({
                              id: memory.id,
                              category,
                              text: memory.text,
                            });
                            setModalVisibleReassign(true);
                          }}
                        />

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
                      </View>
                    </ListItem.Content>
                  </ListItem>

                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisibleReassign}
                    onRequestClose={() => setModalVisibleReassign(false)}
                  >
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <Text style={styles.modalText}>
                          Choisissez une nouvelle catégorie
                        </Text>
                        {categories.map((category) => (
                          <TouchableOpacity
                            key={category}
                            onPress={() => {
                              if (selectedMemory) {
                                reassignMemory(
                                  selectedMemory.id,
                                  selectedMemory.category,
                                  category
                                );
                                setSelectedMemory(null);
                              }
                              setModalVisibleReassign(false);
                            }}
                          >
                            <Text>{category}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  </Modal>
                </View>
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
        <TouchableOpacity onPress={() => setModalVisibleManage(true)}>
          <Text style={styles.footerText}>Gérer les catégories</Text>
        </TouchableOpacity>
      </View>

      <ManageCategoriesModal
        visible={modalVisibleManage}
        categories={categories}
        memories={memories}
        onClose={() => setModalVisibleManage(false)}
        // ici, vous pouvez passer les autres props nécessaires
      />
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

  deleteIcon: {
    color: "white",
    fontSize: 20,
  },
  moveIcon: {
    color: "white",
    fontSize: 20,
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
    opacity: 0.95,
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "white",
    fontSize: 18,
  },
});

export default ScreenManageMemory;
