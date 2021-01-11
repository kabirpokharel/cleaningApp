import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";

var screenWidth = Dimensions.get("window").width; //full widt,h
var screenHeight = Dimensions.get("window").height; //full height

import AwesomeIcon from "react-native-vector-icons/FontAwesome";
const HomeScreen = (props) => {
  const { colors, dark } = useTheme();
  const { navigation } = props;

  console.log("gutter width===>", (screenWidth - (40 + 100 * 3)) / 2);
  // console.log("gutter width===>", screenWidth-340);
  return (
    <View style={styles.containerWrapper}>
      <Text style={styles.titleText}>Choose Block</Text>
      <ScrollView>
        <View style={styles.blockContainerWrapper}>
          <TouchableOpacity
            style={styles.blockWrapper}
            onPress={() =>
              navigation.navigate("cleaningLog", { roomName: "green" })
            }
          >
            <Text>Green</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.blockWrapper}
            onPress={() =>
              navigation.navigate("cleaningLog", { roomName: "yellow" })
            }
          >
            <Text>Yellow</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.blockWrapper}
            onPress={() =>
              navigation.navigate("cleaningLog", { roomName: "blue" })
            }
          >
            <Text>Blue</Text>
          </TouchableOpacity>
          <View style={[styles.blockWrapper, { opacity: 0 }]} />

          <TouchableOpacity
            style={styles.blockWrapper}
            onPress={() =>
              navigation.navigate("cleaningLog", { roomName: "gold" })
            }
          >
            <Text>Gold</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.blockWrapper}
            onPress={() =>
              navigation.navigate("cleaningLog", { roomName: "pinkBlue" })
            }
          >
            <Text>{"Pink & Blue"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  containerWrapper: {
    marginHorizontal: 20,
  },
  titleText: {
    marginBottom: 15,
    fontSize: 25,
  },
  blockContainerWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  blockWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: (screenWidth - (40 + 100 * 3)) / 4,
    // marginVertical: 30,
    height: 150,
    width: 100,
    // margin: 5,
    backgroundColor: "pink",
  },
});
