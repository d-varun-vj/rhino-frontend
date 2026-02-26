import { useGetClients, useGetLocations } from '@rhino/apis';
import { useUser } from 'apps/webapp/src/context/user';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterData, UserFilterContext } from './user-filter-context';

export const UserFilterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [clients, setClients] = useState<FilterData[] | null>(null);
  const [locations, setLocations] = useState<FilterData[] | null>(null);
  const [groups, setGroups] = useState<FilterData[] | null>(null);

  const [searchParams] = useSearchParams();

  const { user } = useUser();

  const { data: clientsData } = useGetClients({ userUuid: user?.uuid || '' });

  const paramClient = searchParams.get('client');
  const paramLocation = searchParams.get('location');
  const paramGroup = searchParams.get('group');

  const parseParamToArray = (param: string | null) =>
    param ? param.split(',') : [];

  const paramClientUuids = parseParamToArray(paramClient);
  const selectedClientId = paramClientUuids[0] || clients?.[0]?.uuid || null;

  const { data: locationsData } = useGetLocations({
    clientId: selectedClientId,
    queryKey: [selectedClientId],
  });

  useEffect(() => {
    if (clientsData && paramClientUuids.length > 0) {
      const matchedClients = clientsData
        .filter((c) => paramClientUuids.includes(c.uuid))
        .map((c) => ({
          name: c.name,
          uuid: c.uuid,
          logo: c.logo,
        }));

      setClients((prev) => {
        const prevUuids = prev?.map((c) => c.uuid).join(',') || '';
        const newUuids = matchedClients.map((c) => c.uuid).join(',');
        return prevUuids !== newUuids ? matchedClients : prev;
      });
    }
  }, [clientsData, paramClient, paramClientUuids]);

  useEffect(() => {
    if (locationsData) {
      const paramLocationUuids = parseParamToArray(paramLocation);
      const paramGroupUuids = parseParamToArray(paramGroup);

      if (paramLocationUuids.length > 0) {
        const matchedLocations = locationsData
          .filter((l) => paramLocationUuids.includes(l.uuid))
          .map((l) => ({ name: l.name, uuid: l.uuid }));

        setLocations((prev) => {
          const prevUuids = prev?.map((l) => l.uuid).join(',') || '';
          const newUuids = matchedLocations.map((l) => l.uuid).join(',');
          return prevUuids !== newUuids ? matchedLocations : prev;
        });
      }

      if (paramGroupUuids.length > 0) {
        const allGroups = locationsData.flatMap((l) => l.groups || []);
        const matchedGroups = allGroups
          .filter((g) => paramGroupUuids.includes(g.uuid))
          .map((g) => ({ name: g.name, uuid: g.uuid }));

        setGroups((prev) => {
          const prevUuids = prev?.map((g) => g.uuid).join(',') || '';
          const newUuids = matchedGroups.map((g) => g.uuid).join(',');
          return prevUuids !== newUuids ? matchedGroups : prev;
        });
      }
    }
  }, [locationsData, paramLocation, paramGroup]);

  const clearAll = () => {
    setClients(null);
    setLocations(null);
    setGroups(null);
  };

  return (
    <UserFilterContext.Provider
      value={{
        clients,
        locations,
        groups,
        setClients,
        setLocations,
        setGroups,
        clearAll,
      }}
    >
      {children}
    </UserFilterContext.Provider>
  );
};
