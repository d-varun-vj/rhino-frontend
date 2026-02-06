import { FilterData } from '../../context/userFilter/user-filter-context';

export const getRibbonParams = ({
  clients,
  locations,
  groups,
}: {
  clients: FilterData[] | null;
  locations: FilterData[] | null;
  groups: FilterData[] | null;
}) => {
  const formatParam = (items: FilterData[] | null): string | null => {
    if (!items || items.length === 0) return null;
    return items.map((item) => item.uuid).join(',');
  };

  const locationParam = formatParam(locations);
  const groupParam = formatParam(groups);
  const clientParam = formatParam(clients);

  return `?location=${locationParam ?? 'null'}&group=${groupParam ?? 'null'}&client=${clientParam ?? 'null'}`;
};

export const parseParamToArray = (
  param: string | null | undefined
): string[] | null => {
  if (!param || param === 'null') return null;
  return param
    .split(',')
    .map((uuid) => uuid.trim())
    .filter(Boolean);
};

export const ignoreMultipleValue = <T>(
  value: T[] | null | undefined
): boolean => {
  return !value || value.length > 1;
};
