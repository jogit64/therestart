import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
//import { UserContext } from "../../../../UserContext";
import UserContext from "../../../UserContext";

const SettingsScreen = ({ navigation }) => {
  const { firstName, setFirstName } = useContext(UserContext);

  const changeName = () => {
    setFirstName("John");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Settings Screen</Text>
      <Text>{`Hello, ${firstName}!`}</Text>
      <Button title="Change Name" onPress={changeName} />
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

export default SettingsScreen;
