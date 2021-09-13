import React, { useState } from 'react';
import {
  StyleSheet, Text, View, CheckBox, FlatList, ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { extrasCleaned } from '../../redux/actions';
import PageTemplate from '../../component/PageTemplate';
import TitleWithDescription from '../../component/TitleWithDescriptionComponent';
import { FONTS, COLORS, SIZES } from '../../constants/theme';
import CardComponent from '../../component/CardComponent';
import FooterButton from '../../component/FooterButton';
import TagComponent from '../../component/TagComponent';

const tagStyle = (elem, type) => {
  console.log('see this is elem -- -- > ', elem);
  if ('cleaningType' in elem) {
    if (type === 'text') { return { color: COLORS.white }; }
    if (type === 'tag') {
      return { backgroundColor: '#05c46b' };
    }
  } return {};
};

const ExtraScreen = ({ selectedBlockId }) => {
  const dispatch = useDispatch();
  const cleaningDetail = useSelector((state) => state.cleaning);
  const { taskLog } = cleaningDetail;
  let currentBlock = {};
  if (selectedBlockId) {
    currentBlock = taskLog.find((block) => {
      console.log('see short id and current block id', block.shortid, selectedBlockId);
      return block.shortid === selectedBlockId;
    });
  }
  // console.log('hey see this currentBlockExtras.extras-- --- >', currentBlock);
  return (
    <View style={{
      height: SIZES.baseSize * 260,
    // backgroundColor: 'pink'
    }}
    >
      <TitleWithDescription
        title="Extras"
        description="Select areas you attended"
        containerStyle={{
          marginTop: SIZES.baseSize * -8,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      />
      {!!selectedBlockId && (
      <View style={styles.extrasContainer}>
        <FlatList
          data={currentBlock.extras}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TagComponent
              Key={item.type}
              onPress={() => {
                if (!('_id' in item)) {
                  dispatch(extrasCleaned(index, selectedBlockId));
                }
              }}
              tagText={item.type}
              textStyle={tagStyle(item, 'text')}
              containerStyle={tagStyle(item, 'tag')}
            />
          )}
          keyExtractor={(item) => item.type}
        />
      </View>
      )}
    </View>
  );
};

export default ExtraScreen;

const styles = StyleSheet.create({
  extrasContainer: {
    marginTop: SIZES.baseSize * 15,
    // borderColor: COLORS.light4,
    // borderWidth: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: SIZES.baseSize * 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'space-between',
  },
});
