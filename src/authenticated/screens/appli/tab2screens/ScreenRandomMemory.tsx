import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { ListItem, Button, Icon, Text } from "react-native-elements";
import Svg, { Path } from "react-native-svg";
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
import { Memory, Category, Memories } from "./../../../../../utils/types";
import { useNavigation } from "@react-navigation/native";

import LottieView from "lottie-react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import rondBleuAnimation from "./../../../../../assets/animations/rondbleu.json";
import rondVertAnimation from "./../../../../../assets/animations/rondvert.json";

import { ActivityIndicator } from "react-native";

const colors = [
  "#ffb7a8",

  "#c0d935",
  "#feda62",
  "#0078ff",
  "#f65857",
  "#ffb248",
  "#c0d935",
  "#a4c763",
  "#5b5da7",
  "#3bc0c9",
];
// const colors = [
//   "#20c2cd",
//   "#5b5da7",
//   "#a4c763",
//   "#bc6047",
//   "#4ca9e4",
//   "#2baa8c",
//   "#404295",
//   "#3a86a8",
// ];

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function ScreenRandomMemory() {
  const navigation = useNavigation();
  const userId = auth.currentUser?.uid;
  const db = getFirestore();
  const [memories, setMemories] = useState<Memories>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const memoriesWithCategoryInfo = categories.reduce((result, category) => {
    const memoriesForCategory = memories[category.id] || [];
    const pairs = [];
    for (let i = 0; i < memoriesForCategory.length; i += 2) {
      pairs.push(memoriesForCategory.slice(i, i + 2));
    }
    pairs.forEach((pair, index) => {
      result.push(
        ...pair.map((memory) => ({ categoryName: category.name, memory }))
      );
      if (index < pairs.length - 1) result.push({ isSeparator: true });
    });
    return result;
  }, []);

  useEffect(() => {
    setIsLoading(true);
    shuffleArray(colors);

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

      // Group memories by category
      const groupedMemories: Record<string, Memory[]> = {};

      querySnapshot.forEach((doc) => {
        const memory = {
          id: doc.id,
          text: doc.data().text,
          categoryId: doc.data().categoryId,
        };

        // If this memory's category does not exist in groupedMemories yet, create it
        if (!groupedMemories[memory.categoryId]) {
          groupedMemories[memory.categoryId] = [];
        }

        // Add this memory to its corresponding category
        groupedMemories[memory.categoryId].push(memory);
      });

      // Create a new array to store the randomly selected memories
      const randomMemories: { categoryName: string; memory: Memory }[] = [];

      for (const category of userDoc.data().categories || []) {
        if (
          groupedMemories[category.id] &&
          groupedMemories[category.id].length > 0
        ) {
          // Si cette catégorie a au moins un souvenir, sélectionnez-en un au hasard
          const randomIndex = Math.floor(
            Math.random() * groupedMemories[category.id].length
          );
          const selectedMemory = groupedMemories[category.id].splice(
            randomIndex,
            1
          )[0];

          // Ajoutez le souvenir sélectionné à randomMemories
          randomMemories.push({
            categoryName: category.name,
            memory: selectedMemory,
          });

          // Si cette catégorie a encore un souvenir, sélectionnez-en un autre au hasard
          if (groupedMemories[category.id].length > 0) {
            const randomIndex = Math.floor(
              Math.random() * groupedMemories[category.id].length
            );
            const selectedMemory = groupedMemories[category.id].splice(
              randomIndex,
              1
            )[0];

            // Ajoutez le souvenir sélectionné à randomMemories
            randomMemories.push({
              categoryName: category.name,
              memory: selectedMemory,
            });
          }
        }
      }

      // Mélangez les souvenirs sélectionnés
      shuffleArray(randomMemories);

      setMemories(randomMemories);
      setIsLoading(false);
    };

    fetchUserData();
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

  return isLoading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="rgba(50,56,106,1)" />
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      <View style={styles.seedContainer}>
        <Image
          source={require("./../../../../../assets/images/logoReStart.png")}
          style={{ width: 35, height: 35 }} // ajustez la taille de l'image selon vos besoins
        />

        <Text style={styles.title}>Mon jardin</Text>
      </View>
      <ImageBackground
        source={require("./../../../../../assets/images/fronton.png")}
        style={styles.frontonImage}
        resizeMode="cover"
      >
        <Text style={styles.textIntro}>
          Réveillez vos souvenirs heureux, arrosez-les et voyez comment ils
          égayent votre journée !
        </Text>
      </ImageBackground>

      <FlatList
        //data={memoriesWithCategoryInfo}
        data={memories}
        numColumns={2}
        keyExtractor={(item, index) =>
          item.isSeparator ? `sep-${index}` : `${item.memory.id}-${index}`
        }
        renderItem={({ item, index }) => {
          // notez l'ajout de 'index' ici
          if (item.isSeparator) {
            // This is a separator, make it occupy the whole row
            return <View style={{ width: "100%", height: 0 }} />;
          }
          // This is a memory, display it normally
          const isFirstRow = index < 2; // Ajuster cette condition en fonction de combien de colonnes vous avez
          return (
            <View style={styles.gridItem}>
              <ListItem
                bottomDivider
                containerStyle={{
                  ...styles.itemContainer,
                  backgroundColor: colors[index % colors.length], // l'utilisation de 'index' ici pour déterminer la couleur
                  position: "relative",
                  borderTopLeftRadius: isFirstRow && index % 2 === 0 ? 10 : 0, // Appliquer le borderRadius sur le premier élément de la première ligne
                  borderTopRightRadius: isFirstRow && index % 2 !== 0 ? 10 : 0, // Appliquer le borderRadius sur le second élément de la première ligne
                }}
              >
                <ListItem.Content
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute", // Ajouter cette ligne
                    bottom: 0, // Ajouter cette ligne
                    width: "100%", // Ajouter cette ligne
                  }}
                >
                  <Text
                    style={[styles.itemText, { flex: 1, textAlign: "center" }]} // ajout de textAlign: 'center'
                    numberOfLines={2}
                  >
                    {item.memory.text}
                  </Text>
                  <Text style={[styles.categoryName, { textAlign: "center" }]}>
                    {item.categoryName}
                  </Text>
                </ListItem.Content>
              </ListItem>
            </View>
          );
        }}
      />
      <View style={styles.bottomBar}>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.lottieButton}
            onPress={() => navigation.replace("ScreenRandomMemory")}
          >
            <LottieView
              source={rondBleuAnimation}
              autoPlay
              style={styles.animation}
            />
            <MaterialCommunityIcons
              name="watering-can-outline"
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
          <Text style={styles.verbe}>Arrosez</Text>
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
            <MaterialCommunityIcons name="shovel" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.verbe}>Plantez</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 35,
    backgroundColor: "white",
  },

  // category: {
  //   fontFamily: "roboto500",
  //   color: "rgba(50,56,106,1)",
  //   fontSize: 20,
  //   //marginTop: 20,
  //   marginBottom: 10,
  // },
  itemText: {
    fontFamily: "roboto",
    fontSize: 16,
    lineHeight: 25,
    paddingBottom: 45,
    paddingHorizontal: 10,
    //marginVertical: 5,
    color: "white",
  },

  bottomBar: {
    height: 90, // Changer la hauteur si nécessaire
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    //backgroundColor: "red", // Changer la couleur de fond si nécessaire
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
    width: 150,
    height: 150,
  },
  overlay: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1, // Assurez-vous que les icônes apparaissent au-dessus de l'animation
  },
  gridItem: {
    flex: 1,
    margin: 0, // Assurez-vous qu'il n'y a pas de marge
    height: Dimensions.get("window").width / 3, // Ajustez la hauteur selon vos préférences
  },
  itemContainer: {
    backgroundColor: "transparent",
    borderRadius: 0,
    margin: 0,
    padding: 10,
    height: "100%", // Ajoutez cette ligne pour fixer la hauteur
  },

  categoryName: {
    fontSize: 12,
    //fontWeight: "bold",
    position: "absolute",
    bottom: 5,
    right: 1,
  },

  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontFamily: "roboto700",
    fontSize: 24,
    textAlign: "center",
    //marginBottom: 25,
    color: "rgba(50,56,106,1)",
    paddingLeft: 10,
  },
  sstitle: {
    fontFamily: "roboto500",
    fontSize: 20,
    textAlign: "center",
    //marginBottom: 10,
    color: "rgba(50,56,106,1)",
  },
  verbe: {
    fontFamily: "roboto",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    color: "rgba(50,56,106,1)",
    marginTop: 10,
  },
  seedContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    //marginTop: 20,
  },
  frontonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    //marginTop: 20,
  },

  // containerb: {
  //   width: "100%",
  //   padding: 15,
  //   borderRadius: 5,
  //   marginBottom: 10,
  // },
  // text: {
  //   color: "black",
  // },

  frontonImage: {
    width: "100%",
    height: 120,
    justifyContent: "center", // Pour le centrage vertical
    alignItems: "center", // Pour le centrage horizontal
    marginBottom: 20,
  },

  textIntro: {
    fontFamily: "roboto",
    color: "rgba(151,155,180,1)",
    // width: 300,
    // height: 60,
    //textAlign: "center",
    lineHeight: 25,
    // marginTop: 15,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});

export default ScreenRandomMemory;
