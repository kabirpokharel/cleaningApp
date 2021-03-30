import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import styles from "./summaryScreenStyle";
import RowElements from "../../component/RowElements";
import { roomsBlock, blocks } from "../../dummyValues/roomsBlock";
import { loadRooms, roomCleaned } from "../../redux/actions";
import { roomButtonStyle } from "./summaryScreenFunc";
import { TouchableOpacity } from "react-native-gesture-handler";

const SummaryScreen = (props) => {
  return (
    <View style={[styles.containerWrapper, { flex: 1 }]}>
      <View>
        <Text style={styles.titleText}>Choose Block</Text>
      </View>
      <View style={{ flex: 1, marginHorizontal: 20 }}>
        <View style={{ flex: 1 }}>
          <Text>Hey</Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "red",
            alignItems: "center",
            justifyContent: "center",
            height: 50,
            marginHorizontal: -20,
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SummaryScreen;
