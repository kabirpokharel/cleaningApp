import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import symmaryStyles from "./summaryScreenStyle";
import RowElements from "../../component/RowElements";

import { roomsBlock, blocks } from "../../dummyValues/roomsBlock";
import { loadRooms, roomCleaned } from "../../redux/actions";
import { roomButtonStyle } from "./summaryScreenFunc";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import TitleWithDescription from "../../component/TitleWithDescriptionComponent";
import FooterButton from "../../component/FooterButton";
import CardComponent from "../../component/CardComponent";
import PageTemplate from "../../component/PageTemplate";

const isPlatformIos = Platform.OS === "ios";

const SummaryText = ({ text, bold }) => {
  const textStyle = bold ? FONTS.h6 : FONTS.body4;
  return <Text style={[textStyle, { color: COLORS.primary1, height: 20 }]}>{text}</Text>;
};

const SummaryScreen = (props) => {
  const cleaningDetail = useSelector((state) => {
    return state.cleaning;
  });
  // const { taskLog } = cleaningDetail;
  console.log(cleaningDetail);
  const dispatch = useDispatch();
  //   const summaryItems = [
  //   {

  //     item:"Daily Clean",
  //     unit:
  //   },{

  //     item:"Thorough Clean",
  //     unit:
  //   },{

  //     item:"Common area cleaned?",
  //     unit:
  //   },{

  //     item:"Shift duration",
  //     unit:
  //   }
  // ];
  return (
    <PageTemplate>
      <TitleWithDescription
        title="Summary"
        description="Check your entry before submitting"
      ></TitleWithDescription>
      <View style={{ flex: 1, alignItems: "flex-start" }}>
        <CardComponent
          cardStyle={{
            flexDirection: "row",
            paddingHorizontal: 20,
            borderRadius: SIZES.radius,
          }}
        >
          <View style={{ marginRight: 50 }}>
            <SummaryText text="Daily Clean" />
            <SummaryText text="Daily Clean" />
            <SummaryText text="Daily Clean" />
            <Text style={[FONTS.body4, { color: COLORS.primary1, marginBottom: 5 }]}>
              Daily clean
            </Text>
            <Text style={[FONTS.body4, { color: COLORS.primary1, marginBottom: 5 }]}>
              Thorough clean
            </Text>
            <Text style={[FONTS.body4, { color: COLORS.primary1, marginBottom: 5 }]}>
              Common area cleand
            </Text>
            <Text style={[FONTS.body4, { color: COLORS.primary1, marginBottom: 5 }]}>
              Shift duration
            </Text>
          </View>
          <View style={{ alignItems: "center", width: 65 }}>
            <Text style={[FONTS.h4, { color: COLORS.primary1, fontSize: 16, marginBottom: 5 }]}>
              15
            </Text>
            <Text style={[FONTS.h4, { color: COLORS.primary1, fontSize: 16, marginBottom: 5 }]}>
              5
            </Text>
            <Text>
              <AntDesign
                name="checkcircleo"
                size={18}
                color={COLORS.primary1}
                style={{ marginBottom: 5 }}
              />
            </Text>
            <Text style={[FONTS.h4, { color: COLORS.primary1, fontSize: 16, marginBottom: 5 }]}>
              23.25hr
            </Text>
          </View>
        </CardComponent>
        <TouchableOpacity
          style={{
            borderWidth: 1.5,
            paddingHorizontal: 100,
            paddingVertical: 10,
            borderColor: COLORS.primary1,
            borderRadius: SIZES.radius * 0.5,
          }}
        >
          <Text style={[FONTS.body3, { color: COLORS.primary1 }]}>Details V</Text>
        </TouchableOpacity>
      </View>
      <FooterButton
        onPress={() => alert("From summary screen")}
        btnText="Summary"
        // disabled={}
        // containerStyle
        // textStyle
      />
    </PageTemplate>
  );
};

export default SummaryScreen;
