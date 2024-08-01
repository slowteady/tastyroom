import {numbers} from '@/constants';
import useLocationStore from '@/store/useLocationStore';
import {useCallback, useEffect, useRef, useState} from 'react';
import MapView, {LatLng, Region} from 'react-native-maps';

type Delta = Pick<Region, 'latitudeDelta' | 'longitudeDelta'>;

const useMoveMapView = () => {
  const {moveLocation} = useLocationStore();
  const [regionDelta, setRegionDelta] = useState<Delta>(numbers.INITIAL_DELTA);

  const mapRef = useRef<MapView | null>(null);

  const moveMapView = useCallback(
    (coordinate: LatLng, delta?: Delta) => {
      mapRef.current?.animateToRegion({
        ...coordinate,
        ...(delta ?? regionDelta),
      });
    },
    [regionDelta],
  );

  const handleChangeDelta = (region: Region) => {
    const {latitudeDelta, longitudeDelta} = region;

    setRegionDelta({latitudeDelta, longitudeDelta});
  };

  useEffect(() => {
    moveLocation && moveMapView(moveLocation);
  }, [moveLocation, moveMapView]);

  return {moveMapView, mapRef, handleChangeDelta};
};

export default useMoveMapView;
