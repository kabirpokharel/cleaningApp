import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import styles from "./cleaningLogStyle";
import RowElements from "../../component/RowElements";
import { roomsBlock, blocks } from "../../dummyValues/roomsBlock";
import { loadRooms, roomCleaned } from "../../redux/actions";
import { roomButtonStyle } from "./cleaningLogFunc";

const NUM_COL = 6;

const ElementChildren = ({ item }) => <Text>{item.id}</Text>;

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
      id: room,
      cleaningType: "",
    }));
    // setRooms(allRooms);

    const timer = setTimeout(() => {
      dispatch(loadRooms(blockName, roomArray));
    }, 2000);
    // return () => clearTimeout(timer);
  }, []);

  const roomClicked = (roomElement) => {
    dispatch(roomCleaned({ ...roomElement, cleaningType: "daily" }));
  };
  const roomLongPress = (roomElement) => {
    dispatch(roomCleaned({ ...roomElement, cleaningType: "thorough" }));
  };
  return (
    <View style={styles.containerWrapper}>
      <Text>{blockName}</Text>
      {cleaningDetail.roomsLoading ? (
        <View>
          <Text>Loading......</Text>
        </View>
      ) : (
        <RowElements
          item={cleaningDetail.rooms}
          numColumns={NUM_COL}
          round
          ElementChildren={ElementChildren}
          onPress={roomClicked}
          onLongPress={roomLongPress}
          extraStyle={roomButtonStyle}
        />
      )}
      {/* <Button onPress={navigation.navigate("cleaningLog"} /> */}
    </View>
  );
};

export default CleaningLog;
