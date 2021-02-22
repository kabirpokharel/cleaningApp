import React from "react";
import { View, Text, FlatList, SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useTheme } from "react-native-paper";
import commonStyle from "../style";
import styles from "./homeScreeStyle";
import { blockStyle } from "./homeScreenFunc";

import { roomsBlock } from "../../dummyValues/roomsBlock";
import RowElements from "../../component/RowElements";

const NUM_COLL = 3;

const ElementChildren = ({ item }) => <Text>{item.blockName}</Text>;

const HomeScreen = (props) => {
  const { colors, dark } = useTheme();
  const { navigation } = props;

  const customOnClick = (item) =>
    navigation.navigate("cleaningLog", {
      block: item,
    });

  return (
    <View style={[commonStyle.containerWrapper, { flex: 1 }]}>
      <View>
        <Text style={styles.titleText}>Choose Block</Text>
      </View>
      <View style={{ flex: 1, marginHorizontal: 20 }}>
        <RowElements
          item={roomsBlock}
          numColumns={NUM_COLL}
          ElementChildren={ElementChildren}
          onPress={customOnClick}
          extraStyle={blockStyle}
        />
      </View>
      {/* <SafeAreaView /> */}
    </View>
  );
};
export default HomeScreen;
