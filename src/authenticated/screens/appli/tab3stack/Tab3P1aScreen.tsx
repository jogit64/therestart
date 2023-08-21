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
    // Autrui
    {
      id: 1,
      category: "Autrui",
      name: "Une autre personne",
      phrases: [
        "Je ne peux pas connaître entièrement la réalité d'une autre personne, seulement mon interprétation de celle-ci.",
        "Ma relation avec cette personne est une construction mentale basée sur mes perceptions et mes expériences.",
      ],
    },
    {
      id: 2,
      category: "Autrui",
      name: "Attentes d'autrui",
      phrases: [
        "Les attentes des autres sont des reflets de leur propre réalité, pas de la mienne.",
        "Je n'ai pas à être prisonnier des opinions ou des désirs des autres.",
      ],
    },
    {
      id: 3,
      category: "Autrui",
      name: "Comparaison avec d'autres",
      phrases: [
        "Se comparer, c'est mesurer une interprétation contre une autre, aucune n'étant la vérité absolue.",
        "Ma valeur ne dépend pas de la façon dont je me compare aux autres.",
      ],
    },
    // Moi-même
    {
      id: 4,
      category: "Moi-même",
      name: "Ma valeur personnelle",
      phrases: [
        "Ma valeur intrinsèque existe indépendamment des jugements externes.",
        "Je suis plus que les étiquettes ou les évaluations que je m'attribue ou que d'autres m'attribuent.",
      ],
    },
    {
      id: 5,
      category: "Moi-même",
      name: "Mon apparence",
      phrases: [
        "Mon corps est en constante évolution, tout comme le reste de l'univers.",
        "L'importance que j'accorde à mon apparence est le reflet de mes croyances, pas de ma réalité objective.",
      ],
    },
    {
      id: 6,
      category: "Moi-même",
      name: "Mes compétences ou talents",
      phrases: [
        "Mes compétences sont des outils, pas mon identité.",
        "La perception de mes talents est relative et changeante.",
      ],
    },
    {
      id: 7,
      category: "Moi-même",
      name: "Mes échecs ou erreurs passées",
      phrases: [
        "Le passé est une construction mentale, et mes erreurs ne définissent pas qui je suis maintenant.",
        "Chaque expérience est une occasion d'apprendre et de grandir.",
      ],
    },
    // Possessions et avoirs
    {
      id: 8,
      category: "Possessions et avoirs",
      name: "Ce que je possède",
      phrases: [
        "Les possessions sont temporaires et sujettes au changement. Ma relation avec elles est plus significative que leur simple possession.",
        "Rien ne m'appartient vraiment, tout est éphémère.",
      ],
    },
    {
      id: 9,
      category: "Possessions et avoirs",
      name: "Ce que je veux posséder",
      phrases: [
        "Le désir de posséder est souvent lié à une quête de validation ou de sécurité, et non à l'objet lui-même.",
        "L'acquisition ne garantit pas le bonheur ou la satisfaction.",
      ],
    },
    {
      id: 10,
      category: "Possessions et avoirs",
      name: "Ce que j'ai perdu",
      phrases: [
        "La perte est une perception basée sur le temps et l'attachement. En réalité, tout est en flux.",
        "Les choses ne sont jamais vraiment 'perdues', elles changent simplement de forme ou de place dans ma vie.",
      ],
    },

    // Temps
    {
      id: 11,
      category: "Temps",
      name: "Perception du moment présent",
      phrases: [
        "Le moment présent est tout ce qui existe réellement ; le passé et le futur sont des constructions mentales.",
        "Ma relation avec le temps influence la manière dont je vis chaque instant.",
      ],
    },
    {
      id: 12,
      category: "Temps",
      name: "Anxiété ou incertitude concernant l'avenir",
      phrases: [
        "L'avenir est une série d'instantanés présents que je n'ai pas encore expérimentés.",
        "Mon inquiétude pour l'avenir est basée sur des prédictions et non sur des certitudes.",
      ],
    },
    {
      id: 13,
      category: "Temps",
      name: "Souvenirs du passé",
      phrases: [
        "Le passé n'est plus, il ne vit qu'à travers mes souvenirs et interprétations.",
        "Je peux choisir la relation que j'entretiens avec mon passé.",
      ],
    },

    // Émotions et sentiments
    {
      id: 14,
      category: "Émotions et sentiments",
      name: "Ce que je ressens maintenant",
      phrases: [
        "Les émotions sont comme les nuages, elles passent. Je ne suis ni mes émotions ni mes pensées.",
        "Mon ressenti est une réaction à mes perceptions, pas une réalité immuable.",
      ],
    },
    {
      id: 15,
      category: "Émotions et sentiments",
      name: "Ce que je crains de ressentir",
      phrases: [
        "La peur est une anticipation basée sur des suppositions, pas sur la réalité présente.",
        "Je peux observer mes peurs sans y adhérer.",
      ],
    },

    // Événements et circonstances
    {
      id: 16,
      category: "Événements et circonstances",
      name: "Événements futurs",
      phrases: [
        "Les événements à venir sont des potentialités, pas des certitudes.",
        "Ma perception d'un événement futur est une projection, pas une réalité.",
      ],
    },
    {
      id: 17,
      category: "Événements et circonstances",
      name: "Événements actuels",
      phrases: [
        "Tout événement est temporaire et en constante évolution, tout comme ma perception de celui-ci.",
        "Je peux choisir ma relation avec les événements de ma vie.",
      ],
    },
    {
      id: 18,
      category: "Événements et circonstances",
      name: "Événements passés",
      phrases: [
        "Un événement passé n'existe plus, seulement mon interprétation de celui-ci.",
        "Je peux reconsidérer et recontextualiser les événements de mon passé.",
      ],
    }, // Monde extérieur
    {
      id: 19,
      category: "Monde extérieur",
      name: "Mon environnement immédiat",
      phrases: [
        "Mon environnement est une manifestation extérieure avec laquelle j'interagis, pas une réalité fixe.",
        "Je suis en relation avec mon environnement, je ne lui suis pas soumis.",
      ],
    },
    {
      id: 20,
      category: "Monde extérieur",
      name: "Situations sur lesquelles je n'ai aucun contrôle",
      phrases: [
        "La recherche de contrôle est une quête illusoire; la fluidité et l'adaptation sont plus bénéfiques.",
        "Je peux influencer, mais je ne peux pas tout contrôler. Mon pouvoir réside dans ma réaction.",
      ],
    },

    // Identification à l'ego
    {
      id: 21,
      category: "Identification à l'ego",
      name: "Mon récit personnel",
      phrases: [
        "Je ne suis pas le récit que je me raconte.",
        "Mon histoire est une construction, pas mon essence véritable.",
      ],
    },
    {
      id: 22,
      category: "Identification à l'ego",
      name: "Ma personnalité",
      phrases: [
        "Je ne suis pas ma personnalité, elle est une manifestation changeante.",
        "Ma personnalité est façonnée par des expériences et des influences; je suis plus que cela.",
      ],
    },
    {
      id: 23,
      category: "Identification à l'ego",
      name: "Pensées automatiques",
      phrases: [
        "Les pensées viennent et vont; je ne suis pas ces pensées.",
        "Mon esprit génère des pensées, mais je peux choisir de ne pas m'y attacher.",
      ],
    },
    {
      id: 24,
      category: "Identification à l'ego",
      name: "Mon corps",
      phrases: [
        "Je ne suis pas mon corps; il est un véhicule temporaire.",
        "Mon corps change et évolue, mais mon essence reste constante.",
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
                perturbatrice parmi les libellés suivants et cliquez sur
                "Afficher les propositions".
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
