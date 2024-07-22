import {errorMessages} from '@/constants';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {LatLng} from 'react-native-maps';

const useGetAddress = (location: LatLng) => {
  const {latitude, longitude} = location;
  const [result, setResult] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const {data} = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=street_address|route|political&key=AIzaSyAzwdaG3fqlrqsfi32_zYTe_7SMO11_0r4&language=ko`,
        );

        const address =
          data.results.length > 0
            ? data.results[0].formatted_address
            : `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

        setResult(address);
      } catch (error) {
        setResult(errorMessages.CANNOT_GET_ADDRESS);
      }
    })();
  }, [latitude, longitude]);

  return result;
};

export default useGetAddress;
