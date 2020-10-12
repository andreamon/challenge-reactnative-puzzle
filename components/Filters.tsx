import React from 'react';
import {Alert, Button, Pressable, StyleSheet, Text, View} from 'react-native';

const Filters = () => {
  return (
    <View style={styles.container}>
      <Text>Filters</Text>
      <Pressable
        style={({pressed}) => [
          {
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
          },
          styles.wrapperCustom,
        ]}
      ><Text style={styles.text}>
      Characters
    </Text></Pressable>
    <Button
        title="Characters"
        onPress={() => Alert.alert('Simple Button pressed')}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
  text:{
      fontSize:18,
  }
});
export default Filters;
