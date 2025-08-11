export type TableAction = {
  label: string;
  delete: () => void;
};

export enum FilterVariant {
  SELECT = 'select',
  TEXT = 'text',
  ALL = 'all',
  CUSTOM = 'custom',
  SELECT_ALL = 'select_all',
}
