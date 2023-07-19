import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  FlatList,
  Button,
  ScrollView,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TabParamList } from "../../../../utils/navigationTypes";
import { Surface } from "@react-native-material/core";

import { MaterialCommunityIcons } from "@expo/vector-icons";

// Une liste d'affirmations. Vous pouvez en ajouter autant que vous voulez ici.
const initialAffirmations = [
  "Je suis parfait et sans faute dans ma nature essentielle",
  "Je détermine ma biologie par mes croyances",
  "Je suis en premier lieu déterminé par ce que je crois",
  "Je change qui je suis en changeant mes croyances",
  "Je suis mes croyances et non mes cellules",
  "Je soutiens mes comportements avec mes modèles de pensée",
  "Je suis une partie de l'intelligence infinie de Dieu",
  "Je possède une capacité de grandeur qui transcende tout ce qu'on m'a appris à croire",
  "Je suis une partie du divin",
  "Je suis tout ce que je choisis d'être",
  "Je peux modifier les infirmités de mon corps en modifiant mes croyances",
  "Je peux guérir n'importe quoi en guérissant d'abord mes pensées",
  "Je donne la première place à mes croyances et refuse de blâmer le monde matériel",
  "Je suis parfaitement capable de vaincre le conditionnement précoce",
  "Je peux déprogrammer tout ce qui a été programmé en moi",
  "Je commence maintenant car j'en ai la capacité",
  "Je suis plus puissant que les anciens programmes et virus de l'esprit",
  "Je comprends que mes pensées sont un système énergétique",
  "Je possède déjà ce que je désire mais je ne m'y suis pas encore connecté",
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

// Fonction pour mélanger un tableau
function shuffleArray(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
// Fonction pour obtenir une couleur aléatoire
function getRandomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

// function Affirmations({ affirmations }) {
//   return (
//     <View style={styles.affirmationsContainer}>
//       <Text style={styles.affirmationsTitle}>Affirmations positives</Text>
//       <FlatList
//         data={affirmations}
//         horizontal={true}
//         keyExtractor={(item, index) => "key" + index}
//         renderItem={({ item }) => (
//           <View style={styles.affirmationItem}>
//             <Text style={styles.affirmationText}>{item}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

function Affirmations({ affirmations }) {
  return (
    // <View style={styles.affirmationsContainer}>
    <View>
      {/* <Text style={styles.affirmationsTitle}>Je suis..</Text> */}
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

export default function Tab4() {
  const navigation = useNavigation<StackNavigationProp<TabParamList, "4">>();

  const [newDream, setNewDream] = useState("");
  const [dreams, setDreams] = useState([]);
  const [affirmations, setAffirmations] = useState([]);

  const shuffleAffirmations = () => {
    setAffirmations(shuffleArray([...initialAffirmations]));
  };

  useEffect(() => {
    setAffirmations(shuffleArray(initialAffirmations));
  }, []);

  const [editMode, setEditMode] = useState(false);

  const handleAddDream = () => {
    setDreams([...dreams, newDream]);

    setNewDream("");
    setEditMode(false);
  };

  const handleDeleteDream = (index) => {
    const newDreams = [...dreams];
    newDreams.splice(index, 1);
    setDreams(newDreams);
  };

  return (
    <View style={styles.container}>
      <View style={styles.seedContainer}>
        <Image
          source={require("./../../../../assets/images/logoReStart.png")}
          style={{ width: 35, height: 35 }}
        />
        <Text style={styles.title}>Rêvez !</Text>
      </View>

      <ImageBackground
        source={require("./../../../../assets/images/fronton.png")}
        style={styles.frontonImage}
        resizeMode="cover"
      >
        <Text style={styles.textIntro}>
          Capturez la lumière de vos projets idéaux, nourrissez-les avec votre
          attention, et laissez leur énergie transfigurer votre quotidien!
        </Text>
      </ImageBackground>

      <ScrollView>
        <View style={styles.dreamContainer}>
          {dreams.map((dream, index) => (
            <View style={styles.dreamItemLine} key={index}>
              <Text style={styles.dreamText} onPress={() => setEditMode(true)}>
                {dream}
              </Text>

              {editMode && (
                <TouchableOpacity onPress={() => handleDeleteDream(index)}>
                  <Text style={styles.deleteButton}>✕</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}

          {editMode ? (
            <View style={styles.inputContainer}>
              <TextInput
                value={newDream}
                onChangeText={setNewDream}
                style={styles.textInput}
                onSubmitEditing={handleAddDream}
                autoFocus={true}
              />
              <TouchableOpacity onPress={handleAddDream}>
                <Text style={styles.addButton}>✕</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={() => setEditMode(true)}>
              <Text style={styles.addDreamText}>+ Ajouter un rêve</Text>
            </TouchableOpacity>
          )}
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
    flexGrow: 1,
    justifyContent: "flex-start",
    padding: 20,
    marginTop: 25,
    backgroundColor: "white",
  },
  title: {
    fontFamily: "roboto700",
    fontSize: 24,
    textAlign: "center",
    color: "rgba(50,56,106,1)",
    paddingLeft: 10,
  },
  frontonImage: {
    width: "100%",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  textIntro: {
    fontFamily: "roboto",
    color: "rgba(151,155,180,1)",
    lineHeight: 25,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  seedContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    flexWrap: "wrap",
  },
  dreamContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 10,
    //backgroundColor: "red",
    paddingHorizontal: 25,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInput: {
    height: 40,
    width: "80%",
    marginBottom: 10,
  },
  addButton: {
    fontSize: 18,
    color: "red",
  },
  addDreamText: {
    fontFamily: "roboto500",
    fontSize: 16,
    //marginBottom: 10,
    marginTop: 20,
    color: "rgba(50,56,106,1)",
    alignSelf: "center",
  },
  dreamItemLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    //paddingLeft: 30,
    // backgroundColor: "green",
  },
  dreamText: {
    fontFamily: "roboto",
    fontSize: 16,
    color: "rgba(50,56,106,1)",
  },
  deleteButton: {
    fontSize: 16,
    color: "rgba(50,56,106,1)",
  },
  dreamList: {
    marginBottom: 20,
  },
  affirmationsContainer: {
    marginTop: 40,
    //backgroundColor: "grey",
    //minHeight: 200,
    //marginVertical: 20,
    //paddingVertical: 25,
    //paddingBottom: 10,
    //flex: 1,
    // flexDirection: "column",
    // justifyContent: "center",
    //alignItems: "center",
  },
  viewReload: {
    paddingVertical: 25,
    //flex: 1,
    // flexDirection: "column",
    // justifyContent: "center",
    //alignItems: "center",
    alignSelf: "center",
  },
  // affirmationsTitle: {
  //   fontFamily: "roboto500",
  //   fontSize: 16,
  //   marginBottom: 50,
  //   color: "rgba(50,56,106,1)",
  //   alignSelf: "center",
  // },

  affirmationItem: {
    //backgroundColor: "rgba(50,56,106,1)",
    // backgroundColor: "red",
    width: 180, // Largeur fixe
    height: 150, // Hauteur fixe
    marginRight: 20, // Espacement à droite
    padding: 10, // Padding pour donner de l'espace autour du texte
    borderRadius: 5, // Coins arrondis
    justifyContent: "center", // Centrer le contenu verticalement
    alignItems: "center", // Centrer le contenu horizontalement
  },

  affirmationText: {
    fontFamily: "roboto",
    fontSize: 16,
    color: "white",
    flexWrap: "wrap", // Faire en sorte que le texte aille à la ligne si nécessaire
    //flex: 1, // Permet au texte de prendre toute la largeur du parent
    lineHeight: 20,
  },
});
