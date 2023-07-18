import React, { useState } from "react";
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

export default function Tab2() {
  const navigation = useNavigation<StackNavigationProp<TabParamList, "Tab2">>();

  const [newDream, setNewDream] = useState("");
  const [dreams, setDreams] = useState([]);
  const [affirmations, setAffirmations] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const handleAddDream = () => {
    setDreams([...dreams, newDream]);

    setNewDream("");
    setEditMode(false);
  };

  const handleViewAllAffirmations = () => {
    // Vous devez implémenter cette fonction
    // en fonction de votre configuration de navigation
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
          <Text style={styles.affirmationsTitle}>Affirmations positives</Text>
          <FlatList
            data={affirmations}
            horizontal={true}
            renderItem={({ item }) => (
              <View style={styles.affirmationItem}>
                <Text>{item}</Text>
              </View>
            )}
          />
          <Button title="Voir toutes" onPress={handleViewAllAffirmations} />
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
    marginBottom: 10,
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
    marginTop: 20,
    backgroundColor: "grey",
    minHeight: 200,
    marginVertical: 20,
    paddingVertical: 25,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  affirmationsTitle: {
    marginBottom: 10,
  },
});
