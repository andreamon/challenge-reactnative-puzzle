import React from 'react';
import {Image, Modal, Text, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {globalStyles} from '../../styles/global';

const Item = ({name, image}: any) => (
  <View style={globalStyles.itemModal}>
    <Image source={{uri: image}} style={{width: 80, height: 80}} />
    <Text style={globalStyles.detailModal}>{name}</Text>
  </View>
);

const Detail = (props: any) => {
  return (
    <Modal visible={props.handleShow} animationType="slide" transparent={true}>
      <View style={globalStyles.containerModal}>
        <Text style={globalStyles.titleModal}>{props.episode.name}</Text>
        <ScrollView>
          <View>
            <Text style={globalStyles.textInfoModal}>
              Episode: {props.episode.episode}
              {'\n'}
              Release Date: {props.episode.air_date}
            </Text>
            <Text style={globalStyles.titleModal}>Characters</Text>
            {props.characters.length > 0 ? (
              props.characters
                .slice(0, 5)
                .map((char, index) =>
                  char.charname !== null ? (
                    <Item
                      name={char.charname}
                      image={char.charimage}
                      key={index}
                    />
                  ) : (
                    <Text>There aren't characters</Text>
                  ),
                )
            ) : (
              <Text>There aren't characters</Text>
            )}
            <TouchableOpacity>
              <Text
                style={globalStyles.buttonClose}
                onPress={props.handleClose}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default Detail;
