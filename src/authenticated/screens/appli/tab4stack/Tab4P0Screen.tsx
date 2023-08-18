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
import * as Progress from "react-native-progress";
import { Ionicons } from "@expo/vector-icons";

import { collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";
import { db, auth } from "../../../../../utils/firebase.js";
import UserContext from "../../../../../utils/UserContext";

import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Une liste d'affirmations.
const initialAffirmations = [
  "J'ai le pouvoir de choisir de vivre selon mes propres intentions, plutôt que selon les attentes des autres.",
  "Chaque pensée que je choisis de penser est un grain semé pour mon futur.",
  "Il n'y a aucune restriction à ce que je peux réaliser, sauf celles que je décide d'adopter.",
  "Lorsque je change la façon de regarder les choses, les choses que je regarde changent.",
  "L'univers ne crée rien d'incomplet. Tout ce dont je rêve est possible pour moi.",
  "L'abondance n'est pas quelque chose que j'obtiens, mais plutôt quelque chose que je m'accorde.",
  "Je ne peux être solitaire que si je m'éloigne de moi-même.",
  "Il y a une force en moi qui est plus grande que n'importe quel obstacle que je pourrais rencontrer.",
  "Chaque expérience est une opportunité pour me rappeler ma grandeur.",
  "Le moment présent, maintenant, est le seul moment que j'ai. Je m'en sers pour créer le monde que je veux.",
  "Mes projets merveilleux sont le reflet de mon potentiel illimité.",
  "Ce que je pense de moi-même est bien plus important que ce que les autres pensent de moi.",
  "Je ne suis pas prisonnier du passé. Je me concentre sur ce que je peux créer ici et maintenant.",
  "Il n'est jamais trop tard pour commencer quelque chose de nouveau. L'univers entier conspire à m'aider à réussir.",
  "Ma véritable passion est mon passeport pour un avenir épanouissant.",
];

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Fonction pour obtenir une couleur aléatoire à partir d'un tableau de couleurs.
function getRandomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function Affirmations({ affirmation }) {
  return (
    <View style={[styles.affirmationItem]}>
      <Text style={styles.affirmationText}>{affirmation}</Text>
    </View>
  );
}

// Composant principal.
export default function Tab4P0() {
  // Initialisation des hooks et des états.
  const navigation =
    useNavigation<StackNavigationProp<Tab4ParamList, "Tab4P0">>();

  const db = getFirestore();
  const auth = getAuth();
  const userId = auth.currentUser?.uid; // Assurez-vous d'avoir accès à userId

  const [dreams, setDreams] = useState([]);
  const [affirmations, setAffirmations] = useState([]);
  const [lastAffirmation, setLastAffirmation] = useState(null);
  const userContext = useContext(UserContext);

  if (!userId) {
    console.error("No user ID available");
    return;
  }

  const updateSelectedAffirmation = async (affirmation: string) => {
    if (!userId) {
      console.error("No user ID available");
      return;
    }

    const userRef = doc(db, "users", userId);

    try {
      await updateDoc(userRef, {
        selectedAffirmation: affirmation,
      });
      console.log("Updated affirmation in Firestore successfully");
    } catch (error) {
      console.error("Error updating affirmation in Firestore:", error);
    }
  };

  const shuffleAffirmations = () => {
    setLastAffirmation(affirmations);
    setAffirmations(getRandomElement(initialAffirmations));
  };

  const revertToLastAffirmation = () => {
    if (lastAffirmation) {
      setAffirmations(lastAffirmation);
    }
  };

  useEffect(() => {
    setAffirmations(getRandomElement(initialAffirmations));
  }, []);

  const [setEditMode] = useState(false);
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

  useEffect(() => {
    if (auth.currentUser) {
      fetchDreams();
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchDreams);

    return unsubscribe;
  }, [navigation]);

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
            <View style={styles.btnMContainer}>
              <Text style={styles.btnText}>Mettre à jour mes projets</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.testContainer}>
          <Progress.Bar progress={0.3} width={120} />
        </View>
        <View style={styles.testContainer}>
          <Progress.Circle progress={0.4} size={50} />
        </View> */}

        <View style={styles.affirmationsContainer}>
          {/* <Affirmations affirmations={affirmations} /> */}
          <Affirmations affirmation={affirmations} />
        </View>

        <View style={styles.btnSelectMContainer}>
          <TouchableOpacity onPress={revertToLastAffirmation}>
            <View style={styles.viewReload}>
              <Ionicons name="caret-back-outline" size={25} color="#7e86c7" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={async () => {
              // 1. Mise à jour du contexte avec l'affirmation choisie.
              userContext?.setSelectedAffirmation(affirmations);

              console.log("Affirmation sélectionnée TAB4:", affirmations);
              console.log(
                "Affirmation dans le contexte depuis TAB4:",
                userContext?.selectedAffirmation
              );

              // 2. Enregistrement de l'affirmation dans Firestore.
              await updateSelectedAffirmation(affirmations);
            }}
          >
            <Text style={styles.btnText}>Celle-ci me plait</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={shuffleAffirmations}>
            <View style={styles.viewReload}>
              <Ionicons name="arrow-redo" size={25} color="#7e86c7" />
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
    //flexGrow: 1,
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

  dreamContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginHorizontal: 15,
    paddingHorizontal: 25,
    paddingTop: 25,
    //backgroundColor: "gold",
  },

  dreamItemLine: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    //backgroundColor: "rgba(255,255,255,0.8)", // Arrière-plan dégradé
    //backgroundColor: "red", // Arrière-plan dégradé
    //borderRadius: 8,
  },

  dreamText: {
    fontFamily: "roboto",
    fontSize: 14, // Augmentation de la taille de la police
    color: "rgba(50,56,106,1)",
    marginLeft: 15, // Espacement entre l'icône et le texte
  },

  btnMContainer: {
    //backgroundColor: "#d8b04e",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  btnSelectMContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",

    //backgroundColor: "#d8b04e",
    padding: 10,
    alignItems: "center",
    marginBottom: 35,
    //marginTop: 10,
    //borderRadius: 80,
    //width: "20%",
    //marginHorizontal: 60,
  },

  viewReload: {
    backgroundColor: "rgba(190,205,224,0.67)",
    width: 35, // ou la taille que vous souhaitez pour votre cercle
    height: 35, // assurez-vous que c'est la même taille que la largeur pour obtenir un cercle
    borderRadius: 25, // la moitié de la taille de votre cercle
    justifyContent: "center", // centrer l'icône verticalement
    alignItems: "center", // centrer l'icône horizontalement
    margin: 10, // espace autour du cercle, ajustez selon vos besoins
  },

  btnText: {
    fontFamily: "roboto500",
    color: "#7e86c7",
    lineHeight: 25,
    //paddingHorizontal: 10,
    fontSize: 16,
  },

  affirmationsContainer: {
    flex: 1,
    justifyContent: "center",
    marginTop: 35,
    //backgroundColor: "red",
    height: 100,
  },

  affirmationItem: {
    justifyContent: "center",
    alignItems: "center",
    //width: "100%",
    //height: 100,
    //marginRight: 20,
    paddingHorizontal: 25,
    //borderRadius: 5,
  },

  affirmationText: {
    fontFamily: "roboto",
    fontSize: 16,
    color: "#7e86c7",
    flexWrap: "wrap",
    lineHeight: 25,
  },
});
