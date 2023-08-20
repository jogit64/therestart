import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useHardwareBackButton } from "components/useHardwareBackButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Tab1ParamList } from "../../../../../utils/navigationTypes";

export default function Tab1P1Screen() {
  useHardwareBackButton();
  const navigation =
    useNavigation<StackNavigationProp<Tab1ParamList, "Tab1P0">>();
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Tab1P0")}>
            <View style={styles.backButtonContainer}>
              <MaterialCommunityIcons
                name="arrow-left"
                size={24}
                color="#000"
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.titleScreen}>Le plan de Zen·Zones</Text>
        </View>

        <View style={styles.firstPartContainer}>
          <View style={styles.frontonContainer}>
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
          </View>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{ transform: [{ rotate: "-90deg" }], alignSelf: "center" }}
            >
              <Text style={styles.textMonoZen}>Zen·Zones</Text>
            </View>
            <Text style={styles.textMono}>
              {`
+-------+  +-------+
|Récep. |  | Atel. |
+-------+  +-------+
+-------+  +-------+
|Jardin |  | Phare |
+-------+  +-------+
`}
            </Text>
          </View>

          <View style={styles.iconTextContainer}>
            <MaterialCommunityIcons
              name="bell-ring-outline"
              size={24}
              color="#5b5da7"
            />

            <Text style={styles.sstitle}>La réception</Text>
          </View>
          <Text style={styles.textRoom}>
            Votre point de départ dans Zen Zones. Accédez aux réglages, ajustez
            votre profil, consultez le tutoriel, les FAQ, et échangez avec le
            développeur. Gérez votre connexion et vos informations personnelles.
          </Text>

          <View style={styles.iconTextContainer}>
            <MaterialCommunityIcons
              name="desk-lamp"
              size={24}
              color="#5b5da7"
            />
            <Text style={styles.sstitle}>L'atelier</Text>
          </View>
          <Text style={styles.textRoom}>
            L'espace dédié à votre introspection profonde. Affinez votre
            compréhension de vous-même et équilibrez vos perspectives.
          </Text>

          <View style={styles.iconTextContainer}>
            <MaterialCommunityIcons name="flower" size={24} color="#5b5da7" />
            <Text style={styles.sstitle}>Le jardin</Text>
          </View>
          <Text style={styles.textRoom}>
            Nourrissez votre âme avec des souvenirs précieux. Plongez dans vos
            graines de joie, ces instants d'enfance qui apportent lumière et
            insouciance.
          </Text>

          <View style={styles.iconTextContainer}>
            <MaterialCommunityIcons
              name="lighthouse-on"
              size={24}
              color="#5b5da7"
            />
            <Text style={styles.sstitle}>Le phare</Text>
          </View>
          <Text style={styles.textRoom}>
            L'éclaireur de votre avenir radieux. Notez et planifiez vos projets
            merveilleux pour qu'ils ne restent pas dans l'ombre. Ce phare veille
            à ce que vos aspirations illuminent votre chemin.
          </Text>
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

  backButtonContainer: {
    width: 40, // Taille du cercle
    height: 40,
    borderRadius: 20, // Arrondi pour rendre le cercle parfait
    backgroundColor: "#f5f6fa",
    justifyContent: "center", // Centrez l'icône horizontalement
    alignItems: "center", // Centrez l'icône verticalement
    marginRight: 15, // Espace entre le bouton et le texte
    marginTop: 5,
  },

  titleScreen: {
    fontFamily: "roboto700",
    fontSize: 20,
    textAlign: "center",
    color: "rgba(50,56,106,1)",
    paddingLeft: 10,
  },

  firstPartContainer: {
    flex: 1,
    paddingHorizontal: 18,
    marginTop: 20,
  },

  frontonContainer: {
    //marginBottom: 20,
  },

  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    //marginTop: 20,
    //marginLeft: 10, // Pour aligner avec le reste du contenu
  },

  sstitle: {
    alignItems: "center",
    fontFamily: "roboto500",
    fontSize: 18,
    color: "rgba(50,56,106,1)",
    marginLeft: 5,
  },

  textIntro: {
    fontFamily: "roboto",
    color: "rgba(151,155,180,1)",
    lineHeight: 25,
    paddingHorizontal: 10,
    fontSize: 16,
  },

  textRoom: {
    fontFamily: "roboto",
    fontSize: 16,
    color: "rgba(151,155,180,1)",
    lineHeight: 25,
    borderColor: "rgba(151,155,180,1)",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 30,
    marginTop: 10,
  },

  frontonImage: {
    width: "100%",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },

  textMono: {
    fontFamily: "monospace",
    color: "rgba(151,155,180,1)",
    fontSize: 14,
    alignSelf: "center",
  },

  textMonoZen: {
    fontFamily: "monospace",
    color: "rgba(151,155,180,1)",
    fontSize: 14,
    alignSelf: "center",
    //marginRight: -20,
    marginBottom: -40,
  },
});
