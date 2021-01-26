import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreen, CleaningLog, TimeLog } from "../../screens";

import { useTheme, Button } from "react-native-paper";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();

const LogoTitle = ({ title }) => {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};

const title = "Welcome Screen";

const HomeStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{ title: "Welcome" }}
        options={{
          headerTitle: () => <LogoTitle title={title} />,
          headerLeft: () => (
            <MaterialCommunityIcons
              onPress={() => navigation.openDrawer()}
              name="forwardburger"
              size={24}
              color="black"
            />
          ),

          headerRight: () => (
            <Button
              onPress={() => alert("This is a button!")}
              title="Info"
              color="pink"
            />
          ),
        }}
      />
      <Stack.Screen name="cleaningLog" component={CleaningLog} />
      <Stack.Screen name="timeLog" component={TimeLog} />
    </Stack.Navigator>
  );
};

export default HomeStack;
