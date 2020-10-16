import React, {Fragment, useEffect, useState} from 'react';
import Search from '../../shared/Search';
import Detail from './Detail';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';

import {gql, useLazyQuery} from '@apollo/client';
import {globalStyles} from '../../styles/global';

type Character = {
  name: String;
  image: String;
};
type LocationsResult = {
  id: String;
  name: String;
  type: String;
  dimension: String;
  residents: [Character];
};

const LOCATIONS_RICKANDMORTY = gql`
  query($name: String!) {
    locations(filter: {name: $name}) {
      results {
        id
        name
        type
        dimension
        residents {
          name
          image
        }
      }
    }
  }
`;

const Locations = () => {
  const [query, setQuery] = useState('');
  const [listData, setListData] = useState([]);
  const [show, setShow] = useState(false);
  const [locationSelected, setLocationSelected]: any = useState([]);
  const [residents, setResidents] = useState([]);

  const handleShowModal = (location) => {
    setResidents(location.residents);
    setLocationSelected(location);
    setShow(true);
  };

  const [getLocations, {loading, data, called, error}] = useLazyQuery(
    LOCATIONS_RICKANDMORTY,
  );

  const handleInput = (value: string) => {
    setQuery(value);
  };

  useEffect(() => {
    if (query.length > 2) {
      getLocations({variables: {name: query}});
    } else if (query.length < 3 && listData.length > 0) {
      setListData([]);
    }
  }, [query]);

  useEffect(() => {
    if (!loading && data) {
      let results = data.locations.results.map((res: LocationsResult) => {
        return {
          id: res.id,
          name: res.name,
          type: res.type,
          dimension: res.dimension,
          residents: res.residents.map((resident) => {
            return {
              resname: resident.name,
              resimage: resident.image,
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

  let resultsSearch = <Text style={globalStyles.detailComponent}>LOCATIONS</Text>;
  if (called && loading) {
    resultsSearch = <Text style={globalStyles.detailComponent}>Loading</Text>;
  }
  if (error) {
    resultsSearch = <Text style={globalStyles.detailComponent}>No results</Text>;
  }

  const Item = ({name, dimension}: any) => (
    <View style={globalStyles.itemComponent}>
      <Text style={globalStyles.detailComponent}>
        {name}
        {'\n'}
        <Text style={{fontWeight: 'normal', fontSize: 16}}>{dimension}</Text>
      </Text>
    </View>
  );
  const renderItem = ({item}: any) => (
    <TouchableOpacity onPress={() => handleShowModal(item)}>
      <Item name={item.name} dimension={item.dimension} />
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
          location={locationSelected}
          residents={residents}
          handleClose={handleClose}
        />
      </View>
    </Fragment>
  );
};

export default Locations;
