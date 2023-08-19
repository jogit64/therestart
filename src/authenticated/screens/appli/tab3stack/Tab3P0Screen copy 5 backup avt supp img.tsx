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
import { Tab3ParamList } from "../../../../../utils/navigationTypes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/Ionicons";

import AppIntroSlider from "react-native-app-intro-slider";
import { ScrollView } from "react-native-gesture-handler";
import BreathingGuide from "./../../../../../components/BreathingGuide";
//import YouTubeVideo from "./../../../../../components/YouTubeVideo";
//import { MaterialCommunityIcons } from "@expo/vector-icons";

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

export default function Tab3() {
  const navigation =
    useNavigation<StackNavigationProp<Tab3ParamList, "Tab3P0">>();
  //const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);

  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [selectedNeed, setSelectedNeed] = useState(null);
  //const paragraphs = selectedEmotion?.stimul.split(". ");

  //const videoIds = ["Bg7-T4TalO4", "Bg7-T4TalO4", "Bg7-T4TalO4", "Bg7-T4TalO4"];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons name="desk-lamp" size={32} color="white" />
        <Text style={styles.titleScreen}>L'atelier</Text>
        <Text style={styles.sstitleScreen}> : croyances, pensées</Text>
      </View>

      <ScrollView>
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

          <TouchableOpacity
            style={styles.touchaBtnIdee}
            onPress={() => setModalVisible1(true)}
          >
            <View style={styles.BtnDiscoverContainer}>
              <Feather name="info" size={40} color="rgba(50,56,106,1)" />
              <Text style={styles.buttonText}>
                L'Atelier vous propose de travailler{"\n"} à travers deux
                approches complémentaires : {"\n"}
                <Text style={styles.boldText}>l'observation détachée</Text> et
                la {"\n"}
                <Text style={styles.boldText}>régulation émotionnelle.</Text>
              </Text>
            </View>
          </TouchableOpacity>

          <Modal visible={modalVisible1} transparent={false}>
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
              onDone={() => setModalVisible1(false)}
            />
          </Modal>
        </View>

        <View style={styles.secondPartContainer}>
          <Text style={styles.sstitle}>L'observation détachée</Text>

          <View style={styles.ssSecondParContainer}>
            <Image
              source={require("./../../../../../assets/images/bubbles1.png")}
              style={{
                width: "100%",
                height: 80,
                resizeMode: "cover",
                borderTopLeftRadius: 10, // pour le coin supérieur gauche
                borderTopRightRadius: 10, // pour le coin supérieur droit
                marginBottom: 10,
                //opacity: 0.6,
              }}
            />

            <Text style={styles.textInter}>
              Pourrez-vous désactiver vos étiquettes et vos croyances et revenir
              au moment présent ?
            </Text>

            <View style={styles.lineButtonDetach}>
              <TouchableOpacity
                style={styles.buttonDetach}
                onPress={() => navigation.navigate("Tab3P1a")}
              >
                <View style={styles.BtnContainer}>
                  <Text style={styles.afterTextBtn}>Observation détachée</Text>
                  <MaterialCommunityIcons
                    name="arrow-right"
                    size={24}
                    color="black"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.thirdPartContainer}>
          <Text style={styles.sstitle}>La régulation émotionnelle</Text>

          <View style={styles.ssSecondParContainer}>
            <Image
              source={require("./../../../../../assets/images/regulemo.png")}
              style={{
                width: "100%",
                height: 80,
                resizeMode: "cover",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                marginBottom: 10,
              }}
            />

            <Text style={styles.textInter}>
              Pourrez-vous désactiver vos étiquettes et vos croyances et revenir
              au moment présent ?
            </Text>

            <View style={styles.lineButtonDetach}>
              <TouchableOpacity
                style={styles.buttonDetach}
                onPress={() => navigation.navigate("Tab3P1b")}
              >
                <View style={styles.BtnContainer}>
                  <Text style={styles.afterTextBtn}>
                    Régulation émotionnelle
                  </Text>
                  <MaterialCommunityIcons
                    name="arrow-right"
                    size={24}
                    color="black"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
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
    //paddingTop: 20,
  },

  headerContainer: {
    flexGrow: 1,
    height: 60,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    //backgroundColor: "#6f78bd",
    backgroundColor: "rgba(190,205,224,0.67)",
    //paddingTop: 25,
    marginTop: 20,
    paddingLeft: 20,
  },

  titleScreen: {
    fontFamily: "roboto700",
    fontSize: 22,
    textAlign: "center",
    color: "rgba(50,56,106,1)",
    paddingLeft: 10,
    //  marginBottom: 15,
  },

  sstitleScreen: {
    fontFamily: "roboto",
    fontSize: 18,
    textAlign: "center",
    color: "rgba(50,56,106,1)",
    //paddingLeft: 10,
    //  marginBottom: 15,
  },

  firstPartContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 25,
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

  sstitle: {
    fontFamily: "roboto500",
    fontSize: 18,
    //alignSelf: "center",
    //textAlign: "center",
    //marginBottom: 5,
    color: "rgba(50,56,106,1)",
    marginTop: 20,
  },

  touchaBtnIdee: {
    //  backgroundColor: "#98cdd5",
    padding: 10,
    paddingLeft: 15,
    justifyContent: "center",
    marginTop: 10,
    borderRadius: 15,
    width: "100%",
    height: 150,

    borderWidth: 2,
    borderColor: "#f2f7fb",
  },

  BtnDiscoverContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  buttonText: {
    color: "rgba(50,56,106,1)",
    fontSize: 15,
    marginLeft: 18,
    lineHeight: 22,
  },

  afterTextBtn: {
    fontFamily: "roboto",
    fontSize: 16,
    marginRight: 20,
    color: "rgba(50,56,106,1)",
  },

  boldText: {
    fontWeight: "bold",
  },

  secondPartContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginVertical: 20,
  },

  thirdPartContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 25,
  },

  ssSecondParContainer: {
    backgroundColor: "#f5f6fa",
    borderRadius: 15,
    marginTop: 10,
  },

  textInter: {
    fontFamily: "roboto",
    color: "rgba(151,155,180,1)",
    lineHeight: 25,
    paddingHorizontal: 10,
    fontSize: 16,
  },

  lineButtonDetach: {
    flex: 1,
  },

  buttonDetach: {
    // backgroundColor: "#f6e482",
    //backgroundColor: "#98cdd5",
    //backgroundColor: "rgba(151,155,180,1)",
    padding: 10,
    paddingLeft: 20,
    justifyContent: "center",
    marginTop: 15,
    //borderRadius: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: "100%",
    height: 50,
  },

  BtnContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  slide: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },

  titleBoard: {
    fontFamily: "roboto700",
    fontSize: 20,
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
});
