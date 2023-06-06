//import React, { useContext } from "react";
import React, { createContext, useState, useContext } from "react";
import { View, Text, Button } from "react-native";
//import { UserContext } from "../../../../UserContext";
import UserContext from "../../../UserContext";

const SettingsScreen = ({ close }) => {
  // Destructure the close prop
  const { firstName, setFirstName } = useContext(UserContext);

  const changeName = () => {
    setFirstName("John");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Settings Screen</Text>
      <Text>{`Hello, ${firstName}!`}</Text>
      <Button title="Change Name" onPress={changeName} />
      <Button title="Close Settings" onPress={close} />
      {/* Close the modal when       this button is pressed */}
    </View>
  );
};

export default SettingsScreen;
