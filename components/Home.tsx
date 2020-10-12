import React, {Fragment} from 'react';
import Filters from './Filters'
import {StyleSheet, Text, View} from 'react-native';

const Home = () => {
  return (
    <Fragment>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>CHALLENGE RICK & MORTY</Text>
        </View>
        <Filters />
      </View>
    </Fragment>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 90,
    backgroundColor: '#22dd23',
    // flex: 1,
    justifyContent:"center",
    alignItems:"center",
  },
  textHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default Home;
