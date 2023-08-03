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
  Alert,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TabParamList } from "../../../../../utils/navigationTypes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/Ionicons";

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

function _renderNextButton() {
  return (
    <View style={styles.buttonCircle}>
      <Text style={styles.buttonText}>Suivant</Text>
    </View>
  );
}

function _renderDoneButton() {
  return (
    <View style={styles.buttonCircle}>
      <Text style={styles.buttonText}>Terminé</Text>
    </View>
  );
}

const FormeCliquable = ({ emotion, arround, full, onClic, iconName }) => (
  <TouchableOpacity onPress={onClic} style={styles.emotionContainer}>
    <View style={styles.formeContainer}>
      <View style={[styles.arround, { backgroundColor: arround }]}>
        <View
          style={[
            styles.full,
            {
              backgroundColor: full,
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Icon name={iconName} size={30} color="white" />
        </View>
      </View>
    </View>
    <Text style={styles.emotionText}>{emotion}</Text>
  </TouchableOpacity>
);

export default function Tab3() {
  const navigation = useNavigation<StackNavigationProp<TabParamList, "Tab2">>();
  const [modalVisible, setModalVisible] = useState(false);

  const emotions = [
    {
      emotion: "Triste",
      oppositeEmotion: "Heureux",
      arround: "rgba(65,105,225,1)",
      full: "rgba(100,149,237,1)",
      iconName: "md-sad",
    },
    {
      emotion: "Enragé",
      oppositeEmotion: "Calme",
      arround: "rgba(255,0,0,1)",
      full: "rgba(139,0,0,1)",
      iconName: "md-flame",
    },
    {
      emotion: "Effrayé",
      oppositeEmotion: "Rassuré",
      arround: "rgba(255,165,0,1)",
      full: "rgba(255,140,0,1)",
      iconName: "md-flash",
    },
    {
      emotion: "Frustré",
      oppositeEmotion: "Satisfait",
      arround: "rgba(255,69,0,1)",
      full: "rgba(255,99,71,1)",
      iconName: "md-close-circle",
    },
    {
      emotion: "Déçu",
      oppositeEmotion: "Content",
      arround: "rgba(176,196,222,1)",
      full: "rgba(135,206,250,1)",
      iconName: "md-thumbs-down",
    },
    {
      emotion: "Honteux",
      oppositeEmotion: "Fier",
      arround: "rgba(255,20,147,1)",
      full: "rgba(255,105,180,1)",
      iconName: "md-eye-off",
    },
    {
      emotion: "Jaloux",
      oppositeEmotion: "Admiratif",
      arround: "rgba(107,142,35,1)",
      full: "rgba(124,252,0,1)",
      iconName: "md-heart-dislike",
    },
    {
      emotion: "Confus",
      oppositeEmotion: "Clair",
      arround: "rgba(255,215,0,1)",
      full: "rgba(255,255,0,1)",
      iconName: "md-help-circle",
    },
    {
      emotion: "Déprimé",
      oppositeEmotion: "Énergique",
      arround: "rgba(72,61,139,1)",
      full: "rgba(106,90,205,1)",
      iconName: "md-cloudy",
    },
    {
      emotion: "Anxieux",
      oppositeEmotion: "Paisible",
      arround: "rgba(255,105,180,1)",
      full: "rgba(219,112,147,1)",
      iconName: "md-pulse",
    },
    {
      emotion: "Isolé",
      oppositeEmotion: "Connecté",
      arround: "rgba(192,192,192,1)",
      full: "rgba(211,211,211,1)",
      iconName: "md-person",
    },
    {
      emotion: "Apathique",
      oppositeEmotion: "Engagé",
      arround: "rgba(128,128,128,1)",
      full: "rgba(105,105,105,1)",
      iconName: "md-remove-circle",
    },
    {
      emotion: "Ressentiment",
      oppositeEmotion: "Reconnaissance",
      arround: "rgba(85,107,47,1)",
      full: "rgba(154,205,50,1)",
      iconName: "md-flash-off",
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.seedContainer}>
          <Image
            source={require("./../../../../../assets/images/logoReStart.png")}
            style={{ width: 35, height: 35 }}
          />
          <Text style={styles.title}>Antidotes</Text>
        </View>
        <View style={styles.firstPartContainer}>
          <ImageBackground
            source={require("./../../../../../assets/images/fronton.png")}
            style={styles.frontonImage}
            resizeMode="cover"
          >
            <Text style={styles.textIntro}>
              Désactivez vos étiquettes, renversez vos émotions négatives et
              revitalisez vos besoins intérieurs !
            </Text>
          </ImageBackground>
          {/* <Text style={styles.textIntro}>
            Commencez par la visite guidée pour une meilleure exploration de
            l'application.
          </Text> */}
          <Text style={styles.sstitle}>Idées générales</Text>
          <TouchableOpacity
            style={styles.buttonIdees}
            onPress={() => setModalVisible(true)}
          >
            <View style={styles.BtnContainer}>
              {/* <MaterialCommunityIcons
                name="book-open-page-variant"
                size={24}
                color="white"
              /> */}
              <Feather name="info" size={36} color="white" />
              <Text style={styles.buttonText}>
                Découvrez les idées clés {"\n"} et inspirez-vous des hypothèses
              </Text>
            </View>
          </TouchableOpacity>
          <Modal visible={modalVisible} transparent={false}>
            <AppIntroSlider
              data={slides}
              renderItem={({ item }) => {
                return (
                  <View
                    style={[
                      styles.slide,
                      { backgroundColor: item.backgroundColor },
                    ]}
                  >
                    <Text style={styles.titleBoard}>{item.title}</Text>
                    <Text style={styles.textBoard}>{item.text}</Text>
                  </View>
                );
              }}
              renderNextButton={_renderNextButton}
              renderDoneButton={_renderDoneButton}
              onDone={() => setModalVisible(false)}
            />
          </Modal>
        </View>

        {/* <View style={styles.separator} /> */}

        <View style={styles.secondPartContainer}>
          <Image
            source={require("./../../../../../assets/images/bubbles1.png")}
            style={{
              width: "100%",
              height: 180,
              borderRadius: 10,
              marginTop: 15,
            }}
          />
          <Text style={styles.sstitle}>Approchez le détachement</Text>
          <Text style={styles.textInter}>
            Pourrez-vous désactiver vos étiquettes et vos croyances ?
          </Text>
          <TouchableOpacity
            style={styles.buttonDetach}
            onPress={() => navigation.navigate("Tab3P1")}
          >
            <View style={styles.BtnContainer}>
              <MaterialCommunityIcons
                name="gesture-tap"
                size={36}
                color="white"
              />
              {/* <Feather name="gesture-tap" size={36} color="white" /> */}

              <Text style={styles.buttonText}>
                Sélectionnez jusqu'à 3 thème
                {/* {"\n"} et désactivez étiquettes et
                croyances */}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.thirdPartContainer}>
          <Image
            source={require("./../../../../../assets/images/plants1.png")}
            style={{
              width: "100%",
              height: 180,
              borderRadius: 10,
              marginTop: 15,
            }}
          />
          <Text style={styles.sstitle}>Inverser vos émotions</Text>
          <Text style={styles.textInter}>
            Cliquez sur l'émotion et recherchez à faire émerger un sentiment
            inverse
          </Text>
          {/* <TouchableOpacity
            style={styles.buttonEmotion}
            // onPress={() => navigation.navigate("Tab3P1")}
          >
            <View style={styles.BtnContainer}>
              <MaterialCommunityIcons
                name="gesture-tap"
                size={36}
                color="white"
              />
          
            </View>
          </TouchableOpacity> */}

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {emotions.map((item, index) => (
              <FormeCliquable
                key={index}
                emotion={item.emotion}
                arround={item.arround}
                full={item.full}
                iconName={item.iconName} // Ajoute cette ligne
                onClic={() =>
                  Alert.alert(`Emotion sélectionnée : ${item.emotion}`)
                }
              />
            ))}
          </ScrollView>
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
    paddingHorizontal: 20,
  },

  secondPartContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },

  thirdPartContainer: {
    flex: 1,
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

  frontonImage: {
    width: "100%",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
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
    paddingHorizontal: 10,
    fontSize: 16,
  },

  textInter: {
    fontFamily: "roboto",
    color: "rgba(151,155,180,1)",
    lineHeight: 25,
    //paddingHorizontal: 10,
    fontSize: 16,
  },

  BtnContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  buttonIdees: {
    backgroundColor: "#20c2cd",
    padding: 10,
    paddingLeft: 20,
    justifyContent: "center",
    marginTop: 15,
    borderRadius: 15,
    width: "100%",
    height: 80,
  },

  buttonDetach: {
    backgroundColor: "#d8b04e",
    padding: 10,
    paddingLeft: 20,
    justifyContent: "center",
    marginTop: 15,
    borderRadius: 15,
    width: "100%",
    height: 80,
  },

  buttonEmotion: {
    backgroundColor: "#d8b04e",
    padding: 10,
    justifyContent: "center",
    marginTop: 15,
    borderRadius: 80,
    width: "20%",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    marginLeft: 22,
    lineHeight: 22,
  },
  slide: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  titleBoard: {
    fontFamily: "roboto700",
    fontSize: 24,
    textAlign: "center",
    color: "rgba(50,56,106,1)",
    paddingLeft: 10,
    marginVertical: 25,
  },
  textBoard: {
    fontFamily: "roboto",
    color: "rgba(151,155,180,1)",
    lineHeight: 25,
    paddingHorizontal: 10,
    fontSize: 16,
  },

  buttonCircle: {
    width: 90,
    height: 40,
    backgroundColor: "rgba(0, 0, 0, .2)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  itemContainer: {
    width: "100%",
    height: 80,
    padding: 10,
    marginTop: 10,
    justifyContent: "center",
    borderRadius: 15,
  },
  itemText: {
    fontFamily: "roboto",
    color: "rgba(50,56,106,1)",
    lineHeight: 25,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  lancerBtn: {
    fontSize: 18,
    color: "black",
    marginTop: 25,
    marginBottom: 55,
  },

  formeContainer: {
    alignItems: "center", // Pour centrer la forme
    justifyContent: "center", // Pour centrer la forme
  },
  arround: {
    width: 141 / 2,
    height: 134 / 2,
    borderRadius: 100,
    marginTop: 20,
  },
  full: {
    width: 126 / 2,
    height: 120 / 2,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
    marginTop: 7 / 2,
    marginLeft: 7 / 2,
  },
  emotionContainer: {
    alignItems: "center", // Pour centrer le texte et la forme
    marginRight: 20, // Pour espacer les vues
    marginBottom: 30,
  },
  emotionText: {
    fontSize: 12,
    color: "black",
    marginTop: 5, // Espace entre la forme et le texte
    textAlign: "center", // Pour centrer le texte
  },
});
