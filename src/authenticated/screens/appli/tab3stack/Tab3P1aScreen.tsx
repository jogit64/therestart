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

export default function Tab3P1a() {
  const navigation =
    useNavigation<StackNavigationProp<Tab3ParamList, "Tab3P0">>();
  const [modalVisible, setModalVisible] = useState(false);

  // La liste de vos éléments. Vous pouvez y mettre n'importe quel type de données.
  const items = [
    {
      id: 1,
      name: "Une autre personne",
      phrases: [
        "La perception que j'ai d'une autre personne est teintée par mes expériences, mon éducation et mon cadre culturel.",
        "L'autre est un miroir dans lequel je projette souvent mes propres peurs, désirs et jugements.",
        "La conscience que j'ai de l'autre n'est accessible que par le prisme de ma propre conscience ; je ne peux jamais connaître véritablement son expérience subjective.",
        "Tout ce que je sais ou crois savoir sur une autre personne provient de mes propres perceptions et interprétations.",
        "L'identification à l'ego nous pousse à percevoir les autres comme séparés de nous-mêmes, mais en réalité, il n'y a pas de séparation.",
        "L'autre que je perçois est une manifestation de la même réalité ultime à laquelle j'appartiens.",
        "À un niveau subatomique, il n'y a pas de frontières solides entre 'moi' et 'l'autre'.",
        "La réalité est probabiliste, et la manière dont nous percevons une autre personne dépend de nos observations.",
        "Toute définition ou compréhension que j'ai de l'autre est limitée et ne peut embrasser l'entièreté de son être.",
        "Chaque interaction est une rencontre avec une infinité de perspectives et d'histoires, dont la plupart me restent inconnues.",
        "La singularité et le référentiel de l'autre m'est fondamentalement inaccessible.",
        "Tout jugement ou interprétation que je porte sur l'autre en dit plus sur moi que sur lui.",
        "La notion d'une personne distincte est une construction mentale basée sur des perceptions temporaires et changeantes.",
      ],
    },
    {
      id: 2,
      name: "Moi-même",
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
      name: "La perception du temps",
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
      name: "Mon corps",
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
      name: "La possession ou la perte",
      phrases: [
        "Phrase 2.1",
        "Phrase 2.2",
        "Phrase 2.3",
        "Phrase 2.4",
        "Phrase 2.5",
      ],
    },
    {
      id: 6,
      name: "La reconnaissance ou le manque de reconnaissance",
      phrases: [
        "Phrase 2.1",
        "Phrase 2.2",
        "Phrase 2.3",
        "Phrase 2.4",
        "Phrase 2.5",
      ],
    },
    {
      id: 7,
      name: "Le contrôle ou absence de contrôle sur les situations",
      phrases: [
        "Phrase 2.1",
        "Phrase 2.2",
        "Phrase 2.3",
        "Phrase 2.4",
        "Phrase 2.5",
      ],
    },
    {
      id: 8,
      name: "Mes attentes",
      phrases: [
        "Phrase 2.1",
        "Phrase 2.2",
        "Phrase 2.3",
        "Phrase 2.4",
        "Phrase 2.5",
      ],
    },
    {
      id: 9,
      name: "Autre",
      phrases: [
        "Phrase 2.1",
        "Phrase 2.2",
        "Phrase 2.3",
        "Phrase 2.4",
        "Phrase 2.5",
      ],
    },
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

        <View style={styles.secondPartContainer}>
          <View style={styles.sssecondPartContainer}>
            <Text style={styles.sstitle}>
              Consignes :<View style={{ width: 5 }} />
              <Text style={styles.textIntro}>
                Sélectionnez (max. 3) les composants principaux de votre pensée
                parmi les libellés suivants et cliquez sur "Afficher les
                propositions".
              </Text>
            </Text>
          </View>
        </View>

        <View style={styles.thirdPartContainer}>
          {/* </View>
//        

          {/* </View>

        <View style={styles.containerList}> */}
          {items.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.itemContainer,
                {
                  backgroundColor: selectedItems.includes(item.id)
                    ? "#f6e482"
                    : "#f2f7fb",
                },
              ]}
              onPress={() => handleSelectItem(item)}
            >
              <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
          {/* {items.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.itemContainer,
                {
                  borderColor: selectedItems.includes(item.id)
                    ? "#f6e482"
                    : "#f2f7fb",
                },
                
              ]}
              onPress={() => handleSelectItem(item)}
            >
              <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
          ))} */}
        </View>
      </ScrollView>

      <View
        style={[
          styles.lancerBtnContainer,
          {
            backgroundColor: selectedItems.length > 0 ? "#f6e482" : "#f2f7fb",
          },
        ]}
      >
        <TouchableOpacity onPress={handleShowSelectedItems}>
          <Text
            style={[
              styles.lancerBtn,
              {
                opacity: selectedItems.length > 0 ? 1 : 0.2,
              },
            ]}
          >
            Afficher les propositions
          </Text>
        </TouchableOpacity>
      </View>
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
    //marginTop: 10,
    marginBottom: 20,
  },

  sssecondPartContainer: {
    flexDirection: "row",
    marginTop: 15,
    //paddingHorizontal: 20,
  },

  sstitle: {
    fontFamily: "roboto500",
    fontSize: 16,
    //textAlign: "center",
    //marginBottom: 10,
    color: "rgba(50,56,106,1)",
    // marginTop: 20,
    // marginBottom: 5,
  },

  textIntro: {
    fontFamily: "roboto",
    color: "rgba(151,155,180,1)",
    lineHeight: 25,
    //paddingHorizontal: 10,
    fontSize: 16,
    marginLeft: 10,
  },

  thirdPartContainer: {
    flex: 1,
    paddingHorizontal: 20,
    //marginTop: 10,
    marginBottom: 30,
  },

  containerList: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },

  title: {
    fontFamily: "roboto700",
    fontSize: 24,
    textAlign: "center",
    color: "rgba(50,56,106,1)",
    paddingLeft: 10,
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
    //borderWidth: 1,
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

  lancerBtnContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    //  borderColor: "#f6e482", // Ajout d'une couleur de bordure
    //borderWidth: 2, // Largeur de la bordure
    borderRadius: 10, // Arrondissement de la bordure
  },

  lancerBtn: {
    fontFamily: "roboto",
    fontSize: 16,
    color: "black",
    //marginTop: 25,
    //marginBottom: 5,
    // justifyContent: "center",
    // alignItems: "center",
    //alignSelf: "center",
    paddingVertical: 15,
  },
});
