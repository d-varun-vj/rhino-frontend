import { useEffect, useState } from 'react';
import { useFilter } from '../../../../context/useFilter';
import UuidCombobox from '../UuidCombobox';
import { useQuery } from '@tanstack/react-query';
import { getLocations, Location } from './api';

const LocationCombobox = () => {
  const {
    setLocation: setSelectedLocation,
    setGroup: setSelectedGroup,
    client: selectedClient,
    group: selectedGroup,
    location: selectedLocation,
  } = useFilter();
  const [locations, setLocations] = useState<Location[]>([]);

  const { data: locationsData } = useQuery({
    queryKey: ['locations', selectedClient],
    queryFn: () =>
      getLocations({
        clientId: selectedClient ? selectedClient?.uuid : null,
      }),
  });

  useEffect(() => {
    if (
      selectedLocation !== null &&
      !locations
        ?.filter((location) => location.name === selectedLocation.name)
        .some((location) =>
          location.groups?.some((group) => group.name === selectedGroup?.name)
        )
    ) {
      setSelectedGroup(null);
    }
    if (locationsData) {
      setLocations(locationsData);
    }
  }, [
    selectedClient,
    selectedGroup,
    selectedLocation,
    locationsData,
    locations,
    setSelectedLocation,
    setSelectedGroup,
  ]);

  return (
    <UuidCombobox
      options={
        locations
          ? locations?.map((location) => ({
              name: location.name,
              uuid: location.uuid,
            }))
          : []
      }
      defaultPlaceholder="All locations"
      disabled={selectedClient == null ? true : false}
      setReturnValue={setSelectedLocation}
      selectedValue={selectedLocation}
    />
  );
};

export default LocationCombobox;
