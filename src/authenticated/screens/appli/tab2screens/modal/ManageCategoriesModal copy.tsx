import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { doc, updateDoc, collection, addDoc } from "firebase/firestore";
import { db, auth } from "../../../../../../utils/firebase.js";
import { Memory, Category } from "./../../../../../../utils/types";

interface Props {
  visible: boolean;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  onClose: () => void;
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category | null) => void;
  //memories: Memory[];
  memories: Record<string, Memory[]>;
}

const ManageCategoriesModal: React.FC<Props> = ({
  visible,
  categories,
  setCategories,
  onClose,
  setSelectedCategory,
  selectedCategory,
  memories,
}) => {
  console.log(
    "In ManageCategoriesModal, setSelectedCategory is: ",
    setSelectedCategory
  );

  const [newCategoryName, setNewCategoryName] = useState("");
  const [updatedCategoryName, setUpdatedCategoryName] = useState("");
  const userId = auth.currentUser?.uid;

  // Vérification de setSelectedCategory
  if (!setSelectedCategory) {
    console.error("setSelectedCategory is undefined");
    return null;
  }

  const handleAddCategory = async () => {
    if (!userId) {
      console.error("userId is undefined");
      return;
    }

    const newCategory: Category = {
      id: Date.now().toString(),
      name: newCategoryName,
    };
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    setNewCategoryName("");

    // Mise à jour des catégories de l'utilisateur dans Firestore
    try {
      const userRef = doc(db, "users", userId); // assurez-vous que userId est correctement défini
      await updateDoc(userRef, {
        categories: updatedCategories,
      });
      console.log("User document updated with new category");
    } catch (e) {
      console.error("Error updating user document: ", e);
    }
  };

  const handleUpdateCategory = (category: Category) => {
    setCategories((prevCategories) =>
      prevCategories.map((item) =>
        item.id === category.id ? { ...item, name: updatedCategoryName } : item
      )
    );
    setUpdatedCategoryName("");
  };

  const handleDeleteCategory = (category: Category) => {
    setCategories((prevCategories) =>
      prevCategories.filter((item) => item.id !== category.id)
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Gérer les catégories</Text>
          <TextInput
            placeholder="Nouveau nom de catégorie"
            value={newCategoryName}
            onChangeText={setNewCategoryName}
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handleAddCategory();
            }}
          >
            <Text style={styles.buttonText}>Créer une catégorie</Text>
          </TouchableOpacity>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => {
                console.log(
                  "setSelectedCategory function: ",
                  setSelectedCategory
                );
                setSelectedCategory(category);
              }}
              style={
                selectedCategory && category.id === selectedCategory.id
                  ? styles.selectedCategory
                  : null
              }
            >
              <Text style={styles.categoryText}>{category.name}</Text>

              {selectedCategory && category.id === selectedCategory.id && (
                <View>
                  <TextInput
                    placeholder="Nouveau nom"
                    value={updatedCategoryName}
                    onChangeText={setUpdatedCategoryName}
                    style={styles.input}
                  />
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      if (selectedCategory) {
                        console.log(
                          "setSelectedCategory function: ",
                          setSelectedCategory
                        );
                        handleUpdateCategory(selectedCategory);
                        setSelectedCategory(null);
                      }
                    }}
                  >
                    <Text style={styles.buttonText}>Renommer</Text>
                  </TouchableOpacity>

                  {memories.filter(
                    (memory) => memory.categoryId === category.id
                  ).length === 0 ? (
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        if (selectedCategory) {
                          console.log(
                            "setSelectedCategory function: ",
                            setSelectedCategory
                          );
                          handleDeleteCategory(selectedCategory);
                          setSelectedCategory(null);
                        }
                      }}
                    >
                      <Text style={styles.buttonText}>Supprimer</Text>
                    </TouchableOpacity>
                  ) : (
                    <Text>
                      Vous ne pouvez supprimer que les catégories vides
                    </Text>
                  )}
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "roboto700",
  },
  categoryText: {
    fontSize: 18,
    fontFamily: "roboto500",
    textAlign: "left",
    marginTop: 10,
  },
  selectedCategory: {
    backgroundColor: "#ddd",
  },
  button: {
    width: "100%",
    marginTop: 10,
    backgroundColor: "#2196F3",
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    padding: 10,
  },
});

export default ManageCategoriesModal;
