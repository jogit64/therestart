import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Tab4ParamList } from "../../../../../utils/navigationTypes";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "../../../../../utils/firebase.js";

// Une liste d'affirmations.
const initialAffirmations = [
  "Vous avez le pouvoir de choisir de vivre selon vos propres intentions, plutôt que selon les attentes des autres.",
  "Chaque pensée que nous choisissons de penser est un grain semé pour notre futur.",
  "Il n'y a aucune restriction à ce que vous pouvez réaliser, sauf celles que vous décidez d'adopter.",
  "Lorsque vous changez la façon de regarder les choses, les choses que vous regardez changent.",
  "L'univers ne crée rien d'incomplet. Tout ce dont vous rêvez est possible pour vous.",
  "L'abondance n'est pas quelque chose que nous obtenons, mais plutôt quelque chose que nous accordons.",
  "Vous ne pouvez être solitaire que si vous vous éloignez de vous-même.",
  "Il y a une force en vous qui est plus grande que n'importe quel obstacle que vous pourriez rencontrer.",
  "Chaque expérience est une opportunité pour vous rappeler votre grandeur.",
  "Le moment présent, maintenant, est le seul moment que vous avez. Servez-vous-en pour créer le monde que vous voulez.",
  "Vos projets merveilleux sont le reflet de votre potentiel illimité.",
  "Ce que vous pensez de vous-même est bien plus important que ce que les autres pensent de vous.",
  "Ne soyez pas prisonnier du passé. Concentrez-vous sur ce que vous pouvez créer ici et maintenant.",
  "Il n'est jamais trop tard pour commencer quelque chose de nouveau. L'univers entier conspirera à vous aider à réussir.",
  "Votre véritable passion est votre passeport pour un avenir épanouissant.",
];

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

// Fonction pour mélanger aléatoirement un tableau.
function shuffleArray(array) {
  let currentIndex = array.length,
    randomIndex;

  // Tant qu'il reste des éléments à mélanger...
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // On échange l'élément actuel avec un élément aléatoire.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

// Fonction pour obtenir une couleur aléatoire à partir d'un tableau de couleurs.
function getRandomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

// Composant d'affirmation pour afficher une liste d'affirmations.
function Affirmations({ affirmations }) {
  return (
    <View>
      <FlatList
        data={affirmations}
        horizontal={true}
        keyExtractor={(item, index) => "key" + index}
        renderItem={({ item }) => (
          <View
            style={[
              styles.affirmationItem,
              { backgroundColor: getRandomColor(colors) },
            ]}
          >
            <Text style={styles.affirmationText}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
}

// Composant principal.
export default function Tab4() {
  // Initialisation des hooks et des états.
  const navigation =
    useNavigation<StackNavigationProp<Tab4ParamList, "Tab4P0">>();

  const [dreams, setDreams] = useState([]);
  const [affirmations, setAffirmations] = useState([]);

  // Mélanger les affirmations initiales.
  const shuffleAffirmations = () => {
    setAffirmations(shuffleArray([...initialAffirmations]));
  };

  useEffect(() => {
    setAffirmations(shuffleArray(initialAffirmations));
  }, []);

  const [setEditMode] = useState(false);

  useEffect(() => {
    // Fonction pour récupérer les rêves de l'utilisateur à partir de la base de données.
    const fetchDreams = async () => {
      console.log("User ID from context: ", auth.currentUser?.uid);
      try {
        const userDreamsCollection = collection(
          db,
          `users/${auth.currentUser?.uid}/dreams`
        );
        const userDreamsSnapshot = await getDocs(userDreamsCollection);
        const loadedDreams = userDreamsSnapshot.docs.map((doc) => ({
          id: doc.id,
          dream: doc.data().dream,
        }));
        setDreams(loadedDreams);
      } catch (error) {
        console.error("Error fetching dreams: ", error);
      }
    };

    if (auth.currentUser) {
      fetchDreams();
    }
  }, []);

  // Rendu du composant.
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons name="lighthouse-on" size={32} color="white" />
        <Text style={styles.titleScreen}>Le phare</Text>
        <Text style={styles.sstitleScreen}> : vos projets enchantés</Text>
      </View>
      <ScrollView>
        <View style={styles.firstPartContainer}>
          <ImageBackground
            source={require("./../../../../../assets/images/fronton.png")}
            style={styles.frontonImage}
            resizeMode="cover"
          >
            <Text style={styles.textIntro}>
              Capturez la lumière de vos projets idéaux, nourrissez-les avec
              votre attention, et laissez leur énergie transfigurer votre
              quotidien!
            </Text>
          </ImageBackground>
        </View>
        <View style={styles.dreamContainer}>
          {dreams.map((dream, index) => (
            <View style={styles.dreamItemLine} key={dream.id}>
              {/* Icône de médaille */}
              <MaterialCommunityIcons name="cloud" size={24} color="#7e86c7" />

              <Text style={styles.dreamText}>{dream.dream}</Text>
            </View>
          ))}
        </View>

        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Tab4P1")}>
            <View style={styles.btnContainer}>
              <Text style={styles.btnText}>Mettre à jour</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.affirmationsContainer}>
          <Affirmations affirmations={affirmations} />
          <TouchableOpacity onPress={shuffleAffirmations}>
            <View style={styles.viewReload}>
              <MaterialCommunityIcons
                name="reload-alert"
                size={54}
                color="rgba(50,56,106,1)"
              />
            </View>
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
  },

  headerContainer: {
    flexGrow: 1,
    height: 60,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgba(190,205,224,0.67)",
    marginTop: 20,
    paddingLeft: 20,
  },

  titleScreen: {
    fontFamily: "roboto700",
    fontSize: 22,
    textAlign: "center",
    color: "rgba(50,56,106,1)",
    paddingLeft: 10,
  },

  sstitleScreen: {
    fontFamily: "roboto",
    fontSize: 18,
    textAlign: "center",
    color: "rgba(50,56,106,1)",
  },

  firstPartContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 25,
  },

  frontonImage: {
    width: "100%",
    height: 135,
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

  btnContainer: {
    backgroundColor: "#d8b04e",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
    borderRadius: 80,
    //width: "20%",
    marginHorizontal: 60,
  },

  btnText: {
    fontFamily: "roboto",
    color: "white",
    lineHeight: 25,
    paddingHorizontal: 10,
    fontSize: 16,
  },

  dreamContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 20,
    marginHorizontal: 15,
    paddingHorizontal: 25,
    paddingTop: 25,
    backgroundColor: "rgba(190,205,224,0.67)",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // pour Android
  },

  dreamItemLine: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "rgba(255,255,255,0.8)", // Arrière-plan dégradé
    borderRadius: 8,
  },

  dreamText: {
    fontFamily: "roboto",
    fontSize: 14, // Augmentation de la taille de la police
    color: "rgba(50,56,106,1)",
    marginLeft: 15, // Espacement entre l'icône et le texte
  },

  affirmationsContainer: {
    marginTop: 40,
  },

  viewReload: {
    paddingVertical: 25,
    alignSelf: "center",
  },

  affirmationItem: {
    width: 180,
    height: 150,
    marginRight: 20,
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  affirmationText: {
    fontFamily: "roboto",
    fontSize: 16,
    color: "white",
    flexWrap: "wrap",
    lineHeight: 20,
  },

  buttonDetach: {
    backgroundColor: "#98cdd5",
    padding: 10,
    paddingLeft: 20,
    justifyContent: "center",
    marginTop: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: "100%",
    height: 50,
  },
});
