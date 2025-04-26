import { useEffect, useState } from 'react';
import { useFilter } from '../../../../context/useFilter';
import UuidCombobox from '../UuidCombobox';
import { useQuery } from '@tanstack/react-query';
import { getLocations, Location } from '../LocationCombobox/api';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../../../context/useUser';
import { UserType } from '../../../../api/User/types';

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
    if (
      (user?.structureAccess?.resourceAccesses ?? []).length > 0 &&
      user?.userType === UserType.LocalisationAdmin &&
      locationsData
    ) {
      const filterLocationUuid = user?.structureAccess?.resourceAccesses
        ?.filter((resource) => resource.source_type === 'LOCALISATION')
        .map((resource) => resource.source_uuid);
      const filteredLocations = locationsData.filter((location) =>
        filterLocationUuid?.includes(location.uuid)
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
    user?.userType,
    user?.structureAccess?.resourceAccesses,
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
