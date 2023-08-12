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
import test from "./../../../../assets/animations/test.json";
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
            {/* <View style={styles.iconContainer}>
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
            </View> */}
            <Text style={styles.sstitle}>Revivez vos moments magiques</Text>
            <View style={styles.ssSecondParContainer}>
              <Image
                source={require("./../../../../assets/images/plants1.png")}
                style={{
                  width: "100%",
                  height: 80,
                  resizeMode: "cover",
                  borderTopLeftRadius: 10, // pour le coin supérieur gauche
                  borderTopRightRadius: 10, // pour le coin supérieur droit
                  marginBottom: 10,
                }}
              />
              <Text style={styles.textTab}>
                Cliquez ici pour afficher aléatoirement vos précieux souvenirs.
                Laissez-vous emporter par les sentiments de joie et
                d'émerveillement qu'ils suscitent, comme si vous les viviez de
                nouveau.
              </Text>
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
                    style={styles.iconRotate}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.interblocContainer}>
              <Text style={styles.sstitle}>Principes</Text>
              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.textPrincip}>
                  Concentrez-vous sur les joies de la vie pour améliorer votre
                  bien-être.
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.textPrincip}>
                  Visitez vos souvenirs plusieurs fois par jour pour cultiver
                  les émotions positives.
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.textPrincip}>
                  N'hésitez pas à ajouter de nouveaux souvenirs à mesure qu'ils
                  surgissent.
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.textPrincip}>
                  En cultivant la joie, vous enrichissez non seulement votre
                  vie, mais aussi le monde entier.
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.textPrincip}>
                  Exercer l'émerveillement favorise la santé, la créativité et
                  l'appréciation de l'infini.
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.textPrincip}>
                  Chaque souvenir joyeux que vous cultivez diffuse de la
                  positivité dans le cosmos.
                </Text>
              </View>
            </View>
          </ScrollView>
        );
      case "second":
        return (
          <ScrollView contentContainerStyle={styles.blocContainer}>
            {/* <View style={styles.iconContainer}>
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
            </View> */}
            <Text style={styles.sstitle}>
              Plantez vos graines d'enchantement
            </Text>
            <View style={styles.ssSecondParContainer}>
              <Image
                source={require("./../../../../assets/images/seedsHand.png")}
                style={{
                  width: "100%",
                  height: 80,
                  resizeMode: "cover",
                  borderTopLeftRadius: 10, // pour le coin supérieur gauche
                  borderTopRightRadius: 10, // pour le coin supérieur droit
                  marginBottom: 10,
                }}
              />
              <Text style={styles.textTab}>
                N'avez-vous pas encore planté vos graines de joie ? Ces graines
                sont vos souvenirs d'enfance, empreints de magie et
                d'insouciance. Ajoutez-les à votre jardin personnel et
                regardez-les grandir chaque fois que vous les visitez.
              </Text>
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
                  <MaterialCommunityIcons
                    name="shovel"
                    size={40}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.interblocContainer}>
              <Text style={styles.sstitle}>Principes</Text>
              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.textPrincip}>
                  Plantez uniquement des souvenirs qui éveillent un sentiment
                  d'émerveillement.
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.textPrincip}>
                  Catégorisez vos souvenirs, mais sentez-vous libre de créer vos
                  propres catégories.
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.textPrincip}>
                  Utilisez des titres évocateurs comme des signes indicateurs
                  pour stimuler l'émotion.
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.textPrincip}>
                  Ne décrivez pas le souvenir, évoquez-le. (taille limitée à 30
                  caractères)
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.textPrincip}>
                  Cultivez régulièrement votre jardin de souvenirs pour faire
                  grandir vos émotions positives.
                </Text>
              </View>
            </View>
          </ScrollView>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons
          //name="flask"
          //name="medical-bag"
          name="flower"
          size={32}
          color="white"
        />
        <Text style={styles.titleScreen}>Le jardin</Text>
        <Text style={styles.sstitleScreen}> : vos graines de joie</Text>
      </View>

      <View style={styles.firstPartContainer}>
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
      </View>

      <View style={styles.secondPartContainer}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              indicatorStyle={{
                backgroundColor: "rgba(50,56,106,1)",
                height: 2,
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
    </View>
  );
}

const styles = StyleSheet.create({
  // mainContainer: {
  //   flex: 1,
  //   paddingTop: 20,
  // },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "white",
  },

  headerContainer: {
    // flexGrow: 1,
    //flex: 1,
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
    // flex: 1,
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

  secondPartContainer: {
    flex: 1,
    paddingHorizontal: 20,
    //marginTop: 25,
  },

  tabBar: {
    shadowColor: "rgba(151,155,180,1)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0,
    shadowRadius: 3.84,
    //borderRadius: 50,
    //backgroundColor: "#c3d9e4",
    backgroundColor: "#fff",
    //marginBottom: 10,
    marginTop: 5,
  },

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
  //
  //
  // RENDER SCENE

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
    //padding: 15, // ajoute une marge interne pour donner un peu d'espace au contenu
  },

  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 45,
    marginBottom: 55,
  },

  iconRotate: {
    transform: [{ rotate: "35deg" }], // ajustez la valeur pour obtenir l'angle de rotation souhaité
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

  sstitle: {
    fontFamily: "roboto500",
    fontSize: 18,
    textAlign: "left",
    //marginBottom: 10,
    color: "rgba(50,56,106,1)",
    //marginTop: 10,
    marginBottom: 5,
  },

  ssSecondParContainer: {
    backgroundColor: "#f5f6fa",
    borderRadius: 15,
    marginTop: 10,
    //padding: 15,
  },

  textTab: {
    fontFamily: "roboto",
    fontSize: 16,
    color: "rgba(151,155,180,1)",
    lineHeight: 25,
    paddingHorizontal: 15,
    textAlign: "left",
  },

  interblocContainer: {
    marginBottom: 65,
    marginTop: 25,
    paddingRight: 25,
    marginRight: 10,
  },

  textPrincip: {
    fontFamily: "roboto",
    fontSize: 14,
    color: "rgba(151,155,180,1)",
    //color: "red",
    lineHeight: 23,
    //paddingRight: 10,
    textAlign: "left",
  },

  listItem: {
    flexDirection: "row", // Place le bullet et le texte côte à côte
    marginBottom: 10, // Ajoute un espace entre chaque élément de la liste
  },

  bullet: {
    width: 25, // Donne de l'espace pour le bullet
    marginLeft: 10,
  },

  // CONST ROUTE
  title: {
    fontFamily: "roboto700",
    fontSize: 24,
    textAlign: "center",
    // marginBottom: 20,
    color: "rgba(50,56,106,1)",
    paddingLeft: 10,
    marginBottom: 15,
  },

  // seedContainer: {
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   flexWrap: "wrap",

  //   marginBottom: 15,
  //   //marginTop: 20,
  // },

  // overlay: {
  //   position: "absolute",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // text: {
  //   fontSize: 18,
  //   fontFamily: "roboto",
  //   color: "#ffffff",
  // },

  // textIntro: {
  //   fontFamily: "roboto",
  //   //color: "rgba(151,155,180,1)",
  //   color: "rgba(50,56,106,1)",
  //   textAlign: "center",
  //   lineHeight: 20,
  //   fontSize: 14,
  //   marginVertical: 5,
  // },

  // frontonImage: {
  //   width: "100%",
  //   height: 100,
  //   justifyContent: "center", // Pour le centrage vertical
  //   alignItems: "center", // Pour le centrage horizontal
  //   marginBottom: 20,
  // },

  // textIntro: {
  //   fontFamily: "roboto",
  //   color: "rgba(151,155,180,1)",
  //   // width: 300,
  //   // height: 60,
  //   //textAlign: "center",
  //   lineHeight: 25,
  //   // marginTop: 15,
  //   paddingHorizontal: 10,
  //   fontSize: 16,
  // },

  // textPar: {
  //   fontFamily: "roboto",
  //   color: "rgba(151,155,180,1)",
  //   //textAlign: "center",
  //   lineHeight: 20,
  //   fontSize: 14,
  //   marginVertical: 10,
  // },

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

  // logoStyleA: {
  //   width: 60, // Ajustez selon la taille souhaitée
  //   height: 60, // Ajustez selon la taille souhaitée
  //   resizeMode: "contain", // pour conserver les proportions de l'image
  //   // marginLeft: 10, // Espacement à gauche, si nécessaire
  //   transform: [{ rotate: "20deg" }],
  //   //marginTop: -25,
  // },
});
