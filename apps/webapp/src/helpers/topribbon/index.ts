import { FilterData } from '../../context/userFilter/user-filter-context';

export const getRibbonParams = ({
  client,
  location,
  group,
}: {
  client: FilterData | null;
  location: FilterData | null;
  group: FilterData | null;
}) => {
  return `?location=${location ? location.uuid : null}&group=${group ? group.uuid : null}&client=${client ? client.uuid : null}`;
};
