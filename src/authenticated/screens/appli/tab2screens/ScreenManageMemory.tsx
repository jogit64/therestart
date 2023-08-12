import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
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
import { Memory, Category, Memories } from "./../../../../../utils/types";
import ManageCategoriesModal from "./modal/ManageCategoriesModal";

import { useNavigation } from "@react-navigation/native";

import LottieView from "lottie-react-native";
//import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import rondBleuAnimation from "./../../../../../assets/animations/rondbleu.json";
import rondVertAnimation from "./../../../../../assets/animations/rondvert.json";

function ScreenManageMemory() {
  //navigation.navigate("ScreenRandomMemory", { refresh: true });
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

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
    "#20c2cd",
    "#5b5da7",
    "#a4c763",
    "#bc6047",
    "#4ca9e4",
    "#2baa8c",
    "#404295",
    "#3a86a8",
  ];
  const [memoryColors, setMemoryColors] = useState<Record<string, string>>({});

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

        // // Assigner une couleur aléatoire à chaque souvenir récupéré
        // fetchedMemoryColors[doc.id] =
        //   colors[Math.floor(Math.random() * colors.length)];
        // console.log(
        //   `Memory ID: ${doc.id}, Color: ${fetchedMemoryColors[doc.id]}`
        // ); // Log the color
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

    // Attribuer une couleur aléatoire au nouveau souvenir
    const newMemoryColors = { ...memoryColors };
    newMemoryColors[docRef.id] =
      colors[Math.floor(Math.random() * colors.length)];
    setMemoryColors(newMemoryColors);

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
    console.log(`Updating memory: ${id}, ${categoryId}`); // Log before starting update
    if (!userId) return;
    const memoryRef = doc(db, "users", userId, "memories", id);
    console.log(`Memory reference: ${memoryRef.path}`); // Log the path of memory reference
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

    // Mettre à jour l'état des memories
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
  console.log(
    "In parent component, setSelectedCategory is: ",
    setSelectedCategory
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={styles.header}>
          {/* <View style={styles.titleContainer}>
            <Text style={styles.title}>Mes graines de joie</Text>
          </View> */}
          <View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{ paddingBottom: -40, marginTop: 40 }}
            >
              <MaterialCommunityIcons
                name="help-network"
                size={44}
                color="#5b5da7"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.frontonContainer}></View>
          <ImageBackground
            source={require("./../../../../../assets/images/fronton.png")}
            style={styles.frontonImage}
            resizeMode="cover"
          >
            <Text style={styles.textIntro}>
              Editer et gérer vos souvenirs et catégories. Faites-en votre
              espace personnel de réflexion et de joie !
            </Text>
          </ImageBackground>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Infos</Text>
              <ScrollView style={styles.modalScrollContainer}>
                <Text style={styles.question}>
                  Pourquoi devrais-je enregistrer mes souvenirs ?
                </Text>
                <Text style={styles.answer}>
                  L'enregistrement de vos souvenirs vous permet de ne pas les
                  oublier avec le temps. L'application est spécialement conçue
                  pour vous aider à garder une trace de ces précieux moments.
                  Prenez un instant pour noter un souvenir merveilleux dès qu'il
                  vous revient à l'esprit.
                </Text>

                <Text style={styles.question}>
                  Quel type de souvenir devrais-je enregistrer ?
                </Text>
                <Text style={styles.answer}>
                  L'objectif est d'enregistrer les souvenirs qui font resurgir
                  des émotions d'enchantement, des moments de magie. Pensez à
                  ces instants qui vous ont fait ressentir de la joie et de
                  l'émerveillement, comme si vous étiez à nouveau un enfant.
                </Text>

                <Text style={styles.question}>
                  Combien de souvenirs sont affichés à la fois ?
                </Text>
                <Text style={styles.answer}>
                  Chaque fois que vous cliquez sur "Arroser", votre jardin se
                  renouvelle et affiche deux souvenirs aléatoires pour chaque
                  catégorie.
                </Text>

                <Text style={styles.question}>
                  Puis-je supprimer ou modifier des souvenirs ou des catégories
                  ?
                </Text>
                <Text style={styles.answer}>
                  Oui, absolument. Vous pouvez supprimer des souvenirs en
                  cliquant sur l'icône de la corbeille. Si vous souhaitez
                  modifier le titre d'un souvenir ou le déplacer vers une autre
                  catégorie, cliquez simplement sur l'icône du dossier avec la
                  flèche.
                </Text>

                <Text style={styles.question}>
                  Pourquoi le souvenir est-il limité à 30 caractères ?
                </Text>
                <Text style={styles.answer}>
                  La limite de 30 caractères est là pour des raisons de
                  lisibilité sur l'écran, mais elle a aussi un autre but. Nous
                  voulons que votre souvenir soit comme un panneau indicateur :
                  il est là pour vous aider à évoquer les pensées et les
                  émotions associées, pas pour raconter toute l'histoire. Ici,
                  les souvenirs sont des points d'ancrage, des graines qui vous
                  aident à vous reconnecter facilement avec un sentiment
                  merveilleux quand vous en avez besoin.
                </Text>
              </ScrollView>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* {categories &&
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
                    > */}

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
                          value={
                            editedTexts[category.id]?.[memory.id] || memory.text
                          }
                          onChangeText={(newText) =>
                            onTextChange(category.id, memory.id, newText)
                          }
                          onSubmitEditing={() =>
                            updateMemory(
                              memory.id, // changé pour être le premier argument
                              category.id, // changé pour être le deuxième argument
                              editedTexts[category.id]?.[memory.id] ||
                                memory.text
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
                                category: category.id,
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
                              <Text style={styles.categoryText}>
                                {category.name}
                              </Text>
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
                maxLength={30}
                onChangeText={(text) =>
                  setInputTexts((prev) => ({ ...prev, [category.id]: text }))
                }
                onSubmitEditing={() => {
                  console.log(category.id, inputTexts[category.id]);
                  addMemory(category.id, inputTexts[category.id]);
                  setInputTexts((prev) => ({ ...prev, [category.id]: "" }));
                }}
              />
            </View>
          ))}
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.iconBar}>
          <TouchableOpacity
            style={styles.lottieButton}
            onPress={() => navigation.navigate("ScreenRandomMemory")}
            // onPress={() => navigation.replace("ScreenRandomMemory")}
          >
            <LottieView
              source={rondBleuAnimation}
              autoPlay
              style={styles.animation}
            />
            <MaterialCommunityIcons
              name="watering-can-outline"
              size={30}
              color="#fff"
              style={styles.iconRotate}
            />
          </TouchableOpacity>
          {/* <Text style={styles.verbe}>Arrosez</Text> */}
        </View>
        <View style={styles.iconBar}>
          <TouchableOpacity
            style={styles.wrenchButton}
            onPress={() => setModalVisibleManage(true)}
          >
            {/* <LottieView
              source={rondVertAnimation}
              autoPlay
              style={styles.animation}
            /> */}
            <MaterialCommunityIcons name="wrench" size={30} color="#fff" />
          </TouchableOpacity>
          {/* <Text style={styles.verbe}>Catégories</Text> */}
        </View>
      </View>

      {/* <View style={styles.footer}>
        <TouchableOpacity onPress={() => setModalVisibleManage(true)}>
          <Text style={styles.footerText}>Gérer les catégories</Text>
        </TouchableOpacity>
      </View> */}

      <ManageCategoriesModal
        visible={modalVisibleManage}
        categories={categories}
        setCategories={setCategories}
        memories={memories}
        onClose={() => setModalVisibleManage(false)}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    //paddingTop: 50,
    backgroundColor: "#fff",
  },

  title: {
    fontFamily: "roboto700",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    color: "rgba(50,56,106,1)",
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
    marginTop: 5,
    backgroundColor: "#fff",
    height: 50,
    paddingLeft: 15,
  },

  header: {
    flex: 1,
    //flexDirection: "row",
    // justifyContent: "flex-end",
    paddingHorizontal: 10,
  },

  frontonContainer: {
    marginTop: -40,
    zIndex: 0,
  },

  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    zIndex: 1,
  },

  // titleContainer: {
  //   alignItems: "center",
  //   marginTop: -20,
  // },

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
    height: "80%",
  },

  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 50,
    backgroundColor: "rgba(111,120,189,1)",
    //opacity: 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "#fff",
    fontSize: 18,
  },

  frontonImage: {
    width: "100%",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },

  textIntro: {
    fontFamily: "roboto",
    color: "rgba(151,155,180,1)",
    lineHeight: 25,
    paddingHorizontal: 10,
    fontSize: 16,
  },

  buttonClose: {
    width: "100%",
    height: 44,
    marginTop: 10,
    backgroundColor: "#6f78bd", // La même couleur que votre autre bouton
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },

  textStyle: {
    color: "#fff", // Le même texte blanc que votre autre bouton
    fontSize: 15,
    fontFamily: "roboto", // La même police que votre autre bouton
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Ajouter un arrière-plan semi-transparent pour mieux distinguer la modal
  },

  modalViewFaq: {
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
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  categoryText: {
    fontFamily: "roboto",
    color: "rgba(50,56,106,1)",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },

  bottomBar: {
    height: 90, // Changer la hauteur si nécessaire
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    //marginBottom: 40,
    //backgroundColor: "red", // Changer la couleur de fond si nécessaire
  },

  iconRotate: {
    transform: [{ rotate: "35deg" }], // ajustez la valeur pour obtenir l'angle de rotation souhaité
  },

  iconBar: {
    justifyContent: "center",
    alignItems: "center",
    //marginBottom: 80,
  },

  lottieButton: {
    justifyContent: "center",
    alignItems: "center",
  },

  wrenchButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5b5da7", // Couleur de fond de la forme ronde
    borderRadius: 50, // Pour rendre le fond rond
    width: 70, // Largeur de la forme ronde
    height: 70,
  },

  animation: {
    position: "absolute",
    width: 200,
    height: 200,
  },

  overlay: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },

  verbe: {
    fontFamily: "roboto",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    color: "rgba(50,56,106,1)",
    marginTop: 10,
  },

  modalTitle: {
    fontFamily: "roboto700",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 20,
    color: "rgba(50,56,106,1)",
  },

  modalScrollContainer: {
    maxHeight: "100%", // Ajustez en fonction de la taille de votre modal
    width: "100%",
  },

  question: {
    fontFamily: "roboto500",
    color: "rgba(50,56,106,1)",
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },

  answer: {
    fontFamily: "roboto",
    fontSize: 14,
    marginVertical: 10,
    color: "rgba(50,56,106,1)",
  },
});

export default ScreenManageMemory;
