import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import commonStyle from "../style";
import styles from "./cleaningLogStyle";
import RowElements from "../../component/RowElements";
import { roomsBlock, blocks } from "../../dummyValues/roomsBlock";
import { loadRooms, removeRoom, roomCleaned } from "../../redux/actions";
import { roomStyle } from "./cleaningLogFunc";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SIZES, FONTS, COLORS } from "../../constants/theme";
import TitleWithDescription from "../../component/TitleWithDescriptionComponent";

const NUM_COL = 6;

const ElementChildren = ({ item, dynamicStyle }) => {
  return <Text style={dynamicStyle}>{item}</Text>;
};

const CleaningLog = (props) => {
  const { overlay, setOverlay } = props;

  const dispatch = useDispatch();
  const cleaningDetail = useSelector((state) => {
    return state.cleaning;
  });
  const { currentBlockId, taskLog } = cleaningDetail;

  const roomButtonStyle = (roomId) => {
    return roomStyle(roomId, cleaningDetail);
  };

  const blockNameFinder = (blockId) => {
    const block = roomsBlock.find((block) => block.id === blockId);
    return block.blockName;
  };

  const roomAlreadySelected = (roomNumber) => {
    if (!taskLog.length) {
      return false;
    }
    const blockFound = taskLog.find((block) => block.id === currentBlockId);
    if (!blockFound) {
      return false;
    }
    const roomFound = blockFound.rooms.find((room) => room.id === roomNumber);
    if (!roomFound) {
      return false;
    } else return true;
  };
  const roomClicked = (roomNumber) => {
    dispatch(
      roomAlreadySelected(roomNumber)
        ? removeRoom(currentBlockId, roomNumber)
        : roomCleaned({
            currentBlockId,
            blockName: blockNameFinder(currentBlockId),
            roomNumber,
            cleaningType: "daily",
          })
    );
  };

  const roomLongPress = (roomNumber) => {
    dispatch(
      roomAlreadySelected(roomNumber)
        ? removeRoom(currentBlockId, roomNumber)
        : roomCleaned({
            currentBlockId,
            blockName: blockNameFinder(currentBlockId),
            roomNumber,
            cleaningType: "thorough",
          })
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <TitleWithDescription
        title="Rooms"
        description="Select cleaned rooms"
        containerStyle={{
          marginTop: SIZES.baseSize * -8,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {!overlay && (
          <TouchableOpacity
            onPress={() => {
              setOverlay(true);
            }}
            style={{
              height: SIZES.baseSize * 40,
              width: SIZES.baseSize * 40,
              alignItems: "center",
            }}
          >
            <AntDesign name="ellipsis1" size={28} color={COLORS.primary1} />
          </TouchableOpacity>
        )}
      </TitleWithDescription>
      <View
        style={{
          flex: 1,
          marginHorizontal: SIZES.baseSize * 20,
          paddingTop: SIZES.baseSize * 32 - 6,
        }}
      >
        <RowElements
          item={roomsBlock.find((roomBlockElem) => currentBlockId === roomBlockElem.id).rooms}
          numColumns={NUM_COL}
          round
          ElementChildren={ElementChildren}
          onPress={roomClicked}
          onLongPress={roomLongPress}
          extraStyle={roomButtonStyle}
        />
        <View style={{ marginBottom: SIZES.baseSize * 50 }} />
      </View>
    </View>
  );
};

export default CleaningLog;
