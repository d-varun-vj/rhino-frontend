import { useEffect, useState } from 'react';
import { useFilter } from '../../../../context/useFilter';
import UuidCombobox from '../UuidCombobox';
import { useQuery } from '@tanstack/react-query';
import { getLocations, Location } from '../LocationCombobox/api';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../../../context/useUser';

const GroupCombobox = () => {
  const { t } = useTranslation();
  const { user } = useUser();

  const {
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

  // useEffect(() => {
  //   if (
  //     selectedLocation !== null &&
  //     !locations
  //       ?.filter((location) => location.name === selectedLocation.name)
  //       .some((location) =>
  //         location.groups?.some((group) => group.name === selectedGroup?.name)
  //       )
  //   ) {
  //     setSelectedGroup(null);
  //   }
  //   if (locationsData) {
  //     setLocations(locationsData);
  //   }
  // }, [
  //   selectedClient,
  //   selectedGroup,
  //   selectedLocation,
  //   locationsData,
  //   locations,
  //   setSelectedLocation,
  //   setSelectedGroup,
  // ]);
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
  ]);

  return (
    <UuidCombobox
      options={
        locations
          ? locations
              .filter((location) =>
                selectedLocation?.name
                  ? location.name === selectedLocation.name
                  : true
              )
              .map((location) => ({
                name: location.name,
                uuid: location.uuid,
                groups: location.groups ? location.groups : [],
              }))
          : []
      }
      defaultPlaceholder={t('comboBox.groupNull')}
      disabled={selectedClient == null ? true : false}
      setReturnValue={setSelectedGroup}
      selectedValue={selectedGroup}
    />
  );
};

export default GroupCombobox;
