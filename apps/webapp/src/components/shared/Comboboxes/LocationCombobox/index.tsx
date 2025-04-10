import { useEffect, useState } from 'react';
import { useFilter } from '../../../../context/useFilter';
import UuidCombobox from '../UuidCombobox';
import { useQuery } from '@tanstack/react-query';
import { getLocations, Location } from './api';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../../../context/useUser';

const LocationCombobox = () => {
  const { t } = useTranslation();
  const { user } = useUser();
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
    enabled: selectedClient != null,
  });

  useEffect(() => {
    if (
      selectedLocation !== null &&
      !locationsData
        ?.filter((location) => location.name === selectedLocation.name)
        .some((location) =>
          location.groups?.some((group) => group.name === selectedGroup?.name)
        )
    ) {
      setSelectedGroup(null);
    }
    if ((user?.adminPermittedLocalisations ?? []).length > 0 && locationsData) {
      const filteredLocations = locationsData.filter((location) =>
        user?.adminPermittedLocalisations?.includes(location.uuid)
      );
      setLocations(filteredLocations);

      // if (
      //   selectedLocation?.name === undefined ||
      //   selectedLocation?.uuid === undefined
      // ) {
      //   setSelectedLocation({
      //     name: filteredLocations[0]?.name,
      //     uuid: filteredLocations[0]?.uuid,
      //   });
      // }
    } else if (locationsData) {
      setLocations(locationsData);
    }
  }, [
    selectedClient,
    selectedGroup,
    selectedLocation,
    locationsData,
    setSelectedGroup,
    user?.adminPermittedLocalisations,
    setLocations,
    setSelectedLocation,
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
      defaultPlaceholder={t('comboBox.locationNull')}
      disabled={selectedClient == null ? true : false}
      setReturnValue={setSelectedLocation}
      selectedValue={selectedLocation}
    />
  );
};

export default LocationCombobox;
