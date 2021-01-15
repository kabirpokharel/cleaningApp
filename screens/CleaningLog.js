import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import RowElements from "../component/RowElements";
import { roomsBlock, blocks } from "../dummyValues/roomsBlock";

const ElementChildren = ({ item }) => <Text>{"item"}</Text>;

const CleaningLog = (props) => {
  const { navigation, route } = props;
  const { id, blockName } = route.params.block;
  const customOnClick = () => {
    alert("hey");
  };
  return (
    <View style={styles.containerWrapper}>
      <Text>{blockName}</Text>
      <RowElements
        item={blocks[blockName]}
        ElementChildren={ElementChildren}
        // onPress={() => navigation.navigate("cleaningLog", {
        //     block: roomsBlock,
        //   })
        // }

        onPress={() => alert("clicked")}
        // }
      />
    </View>
  );
};

export default CleaningLog;
const styles = StyleSheet.create({
  containerWrapper: {
    marginHorizontal: 20,
  },
  titleText: {
    marginBottom: 15,
    fontSize: 25,
  },
});
