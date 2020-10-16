import React, {Fragment, useEffect, useState} from 'react';
import Search from '../../shared/Search';
import Detail from './Detail';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';

import {gql, useLazyQuery} from '@apollo/client';
import { globalStyles } from '../../styles/global';

type Character = {
  name: String;
  image: String;
};
type EpisodesResult = {
  id: String;
  name: String;
  episode: String;
  air_date: String;
  characters: [Character];
};

const EPISODES_RICKANDMORTY = gql`
  query($name: String!) {
    episodes(filter: {name: $name}) {
      results {
        id
        name
        episode
        air_date
        characters {
          name
          image
        }
      }
    }
  }
`;

const Episodes = () => {
  const [query, setQuery] = useState('');
  const [listData, setListData] = useState([]);
  const [show, setShow] = useState(false);
  const [episodeSelected, setEpisodeSelected]: any = useState([]);
  const [characters, setCharacters] = useState([]);

  const handleShowModal = (episode: any) => {
    setCharacters(episode.characters);
    setEpisodeSelected(episode);
    setShow(true);
  };

  const [getEpisodes, {loading, data, called, error}] = useLazyQuery(
    EPISODES_RICKANDMORTY,
  );

  const handleInput = (value: string) => {
    setQuery(value);
  };

  useEffect(() => {
    if (query.length > 2) {
      getEpisodes({variables: {name: query}});
    } else if (query.length < 3 && listData.length > 0) {
      setListData([]);
    }
  }, [query]);

  useEffect(() => {
    if (!loading && data) {
      let results = data.episodes.results.map((res: EpisodesResult) => {
        return {
          id: res.id,
          name: res.name,
          episode: res.episode,
          air_date: res.air_date,
          characters: res.characters.map((character) => {
            return {
              charname: character.name,
              charimage: character.image,
            };
          }),
        };
      });
      setListData(results);
    }
  }, [loading]);

  const handleClose = () => {
    setShow(false);
  };

  let resultsSearch = <Text style={globalStyles.detailComponent}>EPISODES</Text>;
  if (called && loading) {
    resultsSearch = <Text style={globalStyles.detailComponent}>Loading</Text>;
  }
  if (error) {
    resultsSearch = <Text style={globalStyles.detailComponent}>No results</Text>;
  }

  const Item = ({name, episode}: any) => (
    <View style={globalStyles.itemComponent}>
      <Text style={globalStyles.detailComponent}>
        {name}
        {'\n'}
        <Text style={{fontWeight: 'normal', fontSize: 16}}>{episode}</Text>
      </Text>
    </View>
  );
  const renderItem = ({item}: any) => (
    <TouchableOpacity onPress={() => handleShowModal(item)}>
      <Item name={item.name} episode={item.episode} />
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
          episode={episodeSelected}
          characters={characters}
          handleClose={handleClose}
        />
      </View>
    </Fragment>
  );
};

export default Episodes;
