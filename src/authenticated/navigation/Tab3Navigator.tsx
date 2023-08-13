import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { useBackHandler } from "@react-native-community/hooks";
import { BackHandler } from "react-native";

import { Tab3ParamList } from "../../../utils/navigationTypes";
import Tab3P0Screen from "../screens/appli/tab3stack/Tab3P0Screen";
import Tab3P1aScreen from "../screens/appli/tab3stack/Tab3P1aScreen";
import Tab3P2Screen from "../screens/appli/tab3stack/Tab3P2Screen";

const Tab3Stack = createStackNavigator<Tab3ParamList>();

function Tab3Navigator() {
  // useBackHandler(() => {
  //   BackHandler.exitApp();
  //   return true;
  // });

  return (
    <Tab3Stack.Navigator
      initialRouteName="Tab3P0"
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Tab3Stack.Screen
        name="Tab3P0"
        component={Tab3P0Screen}
        options={{
          headerShown: false,
          animationEnabled: false,
        }}
      />

      <Tab3Stack.Screen name="Tab3P1a" component={Tab3P1aScreen} />
      <Tab3Stack.Screen name="Tab3P2" component={Tab3P2Screen} />
    </Tab3Stack.Navigator>
  );
}

export default Tab3Navigator;
