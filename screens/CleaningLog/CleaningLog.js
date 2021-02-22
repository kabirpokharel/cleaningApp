import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";
import { useTheme } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import styles from "./cleaningLogStyle";
import RowElements from "../../component/RowElements";
import { roomsBlock, blocks } from "../../dummyValues/roomsBlock";
import { loadRooms, roomCleaned } from "../../redux/actions";
import { roomButtonStyle } from "./cleaningLogFunc";
import { TouchableOpacity } from "react-native-gesture-handler";

const NUM_COL = 6;

const ElementChildren = ({ item }) => <Text>{item.id}</Text>;

const CleaningLog = (props) => {
  const { rooms, setRooms } = useState([null]);
  const { navigation, route } = props;
  const { colors } = useTheme();
  const { id, blockName } = route.params.block;

  const dispatch = useDispatch();
  const cleaningDetail = useSelector((state) => {
    return state.cleaning;
  });

  useEffect(() => {
    const roomArray = blocks[blockName].map((roomNumber) => ({
      id: roomNumber,
      cleaningType: "",
    }));
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
    <View style={[styles.containerWrapper, { flex: 1 }]}>
      <View>
        <Text style={styles.titleText}>Choose Block</Text>
      </View>
      <View style={{ flex: 1, marginHorizontal: 20 }}>
        <RowElements
          item={cleaningDetail.rooms}
          numColumns={NUM_COL}
          round
          ElementChildren={ElementChildren}
          onPress={roomClicked}
          onLongPress={roomLongPress}
          extraStyle={roomButtonStyle}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("timeLog")}
          style={{
            backgroundColor: "red",
            alignItems: "center",
            justifyContent: "center",
            height: 50,
            marginHorizontal: -20,
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>

      {/* {console.log("cleaning details===>", cleaningDetail)}
      <Text>{blockName}</Text>
      {cleaningDetail.roomsLoading ? (
        <View>
          <Text>Loading......</Text>
        </View>
      ) : (
        // <View style={{ flex: 1, backgroundColor: "grey", marginBottom: 50 }}>
        <View style={{ flex: 1, backgroundColor: "grey" }}>
          <RowElements
            item={cleaningDetail.rooms}
            numColumns={NUM_COL}
            round
            ElementChildren={ElementChildren}
            onPress={roomClicked}
            onLongPress={roomLongPress}
            extraStyle={roomButtonStyle}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("timeLog")}
            style={{
              // position: "relative",
              // top: 90,
              backgroundColor: "red",
              alignItems: "center",
              justifyContent: "center",
              height: 50,
            }}
          >
            <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      )} */}
    </View>
  );
};

export default CleaningLog;
