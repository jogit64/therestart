// Tab3.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Tab3ParamList } from "../../../../../utils/navigationTypes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import AppIntroSlider from "react-native-app-intro-slider";
import { ScrollView } from "react-native-gesture-handler";

const slides = [
  {
    key: "one",
    title: "Bienvenue dans l'onglet Perspectives!",
    text: "Nous avons rassemblé quelques thèmes clés qui peuvent être sources de préoccupations, et nous vous invitons à les explorer avec un regard neuf, curieux et ludique ! \n\nEssayez de trouver des clés pour déverrouiller de nouvelles façons de percevoir votre réalité.\n\nLes affirmations et questions présentées ici sont conçues pour vous aider à vous détacher des schémas de pensée restrictifs et à élargir votre vision.Choisissez jusqu’à 3 thèmes qui résonnent avec votre préoccupation du moment et voyez si les perspectives vous mènent dans un endroit plus confortable.",
    backgroundColor: "#fff",
  },
  {
    key: "two",
    title: "Thème 1",
    text: "Description du thème 1.",
    backgroundColor: "#febe29",
  },
];

// function _renderNextButton() {
//   return (
//     <View style={styles.buttonCircle}>
//       <Text style={styles.buttonText}>Suivant</Text>
//     </View>
//   );
// }

// function _renderDoneButton() {
//   return (
//     <View style={styles.buttonCircle}>
//       <Text style={styles.buttonText}>Terminé</Text>
//     </View>
//   );
// }

export default function Tab3P1a() {
  const navigation =
    useNavigation<StackNavigationProp<Tab3ParamList, "Tab3P0">>();
  const [modalVisible, setModalVisible] = useState(false);

  // La liste de vos éléments. Vous pouvez y mettre n'importe quel type de données.
  const items = [
    {
      id: 1,
      name: "Un récit sur soi",
      phrases: [
        "Phrase 1.1",
        "Phrase 1.2",
        "Phrase 1.3",
        "Phrase 1.4",
        "Phrase 1.5",
      ],
    },
    {
      id: 2,
      name: "Un récit sur l'autre",
      phrases: [
        "Phrase 2.1",
        "Phrase 2.2",
        "Phrase 2.3",
        "Phrase 2.4",
        "Phrase 2.5",
      ],
    },
    {
      id: 3,
      name: "Un récit sur la possession matérielle",
      phrases: [
        "Phrase 2.1",
        "Phrase 2.2",
        "Phrase 2.3",
        "Phrase 2.4",
        "Phrase 2.5",
      ],
    },
    {
      id: 4,
      name: "Un récit sur l'idée d'avoir, de manquer de la considération, d'amour",
      phrases: [
        "Phrase 2.1",
        "Phrase 2.2",
        "Phrase 2.3",
        "Phrase 2.4",
        "Phrase 2.5",
      ],
    },
    {
      id: 5,
      name: "Un récit avec du temps, du passé, du futur, de la durée",
      phrases: [
        "Phrase 2.1",
        "Phrase 2.2",
        "Phrase 2.3",
        "Phrase 2.4",
        "Phrase 2.5",
      ],
    },
    // etc.
  ];

  // Etat initial pour savoir quels éléments sont sélectionnés
  const [selectedItems, setSelectedItems] = useState([]);

  // Fonction pour gérer la sélection d'un élément
  const handleSelectItem = (item) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(item.id)) {
        // Si l'élément est déjà sélectionné, on l'enlève de la liste
        return prevSelectedItems.filter((itemId) => itemId !== item.id);
      } else {
        // Limiter le nombre d'éléments sélectionnés à trois
        return prevSelectedItems.length < 3
          ? [...prevSelectedItems, item.id]
          : prevSelectedItems;
      }
    });
  };

  const getRandomPhrases = (phrases) => {
    // Mélanger les phrases
    const shuffled = phrases.sort(() => 0.5 - Math.random());
    // Retourner les trois premières phrases
    return shuffled.slice(0, 3);
  };

  const handleShowSelectedItems = () => {
    // Vérifier si au moins un élément est sélectionné
    if (selectedItems.length === 0) {
      // Vous pouvez afficher un toast ici
      return;
    }

    // Trouver les phrases pour chaque élément sélectionné
    const selectedItemsPhrases = items
      .filter((item) => selectedItems.includes(item.id))
      .flatMap((item) => getRandomPhrases(item.phrases));

    // Naviguer vers Tab3P2Screen avec les phrases des éléments sélectionnés
    navigation.navigate("Tab3P2", { selectedItemsPhrases });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.firstPartContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Tab3P0")}>
            <View style={styles.backButtonContainer}>
              <MaterialCommunityIcons
                name="arrow-left"
                size={24}
                color="#000"
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.titleScreen}>Observation détachée</Text>
        </View>

        {/* <View style={styles.separator} /> */}
        <View style={styles.secondPartContainer}>
          <Text style={styles.sstitle}>Approchez le détachement</Text>
          <Text style={styles.textIntro}>
            Sélectionnez jusqu'à 3 thème et lancez l'affichage.
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate("Tab3P1a")}>
            <Text style={styles.lancerBtn}>Sélectionnez vos thèmes</Text>
          </TouchableOpacity>
          {/* </View>

        <View style={styles.containerList}> */}
          {items.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.itemContainer,
                {
                  backgroundColor: selectedItems.includes(item.id)
                    ? "#feda62"
                    : "#f2f7fb",
                },
              ]}
              onPress={() => handleSelectItem(item)}
            >
              <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity onPress={handleShowSelectedItems}>
            <Text style={styles.lancerBtn}>cliquez ici</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "white",
    //paddingHorizontal: 20,
    paddingTop: 50,
  },

  firstPartContainer: {
    flex: 1,
    flexDirection: "row", // Ajoutez cette ligne
    alignItems: "center", // Centrez les éléments verticalement
    paddingHorizontal: 20,
  },

  titleScreen: {
    fontFamily: "roboto700",
    fontSize: 22,
    textAlign: "center",
    color: "rgba(50,56,106,1)",
    paddingLeft: 10,
    //  marginBottom: 15,
  },

  backButtonContainer: {
    width: 40, // Taille du cercle
    height: 40,
    borderRadius: 20, // Arrondi pour rendre le cercle parfait
    backgroundColor: "#f5f6fa",
    justifyContent: "center", // Centrez l'icône horizontalement
    alignItems: "center", // Centrez l'icône verticalement
    marginRight: 15, // Espace entre le bouton et le texte
  },

  secondPartContainer: {
    flex: 1,
    // justifyContent: "flex-start",
    //backgroundColor: "white",
    //paddingHorizontal: 20,
    //paddingTop: 50,
    paddingHorizontal: 20,
    marginTop: 10,
  },

  seedContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    flexWrap: "wrap",
  },

  containerList: {
    flex: 1,
    //justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "white",
    //paddingHorizontal: 20,
    marginTop: 20,
  },

  frontonImage: {
    width: "100%",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    // marginBottom: 20,
    // marginRight: 10,
    // paddingRight: 20,
    // marginLeft: 20,
    // paddingLeft: 5,
  },

  title: {
    fontFamily: "roboto700",
    fontSize: 24,
    textAlign: "center",
    color: "rgba(50,56,106,1)",
    paddingLeft: 10,
  },

  sstitle: {
    fontFamily: "roboto500",
    fontSize: 18,
    //textAlign: "center",
    //marginBottom: 10,
    color: "rgba(50,56,106,1)",
    marginTop: 20,
    marginBottom: 5,
  },

  textIntro: {
    fontFamily: "roboto",
    color: "rgba(151,155,180,1)",
    lineHeight: 25,
    //paddingHorizontal: 10,
    fontSize: 16,
  },

  // visiteBtnContainer: {
  //   flexDirection: "row",
  //   justifyContent: "flex-start",
  //   alignItems: "center",
  // },

  // button: {
  //   backgroundColor: "#20c2cd",
  //   padding: 10,
  //   paddingLeft: 20,
  //   justifyContent: "center",
  //   //alignSelf: "center",
  //   ///alignItems: "center",
  //   //marginBottom: 20,
  //   //marginVertical: 20,
  //   marginTop: 15,
  //   borderRadius: 15,
  //   width: "100%",
  //   height: 80,
  // },
  // buttonText: {
  //   color: "green",
  //   fontSize: 15,
  //   marginLeft: 22,
  //   lineHeight: 22,
  //   //backgroundColor: "#6f78bd",
  // },
  // slide: {
  //   flex: 1,
  //   justifyContent: "flex-start",
  //   alignItems: "center",
  //   padding: 20,
  // },
  // titleBoard: {
  //   fontFamily: "roboto700",
  //   fontSize: 24,
  //   textAlign: "center",
  //   color: "rgba(50,56,106,1)",
  //   paddingLeft: 10,
  //   marginVertical: 25,
  // },
  // textBoard: {
  //   fontFamily: "roboto",
  //   color: "rgba(151,155,180,1)",
  //   lineHeight: 25,
  //   paddingHorizontal: 10,
  //   fontSize: 16,
  // },

  // doneButton: {
  //   backgroundColor: "#008CBA",
  //   padding: 10,
  //   position: "absolute", // new
  //   bottom: 50, // new
  //   alignSelf: "center", // new
  //   alignItems: "center",
  // },

  buttonCircle: {
    width: 90,
    height: 40,
    backgroundColor: "rgba(0, 0, 0, .2)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  // buttonText: {
  //   color: "white",
  // },
  itemContainer: {
    width: "100%",
    height: 80,
    padding: 10,
    //margin: 10,
    marginTop: 10,
    justifyContent: "center",
    // borderWidth: 1,
    // borderColor: "#f2f7fb",

    //backgroundColor: "rgba(0, 0, 0, .2)",
    borderRadius: 15,
  },
  itemText: {
    fontFamily: "roboto",
    //color: "rgba(151,155,180,1)",
    //backgroundColor: "rgba(0, 0, 0, .2)",
    color: "rgba(50,56,106,1)",
    lineHeight: 25,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  lancerBtn: {
    fontFamily: "roboto",
    fontSize: 18,
    color: "black",
    marginTop: 25,
    marginBottom: 5,
    // justifyContent: "center",
    // alignItems: "center",
    alignSelf: "center",
  },
  separator: {
    borderBottomColor: "black",
    borderBottomWidth: 13,
    marginVertical: 20,
    width: "80%",
    alignItems: "center",
  },
});
