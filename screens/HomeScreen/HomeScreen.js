import React from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useTheme } from "react-native-paper";
import commonStyle from "../style";
import styles from "./homeScreeStyle";
import { blockStyle } from "./homeScreenFunc";

import { roomsBlock } from "../../dummyValues/roomsBlock";
import RowElements from "../../component/RowElements";

const NUM_COL = 3;

const ElementChildren = ({ item }) => <Text>{item.blockName}</Text>;

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
            numColumns={NUM_COL}
            ElementChildren={ElementChildren}
            onPress={customOnClick}
            extraStyle={blockStyle}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default HomeScreen;
