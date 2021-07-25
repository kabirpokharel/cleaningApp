import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import homeStyles from './homeScreeStyle';

export default ({ taskLog, selectedBlockId, setSelectedBlockId }) => {
  const dispatch = useDispatch();
  const renderItem = ({ item }) => {
    const { name, shortid } = item;
    const isBlockSelected = selectedBlockId === shortid;
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingHorizontal: SIZES.baseSize * 10,
          paddingVertical: SIZES.baseSize * 8,
          backgroundColor: isBlockSelected ? '#05c46b' : COLORS.white,
          borderRadius: SIZES.baseSize * 33.6,
          alignItems: 'center',
          justifyContent: 'center',
          // marginRight: SIZES.baseSize * 16,
          marginRight: SIZES.baseSize * 16 - SIZES.baseSize * 4,
          marginLeft: SIZES.baseSize * 4,
          ...styles.shadow,
        }}
        onPress={() => setSelectedBlockId(shortid)}
      >
        <View
          style={[
            homeStyles.blockStyle,
            {
              backgroundColor: isBlockSelected ? COLORS.white : COLORS.lightGray,
            },
          ]}
        >
          <View
            style={{
              height: SIZES.baseSize * 30,
              width: SIZES.baseSize * 30,
              borderWidth: 0,
              borderColor: 'transparent',
              borderRadius: SIZES.baseSize * 15,
              overflow: 'hidden',
              flexDirection: 'row',
            }}
          >
            <View
              style={[
                {
                  width: SIZES.baseSize * 30,
                  height: SIZES.baseSize * 30,
                  backgroundColor: isBlockSelected ? '#05c46b' : COLORS.light1,
                },
              ]}
            />
          </View>
        </View>
        <Text
          style={{
            textTransform: 'capitalize',
            padding: SIZES.baseSize * 8,
            color: isBlockSelected ? COLORS.white : COLORS.primary1,
            ...FONTS.body5,
          }}
        >
          {name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={taskLog}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => `${item.name}`}
      renderItem={renderItem}
      contentContainerStyle={{
        paddingTop: SIZES.baseSize * 32,
        paddingBottom: SIZES.baseSize * 8,
      }}
    />
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: COLORS.dark3,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 5,
  },
});
