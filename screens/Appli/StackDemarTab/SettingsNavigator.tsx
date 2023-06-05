import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "./SettingsScreen";

const Stack = createStackNavigator();

export default function SettingsNavigator() {
  return (
    <Stack.Navigator initialRouteName="Settings">
      <Stack.Screen name="Settings" component={SettingScreen} />
      {/* Add other screens if needed */}
    </Stack.Navigator>
  );
}
