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
  getDoc,
} from "firebase/firestore";
import { auth } from "../../../../../utils/firebase.js";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Memory, Category } from "./../../../../../utils/types";
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

  const [inputTexts, setInputTexts] = useState<Record<string, string>>({
    "1": "",
    "2": "",
    "3": "",
    "4": "",
    "5": "",
    "6": "",
    "7": "",
    "8": "",
    "9": "",
  });

  const [modalVisible, setModalVisible] = useState(false);

  const [memories, setMemories] = useState<Memories>({});
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;

      // Fetch user categories
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        setCategories(userDoc.data().categories || []); // utilisez une valeur par défaut si aucune catégorie n'est définie pour l'utilisateur
      }

      // Fetch user memories
      const memoriesRef = collection(db, "users", userId, "memories");
      const memoriesQuery = query(memoriesRef);
      const querySnapshot = await getDocs(memoriesQuery);

      // C'est ici que vous allez regrouper vos souvenirs par catégorie
      const groupedMemories: Record<string, Memory[]> = {};

      querySnapshot.forEach((doc) => {
        const memory = {
          id: doc.id,
          text: doc.data().text,
          categoryId: doc.data().categoryId, // Utilisez categoryId à la place de category
        };

        // Si la catégorie de ce souvenir n'existe pas encore dans groupedMemories, créez-la
        if (!groupedMemories[memory.categoryId]) {
          groupedMemories[memory.categoryId] = [];
        }

        // Ajoutez ce souvenir à sa catégorie correspondante
        groupedMemories[memory.categoryId].push(memory);
      });

      setMemories(groupedMemories);
    };

    fetchUserData();
  }, [userId, categories]);

  const addMemory = async (categoryId: string, text: string) => {
    if (!userId) return;

    // Trouver le nom de la catégorie en utilisant categoryId
    const category = categories.find((c) => c.id === categoryId)?.name;
    if (!category) {
      console.error(`No category found for id ${categoryId}`);
      return;
    }

    const docRef = await addDoc(collection(db, "users", userId, "memories"), {
      categoryId, // use categoryId instead of category name
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

    // Mettez à jour l'état des memories avec la copie modifiée
    setMemories(newMemories);
  };

  const reassignMemory = async (
    id: string,
    oldCategoryId: string,
    newCategoryId: string
  ) => {
    if (!memories[oldCategoryId] || !userId) return;
    const memory = memories[oldCategoryId].find((memory) => memory.id === id);
    if (!memory) return;

    // // Trouver le nom de la nouvelle catégorie en utilisant newCategoryId
    // const newCategory = categories.find((c) => c.id === newCategoryId)?.name;
    // if (!newCategory) {
    //   console.error(`No category found for id ${newCategoryId}`);
    //   return;
    // }

    // Mettre à jour le champ 'categoryId' du document de ce souvenir
    const memoryRef = doc(db, "users", userId, "memories", id);
    await updateDoc(memoryRef, { categoryId: newCategoryId });

    // Faire une copie de l'état des memories
    const newMemories = { ...memories };

    // Retirer le souvenir de l'ancienne catégorie
    newMemories[oldCategoryId] = newMemories[oldCategoryId].filter(
      (memory) => memory.id !== id
    );

    // Si la nouvelle catégorie n'existe pas encore, créez-la
    if (!newMemories[newCategoryId]) {
      newMemories[newCategoryId] = [];
    }

    // Ajouter le souvenir à la nouvelle catégorie
    newMemories[newCategoryId].push({ ...memory, categoryId: newCategoryId });

    // Mettez à jour l'état des memories avec la copie modifiée
    setMemories(newMemories);
  };

  const deleteMemory = async (id: string, categoryId: string) => {
    console.log(`Deleting memory: ${id}, ${categoryId}`);
    if (!userId) {
      console.log("User ID not found");
      return;
    }

    try {
      await deleteDoc(doc(db, "users", userId, "memories", id));
    } catch (error) {
      console.error("Failed to delete document:", error);
    }

    if (!memories[categoryId]) {
      console.log("Category not found in memories");
      return;
    }

    // Faire une copie de l'état des memories
    const newMemories = { ...memories };

    const newMemoriesCategory = newMemories[categoryId].filter(
      (memory) => memory.id !== id
    );

    if (newMemoriesCategory.length === newMemories[categoryId].length) {
      console.log("Memory not found in category");
    } else {
      newMemories[categoryId] = newMemoriesCategory;
      // Mettez à jour l'état des memories avec la copie modifiée
      setMemories(newMemories);
    }
  };

  const updateMemory = async (id: string, categoryId: string, text: string) => {
    if (!userId) return;
    const memoryRef = doc(db, "users", userId, "memories", id);
    await updateDoc(memoryRef, { text });

    if (!memories[categoryId] || !userId) return;

    // Faire une copie de l'état des memories
    const newMemories = { ...memories };

    const memoryToUpdate = newMemories[categoryId].find(
      (memory) => memory.id === id
    );
    if (memoryToUpdate) {
      memoryToUpdate.text = text;
    }

    // Mettez à jour l'état des memories avec la copie modifiée
    setMemories(newMemories);
  };

  const [editedTexts, setEditedTexts] = useState<
    Record<string, Record<string, string>>
  >({});

  const onTextChange = (categoryId: string, id: string, newText: string) => {
    setEditedTexts((prev) => ({
      ...prev,
      [categoryId]: {
        ...(prev[categoryId] || {}),
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
                                category: category.id, // Utilisez l'identifiant de la catégorie au lieu du nom de la catégorie
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
                            onPress={() => deleteMemory(memory.id, category.id)}
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
                              key={category.id}
                              onPress={() => {
                                if (selectedMemory) {
                                  reassignMemory(
                                    selectedMemory.id,
                                    selectedMemory.category,
                                    category.id
                                  );
                                  setSelectedMemory(null);
                                }
                                setModalVisibleReassign(false);
                              }}
                            >
                              <Text>{category.name}</Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      </View>
                    </Modal>
                  </View>
                ))}

              <TextInput
                style={styles.input}
                placeholder={`Ajouter un souvenir à ${category.name}`}
                value={inputTexts[category.id]}
                onChangeText={
                  (text) =>
                    setInputTexts((prev) => ({ ...prev, [category.id]: text })) // utilisez category.id pour la clé
                }
                onSubmitEditing={() => {
                  console.log(category.id, inputTexts[category.id]);
                  addMemory(category.id, inputTexts[category.id]);
                  setInputTexts((prev) => ({ ...prev, [category.id]: "" })); // utilisez category.id pour la clé
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
