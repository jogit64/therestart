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
import { TabParamList } from "../../../../../utils/navigationTypes";
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
  const navigation = useNavigation<StackNavigationProp<TabParamList, "Tab2">>();
  const [modalVisible, setModalVisible] = useState(false);

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
          <Text style={styles.sstitle}>Approchez le détachement</Text>
          <Text style={styles.textIntro}>
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
          <Text style={styles.sstitle}>Inverser vos émotions</Text>
          <Text style={styles.textIntro}>
            Cliquez sur l'émotion et recherchez à faire émerger un sentiment
            inverse
          </Text>
          <TouchableOpacity
            style={styles.buttonEmotion}
            // onPress={() => navigation.navigate("Tab3P1")}
          >
            <View style={styles.BtnContainer}>
              <MaterialCommunityIcons
                name="gesture-tap"
                size={36}
                color="white"
              />
              {/* <Feather name="gesture-tap" size={36} color="white" /> */}

              {/* <Text style={styles.buttonText}>
                Sélectionnez jusqu'à 3 thème
              </Text> */}
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
});
