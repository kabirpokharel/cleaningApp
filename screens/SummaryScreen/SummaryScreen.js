import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign, Entypo } from "@expo/vector-icons";
import symmaryStyles from "./summaryScreenStyle";
import RowElements from "../../component/RowElements";

import { roomsBlock, blocks } from "../../dummyValues/roomsBlock";
import { loadRooms, roomCleaned } from "../../redux/actions";
import { roomButtonStyle } from "./summaryScreenFunc";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { blockColor, COLORS, FONTS, SIZES } from "../../constants/theme";
import TitleWithDescription from "../../component/TitleWithDescriptionComponent";
import FooterButton from "../../component/FooterButton";
import CardComponent from "../../component/CardComponent";
import PageTemplate from "../../component/PageTemplate";

const SummaryRoomComponent = ({ rooms }) => {
  // console.log("see rooms===================================>", rooms);
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {!!rooms.length ? (
        rooms.map((room) => (
          <View
            key={room}
            style={{
              height: 23,
              width: 23,
              margin: 3,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 12.5,
              backgroundColor: "#d9ebe9",
            }}
          >
            <Text style={[FONTS.body6, { color: COLORS.primary, fontSize: 9 }]}>{room}</Text>
          </View>
        ))
      ) : (
        <View style={{ height: 25 }} />
        // <View
        //   style={{
        //     backgroundColor: "#d9ebe9",
        //     height: 25,
        //     paddingHorizontal: 10,
        //     justifyContent: "center",
        //     alignItems: "center",
        //     borderRadius: SIZES.radius * 2,
        //   }}
        // >
        //   <Text style={[FONTS.body6, { color: COLORS.primary, fontSize: 9 }]}>none</Text>
        // </View>
      )}
    </View>
  );
};

const isPlatformIos = Platform.OS === "ios";
// const IndividualBlockDetails = ({ blockName, daily, thorough, unattended }) => {
const IndividualBlockDetails = ({ block }) => {
  const { blockName, daily, thorough, unattended } = block;
  console.log("see this is props for indivigualBLockDetails--------------->", block);
  // console.log("see this is block Name--------------->", blockName);
  return (
    <View
      style={{
        borderWidth: 4,
        marginVertical: 20,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderColor: blockColor(blockName),
      }}
    >
      <View
        style={{
          position: "absolute",
          backgroundColor: COLORS.white,
          // backgroundColor: "pink",

          padding: 10,
          top: -25,
          left: 15,
        }}
      >
        <Text style={[FONTS.body3, { color: blockColor(blockName) }]}>{`${blockName} Block`}</Text>
      </View>
      <View>
        <View style={{ margin: 2 }}>
          <Text style={[FONTS.body5, {}]}>Daily Cleaned:</Text>
          <SummaryRoomComponent rooms={daily} />
        </View>
        <View style={{ margin: 2 }}>
          <Text>Thorough Cleaned:</Text>
          <SummaryRoomComponent rooms={thorough} />
        </View>
        <View style={{ margin: 2 }}>
          <Text>Unattended:</Text>
          <SummaryRoomComponent rooms={unattended} />
        </View>
      </View>
    </View>
  );
};
const timeFormatter = (totalHrs, totalMins) => {
  let newHrs = totalHrs + Math.floor(totalMins / 60);
  let newMins = totalMins % 60;
  return `${newHrs}h:${newMins}m`;
};
const calculateTotalTime = (time) => {
  let totalHrs = 0;
  let totalMins = 0;
  time.forEach((timeObj) => {
    const { status } = timeObj;
    totalHrs += parseInt(status.substring(0, status.indexOf(":")));
    totalMins += parseInt(status.substring(status.indexOf(":") + 1));
  });
  return timeFormatter(totalHrs, totalMins);
};

const SummaryElement = ({ item, measure }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 35,
        marginHorizontal: 20,
      }}
    >
      <SummaryText text={item} />
      <SummaryText isQuantity text={measure} />
    </View>
  );
};

const SummaryText = ({ text, isQuantity }) => {
  const textStyle = isQuantity ? { ...FONTS.h5, color: COLORS.primary } : FONTS.body4;
  return (
    <Text
      style={[
        {
          color: COLORS.primary1,
          alignItems: "center",
          justifyContent: "center",
        },
        textStyle,
      ]}
    >
      {text}
    </Text>
  );
};

const SummaryScreen = (props) => {
  const [cleanedRoomsStatus, setCleanedRoomsStatus] = useState({});
  const [viewMore, setViewMore] = useState(false);
  const cleaningDetail = useSelector((state) => {
    return state.cleaning;
  });
  const { commonAreaCleaned, time, taskLog } = cleaningDetail;

  // console.log("this is taskLog=============>", taskLog);
  const blockDetails = (taskLog) => {
    taskLog.forEach((block) => block);
  };

  useEffect(() => {
    let blockSummary = [];
    let dailyCleanedCount = 0;
    let thoroughCleanedCount = 0;
    taskLog.forEach((block) => {
      let currentBlockOriginal = roomsBlock.find((aBlock) => {
        // console.log("$$$$$$$$$$$$$$$------>", aBlock);
        return aBlock.blockName === block.blockName;
      });
      // console.log("currentBlockOriginal**********************------->", currentBlockOriginal);
      // let unattended = currentBlockOriginal.rooms;
      let blockDetail = {
        blockName: block.blockName,
        daily: [],
        thorough: [],
        unattended: currentBlockOriginal.rooms,
        // unattended: [],
      };

      block.rooms.forEach((room) => {
        switch (room.cleaningType) {
          case "daily":
            blockDetail.daily.push(room.id);
            if (!!blockDetail.unattended.length) {
              blockDetail.unattended = blockDetail.unattended.filter(
                (roomId) => room.id !== roomId
              );
            }
            break;
          case "thorough":
            blockDetail.thorough.push(room.id);
            if (!!blockDetail.unattended.length) {
              blockDetail.unattended = blockDetail.unattended.filter(
                (roomId) => room.id !== roomId
              );
            }
            break;
        }
      });
      blockSummary.push(blockDetail);
      // const attendedRooms = [...blockDetail.daily, blockDetail.thorough];
      // const unattendedRooms = uncleanedRooms;
      dailyCleanedCount += blockDetail.daily.length;
      thoroughCleanedCount += blockDetail.thorough.length;
    });
    // console.log(
    //   "cleanedRoomsStatus >>>blockSummary, dailyCleanedCount, thoroughCleanedCount---->",
    //   blockSummary,
    //   dailyCleanedCount,
    //   thoroughCleanedCount
    // );
    setCleanedRoomsStatus({ blockSummary, dailyCleanedCount, thoroughCleanedCount });
  }, []);

  const dispatch = useDispatch();

  const summaryList = [
    {
      item: "Common area cleaned?",
      measure: commonAreaCleaned ? (
        <Entypo name="check" size={22} color={COLORS.primary} />
      ) : (
        <View style={{ marginRight: -6 }}>
          <Entypo name="cross" size={27} color={COLORS.secondary} />
        </View>
      ),
    },
    {
      item: "Shift duration",
      measure: calculateTotalTime(time),
    },
    {
      item: "Daily Clean",
      measure: cleanedRoomsStatus.dailyCleanedCount || "0",
    },
    {
      item: "Thorough Clean",
      measure: cleanedRoomsStatus.thoroughCleanedCount || "0",
    },
  ];
  return (
    <PageTemplate>
      <TitleWithDescription
        title="Summary"
        description="Check your entry before submitting"
        containerStyle={{ paddingBottom: 20 }}
      ></TitleWithDescription>

      <View
        style={{
          flex: 1,
          paddingBottom: isPlatformIos ? SIZES.baseSize * 70 : SIZES.baseSize * 55,
        }}
      >
        <ScrollView>
          <CardComponent
            cardStyle={{
              paddingHorizontal: 10,
              // paddingVertical: 20,
              width: SIZES.width - 20,
              borderRadius: SIZES.baseSize * 8,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginBottom: 10,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={[FONTS.body3, { color: COLORS.primary }]}>Current Shift Details</Text>
              <TouchableOpacity
                onPress={() => setViewMore((prevState) => !prevState)}
                style={{
                  backgroundColor: "#d9ebe9",
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: SIZES.baseSize * 32,
                }}
              >
                <Text style={[FONTS.body5, { color: COLORS.primary }]}>
                  {viewMore ? "View Less" : "View More"}
                </Text>
              </TouchableOpacity>
            </View>
            {summaryList.map(({ item, measure }, id) => {
              return <SummaryElement key={id + item} {...{ item, measure }} />;
            })}
            {console.log(
              "Object.keys(cleanedRoomsStatus).length---------->",
              Object.keys(cleanedRoomsStatus)
            )}
            {viewMore && (
              <View style={{ marginTop: 10 }}>
                {Object.keys(cleanedRoomsStatus).length ? (
                  cleanedRoomsStatus.blockSummary.map((block, id) => (
                    <IndividualBlockDetails key={id} block={block} />
                  ))
                ) : (
                  <Text>No entery found for cleanin log</Text>
                )}
                {/* <IndividualBlockDetails blockName="green" />
                 <IndividualBlockDetails blockName="blue" /> */}
              </View>
            )}
          </CardComponent>
        </ScrollView>
      </View>
      {/* <View style={{ flex: 1 }}> */}
      {/* </View> */}
      <FooterButton
        onPress={() => alert("From summary screen")}
        btnText="Submit"
        // disabled={}
        // containerStyle
        // textStyle
      />
    </PageTemplate>
  );
};

export default SummaryScreen;
