import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  Alert,
  TextInput,
} from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import FeatherIcon from "react-native-vector-icons/Feather";
import EntypoIcon from "react-native-vector-icons/Entypo";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import UserContext from "./../../../../../utils/UserContext";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useHardwareBackButton } from "components/useHardwareBackButton";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-root-toast";
import { useNavigation } from "@react-navigation/native";

import { User } from "./../../../../../utils/types";

import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../../utils/navigationTypes";

type InfosPersoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "InfosPerso"
>;

function InfosPersoScreen() {
  useHardwareBackButton();
  const navigation = useNavigation<InfosPersoScreenNavigationProp>();
  const db = getFirestore();
  const auth = getAuth();
  const storage = getStorage();
  // Accéder au contexte de l'utilisateur
  const userContext = useContext(UserContext);

  const [user, setUser] = useState<User | null>(null);
  const [firstName, setFirstName] = useState("");
  const [age, setAge] = useState<number | null>(null);
  const [sex, setSex] = useState<string | null>(null);
  const defaultImage = require("assets/images/userHead.png");
  //const [userImage, setUserImage] = useState<string | null>(null);

  const [userImage, setUserImage] = useState<string>("");

  const pickImage = async () => {
    console.log("pickImage was triggered");
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();
      const imageRef = ref(storage, `images/${auth.currentUser!.uid}`);
      await uploadBytes(imageRef, blob);

      const downloadUrl = await getDownloadURL(imageRef);

      setUserImage(downloadUrl);
    }
  };

  // Ajoutez un état de chargement
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userRef = doc(db, "users", auth.currentUser!.uid);
    const fetchData = async () => {
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const userData = docSnap.data() as User;
        console.log(userData);
        setUser(userData);
        setFirstName(userData.basicInfo.firstName);
        setAge(userData.extraInfo.age);
        setSex(userData.extraInfo.sex);
        if (userData.extraInfo.imageUrl) {
          userContext?.setImageUrl(userData.extraInfo.imageUrl);
          setUserImage(userData.extraInfo.imageUrl);
        } else {
          userContext?.setImageUrl("");
          setUserImage("");
        }
      }
      setLoading(false); // Une fois les données chargées, mettez loading à false
    };

    fetchData();
  }, []);

  // Assurez-vous que loading est false avant de rendre votre composant
  if (loading) {
    return <Text>Loading...</Text>; // ou n'importe quel autre indicateur de chargement
  }

  const handleSave = async () => {
    try {
      const userRef = doc(db, "users", auth.currentUser!.uid);

      // Mettre à jour Firestore
      await updateDoc(userRef, {
        basicInfo: {
          firstName: firstName,
        },
        extraInfo: {
          age: age,
          sex: sex,
          imageUrl: userImage,
        },
      });
      // Mettre à jour le contexte
      // Mettre à jour le contexte
      setUser({
        basicInfo: {
          firstName: firstName,
          email: user ? user.basicInfo.email : "", // vous devrez gérer correctement le champ email
        },
        extraInfo: {
          age: age,
          sex: sex,
          imageUrl: userImage,
          isLoggedIn: user ? user.extraInfo.isLoggedIn : false, // ici vous devez gérer correctement le champ isLoggedIn
        },
      });

      // Reste de votre code
    } catch (error: unknown) {
      // Gestion d'erreur
      if (typeof error === "object" && error !== null && "message" in error) {
        const { message } = error as { message: string };
        Alert.alert("Erreur", message, [{ text: "OK" }]);
      }
    }

    Toast.show("Les informations ont été enregistrées avec succès.", {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });

    // Redirection vers MonProfil
    navigation.navigate("MonProfil");
  };

  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor="rgba(0,0,0,1)" /> */}
      <View style={styles.scrollArea}>
        <ScrollView
          contentContainerStyle={styles.scrollArea_contentContainerStyle}
        >
          <View style={styles.goBackButtonRow}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.goBackButton}
            >
              <View style={styles.ellipseGoBackStack}>
                <Svg viewBox="0 0 28.06 28.06" style={styles.ellipseGoBack}>
                  <Ellipse
                    stroke="rgba(230, 230, 230,1)"
                    strokeWidth={0}
                    fill="rgba(255,255,255,1)"
                    cx={14}
                    cy={14}
                    rx={14}
                    ry={14}
                  ></Ellipse>
                </Svg>
                <FeatherIcon
                  name="chevron-left"
                  style={styles.iconGoBack}
                ></FeatherIcon>
              </View>
            </TouchableOpacity>
            <Text style={styles.infosPersonnelles}>Infos personnelles</Text>
          </View>

          <View style={styles.imageStack} pointerEvents="box-none">
            <Image
              source={userImage ? { uri: userImage } : defaultImage}
              resizeMode="contain"
              style={[styles.image, userImage ? styles.roundImage : {}]}
            />

            <TouchableOpacity onPress={pickImage} style={styles.cam}>
              {/* <View style={styles.groupPhoto1}> */}
              <View style={styles.ellipsePhoto1Stack}>
                <Svg viewBox="0 0 29.57 29.57" style={styles.ellipsePhoto1}>
                  <Ellipse
                    stroke="rgba(230, 230, 230,1)"
                    strokeWidth={0}
                    fill="rgba(111,120,189,1)"
                    cx={15}
                    cy={15}
                    rx={15}
                    ry={15}
                  ></Ellipse>
                </Svg>
                <EntypoIcon
                  name="camera"
                  style={styles.iconPhoto1}
                ></EntypoIcon>
              </View>
              {/* </View> */}
            </TouchableOpacity>
          </View>

          <View style={styles.groupName}>
            <View style={styles.container}>
              <TextInput
                placeholder="Prénom"
                value={firstName}
                onChangeText={setFirstName}
                style={styles.inputName}
              />
            </View>
          </View>
          <View style={styles.groupAge}>
            <Text style={styles.age}>Âge</Text>
            <TextInput
              placeholder="Âge"
              value={age !== null ? age.toString() : ""}
              onChangeText={(text) =>
                !isNaN(Number(text)) && setAge(parseInt(text))
              }
              style={styles.inputAge}
            />
          </View>
          <View style={styles.groupSexe}>
            <Text style={styles.sexe}>
              Sexe{" "}
              {sex === "Masculin"
                ? "(M)"
                : sex === "Féminin"
                ? "(F)"
                : sex === "Non spécifié"
                ? "(Je ne préfère pas le dire)"
                : "(Aucun choix précédent)"}
            </Text>
            <View style={styles.groupMascuRow}>
              <View style={styles.groupMascu}>
                <TouchableOpacity
                  onPress={() => setSex("Masculin")}
                  style={[
                    styles.button2,
                    sex === "Masculin" && styles.buttonSelected,
                  ]}
                >
                  <MaterialCommunityIconsIcon
                    name="gender-male"
                    style={styles.iconMascu}
                  ></MaterialCommunityIconsIcon>
                  <Text style={styles.masculin}>Masculin</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.groupFemin}>
                <TouchableOpacity
                  onPress={() => setSex("Féminin")}
                  style={[
                    styles.button3,
                    sex === "Féminin" && styles.buttonSelected,
                  ]}
                >
                  <MaterialCommunityIconsIcon
                    name="gender-female"
                    style={styles.iconFemin}
                  ></MaterialCommunityIconsIcon>
                  <Text style={styles.feminin}>Féminin</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.groupPasDire}>
            <TouchableOpacity
              onPress={() => setSex("Non spécifié")}
              style={[
                styles.buttonPasDire,
                sex === "Non spécifié" && styles.buttonSelected,
              ]}
            >
              <Text style={styles.labelPasDire}>Je préfère ne pas le dire</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.groupSauvegarder}>
            <TouchableOpacity
              onPress={handleSave}
              style={styles.buttonSauvegarder}
            >
              <Text style={styles.sauvegarder}>Sauvegarder</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(236,246,255,1)",
  },
  scrollArea: {
    flex: 1,
    marginTop: 22,
  },
  scrollArea_contentContainerStyle: {},
  goBackButton: {
    width: 32,
    height: 35,
  },
  ellipseGoBack: {
    top: 0,
    left: 0,
    width: 28,
    height: 28,
    position: "absolute",
  },
  iconGoBack: {
    top: 2,
    left: 0,
    position: "absolute",
    color: "rgba(113,119,181,1)",
    fontSize: 26,
  },
  ellipseGoBackStack: {
    width: 28,
    height: 28,
    marginTop: 2,
    marginLeft: 4,
  },
  infosPersonnelles: {
    fontFamily: "roboto700",
    color: "rgba(50,56,106,1)",
    fontSize: 18,
    marginLeft: 54,
    marginTop: 24,
  },
  goBackButtonRow: {
    height: 46,
    flexDirection: "row",
    marginTop: 24,
    marginLeft: 19,
    marginRight: 105,
  },
  image: {
    top: 0,
    left: 0,
    width: 91,
    height: 91,
    position: "absolute",
  },
  groupPhoto1: {
    top: 63,
    left: 67,
    width: 34,
    height: 34,
    position: "absolute",
  },
  ellipsePhoto1: {
    top: 0,
    left: 0,
    width: 30,
    height: 30,
    position: "absolute",
  },
  iconPhoto1: {
    top: 6,
    left: 7,
    //position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 16,
  },
  cam: {
    position: "absolute", // positionner absolument
    bottom: 0, // ancrer en bas
    right: 0, // ancrer à droite
    //backgroundColor: "red",
    width: 34, // largeur de votre TouchableOpacity
    height: 34, // hauteur de votre TouchableOpacity
  },

  ellipsePhoto1Stack: {
    width: 30,
    height: 30,
  },
  imageStack: {
    width: 101,
    height: 97,
    marginTop: 13,
    marginLeft: 135,
  },
  groupName: {
    width: 298,
    height: 70,
    marginTop: 27,
    marginLeft: 27,
  },
  nomDutilisateur: {
    fontFamily: "roboto500",
    color: "rgba(50,56,106,1)",
    fontSize: 16,
  },
  inputName: {
    fontFamily: "roboto",
    color: "#121212",
    height: 43,
    width: 298,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 2,
    borderColor: "rgba(220,222,235,1)",
    borderRadius: 14,
    marginTop: 8,
    paddingLeft: 10,
  },
  groupAge: {
    width: 302,
    height: 69,
    marginTop: 29,
    marginLeft: 27,
  },
  age: {
    fontFamily: "roboto500",
    color: "rgba(50,56,106,1)",
    fontSize: 16,
  },
  inputAge: {
    fontFamily: "roboto",
    color: "#121212",
    height: 43,
    width: 298,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 2,
    borderColor: "rgba(220,222,235,1)",
    borderRadius: 14,
    marginTop: 7,
    marginLeft: 4,
    paddingLeft: 10,
  },
  groupSexe: {
    width: 298,
    height: 141,
    marginTop: 33,
    marginLeft: 27,
  },
  sexe: {
    fontFamily: "roboto500",
    color: "rgba(50,56,106,1)",
    fontSize: 16,
  },
  groupMascu: {
    width: 138,
    height: 113,
  },
  button2: {
    width: 136,
    height: 111,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 11,
    shadowColor: "rgba(225,229,245,1)",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    elevation: 30,
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  iconMascu: {
    color: "rgba(141,151,248,1)",
    fontSize: 40,
    height: 43,
    width: 40,
    marginTop: 13,
    marginLeft: 48,
  },
  masculin: {
    fontFamily: "roboto",
    color: "rgba(52,56,104,1)",
    marginTop: 14,
    marginLeft: 39,
  },
  groupFemin: {
    width: 138,
    height: 113,
    marginLeft: 14,
  },
  button3: {
    width: 136,
    height: 110,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 11,
    shadowColor: "rgba(225,229,245,1)",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    elevation: 30,
    shadowOpacity: 1,
    shadowRadius: 10,
    marginTop: -1,
  },
  iconFemin: {
    color: "rgba(141,151,248,1)",
    fontSize: 40,
    height: 43,
    width: 40,
    marginTop: 13,
    marginLeft: 48,
  },
  feminin: {
    fontFamily: "roboto",
    color: "rgba(52,56,104,1)",
    marginTop: 15,
    marginLeft: 43,
  },
  groupMascuRow: {
    height: 113,
    flexDirection: "row",
    marginTop: 9,
    marginLeft: 8,
  },
  groupPasDire: {
    width: 290,
    height: 57,
    overflow: "visible",
    marginTop: 23,
    marginLeft: 35,
  },
  buttonPasDire: {
    width: 290,
    height: 55,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 11,
    shadowColor: "rgba(222,231,248,1)",
    shadowOffset: {
      height: 3,
      width: 1,
    },
    elevation: 30,
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  labelPasDire: {
    fontFamily: "roboto",
    color: "rgba(128,131,148,1)",
    marginTop: 20,
    marginLeft: 78,
  },
  groupSauvegarder: {
    width: 290,
    height: 57,
    overflow: "visible",
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 12,
    marginLeft: 35,
    marginBottom: 50,
  },
  buttonSauvegarder: {
    width: 290,
    height: 55,
    backgroundColor: "rgba(111,120,189,1)",
    borderRadius: 11,
    shadowColor: "rgba(222,231,248,1)",
    shadowOffset: {
      height: 3,
      width: 1,
    },
    elevation: 30,
    shadowOpacity: 1,
    shadowRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  sauvegarder: {
    fontFamily: "roboto500",
    color: "rgba(255,255,255,1)",
    fontSize: 18,
    textAlign: "center",
  },
  buttonSelected: {
    borderWidth: 1,
    borderColor: "blue",
  },
  roundImage: {
    width: 100, // Mettez ici la largeur de votre image
    height: 100, // Mettez ici la hauteur de votre image
    borderRadius: 50, // la moitié de la largeur/hauteur de l'image
  },
});

export default InfosPersoScreen;
