import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useBackHandler } from "@react-native-community/hooks";
import { BackHandler } from "react-native";

import Tab1 from "../screens/appli/Tab1";
import SettingsScreen from "../screens/appli/settings/SettingsScreen";
import InfosPersoScreen from "../screens/appli/settings/InfosPersoScreen";
import ChangePasswordScreen from "../screens/appli/settings/ChangePasswordScreen";
import MonProfilScreen from "../screens/appli/settings/MonProfilScreen";
import ContactScreen from "../screens/appli/settings/ContactScreen";
import FaqScreen from "../screens/appli/settings/FaqScreen";
import TutorielScreen from "../screens/appli/settings/TutorielScreen";

import { RootStackParamList } from "../../../utils/navigationTypes";

const Tab1Stack = createStackNavigator<RootStackParamList>();

function Tab1Navigator() {
  useBackHandler(() => {
    BackHandler.exitApp();
    return true;
  });

  return (
    <Tab1Stack.Navigator initialRouteName="Tab1">
      <Tab1Stack.Screen name="Tab1" component={Tab1} />
      <Tab1Stack.Screen name="Settings" component={SettingsScreen} />
      <Tab1Stack.Screen name="InfosPerso" component={InfosPersoScreen} />
      <Tab1Stack.Screen name="MonProfil" component={MonProfilScreen} />
      <Tab1Stack.Screen name="Contact" component={ContactScreen} />
      <Tab1Stack.Screen name="Faq" component={FaqScreen} />
      <Tab1Stack.Screen name="Tutoriel" component={TutorielScreen} />
      <Tab1Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
      />
    </Tab1Stack.Navigator>
  );
}

export default Tab1Navigator;
