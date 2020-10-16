import React, {Fragment, useEffect, useState} from 'react';
import Search from '../../shared/Search';
import Detail from './Detail';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';

import {gql, useLazyQuery} from '@apollo/client';
import {globalStyles} from '../../styles/global';
type CharacterResult = {
  id: String;
  name: String;
  type: String;
  gender: String;
  species: String;
  image: String;
};

const CHARACTERS_RICKANDMORTY = gql`
  query($name: String!) {
    characters(filter: {name: $name}) {
      results {
        id
        name
        type
        gender
        species
        image
      }
      info {
        pages
        count
        next
        prev
      }
    }
  }
`;

const Characters = () => {
  const [query, setQuery] = useState('');
  const [listData, setListData] = useState([]);
  const [show, setShow] = useState(false);
  const [characterSelected, setCharacterSelected]: any = useState([]);

  const handleShowModal = (item: any) => {
    setShow(true);
    setCharacterSelected(item);
  };

  const handleClose = () => {
    setShow(false);
  };

  const [
    getCharacters,
    {loading, data, called, error},
  ] = useLazyQuery(CHARACTERS_RICKANDMORTY);

  const handleInput = (value: string) => {
    setQuery(value);
  };

  useEffect(() => {
    if (query.length > 2) {
      getCharacters({variables: {name: query}});
    } else if (query.length < 3 && listData.length > 0) {
      setListData([]);
    }
  }, [query]);

  useEffect(() => {
    if (!loading && data) {
      let results = data.characters.results.map((res: CharacterResult) => {
        return {
          id: res.id,
          name: res.name,
          type: res.type,
          gender: res.gender,
          species: res.species,
          image: res.image,
        };
      });
      setListData(results);
    }
  }, [loading]);

  let resultsSearch = (
    <Text style={globalStyles.detailComponent}>CHARACTERS</Text>
  );
  if (called && loading) {
    resultsSearch = <Text style={globalStyles.detailComponent}>Loading</Text>;
  }
  if (error) {
    resultsSearch = (
      <Text style={globalStyles.detailComponent}>No results</Text>
    );
  }

  const Item = ({name, image}: any) => (
    <View style={globalStyles.itemComponent}>
      <Image source={{uri: image}} style={{width: 80, height: 80}} />
      <Text style={globalStyles.detailComponent}>{name}</Text>
    </View>
  );
  const renderItem = ({item}: any) => (
    <TouchableOpacity onPress={() => handleShowModal(item)}>
      <Item name={item.name} image={item.image} />
    </TouchableOpacity>
  );

  return (
    <Fragment>
      <View style={{flex: 1}}>
        <Search onChange={handleInput} />
      </View>
      <View style={{flex: 2, backgroundColor: '#403F3E'}}>
        {listData.length !== 0 ? (
          <FlatList
            data={listData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        ) : (
          resultsSearch
        )}
        <Detail
          handleShow={show}
          character={characterSelected}
          handleClose={handleClose}
        />
      </View>
    </Fragment>
  );
};

export default Characters;
