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
  //const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  const [selectedEmotion, setSelectedEmotion] = useState(null);
  //const paragraphs = selectedEmotion?.stimul.split(". ");

  const emotions = [
    {
      emotion: "Triste",
      emotionT: "triste",
      oppositeEmotion: "de joie",
      arround: "rgba(65,105,225,1)",
      full: "rgba(100,149,237,1)",
      iconName: "md-sad",
      stimul: [
        "Même en plein milieu de la tristesse, des moments de bonheur ont existé dans votre vie et existeront encore. Ces moments sont le témoin de votre capacité à ressentir du bonheur. En cela, le bonheur n'est jamais complètement absent. Votre capacité à ressentir le bonheur existe en ce moment même, indépendamment des circonstances.",
      ],
    },
    {
      emotion: "En colère",
      emotionT: "en colère",
      oppositeEmotion: "de paix",
      arround: "rgba(255,0,0,1)",
      full: "rgba(139,0,0,1)",
      iconName: "md-flame",
      stimul: [
        "Chaque respiration que vous prenez est une manifestation de votre calme intérieur. Peu importe la tempête émotionnelle que vous traversez, ce calme est là, toujours présent, comme un refuge au fond de vous. Le calme est en vous maintenant, comme une eau calme sous la surface agitée d'un lac.",
      ],
    },
    {
      emotion: "Peur",
      emotionT: "éffrayé",
      oppositeEmotion: "de confiance",
      arround: "rgba(255,165,0,1)",
      full: "rgba(255,140,0,1)",
      iconName: "md-flash",
      stimul: [
        "Votre capacité à vous sentir en sécurité n'a pas disparu. Chaque fois que vous ouvrez une porte sans craindre ce qui se trouve derrière, ou que vous vous allongez dans votre lit, vous faites l'expérience de la sécurité. Cette assurance est toujours là, attendant simplement d'être reconnue. Votre sentiment de sécurité existe en ce moment même, indépendamment de vos peurs passagères.",
      ],
    },
    {
      emotion: "Frustré",
      emotionT: "frustré",
      oppositeEmotion: "de satisfaction",
      arround: "rgba(255,69,0,1)",
      full: "rgba(255,99,71,1)",
      iconName: "md-close-circle",
      stimul: [
        "Chaque respiration satisfaite, chaque repas qui comble votre faim, chaque sommeil réparateur est une manifestation de votre capacité à ressentir de la satisfaction. Elle est toujours là, prête à être reconnue dans les petites choses de la vie. La satisfaction ne dépend pas des circonstances externes; vous pouvez choisir de vous concentrer sur ce qui est déjà bien maintenant.",
      ],
    },
    {
      emotion: "Déçu",
      emotionT: "déçu",
      oppositeEmotion: "de contentement",
      arround: "rgba(176,196,222,1)",
      full: "rgba(135,206,250,1)",
      iconName: "md-thumbs-down",
      stimul: [
        "Avez-vous déjà goûté à la joie simple d'une tasse de thé ou d'une marche dans la nature ? C'est votre capacité à ressentir du contentement. Elle est là, disponible pour être reconnue, même dans les moments de déception. Vous pouvez trouver le contentement en ce moment même, en reconnaissant et en appréciant ce que vous avez.",
      ],
    },
    {
      emotion: "Honteux",
      emotionT: "honteux",
      oppositeEmotion: "d'innoncence",
      arround: "rgba(255,20,147,1)",
      full: "rgba(255,105,180,1)",
      iconName: "md-eye-off",
      stimul: [
        "La honte peut occulter la fierté, mais ne la détruit pas. Chaque fois que vous avez fait un pas, que vous avez appris quelque chose de nouveau, que vous avez aidé quelqu'un, vous avez fait preuve de fierté. Cette fierté est toujours en vous, même si elle peut sembler voilée. Votre fierté ne dépend pas des jugements externes; elle est en vous et accessible à tout moment.",
      ],
    },
    {
      emotion: "Jaloux",
      emotionT: "jaloux",
      oppositeEmotion: "d'auto admiration",
      arround: "rgba(107,142,35,1)",
      full: "rgba(124,252,0,1)",
      iconName: "md-heart-dislike",
      stimul: [
        "Le fait que vous puissiez voir des qualités chez les autres témoigne de votre capacité à admirer. Cette admiration ne demande qu'à être réorientée de manière positive. Ainsi, même dans la jalousie, vous portez en vous l'admiration. Vous pouvez choisir d'admirer et d'apprendre des autres ici et maintenant, sans envie ni comparaison.",
      ],
    },
    {
      emotion: "Confus",
      emotionT: "confus",
      oppositeEmotion: "de clareté",
      arround: "rgba(255,215,0,1)",
      full: "rgba(255,255,0,1)",
      iconName: "md-help-circle",
      stimul: [
        "Chaque compréhension, chaque réalisation, chaque moment d'intuition est une manifestation de votre clarté d'esprit. Elle est toujours là, prête à émerger au milieu de la confusion. La clarté est en vous, même si elle semble voilée; vous pouvez choisir de vous concentrer sur ce qui est clair et vrai pour vous maintenant.",
      ],
    },
    {
      emotion: "Déprimé",
      emotionT: "déprimé",
      oppositeEmotion: "d'enthousiasme",
      arround: "rgba(72,61,139,1)",
      full: "rgba(106,90,205,1)",
      iconName: "md-cloudy",
      stimul: [
        "Chaque mouvement que vous faites, chaque pas que vous faites, chaque fois que vous vous levez le matin est une manifestation de votre énergie. Même en période de dépression, cette énergie vit en vous, prête à être reconnue et utilisée. Vous êtes une source constante d'énergie; chaque battement de cœur et chaque respiration en témoignent.",
      ],
    },
    {
      emotion: "Anxieux",
      emotionT: "anxieux",
      oppositeEmotion: "de calme",
      arround: "rgba(255,105,180,1)",
      full: "rgba(219,112,147,1)",
      iconName: "md-pulse",
      stimul: [
        "En dépit de l'anxiété, avez-vous déjà expérimenté le calme d'une nuit étoilée ou la quiétude d'une forêt ? C'est votre paix intérieure, elle est toujours là, prête à être reconnue et nourrie. La paix est un état naturel en vous, disponible à tout moment si vous vous permettez de vous y connecter.",
      ],
    },
    {
      emotion: "Isolé",
      emotionT: "isolé",
      oppositeEmotion: "de connexion",
      arround: "rgba(192,192,192,1)",
      full: "rgba(211,211,211,1)",
      iconName: "md-person",
      stimul: [
        "Même en vous sentant isolé, vous n'êtes jamais vraiment seul. Chaque interaction, chaque conversation, chaque moment partagé avec quelqu'un est une preuve de votre connexion aux autres et au monde qui vous entoure. Même dans l'isolement, la connexion avec vous-même et avec le monde qui vous entoure est toujours là.",
      ],
    },
    {
      emotion: "Apathique",
      emotionT: "apathique",
      oppositeEmotion: "de dynamisme",
      arround: "rgba(128,128,128,1)",
      full: "rgba(105,105,105,1)",
      iconName: "md-remove-circle",
      stimul: [
        "L'apathie peut masquer votre engagement, mais elle ne le fait pas disparaître. Chaque fois que vous avez défendu une cause qui vous tient à cœur, chaque fois que vous avez consacré du temps à une passion, vous avez fait preuve d'engagement. Il est toujours là, même s'il semble temporairement voilé. Votre engagement envers ce qui vous tient à cœur est toujours là, même si vous ne le sentez pas en ce moment.",
      ],
    },
    {
      emotion: "Rejeté",
      emotionT: "rejeté",
      oppositeEmotion: "de reconnaissance",
      arround: "rgba(85,107,47,1)",
      full: "rgba(154,205,50,1)",
      iconName: "md-flash-off",
      stimul: [
        "Chaque moment de gratitude que vous avez vécu, chaque cadeau que vous avez apprécié, chaque compliment que vous avez reçu sont des manifestations de reconnaissance. Le ressentiment peut masquer cette reconnaissance, mais ne l'efface pas, elle est toujours là, prête à être exprimée. La reconnaissance peut être un choix conscient, indépendamment de vos sentiments temporaires de ressentiment.",
      ],
    },
  ];

  const handleEmotionClick = (emotion) => {
    setSelectedEmotion(emotion);
    setModalVisible2(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.seedContainer}>
          <Image
            source={require("./../../../../../assets/images/logoReStart.png")}
            style={{ width: 55, height: 55 }}
          />
        </View>
        <Text style={styles.title}>Antidotes</Text>
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
            onPress={() => setModalVisible1(true)}
          >
            <View style={styles.BtnContainer}>
              {/* <MaterialCommunityIcons
                name="book-open-page-variant"
                size={24}
                color="white"
              /> */}
              <Feather name="info" size={36} color="white" />
              <Text style={styles.buttonText}>
                Découvrez les idées clés {"\n"}d'une approche absolue {"\n"}et
                relative
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

        {/* <View style={styles.separator} /> */}

        <View style={styles.secondPartContainer}>
          <Image
            source={require("./../../../../../assets/images/bubbles1.png")}
            style={{
              width: "100%",
              height: 200,
              borderRadius: 10,
              marginTop: 45,
            }}
          />
          <Text style={styles.sstitle}>Approchez le détachement</Text>
          <Text style={styles.textInter}>
            Pourrez-vous désactiver vos étiquettes et vos croyances et revenir
            au moment présent ?
          </Text>
          <View style={styles.lineButtonDetach}>
            <TouchableOpacity
              style={styles.buttonDetach}
              onPress={() => navigation.navigate("Tab3P1")}
            >
              <View style={styles.BtnContainer}>
                {/* <MaterialCommunityIcons
                  name="directions_runexit_to_app"
                  size={36}
                  color="white"
                /> */}

                <Feather name="log-out" size={36} color="white" />

                <Text style={styles.buttonText}>
                  J'essaye
                  {/* {"\n"} et désactivez étiquettes et
                croyances */}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.thirdPartContainer}>
          <Image
            source={require("./../../../../../assets/images/plants2.png")}
            style={{
              width: "100%",
              height: 180,
              borderRadius: 10,
              marginTop: 45,
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
                iconName={item.iconName}
                onClic={() => handleEmotionClick(item)}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <Modal animationType="slide" transparent={false} visible={modalVisible2}>
        <View style={styles.seedContainer}>
          <Image
            source={require("./../../../../../assets/images/logoReStart.png")}
            style={{ width: 55, height: 55 }}
          />
        </View>
        {/* <Text style={styles.title}>Antidotes</Text> */}
        <View style={styles.modalView}>
          <Text style={styles.sstitleAdv}>
            Vous vous sentez {selectedEmotion?.emotionT} ?
          </Text>
          <Text style={styles.sstitleAdvG}>
            Faites le plein {selectedEmotion?.oppositeEmotion} !
          </Text>
          {selectedEmotion?.stimul.map((text, index) => (
            <Text key={index} style={styles.textAdvice}>
              {text}
            </Text>
          ))}
          <View style={styles.btnContainEmo}>
            <TouchableOpacity
              style={styles.buttonCircle}
              onPress={() => setModalVisible2(false)}
            >
              <Text style={styles.textInter}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "white",
    //paddingHorizontal: 20,
    paddingTop: 30,
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
    //marginBottom: 15,
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
    marginBottom: 15,
  },

  sstitleAdv: {
    fontFamily: "roboto",
    fontSize: 18,
    alignSelf: "center",
    //textAlign: "center",
    //marginBottom: 10,
    color: "rgba(50,56,106,1)",
    //marginTop: 20,
    marginBottom: 5,
  },
  sstitleAdvG: {
    fontFamily: "roboto500",
    fontSize: 18,
    alignSelf: "center",
    //textAlign: "center",
    //marginBottom: 10,
    color: "rgba(50,56,106,1)",
    marginTop: 20,
    marginBottom: 15,
  },

  sstitle: {
    fontFamily: "roboto500",
    fontSize: 18,
    //alignSelf: "center",
    //textAlign: "center",
    marginBottom: 5,
    color: "rgba(50,56,106,1)",
    marginTop: 20,
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
    backgroundColor: "#98cdd5",
    padding: 10,
    paddingLeft: 20,
    justifyContent: "center",
    marginTop: 15,
    borderRadius: 15,
    width: "100%",
    height: 95,
  },

  lineButtonDetach: {
    flex: 1,
  },
  buttonDetach: {
    backgroundColor: "#98cdd5",
    padding: 10,
    paddingLeft: 20,
    justifyContent: "center",
    //alignItems: "flex-end",
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

  modalView: {
    flex: 1,
    //justifyContent: "center",
    //alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(255,255,255,1)", // Un fond blanc pour une apparence lumineuse
  },
  textAdvice: {
    fontFamily: "roboto",
    color: "rgba(151,155,180,1)",
    lineHeight: 35,
    alignSelf: "center",
    //paddingHorizontal: 10,
    fontSize: 16,
  },
  btnContainEmo: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
});
