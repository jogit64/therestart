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
//import { styles } from "./styles";

interface ManageCategoriesModalProps {
  visible: boolean;
  categories: string[];
  memories: Record<string, { id: string; text: string }[]>;
  onClose: () => void;
  // ici, vous pouvez passer d'autres props pour gérer la création, la suppression, et le renommage des catégories
}

const ManageCategoriesModal: React.FC<ManageCategoriesModalProps> = ({
  visible,
  categories,
  memories,
  onClose,
}) => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

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
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Créer une catégorie</Text>
          </TouchableOpacity>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={
                category === selectedCategory ? styles.selectedCategory : null
              }
            >
              <Text style={styles.categoryText}>{category}</Text>

              {category === selectedCategory && (
                <View>
                  <TextInput
                    placeholder="Nouveau nom"
                    value={newCategoryName}
                    onChangeText={setNewCategoryName}
                    style={styles.input}
                  />
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Renommer</Text>
                  </TouchableOpacity>

                  {memories[category]?.length === 0 ? (
                    <TouchableOpacity style={styles.button}>
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
