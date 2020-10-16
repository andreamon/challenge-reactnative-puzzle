import React from 'react';
import {globalStyles} from '../styles/global';
import {Text, TouchableOpacity, View} from 'react-native';

const Intro = ({navigation}: any) => {
  return (
    <View style={globalStyles.containerIntro}>
      <Text style={globalStyles.mainTextIntro}>REACT NATIVE CHALLENGE</Text>
  <Text style={globalStyles.textIntro}>Andrea Montaño 👩‍💻</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <View style={globalStyles.buttonIntro}>
          <Text style={globalStyles.buttonTextIntro}>Enter</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Intro;
