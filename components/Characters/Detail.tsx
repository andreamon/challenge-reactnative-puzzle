import React from 'react';
import {Image, Modal, Text, TouchableOpacity, View} from 'react-native';

import {globalStyles} from '../../styles/global';

const Detail = (props: any) => {
  return (
    <Modal visible={props.handleShow} animationType="slide" transparent={true}>
      <View style={globalStyles.containerModal}>
        <Image
          source={{uri: props.character.image}}
          style={{width: 250, height: 250, alignSelf: 'center'}}
        />
        <View>
          <Text style={globalStyles.textInfoModal}>
            Name: {props.character.name}
            {'\n'}
            Type:{' '}
            {props.character.type ? props.character.type : 'without specifying'}
            {'\n'}
            Gender: {props.character.gender}
            {'\n'}
            Specie: {props.character.species}
          </Text>
        </View>
        <TouchableOpacity>
          <Text style={globalStyles.buttonClose} onPress={props.handleClose}>
            Close
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default Detail;
