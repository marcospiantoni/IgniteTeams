import { Groups } from "@screens/Groups";
import { Players } from "@screens/Players";
import { NewGroup } from "@screens/NewGroup";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator>
      <Screen 
        name="groups" 
        component={Groups} 
      />

      <Screen 
        name="newgroup" 
        component={NewGroup} 
      />

      <Screen 
        name="players"  
        component={Players} 
      />
    </Navigator>
  );
}
