import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
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
  const [categoryNameValid, setCategoryNameValid] = useState(true);

  // Vérification de setSelectedCategory
  if (!setSelectedCategory) {
    console.error("setSelectedCategory is undefined");
    return null;
  }

  // const handleAddCategory = async () => {
  //   if (!userId) {
  //     console.error("userId is undefined");
  //     return;
  //   }

  //   const newCategory: Category = {
  //     id: Date.now().toString(),
  //     name: newCategoryName,
  //   };
  //   const updatedCategories = [...categories, newCategory];
  //   setCategories(updatedCategories);
  //   setNewCategoryName("");

  //   // Mise à jour des catégories de l'utilisateur dans Firestore
  //   try {
  //     const userRef = doc(db, "users", userId); // assurez-vous que userId est correctement défini
  //     await updateDoc(userRef, {
  //       categories: updatedCategories,
  //     });
  //     console.log("User document updated with new category");
  //   } catch (e) {
  //     console.error("Error updating user document: ", e);
  //   }
  // };

  const handleAddCategory = async () => {
    if (!userId) {
      console.error("userId is undefined");
      return;
    }

    if (newCategoryName.trim() === "") {
      setCategoryNameValid(false);
      return;
    }

    setCategoryNameValid(true);
    // Ajout de la condition ici
    // if (newCategoryName.trim() === "") {
    //   console.error("Cannot add an empty category");
    //   return;
    // }

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

      // Ici, affichez une alerte pour informer l'utilisateur de la réussite de l'opération
      Alert.alert(
        "Catégorie créée",
        "La catégorie a été créée avec succès. Voulez-vous rester ici ou retourner à la gestion des souvenirs?",
        [
          {
            text: "Retourner aux souvenirs",
            onPress: () => onClose(), // Ferme la fenêtre modale
          },
          {
            text: "Rester ici",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    } catch (e) {
      console.error("Error updating user document: ", e);
    }
  };

  const handleUpdateCategory = async (category: Category) => {
    if (updatedCategoryName.trim() === "") {
      setCategoryNameValid(false);
      return;
    }

    setCategoryNameValid(true);

    setCategories((prevCategories) =>
      prevCategories.map((item) =>
        item.id === category.id ? { ...item, name: updatedCategoryName } : item
      )
    );
    setUpdatedCategoryName("");

    const updatedCategories = categories.map((item) =>
      item.id === category.id ? { ...item, name: updatedCategoryName } : item
    );

    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        categories: updatedCategories,
      });
      console.log("User document updated with new category name");

      Alert.alert(
        "Mise à jour de la catégorie",
        "Le nom de la catégorie a été mis à jour avec succès.",
        [
          {
            text: "Revenirs aux souvenirs",
            onPress: onClose,
          },
          {
            text: "Rester sur les catéroies",
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    } catch (e) {
      console.error("Error updating user document: ", e);
    }
  };

  const handleDeleteCategory = async (category: Category) => {
    const updatedCategories = categories.filter(
      (item) => item.id !== category.id
    );
    setCategories(updatedCategories);

    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        categories: updatedCategories,
      });
      console.log("User document updated after category deletion");

      Alert.alert(
        "Suppression de la catégorie",
        "La catégorie a été supprimée avec succès.",
        [
          {
            text: "Fermer",
            onPress: onClose,
          },
          {
            text: "Continuer à gérer les catégories",
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    } catch (e) {
      console.error("Error updating user document: ", e);
    }
  };

  console.log("par ici memories : ", memories);

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
            onChangeText={(text) => {
              setNewCategoryName(text);
              setCategoryNameValid(text.trim() !== ""); // Mettre à jour l'état de validation lors de la modification du texte
            }}
            style={styles.input}
          />
          {!categoryNameValid && (
            <Text style={{ color: "red", fontSize: 12 }}>
              Le nom de la catégorie est requis
            </Text>
          )}

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

                  {memories[category.id] === undefined ||
                  memories[category.id].length === 0 ? (
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

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text>X</Text>
          </TouchableOpacity>
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
    backgroundColor: "rgba(0,0,0,0.5)", // Ajouter un arrière-plan semi-transparent pour mieux distinguer la modal
  },
  modalView: {
    width: "90%",
    backgroundColor: "#f8fcff", // Utiliser la même couleur d'arrière-plan que vos autres écrans
    borderRadius: 14, // Utiliser le même borderRadius que vos autres éléments
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 12,
  },
  modalText: {
    fontFamily: "roboto700",
    color: "rgba(50,56,106,1)",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 20,
  },
  categoryText: {
    fontFamily: "roboto500",
    color: "rgba(50,56,106,1)",
    fontSize: 18,
    textAlign: "left",
    marginTop: 10,
  },
  selectedCategory: {
    backgroundColor: "#ddd",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    borderRadius: 10,
  },
  button: {
    width: "100%",
    height: 44,
    marginTop: 10,
    backgroundColor: "#6f78bd",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "roboto",
  },
  input: {
    fontFamily: "roboto",
    color: "#121212",
    height: 55,
    width: "100%",
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 2,
    borderColor: "rgba(220,222,235,1)",
    borderRadius: 14,
    padding: 10,
    marginTop: 10,
  },

  closeButton: {
    position: "absolute",
    right: 10,
    top: 10,
    padding: 10,
    backgroundColor: "#e0e0e0", // une couleur de fond grise légère pour le bouton
    borderRadius: 20, // pour rendre le bouton circulaire
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2, // pour s'assurer qu'il apparaît au-dessus d'autres éléments
  },
});

export default ManageCategoriesModal;
