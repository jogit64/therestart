import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Linking,
  Image,
  ImageBackground,
} from "react-native";
import LottieView from "lottie-react-native";

import rondBleuAnimation from "./../../../../assets/animations/rondbleu.json";
import rondVertAnimation from "./../../../../assets/animations/rondvert.json";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { StackNavigationProp } from "@react-navigation/stack";
import { TabParamList } from "../../../../utils/navigationTypes";

import { TabBar, TabView } from "react-native-tab-view";

export default function Tab2() {
  //const navigation = useNavigation();
  const navigation = useNavigation<StackNavigationProp<TabParamList, "Tab2">>();

  //const firstName = "utilisateur"; // Utilisez le prénom de l'utilisateur ici

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "ARROSEZ !" },
    { key: "second", title: "PLANTEZ !" },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return (
          <ScrollView contentContainerStyle={styles.blocContainer}>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                style={styles.lottieButton}
                onPress={() => navigation.navigate("ScreenRandomMemory")}
              >
                <LottieView
                  source={rondBleuAnimation}
                  autoPlay
                  style={styles.animation}
                />
                <MaterialCommunityIcons
                  name="watering-can-outline"
                  size={40}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.sstitle}>Revivez vos moments magiques</Text>
            <Text style={styles.textTab}>
              Cliquez ici pour afficher aléatoirement vos précieux souvenirs.
              Laissez-vous emporter par les sentiments de joie et
              d'émerveillement qu'ils suscitent, comme si vous les viviez de
              nouveau.
            </Text>

            <View style={styles.interblocContainer}>
              <Text style={styles.sstitle}>Principes</Text>
              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.textTab}>
                  Les émotions positives sont bénéfiques pour votre santé et
                  votre bien-être. En vous concentrant sur les aspects joyeux de
                  la vie plutôt que sur les aspects négatifs ou pessimistes,
                  vous pouvez améliorer votre qualité de vie.
                </Text>
              </View>
              {/* Répétez cette structure pour chaque élément de la liste */}
            </View>
          </ScrollView>
        );
      case "second":
        return (
          <ScrollView contentContainerStyle={styles.blocContainer}>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                style={styles.lottieButton}
                onPress={() => navigation.navigate("ScreenManageMemory")}
              >
                <LottieView
                  source={rondVertAnimation}
                  autoPlay
                  style={styles.animation}
                />
                <MaterialCommunityIcons name="shovel" size={40} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text style={styles.sstitle}>
              Plantez vos graines d'enchantement
            </Text>
            <Text style={styles.textTab}>
              N'avez-vous pas encore planté vos graines de joie ? Ces graines
              sont vos souvenirs d'enfance, empreints de magie et d'insouciance.
              Ajoutez-les à votre jardin personnel et regardez-les grandir
              chaque fois que vous les visitez.
            </Text>
            <View style={styles.interblocContainer}>
              <Text style={styles.sstitle}>Principes</Text>
              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.textTab}>
                  Les émotions positives sont bénéfiques pour votre santé et
                  votre bien-être. En vous concentrant sur les aspects joyeux de
                  la vie plutôt que sur les aspects négatifs ou pessimistes,
                  vous pouvez améliorer votre qualité de vie.
                </Text>
              </View>
              {/* Répétez cette structure pour chaque élément de la liste */}
            </View>
          </ScrollView>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.seedContainer}>
        <Image
          source={require("./../../../../assets/images/logoReStart.png")}
          style={{ width: 35, height: 35 }}
        />
        <Text style={styles.title}>Cultivez vos graines</Text>
        <Text style={styles.title}>de joie !</Text>
      </View>

      <ImageBackground
        source={require("./../../../../assets/images/fronton.png")}
        style={styles.frontonImage}
        resizeMode="cover"
      >
        <Text style={styles.textIntro}>
          Réveillez vos souvenirs heureux, arrosez-les et voyez comment ils
          égayent votre journée !
        </Text>
      </ImageBackground>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{
              backgroundColor: "rgba(50,56,106,1)",
              height: 4,
              borderRadius: 2,
            }}
            style={styles.tabBar}
            renderLabel={({ route, focused, color }) => (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={
                    focused ? styles.activeTabTitle : styles.inactiveTabTitle
                  }
                >
                  {route.title}
                </Text>
              </View>
            )}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 20,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    //alignItems: "center",
    padding: 20,
    marginTop: 25,
    backgroundColor: "white",
  },

  lottieButton: {
    //width: "100%",
    //height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    position: "absolute",
    width: 250,
    height: 250,
  },
  overlay: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  // text: {
  //   fontSize: 18,
  //   fontFamily: "roboto",
  //   color: "#ffffff",
  // },
  title: {
    fontFamily: "roboto700",
    fontSize: 24,
    textAlign: "center",
    // marginBottom: 20,
    color: "rgba(50,56,106,1)",
    paddingLeft: 10,
  },
  sstitle: {
    fontFamily: "roboto500",
    fontSize: 16,
    textAlign: "left",
    //marginBottom: 10,
    color: "rgba(50,56,106,1)",
    marginTop: 10,
  },
  textTab: {
    fontFamily: "roboto",
    color: "rgba(151,155,180,1)",
    // width: 300,
    // height: 60,
    //textAlign: "center",
    lineHeight: 25,
    // marginTop: 15,
    //paddingHorizontal: 10,
    fontSize: 16,
    textAlign: "left",
  },
  // textIntro: {
  //   fontFamily: "roboto",
  //   //color: "rgba(151,155,180,1)",
  //   color: "rgba(50,56,106,1)",
  //   textAlign: "center",
  //   lineHeight: 20,
  //   fontSize: 14,
  //   marginVertical: 5,
  // },

  frontonImage: {
    width: "100%",
    height: 120,
    justifyContent: "center", // Pour le centrage vertical
    alignItems: "center", // Pour le centrage horizontal
    marginBottom: 20,
  },

  textIntro: {
    fontFamily: "roboto",
    color: "rgba(151,155,180,1)",
    // width: 300,
    // height: 60,
    //textAlign: "center",
    lineHeight: 25,
    // marginTop: 15,
    paddingHorizontal: 10,
    fontSize: 16,
  },

  textPar: {
    fontFamily: "roboto",
    color: "rgba(151,155,180,1)",
    //textAlign: "center",
    lineHeight: 20,
    fontSize: 14,
    marginVertical: 10,
  },

  seedContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    flexWrap: "wrap",

    //marginTop: 20,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
  },
  interblocContainer: {
    marginBottom: 65,
    marginTop: 25,
  },
  blocContainer: {
    //backgroundColor: "#c3d9e4", // utilisation de l'une des couleurs de votre palette
    marginBottom: 35,
    paddingBottom: 50,
    paddingTop: 20,
    borderRadius: 10, // arrondit les coins du bloc
    // shadowColor: "#000", // définit la couleur de l'ombre
    // shadowOffset: { width: 0, height: 2 }, // décale l'ombre horizontalement et verticalement
    // shadowOpacity: 0.2, // contrôle la transparence de l'ombre
    // shadowRadius: 2, // contrôle la flou de l'ombre
    // elevation: 5, // ajoute une ombre pour Android
    padding: 15, // ajoute une marge interne pour donner un peu d'espace au contenu
  },

  tabBar: {
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0,
    shadowRadius: 3.84,
    borderRadius: 50,
    //backgroundColor: "#c3d9e4",
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  // tabLabelActive: {
  //   color: "#000", // couleur du titre de l'onglet actif
  //   fontSize: 16, // taille de la police
  //   //backgroundColor: "#c5c7e0", // couleur de fond de l'onglet actif
  // },
  // tabLabelInactive: {
  //   color: "#000", // couleur du titre de l'onglet inactif
  //   fontSize: 16, // taille de la police
  //   //backgroundColor: "#fff", // couleur de fond de l'onglet inactif
  // },
  // tabLabel: {
  //   fontFamily: "roboto500",
  //   fontSize: 20,
  //   textAlign: "center",
  //   //marginBottom: 10,
  //   color: "rgba(50,56,106,1)",
  // },

  activeTabTitle: {
    fontFamily: "roboto500",
    fontSize: 14,
    textAlign: "center",
    //marginBottom: 10,
    color: "rgba(50,56,106,1)",
  },
  inactiveTabTitle: {
    color: "rgba(151,155,180,1)",
    fontFamily: "roboto500",
    fontSize: 14,
    textAlign: "center",
    //marginBottom: 10,
  },
  listItem: {
    flexDirection: "row", // Place le bullet et le texte côte à côte
    marginBottom: 10, // Ajoute un espace entre chaque élément de la liste
  },
  bullet: {
    width: 25, // Donne de l'espace pour le bullet
    marginLeft: 10,
  },
});
