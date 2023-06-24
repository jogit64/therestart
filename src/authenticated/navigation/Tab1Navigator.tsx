import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { useBackHandler } from "@react-native-community/hooks";
import { BackHandler } from "react-native";

//import Tab1 from "../screens/appli/Tab1";
// import SettingsScreen from "../screens/appli/settings/SettingsScreen";
// import InfosPersoScreen from "../screens/appli/settings/InfosPersoScreen";
// import ChangePasswordScreen from "../screens/appli/settings/ChangePasswordScreen";
// import MonProfilScreen from "../screens/appli/settings/MonProfilScreen";
// import ContactScreen from "../screens/appli/settings/ContactScreen";
// import FaqScreen from "../screens/appli/settings/FaqScreen";
// import TutorielScreen from "../screens/appli/settings/TutorielScreen";

import { Tab1ParamList } from "../../../utils/navigationTypes";
import Tab1P0Screen from "../screens/appli/tab1stack/Tab1P0Screen";
import Tab1P1Screen from "../screens/appli/tab1stack/Tab1P1Screen";

const Tab1Stack = createStackNavigator<Tab1ParamList>();

function Tab1Navigator() {
  useBackHandler(() => {
    BackHandler.exitApp();
    return true;
  });

  return (
    <Tab1Stack.Navigator
      initialRouteName="Tab1P0"
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Tab1Stack.Screen
        name="Tab1P0"
        component={Tab1P0Screen}
        options={{
          headerShown: false,
          animationEnabled: false,
        }}
      />

      <Tab1Stack.Screen name="Tab1P1" component={Tab1P1Screen} />

      {/* <Tab1Stack.Screen name="Settings" component={SettingsScreen} />
      <Tab1Stack.Screen name="InfosPerso" component={InfosPersoScreen} />
      <Tab1Stack.Screen name="MonProfil" component={MonProfilScreen} />
      <Tab1Stack.Screen name="Contact" component={ContactScreen} />
      <Tab1Stack.Screen name="Faq" component={FaqScreen} />
      <Tab1Stack.Screen name="Tutoriel" component={TutorielScreen} />
      <Tab1Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
      /> */}
    </Tab1Stack.Navigator>
  );
}

export default Tab1Navigator;
