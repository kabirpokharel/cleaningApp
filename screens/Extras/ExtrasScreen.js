import React, { useState } from 'react';
import {
  StyleSheet, Text, View, CheckBox, FlatList,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import { TouchableOpacity } from 'react-native-gesture-handler';
import PageTemplate from '../../component/PageTemplate';
import TitleWithDescription from '../../component/TitleWithDescriptionComponent';
import { FONTS, COLORS } from '../../constants/theme';
import CardComponent from '../../component/CardComponent';
import FooterButton from '../../component/FooterButton';

const dummyExtras = [
  'toilet and this is random text to test the element and this is random text to test the element', 'bathroom', 'kitchen', 'store room', 'railings', 'windows', 'door knobs', 'game room', 'gym hall',
];

const CheckListElement = ({
  item, extras, index, setExtras,
}) => {
  const objKey = Object.keys(item)[0];
  const lastElement = extras.length - 1 === index;
  return (
    <CardComponent
      key={objKey}
      // style={styles.checkBoxWrapper}
      cardStyle={{
        marginBottom: lastElement ? 60 : 5,
        borderRadius: 4,
        backgroundColor: item[objKey] ? COLORS.light4 : COLORS.white,
      }}
      onPress={() => {
        const updatedExtras = [...extras];
        updatedExtras[index][objKey] = !item[objKey];
        setExtras(updatedExtras);
      }}
    >

      <TouchableOpacity
        key={objKey}
        style={styles.checkBoxWrapper}
        onPress={() => {
          const updatedExtras = [...extras];
          updatedExtras[index][objKey] = !item[objKey];
          setExtras(updatedExtras);
        }}
      >
        <View style={styles.extrasWrapper}>
          <Text style={[
            FONTS.body4,
            { color: item[objKey] ? COLORS.primary : COLORS.primary2 },
          ]}
          >
            {objKey}
          </Text>
        </View>
        <View style={styles.statusWrapper}>
          {item[objKey] ? <Feather name="check-circle" size={24} color={COLORS.primary} /> : <Feather name="circle" size={24} color={COLORS.primary2} />}
        </View>
      </TouchableOpacity>
    </CardComponent>
  );
};
const formatExtras = (dummyExtras) => {
  const arr = [];
  dummyExtras.forEach((e) => arr.push({ [e]: false }));
  console.log('this is arr - - -- > ', arr);
  return arr;
};

const ExtrasScreen = () => {
  const [extras, setExtras] = useState(formatExtras(dummyExtras));
  return (
    <PageTemplate>
      <TitleWithDescription title="Block" description="Slect block to access rooms" />
      <View style={styles.checkBoxContainer}>
        <FlatList
          data={extras}
          renderItem={({ item, index }) => (
            <CheckListElement {...{
              item, extras, index, setExtras,
            }}
            />
          )}
          keyExtractor={(item, index) => Object.keys(item)[0]}
        />
      </View>
      <FooterButton
        // onPress={() => navigation.navigate('summaryScreen')}
        // onPress={showData}
        containerStyle
        textStyle
        btnText="Continue"
      />
      {/* <SafeAreaView /> */}
    </PageTemplate>
  );
};

export default ExtrasScreen;

const styles = StyleSheet.create({
  checkBoxContainer: {
    margin: 20,
    width: 350,
    flex: 1,
  },
  checkBoxWrapper: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  extrasWrapper: {
    flex: 3,
    justifyContent: 'center',
  },
  statusWrapper: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  itemWrapper: {

  },

});
