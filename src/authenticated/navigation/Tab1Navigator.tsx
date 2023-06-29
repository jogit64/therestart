import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { useBackHandler } from "@react-native-community/hooks";
import { BackHandler } from "react-native";

import { Tab1ParamList } from "../../../utils/navigationTypes";
import Tab1P0Screen from "../screens/appli/tab1stack/Tab1P0Screen";
import Tab1P1Screen from "../screens/appli/tab1stack/Tab1P1Screen";

const Tab1Stack = createStackNavigator<Tab1ParamList>();

function Tab1Navigator() {
  // useBackHandler(() => {
  //   BackHandler.exitApp();
  //   return true;
  // });

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
    </Tab1Stack.Navigator>
  );
}

export default Tab1Navigator;
