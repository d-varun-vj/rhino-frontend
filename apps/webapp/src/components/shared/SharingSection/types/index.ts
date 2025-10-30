export type SharingState = {
  shared: boolean;
  readOnly: boolean;
  sharedLocations: string[];
  sharedTenants: string[];
};

export type SharingAction =
  | { type: 'SET_SHARED'; payload: boolean }
  | { type: 'SET_READ_ONLY'; payload: boolean }
  | { type: 'SET_LOCATIONS'; payload: string[] }
  | { type: 'SET_TENANTS'; payload: string[] }
  | { type: 'RESET' };

export type SharingSectionProps = {
  label: string;
  onValuesChange?: (values: SharingState) => void;
  mode?: 'create' | 'update';
  authorUuid?: string;
  isReadOnly?: boolean;
  children?: React.ReactElement;
};
