import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import commonStyle from "./style";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";

let SCREEN_WIDTH = Dimensions.get("window").width;
let SCREEN_HEIGHT = Dimensions.get("window").height;

import { roomsBlock } from "../dummyValues/roomsBlock";
import RowElements from "../component/RowElements";

// const NO_OF_COLUMNS = 3;
// const GUTTER_WIDTH_RATIO = 0.1 / NO_OF_COLUMNS;
// const TOTAL_GUTTER_WIDTH =
//   SCREEN_WIDTH * (NO_OF_COLUMNS - 1) * GUTTER_WIDTH_RATIO;
// const SINGLE_GUTTER_WIDTH = TOTAL_GUTTER_WIDTH / (NO_OF_COLUMNS - 1);
// const PAGE_HORIZONTAL_MARGIN = 20;
// const CARD_WIDTH =
//   (SCREEN_WIDTH - 2 * PAGE_HORIZONTAL_MARGIN - TOTAL_GUTTER_WIDTH) /
//   NO_OF_COLUMNS;

// const RoomBlockCard = ({ item, onPress }) => {
//   const marginRight = item.id % NO_OF_COLUMNS == 0 ? 0 : SINGLE_GUTTER_WIDTH;
//   return (
//     <TouchableOpacity
//       style={[styles.blockWrapper, { marginRight }]}
//       onPress={onPress}
//     >
//       <Text>{item.blockName}</Text>
//     </TouchableOpacity>
//   );
// };

const ElementChildren = ({ item }) => {
  console.log("from elementCHildren===>", item);
  return <Text>{item.blockName}</Text>;
};

const HomeScreen = (props) => {
  const { colors, dark } = useTheme();
  const { navigation } = props;

  const customOnClick = (item) =>
    navigation.navigate("cleaningLog", {
      block: item,
    });
  return (
    <View style={commonStyle.containerWrapper}>
      <Text style={styles.titleText}>Choose Block</Text>
      <ScrollView>
        <View style={styles.blockContainerWrapper}>
          <RowElements
            item={roomsBlock}
            ElementChildren={ElementChildren}
            onPress={customOnClick}
          />
          {/* <FlatList
            numColumns={NO_OF_COLUMNS}
            data={roomsBlock}
            renderItem={({ item }) => (
              <RoomBlockCard
                item={item}
                
                }
              />
            )}
            keyExtractor={(item) => item.id}
          /> */}
        </View>
      </ScrollView>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  titleText: {
    marginBottom: 15,
    fontSize: 25,
  },
  blockContainerWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  // blockWrapper: {
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginVertical: SINGLE_GUTTER_WIDTH / 2, //margin doesn't collapse in react native
  //   marginRight: SINGLE_GUTTER_WIDTH,
  //   height: CARD_WIDTH,
  //   width: CARD_WIDTH,
  //   backgroundColor: "pink",
  //   borderRadius: 4,
  // },
});
