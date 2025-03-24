import { FaArrowRight, FaUserCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';

import { Client, Location } from './types';
import { getClients, getLocations } from './api';
import { useQuery } from '@tanstack/react-query';
import RibbonComboBox from './RibbonCombobox';
import { useFilter } from '../../../context/useFilter';

const TopRibbon = () => {
  const {
    setClient: setSelectedClient,
    setLocation: setSelectedLocation,
    setGroup: setSelectedGroup,
    client: selectedClient,
    group: selectedGroup,
    location: selectedLocation,
  } = useFilter();
  const [clients, setClients] = useState<Client[]>();
  const [locations, setLocations] = useState<Location[]>();
  //   const [groups, setGroups] = useState<Group[]>();

  const { data: clientsData } = useQuery({
    queryKey: ['clents'],
    queryFn: () => getClients(),
  });
  const { data: locationsData } = useQuery({
    queryKey: ['locations', selectedClient],
    queryFn: () =>
      getLocations({
        clientId: selectedClient ? selectedClient?.uuid : null,
      }),
  });

  useEffect(() => {
    console.log(
      'CLIENT : ',
      selectedClient,
      '\n',
      'GROUP :',
      selectedGroup,
      '\n',
      'LOCATION :',
      selectedLocation
    );
    if (selectedClient?.name === null) {
      setSelectedGroup(null);
      setSelectedLocation(null);
    }
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

    if (clientsData) {
      setClients(clientsData);
    }
    if (locationsData) {
      setLocations(locationsData);
    }
  }, [
    selectedClient,
    selectedGroup,
    selectedLocation,
    clientsData,
    locationsData,
    locations,
    setSelectedLocation,
    setSelectedGroup,
  ]);

  return (
    <header className="flex basis-auto h-auto relative z-40 justify-between">
      <div className="mt-[1rem] relative px-[.75rem] ">
        <div className="flex flex-row ">
          <div className="pl-[1rem] mt-[.25rem] items-baseline flex flex-row flex-wrap gap-10">
            <div className="flex items-center">
              <div className="text-[.9rem] font-bold text-[#91A0B1] mr-[1rem]">
                Client:
              </div>
              <RibbonComboBox
                options={
                  clients
                    ? clients?.map((client) => ({
                        name: client.name,
                        uuid: client.uuid,
                      }))
                    : []
                }
                defaultPlaceholder="Select"
                disabled={false}
                setReturnValue={(client) => {
                  if (client?.name !== selectedClient?.name) {
                    setSelectedClient(client);
                    setSelectedGroup(null);
                    setSelectedLocation(null);

                    // if (client) setClient(client);
                  }
                }}
                selectedValue={selectedClient}
              />
            </div>
            <div className="flex items-center">
              <div className="text-[.9rem] font-bold text-[#91A0B1] mr-[1rem]">
                Location:
              </div>
              <RibbonComboBox
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
            </div>
            <div className="flex items-center">
              <div className="text-[.9rem] font-bold text-[#91A0B1] mr-[1rem]">
                Group:
              </div>
              <RibbonComboBox
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
                defaultPlaceholder="All groups"
                disabled={selectedClient == null ? true : false}
                setReturnValue={setSelectedGroup}
                selectedValue={selectedGroup}
              />
            </div>
            <div className="flex items-center">
              <div className="text-[.9rem] font-bold text-[#91A0B1] mr-[1rem]">
                Favorite meters:
              </div>
              <a
                href="#"
                className="cursor-pointer min-w-[14rem] max-w-[14rem] flex items-center justify-center gap-[0.5rem] leading-[1rem] h-[2.5rem] text-white font-bold bg-rhino-energy-green border-rhino-energy-green-light rounded-[4px] text-[13px]"
              >
                Select favorite <FaArrowRight />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-[.25rem] px-[.75rem] items-center h-[4.125rem] pr-[2.5rem]">
        <FaUserCircle className="text-[#036983] text-[21px]" />
      </div>
    </header>
  );
};

export default TopRibbon;
