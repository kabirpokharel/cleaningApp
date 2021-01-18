import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import RowElements from "../../component/RowElements";
import { roomsBlock, blocks } from "../../dummyValues/roomsBlock";
import { loadRooms } from "../../redux/actions";

const NUM_COL = 6;

const ElementChildren = ({ item }) => <Text>{item}</Text>;

const CleaningLog = (props) => {
  const { rooms, setRooms } = useState([]);
  const { navigation, route } = props;
  const { id, blockName } = route.params.block;
  const dispatch = useDispatch();
  const cleaningDetail = useSelector((state) => {
    return state.cleaning;
  });

  useEffect(() => {
    const roomArray = blocks[blockName].map((room) => ({
      id: [room],
      cleaningType: "",
    }));
    // setRooms(allRooms);

    const timer = setTimeout(() => {
      dispatch(loadRooms(blockName, roomArray));
    }, 2000);
    return () => clearTimeout(timer);
  });

  const customOnClick = () => {
    alert("cleaningStatus.roomsLoading==>", cleaningStatus.roomsLoading);
  };
  return (
    <View style={styles.containerWrapper}>
      <Text>{blockName}</Text>
      {cleaningStatus.roomsLoading ? (
        <View>
          <Text>Loading......</Text>
        </View>
      ) : (
        <RowElements
          // item={blocks[blockName]}
          item={cleaningDetail.rooms}
          numColumns={NUM_COL}
          round
          ElementChildren={ElementChildren}
          onPress={() => customOnClick(item)}
        />
      )}
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
