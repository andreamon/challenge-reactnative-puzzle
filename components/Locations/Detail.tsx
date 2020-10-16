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
        <Text style={globalStyles.titleModal}>{props.location.name}</Text>
        <ScrollView>
          <View>
            <Text style={globalStyles.textInfoModal}>
              Type: {props.location.type}
              {'\n'}
              Dimension: {props.location.dimension}
            </Text>
            <Text style={globalStyles.titleModal}>Residents</Text>
            {props.residents.length > 0 ? (
              props.residents
                .slice(0, 5)
                .map((res, index) =>
                  res.resname !== null ? (
                    <Item
                      name={res.resname}
                      image={res.resimage}
                      key={res.id}
                    />
                  ) : (
                    <Text style={globalStyles.textInfoModal}>
                      There aren't residents
                    </Text>
                  ),
                )
            ) : (
              <Text style={globalStyles.textInfoModal}>
                There aren't residents
              </Text>
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
