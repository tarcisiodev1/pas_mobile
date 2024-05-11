// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { View, Text } from "react-native";
// import DataView from "./DataView";
// import FormView from "./FormView";

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Data">
//         <Stack.Screen
//           name="Form"
//           component={FormView}
//           options={{ title: "Formulário" }}
//         />
//         <Stack.Screen
//           name="Data"
//           component={DataView}
//           options={{ title: "Dados Inseridos" }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

//----------------------------------------------------
// import React from "react";
// import { StyleSheet, View } from "react-native";
// import FormView from "./FormView";
// import DataView from "./DataView";

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <FormView />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
// });

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FormView from "./FormView";
import DataView from "./DataView";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Formulário" component={FormView} />
        <Stack.Screen name="Visualização de Dados" component={DataView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
