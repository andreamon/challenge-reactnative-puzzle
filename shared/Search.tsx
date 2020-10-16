import React, {Fragment, useState} from 'react';
import {globalStyles} from '../styles/global';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';

const Search = (props: any) => {
  const [value, onChangeText] = useState('');
  const clearSearch = () => {
    props.onChange('');
    onChangeText(' ');
  };

  return (
    <Fragment>
      <View style={globalStyles.containerSearch}>
        <TextInput
          style={globalStyles.inputSearch}
          placeholder="Search"
          placeholderTextColor="#000"
          onChangeText={(text) => {
            props.onChange(text);
            onChangeText(text);
          }}
          value={value}
        />
        <TouchableOpacity onPress={() => clearSearch()}>
          <View style={globalStyles.buttonSearch}>
            <Text style={globalStyles.buttonTextSearch}>Clear all</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Fragment>
  );
};

export default Search;
